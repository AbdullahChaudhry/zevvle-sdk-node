import { expect } from 'chai'
import nock from 'nock'
import { Zevvle } from '../src/index'

let missingApiKeyError: string = 'Missing API key.'
let missingNonGeoNumberError: string = 'Missing phoneNumber parameter'
let missingAccountIdError: string = 'Missing accountId parameter'
let missingChargeIdError: string = 'Missing chargeId parameter'
let missingUserIdError: string = 'Missing userId parameter'
let missingSimIdError: string = 'Missing simId parameter'
let missingCallRecordIdError: string = 'Missing callRecordId parameter'
let missingUrlError: string = 'Missing url parameter'
let missingWebhookIdError: string = 'Missing webhookId parameter'

// Missing userId parameter

import { assert } from 'chai'

import { 
  accountResponse, 
  pricingWithinResponse, 
  pricingResponse, 
  nonGeoPricingResponse, 
  logoutResponse, 
  chargesResponse, 
  chargeResponse, 
  userResponse, 
  simCardResponse,
  listSimCardsResponse,
  callRecordsResponse,
  callRecordResponse,
  webhookResponse,
  webhookListResponse,
  deleteWebhookResponse
} from './responses'

const apiKey: string = "key_XXXXXXXXXXXXXXXXXXXXXXXX"
const userId: string = 'user_XXXXXXXXXXXXXXXXXXXXXXXX'
const accountId: string = 'acc_XXXXXXXXXXXXXXXXXXXXXXXX'
const firstSIMCardId: string = 'sim_XXXXXXXXXXXXXXXXXXXXXXXX'
const url: string = 'https://api.zevvle.com'

const zev = new Zevvle(apiKey, url)

describe('Log out', () => {
  beforeEach(() => {
    nock(url)
      .delete(`/auth`)
      .reply(200, logoutResponse)
  })

  it('should logout and destroy token', async () => {
    let response = await zev.logout()

    expect(response).to.deep.equal(logoutResponse)
  })
})

describe('Pricing', () => {
  beforeEach(() => {
    nock(url)
      .get(`/pricing`)
      .reply(200, pricingWithinResponse)
      .get(`/pricing/GBR/FRA`)
      .reply(200, pricingResponse)
      .get(`/non_geographic/118118`)
      .reply(200, nonGeoPricingResponse)
  })

  it('should return pricing within a country', async () => {
    let response = await zev.getPricing()

    expect(response).to.deep.equal(pricingWithinResponse)
  })

  it('should return pricing between two countries', async () => {
    let origin: string = "GBR"
    let destination: string = "FRA"
    let response = await zev.getPricing(origin, destination)

    expect(response).to.deep.equal(pricingResponse)
  })

  it('should return non-geographic pricing', async () => {
    let response = await zev.getNonGeoPricing("118118")

    expect(response).to.deep.equal(nonGeoPricingResponse)
  })
})

describe('Accounts', () => {
  beforeEach(() => {
    nock(url)
      .get(`/accounts/${accountId}`)
      .reply(200, accountResponse)
  })

  it('should return the details of an account', async () => {
    let response = await zev.getAccount(accountId)

    expect(response).to.deep.equal(accountResponse)
  })
})

