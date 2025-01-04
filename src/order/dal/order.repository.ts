import { Order } from './orm-models/order.orm-model';

export class OrderRepository {
  getById(orderId: string): Order {
    return new Order(orderId, 'custId', [], 0, 'CREATED');
  }

  save(order: Order): Order {
    return order;
  }
}
