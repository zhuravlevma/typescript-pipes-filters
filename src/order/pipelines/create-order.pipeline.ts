import { Pipeline } from 'src/__lib__/pipeline';
import { CreateOrderDto } from '../controllers/dtos/create-order.dto';
import { Order } from '../dal/orm-models/order.orm-model';
import { CreateOrderValidationFilter } from '../filters/create-order-validation.filter';
import { DiscountFilter } from '../filters/discount.filter';

export class CreateOrderPipeline extends Pipeline<Order> {
  async execute(dto: CreateOrderDto): Promise<Order> {
    this.addFilter(new CreateOrderValidationFilter());
    this.addFilter(new DiscountFilter());

    let order = new Order(
      dto.orderId,
      dto.customerId,
      [],
      dto.totalAmount,
      dto.status,
    );

    order = this.process(order);

    return order;
  }
}
