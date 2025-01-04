import { Pipeline } from 'src/__lib__/pipeline';
import { Order } from '../dal/orm-models/order.orm-model';
import { DiscountFilter } from '../filters/discount.filter';
import { OrderRepository } from '../dal/order.repository';
import { ChangeOrderDto } from '../controllers/dtos/change-order.dto';
import { ChangeAmountFilter } from '../filters/change-amount-filter';

export class ChangeOrderPipeline extends Pipeline<Order> {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }
  async execute(dto: ChangeOrderDto): Promise<Order> {
    let order = this.orderRepository.getById(dto.orderId);

    this.addFilter(new ChangeAmountFilter(dto.newTotalAmount));
    this.addFilter(new DiscountFilter());

    order = this.process(order);

    return order;
  }
}
