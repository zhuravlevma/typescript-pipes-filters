import { Pipeline } from 'src/__lib__/pipeline';
import { CreateOrderDto } from '../controllers/dtos/create-order.dto';
import { Order, OrderItem } from '../dal/orm-models/order.orm-model';
import { CreateOrderValidationFilter } from '../filters/create-order-validation.filter';
import { DiscountFilter } from '../filters/discount.filter';
import { OrderRepository } from '../dal/order.repository';

export class CreatService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(dto: CreateOrderDto): Promise<Order> {
    const newOrder = new Order(
      dto.orderId,
      dto.customerId,
      dto.items.map((el) => new OrderItem(el.productId, el.quantity, el.price)),
      dto.totalAmount,
      dto.status,
    );

    const order = new Pipeline([
      new CreateOrderValidationFilter(),
      new DiscountFilter(),
    ]).process(newOrder);

    return this.orderRepository.save(order);
  }
}
