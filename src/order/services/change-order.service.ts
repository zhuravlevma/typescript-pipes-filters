import { Pipeline } from 'src/__lib__/pipeline';
import { Order } from '../dal/orm-models/order.orm-model';
import { DiscountFilter } from '../filters/discount.filter';
import { OrderRepository } from '../dal/order.repository';
import { ChangeOrderDto } from '../controllers/dtos/change-order.dto';
import { ChangeAmountFilter } from '../filters/change-amount-filter';

export class ChangeOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(dto: ChangeOrderDto): Promise<Order> {
    const order = this.orderRepository.getById(dto.orderId);

    new Pipeline([
      new ChangeAmountFilter(dto.newTotalAmount),
      new DiscountFilter(),
    ]).process(order);

    return this.orderRepository.save(order);
  }
}
