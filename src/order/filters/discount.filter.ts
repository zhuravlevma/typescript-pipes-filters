import { Order } from '../dal/orm-models/order.orm-model';

export class DiscountFilter {
  process(order: Order): Order {
    if (order.totalAmount > 100) {
      order.totalAmount -= order.totalAmount * 0.1;
      console.log('Discount applied');
    }
    return order;
  }
}