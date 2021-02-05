export interface PricingModel {
  voice: number,
  voicemail?: number,
  incoming?: number,
  sms: number,
  mms: number,
  megabyte?: number,
  gigabyte?: number,
  data_tiers?: {
    [index: string]: {
      megabyte: number,
      gigabyte: number
    }
  },
  description: string
}
