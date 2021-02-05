import { PricingModel } from '../../src/models/pricing.model'

export const pricingWithinResponse: PricingModel = {
  "megabyte": 0.19531255,
  "gigabyte": 200,
  "sms": 3,
  "mms": 3,
  "voice": 3,
  "voicemail": 0,
  "incoming": 0,
  "data_tiers": {
    "1": {
      "megabyte": 0.5,
      "gigabyte": 500
    },
    "2": {
      "megabyte": 0.2,
      "gigabyte": 200
    },
    "3": {
      "megabyte": 0.1,
      "gigabyte": 100
    }
  },
  "description": "Pricing within the UK."
}
