import { ChargeModel } from '../../src/models'

export const chargeResponse: ChargeModel = {
  "id": "ch_1XXXXXXXXXXXXXXXXXXXXXXX",
  "amount": 500,
  "paid_at": "2021-02-01T12:00:00.000Z",
  "error": null,
  "items": [
    {
      "item_id": "acc_XXXXXXXXXXXXXXXXXXXXXXXX",
      "price": 200,
      "quantity": 1,
      "description": "1 GB shared allowance"
    },
    {
      "item_id": "sim_XXXXXXXXXXXXXXXXXXXXXXXX",
      "price": 300,
      "quantity": 1,
      "description": "SIM w/ PAYG calls & texts"
    }
  ]
}
