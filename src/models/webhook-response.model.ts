import { WebhookTypes } from './Webhook.enum'

export interface WebhookResponseModel {
  id: string,
  url: string,
  user_id: string,
  type: WebhookTypes,
  sim_card_id: null|string
}
