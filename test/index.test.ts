import { expect } from 'chai'
import nock from 'nock'
import { Zevvle } from '../src/index'

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
  beforeEach(() => {
    nock(url)
      .get(`/charges`)
      .reply(200, chargesResponse)
      .get(`/charges/ch_1XXXXXXXXXXXXXXXXXXXXXXX`)
      .reply(200, chargeResponse)
  })

  it('should return a list of charges', async () => {
    let response = await zev.listCharges()

    expect(response).to.deep.equal(chargesResponse)
  })

  it('should return the details of a charge', async () => {
    let response = await zev.getCharge('ch_1XXXXXXXXXXXXXXXXXXXXXXX')

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
  beforeEach(() => {
    nock(url)
      .get(`/call_records?sim_card_id=${firstSIMCardId}`)
      .reply(200, callRecordsResponse)
      .get(`/call_records/voice_XXXXXXXXXXXXXXXXXXXXXXXX`)
      .reply(200, callRecordResponse)
  })

  it('should return a list of call records for a SIM card', async () => {
    let response = await zev.listCallRecords(firstSIMCardId)

    expect(response).to.deep.equal(callRecordsResponse)
  })

  it('should return the details of a call record', async () => {
    let response = await zev.getCallRecord("voice_XXXXXXXXXXXXXXXXXXXXXXXX")

    expect(response).to.deep.equal(callRecordResponse)
  })

})

describe('Webhooks', () => {
  beforeEach(() => {
    nock(url)
      .post(`/webhooks?sim_card_id=${firstSIMCardId}&url=https%3A%2F%2Fwww.example.com`)
      .reply(200, webhookResponse)
      .get(`/webhooks?sim_card_id=${firstSIMCardId}`)
      .reply(200, webhookListResponse)
      .delete(`/webhooks/wh_XXXXXXXXXXXXXXXXXXXXXXXX`)
      .reply(200, deleteWebhookResponse)
      
  })

  it('should create a webhook', async () => {
    let response = await zev.createWebhook("https://www.example.com", firstSIMCardId)

    expect(response).to.deep.equal(webhookResponse)
  })

  it('should return a list of webhooks', async () => {
    let response = await zev.listWebhooks(firstSIMCardId)

    expect(response).to.deep.equal(webhookListResponse)
  })

  it('should delete a webhook', async () => {
    let response = await zev.deleteWebhook("wh_XXXXXXXXXXXXXXXXXXXXXXXX")

    expect(response).to.deep.equal(deleteWebhookResponse)
  })
})
