interface ItemModel {
  item_id: string,
  description: string,
  price: number,
  quantity: number
}

export interface ChargeModel {
  id: string,
  amount: number
  paid_at: string,
  error: string|null,
  items: ItemModel[]
}
