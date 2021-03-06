import { expect, assert } from 'chai'
import nock from 'nock'

import { Zevvle } from '../src/index'
import { ErrorMessages } from '../src/models/errorMessages'

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

const { 
  apiKeyError,
  nonGeoNumberError,
  accountIdError,
  chargeIdError,
  userIdError,
  simIdError,
  recordIdError,
  webhookUrlError,
  webhookIdError
 } = ErrorMessages

const apiKey: string = "key_XXXXXXXXXXXXXXXXXXXXXXXX"
const userId: string = 'user_XXXXXXXXXXXXXXXXXXXXXXXX'
const accountId: string = 'acc_XXXXXXXXXXXXXXXXXXXXXXXX'
const firstSIMCardId: string = 'sim_XXXXXXXXXXXXXXXXXXXXXXXX'
const url: string = 'https://api.zevvle.com'

const zev = new Zevvle(apiKey, url)

describe('Constructor', () => {
  it('should throw an error if API key is empty', async () => {
    try {
      // @ts-ignore
      let zev = new Zevvle()
    } catch (err) {
      expect(err.message).to.equal(apiKeyError)
      return
    }

    assert.fail(null, null, `expected an error to be thrown`)
  })
})

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
})

describe('Non-Geographic Pricing', () => {
  beforeEach(() => {
    nock(url)
      .get(`/non_geographic/118118`)
      .reply(200, nonGeoPricingResponse)
  })

  it('should return non-geographic pricing', async () => {
    let response = await zev.getNonGeoPricing("118118")

    expect(response).to.deep.equal(nonGeoPricingResponse)
  })

  it('should throw an error if non-geographic number is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let nonGeoPricing = zev.getNonGeoPricing()
    } catch (err) {
      expect(err.message).to.equal(nonGeoNumberError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
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

  it('should throw an error if account id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getAccount()
    } catch (err) {
      expect(err.message).to.equal(accountIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
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

  it('should return a list of charges before a timestamp with a limit', async () => {
    let limit = "1"
    let response = await zev.listCharges(limit, beforeTimestamp)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should return a list of charges after a timestamp', async () => {
    let response = await zev.listCharges(null, null, afterTimestamp)

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return a list of charges after a timestamp with a limit', async () => {
    let response = await zev.listCharges(limit, null, afterTimestamp)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should return a list of charges before a timestamp AND after a timestamp', async () => {
    let response = await zev.listCharges(null, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return a list of charges before a timestamp AND after a timestamp with a limit', async () => {
    let response = await zev.listCharges(limit, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(chargeResponse)
  })

  it('should throw an error if charge id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getCharge()
    } catch (err) {
      expect(err.message).to.equal(chargeIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
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

  it('should throw an error if user id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getUser()
    } catch (err) {
      expect(err.message).to.equal(userIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
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

  it('should return the details of a SIM card', async () => {
    let response = await zev.getSim(firstSIMCardId)

    expect(response).to.deep.equal(simCardResponse)
  })

  it('should return an array of SIM cards', async () => {
    let response = await zev.listSimCards()

    expect(response).to.deep.equal(listSimCardsResponse)
  })

  it('should throw an error if sim id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getSim()
    } catch (err) {
      expect(err.message).to.equal(simIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
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

  it('should return a list of call records for a SIM card before a timestamp with a limit', async () => {
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

  it('should return a list of call records for a SIM card before a timestamp AND after a timestamp with a limit', async () => {
    let response = await zev.listCallRecords(firstSIMCardId, null, limit, beforeTimestamp, afterTimestamp)

    expect(response).to.deep.equal(callRecordResponse)
  })

  it('should throw an error if call record id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.getCallRecord()
    } catch (err) {
      expect(err.message).to.equal(recordIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if sim id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.listCallRecords()
    } catch (err) {
      expect(err.message).to.equal(simIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
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

  it('should throw an error if webhook id is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.deleteWebhook()
    } catch (err) {
      expect(err.message).to.equal(webhookIdError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })

  it('should throw an error if webhook url is empty', async () => {
    try {
      let zev = new Zevvle(apiKey)

      // @ts-ignore
      let account = zev.createWebhook()
    } catch (err) {
      expect(err.message).to.equal(webhookUrlError)
      return
    }

    assert.fail(null, null, 'expected an error to be thrown')
  })
})
