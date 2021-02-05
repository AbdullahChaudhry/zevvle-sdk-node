import { SIMCardModel } from '../../src/models'

export const listSimCardsResponse: SIMCardModel[] = [
  {
    "id": "sim_XXXXXXXXXXXXXXXXXXXXXXXX",
    "user_id": "user_XXXXXXXXXXXXXXXXXXXXXXXX",
    "account_id": "acc_XXXXXXXXXXXXXXXXXXXXXXXX",
    "msisdn": "+44XXXXXXXXXX",
    "iccid": "XXXXXXXXXXXXXXXXXXX",
    "emoji": "🚀",
    "status": "active",
    "name": "XXXXXXX",
    "settings": {
      "sms": true,
      "mms": true,
      "data": "4G",
      "voice_geographic": true,
      "voice_mobile": true,
      "voice_non_geographic": true,
      "voicemail": true,
      "call_holding": true,
      "call_waiting": true,
      "calling_line_identity": true,
      "voice_sms_bundle": false,
      "international": "international",
      "eea_data": true,
      "eea_sms": true,
      "eea_outgoing_call": true,
      "eea_incoming_call": true,
      "row_outgoing_call": true,
      "row_incoming_call": true,
      "row_sms": true
    },
    "modifying": false,
    "activated_at": "2021-01-17T12:00:00.000Z"
  }
]
