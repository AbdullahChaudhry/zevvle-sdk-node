import axios from 'axios'
import { throwErrorIfEmpty } from './utils/helpers'
import { 
  AccountModel, 
  HeaderModel, 
  SIMCardModel, 
  CallRecordModel, 
  ParametersModel, 
  UserModel, 
  PricingModel, 
  NonGeoPricingModel, 
  ChargeModel, 
  RecordTypes, 
  WebhookTypes, 
  WebhookResponseModel,
  ResponseModel
} from './models'

export class zevvle {
  private _url: string
  private _header: HeaderModel

  /**
   * Initialises the SDK.
   * @param key Your Zevvle API key.
   * @param url (optional) The Zevvle API URL.
   */
  constructor(key: string, url: string = "https://api.zevvle.com") {
    throwErrorIfEmpty(key, "Missing API key.")

    this._url = url
    this._header = { "Authorization": `Bearer ${key}`}
  }

  /**
   * Makes a request.
   * @param url The full URL of the request
   * @param parameters (optional) Key-value pairs of parameters for the request
   * @param configOptions (optional) Configuration options for the request
   * @returns Response data.
   */
  private async _doRequest(url: string, parameters?: ParametersModel, configOptions?: any): Promise<any> {
    throwErrorIfEmpty(url, "Called without URL")

    const config = {
      headers: this._header,
      params: parameters,
      method: configOptions && configOptions.method || "get",
      url: this._url + url
    }

    const response = await axios(config)

    if (response.status === 200) {
      return response.data
    }

    throw new Error(`Request failed with error ${response.status}`)
  }

  /**
   * Logout and destroy your token.
   * @returns Response message.
   */
  logout(): Promise<ResponseModel> {
    return this._doRequest(`/auth`, {}, { method: 'delete' })
  }

  /**
   * Get pricing for any country, or between 2 countries.
   * @param originIso3 (optional) Origin country. Defaults to GBR.
   * @param destinationIso3 (optional) Destination country. Defaults to originIso3.
   * @returns Pricing for a country, or between 2 countries.
   */
  getPricing(originIso3?: string, destinationIso3?: string): Promise<PricingModel> {

    if (!originIso3) {
      return this._doRequest(`/pricing`)
    }

    if (originIso3 && !destinationIso3) {
      return this._doRequest(`/pricing/${originIso3}`)
    }

    return this._doRequest(`/pricing/${originIso3}/${destinationIso3}`)
  }

  /**
   * Get pricing for Non-Geographic numbers.
   * @param phoneNumber A non-geographic number.
   * @returns Pricing for a non-geographic number
   */
  getNonGeoPricing(phoneNumber: string): Promise<NonGeoPricingModel> {
    throwErrorIfEmpty(phoneNumber, "Missing phoneNumber parameter")

    return this._doRequest(`/non_geographic/${phoneNumber}`)
  }

  /**
   * Looks up Zevvle account.
   * @param accountId ID of the Zevvle account.
   * @returns Zevvle account details.
   */
  getAccount(accountId: string): Promise<AccountModel> {
    throwErrorIfEmpty(accountId, "Missing accountId parameter")

    return this._doRequest(`/accounts/${accountId}`)
  }

  /**
   * Looks up a charge.
   * @param chargeId ID of the charge.
   * @returns The details of a charge.
   */
  getCharge(chargeId: string): Promise<ChargeModel> {
    throwErrorIfEmpty(chargeId, "Missing chargeId parameter")

    return this._doRequest(`/charges/${chargeId}`)
  }

  /**
   * List all charges linked to the Zevvle API key.
   * @param limit (optional) How many charges to limit the results to.
   * @param before (optional) Limit results to charges before a given datetime.
   * @param after (optional) Limit results of charges after a given datetime.
   * @returns A list of charges for your account.
   */
  listCharges(
    limit: string = "", 
    before: string|null = null , 
    after: string|null = null
    ): Promise<Array<ChargeModel>> {
      const parameters: ParametersModel = {}
  
      if (limit) {
        parameters["limit"] = limit
      }

      if (before) {
        parameters["before"] = before
      }

      if (after) {
        parameters["after"] = after
      }

      return this._doRequest(`/charges`, parameters)
  }

