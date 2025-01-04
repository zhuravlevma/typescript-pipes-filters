import { CreateOrderDto } from '../controllers/dtos/create-order.dto';
import { Order } from '../dal/orm-models/order.orm-model';
import { CreateOrderValidationFilter } from '../filters/create-order-validation.filter';
import { DiscountFilter } from '../filters/discount.filter';

export class Pipeline<T> {
  filters: Array<(data: T) => T> = [];

  addFilter(filter: (data: T) => T) {
    this.filters.push(filter);
  }

  process(data: T): T {
    let currentData = data;
    for (const filter of this.filters) {
      currentData = filter(currentData);
    }
    return currentData;
  }
}

export class CreateOrderPipeline extends Pipeline<Order> {
  constructor() {
    super();
  }

  async execute(dto: CreateOrderDto): Promise<Order> {
    this.addFilter(new CreateOrderValidationFilter().process);
    this.addFilter(new DiscountFilter().process);

    let order = new Order(
      dto.orderId,
      dto.customerId,
      [],
      dto.totalAmount,
      dto.status,
    );
    for (const filter of this.filters) {
      order = filter(order); // Каждый фильтр работает с сущностью
    }

    // Возвращаем результат в DTO
    return order;
  }
}