describe('Charges', () => {
  let beforeTimestamp: string = `2021-02-02T12:00:00.000Z`
  let afterTimestamp: string = `2021-01-01T12:00:00.000Z`
  let limit: string = `1`
  let chargeId: string = `ch_1XXXXXXXXXXXXXXXXXXXXXXX`

  beforeEach(() => {
    nock(url)
      .get(`/charges`)
      .reply(200, chargesResponse)

      .get(`/charges/${chargeId}`)
      .reply(200, chargeResponse)

      .get(`/charges?limit=${limit}`)
      .reply(200, chargeResponse)

      .get(`/charges?before=${beforeTimestamp}`)
      .reply(200, chargesResponse)

      .get(`/charges?limit=${limit}&before=${beforeTimestamp}`)
      .reply(200, chargeResponse)

      .get(`/charges?after=${afterTimestamp}`)
      .reply(200, chargesResponse)

      .get(`/charges?limit=${limit}&after=${afterTimestamp}`)
      .reply(200, chargeResponse)

      .get(`/charges?before=${beforeTimestamp}&after=${afterTimestamp}`)
      .reply(200, chargesResponse)

      .get(`/charges?limit=${limit}&before=${beforeTimestamp}&after=${afterTimestamp}`)
      .reply(200, chargeResponse)
  })

  it('should return the details of a charge', async () => {
    let response = await zev.getCharge(chargeId)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should return a list of charges', async () => {
    let response = await zev.listCharges()

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return a list of charges with a limit', async () => {
    let response = await zev.listCharges(limit)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should return a list of charges before a timestamp', async () => {
    let response = await zev.listCharges(null, beforeTimestamp)

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return a list of charges before a timestamp with limit', async () => {
    let limit = "1"
    let response = await zev.listCharges(limit, beforeTimestamp)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should return a list of charges after a timestamp', async () => {
    let response = await zev.listCharges(null, null, afterTimestamp)

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return a list of charges after a timestamp with limit', async () => {
    let response = await zev.listCharges(limit, null, afterTimestamp)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should return a list of charges before a timestamp AND after a timestamp', async () => {
    let response = await zev.listCharges(null, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return a list of charges before a timestamp AND after a timestamp with limit', async () => {
    let response = await zev.listCharges(limit, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(chargeResponse)
  })
})

describe('Users', () => {
  beforeEach(() => {
    nock(url)
      .get(`/users/${userId}`)
      .reply(200, userResponse)
  })

  it('should return the details of a user', async () => {
    let response = await zev.getUser(userId)

    expect(response).to.deep.equal(userResponse)
  })
})

describe('SIM Cards', () => {
  beforeEach(() => {
    nock(url)
      .get(`/sim_cards`)
      .reply(200, listSimCardsResponse)
      .get(`/sim_cards/${firstSIMCardId}`)
      .reply(200, simCardResponse)
  })

  it('should return the details for a SIM card', async () => {
    let response = await zev.getSim(firstSIMCardId)

    expect(response).to.deep.equal(simCardResponse)
  })

  it('should return an array of SIM cards', async () => {
    let response = await zev.listSimCards()

    expect(response).to.deep.equal(listSimCardsResponse)
  })
})

describe('Call Records', () => {
  let beforeTimestamp: string = `2021-02-06T12:00:00.000Z`
  let afterTimestamp: string = `2021-01-01T12:00:00.000Z`
  let limit: string = `1`
  let recordId: string = `voice_XXXXXXXXXXXXXXXXXXXXXXXX`

  beforeEach(() => {
    nock(url)
      .get(`/call_records?sim_card_id=${firstSIMCardId}`)
      .reply(200, callRecordsResponse)

      .get(`/call_records/${recordId}`)
      .reply(200, callRecordResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&limit=${limit}`)
      .reply(200, callRecordResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&before=${beforeTimestamp}`)
      .reply(200, callRecordsResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&limit=${limit}&before=${beforeTimestamp}`)
      .reply(200, callRecordResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&after=${afterTimestamp}`)
      .reply(200, callRecordsResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&limit=${limit}&after=${afterTimestamp}`)
      .reply(200, callRecordResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&before=${beforeTimestamp}&after=${afterTimestamp}`)
      .reply(200, callRecordsResponse)

      .get(`/call_records?sim_card_id=${firstSIMCardId}&limit=${limit}&before=${beforeTimestamp}&after=${afterTimestamp}`)
      .reply(200, callRecordResponse)
  })

  it('should return the details of a call record', async () => {
    let response = await zev.getCallRecord(recordId)

    expect(response).to.deep.equal(callRecordResponse)
  })

  it('should return a list of call records for a SIM card', async () => {
    let response = await zev.listCallRecords(firstSIMCardId)

    expect(response).to.deep.equal(callRecordsResponse)
  })

  it('should return a list of call records for a SIM card with a limit', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, limit)

    expect(response).to.deep.equal(callRecordResponse)
  })

  it('should return a list of call records for a SIM card before a timestamp', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, null, beforeTimestamp)

    expect(response).to.deep.equal(callRecordsResponse)
  })

  it('should return a list of call records for a SIM card before a timestamp with limit', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, limit, beforeTimestamp)

    expect(response).to.deep.equal(callRecordResponse)
  })

  it('should return a list of call records for a SIM card after a timestamp', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, null, null, afterTimestamp)

    expect(response).to.deep.equal(callRecordsResponse)
  })

  it('should return a list of call records for a SIM card after a timestamp with a limit', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, limit, null, afterTimestamp)

    expect(response).to.deep.equal(callRecordResponse)
  })

  it('should return a list of call records for a SIM card before a timestamp AND after a timestamp', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, null, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(callRecordsResponse)
  })

  it('should return a list of call records for a SIM card before a timestamp AND after a timestamp with limit', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, limit, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(callRecordResponse)
  })
})