  /**
   * Looks up Zevvle user.
   * @param userId ID of Zevvle user to look up.
   * @returns Zevvle user details.
   */
  getUser(userId: string): Promise<UserModel> {
    throwErrorIfEmpty(userId, "Missing userId parameter")

    return this._doRequest(`/users/${userId}`)
  }

  /**
   * Looks up a Zevvle SIM card.
   * @param simId ID of the Zevvle SIM card to look up.
   * @returns Zevvle SIM card details.
   */
  getSim(simId: string): Promise<SIMCardModel> {
    throwErrorIfEmpty(simId, "Missing simID parameter")

    return this._doRequest(`/sim_cards/${simId}`)
  }

  /**
   * List all SIM cards linked to the Zevvle API key.
   * @returns SIM cards for the API key in use.
   */
  listSimCards(): Promise<Array<SIMCardModel>> {
    return this._doRequest(`/sim_cards`)
  }

  /**
   * Looks up Zevvle call record.
   * @param callRecordId ID of the Zevvle record to look up.
   * @returns Zevvle call record details.
   */
  getCallRecord(callRecordId: string): Promise<CallRecordModel> {
    throwErrorIfEmpty(callRecordId, "Missing callRecordId parameter")

    return this._doRequest(`/call_records/${callRecordId}`)
  }

  /**
   * List call records for a given Zevvle SIM ID, according to filtering.
   * @param simID ID of the Zevvle SIM card to get records for.
   * @param type (optional) Call record type (data, voice, sms, mms) to filter on.
   * @param limit (optional) How many records to limit the results to.
   * @param before (optional) Limit results to records before a given datetime.
   * @param after (optional) Limit results ot records after a given datetime.
   * @returns Call records for the given query.
   */
  listCallRecords(
    simId: string, 
    type?: RecordTypes, 
    limit: string = "", 
    before: string|null = null , 
    after: string|null = null
    ): Promise<Array<CallRecordModel>> {

    const parameters: ParametersModel = {}
    throwErrorIfEmpty(simId, "Missing simId parameter")

    parameters["sim_card_id"] = simId
    
    const recordTypes = [RecordTypes.DATA, RecordTypes.VOICE, RecordTypes.SMS, RecordTypes.MMS]

    if (type && !recordTypes.includes(type)) {
      throw new Error("Invalid call record type (data, voice, sms, mms) only")
    }

    parameters["type"] = type

    if (limit) {
      parameters["limit"] = limit
    }

    if (before) {
      parameters["before"] = before
    }

    if (after) {
      parameters["after"] = after
    }

    return this._doRequest("/call_records/", parameters)
  }

  /**
   * Create a webhook.
   * @param url The URL to send notifications to. Must be HTTPS.
   * @param simCardId (optional) ID of SIM card to receive notifications for. If empty will default to all SIM cards.
   * @param type (optional) The matching event type (data.created, voice.created, sms.created, mms.created, charge.created, null)
   * @returns A webhook response
   */
  createWebhook(url: string, simCardId?: string, type: WebhookTypes|null = null): Promise<WebhookResponseModel> {
    throwErrorIfEmpty(url, "Missing url parameter")

    const parameters: ParametersModel = {}

    parameters["url"] = url

    if (simCardId) {
      parameters["sim_card_id"] = simCardId
    }

    if (type) {
      parameters["type"] = type
    }

    return this._doRequest(`/webhooks`, parameters, { method: "post"})
  }

  /**
   * List webhooks.
   * @param simCardId (optional) SIM card to retrieve the webhooks for. Defaults to all your webhooks
   * @returns A list of webhooks
   */
  listWebhooks(simCardId?: string): Promise<Array<WebhookResponseModel>> {
    const parameters: ParametersModel = {}

    if (simCardId) {
      parameters["sim_card_id"] = simCardId
    }
    return this._doRequest(`/webhooks`, parameters)
  }

  /**
   * Delete a webhook
   * @param webhookId Webhook ID
   * @returns Response message
   */
  deleteWebhook(webhookId: string): Promise<any> {
    throwErrorIfEmpty(webhookId, "Missing webhookId parameter")

    return this._doRequest(`/webhooks/${webhookId}`, {}, { method: 'delete'})
  }  
}
