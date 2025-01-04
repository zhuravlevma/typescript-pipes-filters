import { Filter } from 'src/__lib__/filter';
import { Order } from '../dal/orm-models/order.orm-model';

export class TaxCalculationFilter implements Filter<Order> {
  process(order: Order): Order {
    const tax = order.totalAmount * 0.05;
    order.totalAmount += tax;
    console.log('Tax calculated');
    return order;
  }
}