describe('Webhooks', () => {
  let webhookUrl: string = `https://www.example.com`
  let webhookId: string = `wh_XXXXXXXXXXXXXXXXXXXXXXXX`

  beforeEach(() => {
    nock(url)
      .post(`/webhooks?sim_card_id=${firstSIMCardId}&url=${webhookUrl}`)
      .reply(200, webhookResponse)
      .get(`/webhooks?sim_card_id=${firstSIMCardId}`)
      .reply(200, webhookListResponse)
      .delete(`/webhooks/${webhookId}`)
      .reply(200, deleteWebhookResponse)
      
  })

  it('should create a webhook', async () => {
    let response = await zev.createWebhook(webhookUrl, firstSIMCardId)

    expect(response).to.deep.equal(webhookResponse)
  })

  it('should return a list of webhooks', async () => {
    let response = await zev.listWebhooks(firstSIMCardId)

    expect(response).to.deep.equal(webhookListResponse)
  })

  it('should delete a webhook', async () => {
    let response = await zev.deleteWebhook(webhookId)

    expect(response).to.deep.equal(deleteWebhookResponse)
  })
})

describe('Zevvle', () => {
  beforeEach(() => {})

  it('should throw an error if API key is empty', async () => {
    try {
      // @ts-ignore
      let zev = new Zevvle()
    } catch (err) {
      expect(err.message).to.equal(missingApiKeyError)
      return
    }

    assert.fail(null, null, `expected an error to be thrown`)
  })

  it('should throw an error if non geographic number is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let nonGeoPricing = zev.getNonGeoPricing()
    } catch (err) {
      expect(err.message).to.equal(missingNonGeoNumberError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if account id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getAccount()
    } catch (err) {
      expect(err.message).to.equal(missingAccountIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if charge id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getCharge()
    } catch (err) {
      expect(err.message).to.equal(missingChargeIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if userId is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getUser()
    } catch (err) {
      expect(err.message).to.equal(missingUserIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if simId is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getSim()
    } catch (err) {
      expect(err.message).to.equal(missingSimIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })
  
  it('should throw an error if callRecordId is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getCallRecord()
    } catch (err) {
      expect(err.message).to.equal(missingCallRecordIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if simId is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.listCallRecords()
    } catch (err) {
      expect(err.message).to.equal(missingSimIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if url is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.createWebhook()
    } catch (err) {
      expect(err.message).to.equal(missingUrlError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })
  
  it('should throw an error if webhook id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.deleteWebhook()
    } catch (err) {
      expect(err.message).to.equal(missingWebhookIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })
})
