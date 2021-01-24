import { WebhookType } from './Webhook.enum'

export interface WebhookResponseModel {
  id: string,
  url: string,
  user_id: string,
  type: WebhookType,
  sim_card_id: null|string
}
