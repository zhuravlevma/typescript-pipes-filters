import { Order } from '../dal/orm-models/order.orm-model';

export class StockCheckFilter {
  process(order: Order): Order {
    order.items.forEach((item) => {
      if (item.quantity > 10) {
        throw new Error(`Not enough stock for product ${item.productId}`);
      }
    });
    console.log('Stock checked');
    return order;
  }
}