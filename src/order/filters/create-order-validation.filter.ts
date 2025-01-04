import { Filter } from 'src/__lib__/filter';
import { Order } from '../dal/orm-models/order.orm-model';

export class CreateOrderValidationFilter implements Filter<Order> {
  process(order: Order): Order {
    if (order.items.length === 0) {
      throw new Error('Invalid order: missing required fields');
    }
    return order;
  }
}
