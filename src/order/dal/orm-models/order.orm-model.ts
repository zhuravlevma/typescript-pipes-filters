export class Order {
  constructor(
    public orderId: string,
    public customerId: string,
    public items: OrderItem[],
    public totalAmount: number,
    public status: string,
  ) {}
}

export class OrderItem {
  constructor(
    public productId: string,
    public quantity: number,
    public price: number,
  ) {}
}
