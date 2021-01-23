interface Item {
  item_id: string,
  description: string,
  price: number,
  quantity: number
}

export interface ICharge {
  id: string,
  amount: number
  paid_at: string,
  error: string|null,
  items: Item[]
}
