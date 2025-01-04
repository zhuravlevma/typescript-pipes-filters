export class CreateOrderDto {
  public orderId: string;
  public customerId: string;
  public items: string[];
  public totalAmount: number;
  public status: string;
}
