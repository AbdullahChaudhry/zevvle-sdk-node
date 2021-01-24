export interface NonGeoPricingModel {
  rate: {
    fixed_fee: number,
    per_min_after_one: number,
    access_charge: number
  },
  format: string,
  code: string
}
