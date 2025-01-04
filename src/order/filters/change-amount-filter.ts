import { Filter } from 'src/__lib__/filter';
import { Order } from '../dal/orm-models/order.orm-model';

export class ChangeAmountFilter implements Filter<Order> {
  constructor(private readonly newTotalPrice: number) {}

  process(order: Order): Order {
    order.totalAmount = this.newTotalPrice;
    return order;
  }
}
