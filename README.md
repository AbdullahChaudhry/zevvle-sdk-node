# zevvle-sdk-node

The unofficial Node library and SDK for the [Zevvle](https://zevvle.com/) API.

[![npm](https://img.shields.io/npm/v/zevvle-sdk-node)](https://www.npmjs.com/package/zevvle-sdk-node)


## Prerequisites

You can grab a SIM card from them and get hacking with the docs available [here](https://docs.zevvle.com/).

To get an API key, sign in [here](https://developers.zevvle.com/)


## Installation

Yarn:

```js
yarn add zevvle-sdk-node
```

Npm:

```javascript
npm install zevvle-sdk-node
```

## Usage

### As an import

```js
import { Zevvle } from 'zevvle-sdk-node'
const zev = new Zevvle(`${ZEVVLE_KEY}`)

async function listSimCards() => {
  try {
    const simCards = await zev.listSimCards()
    console.log(simCards)
  } catch (err) {
    console.error(err)
  }
}
```

## API

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [logout](#logout)
- [getPricing](#getpricing)
- [getNonGeoPricing](#getnongeopricing)
- [getAccount](#getaccount)
- [getCharge](#getcharge)
- [listCharges](#listcharges)
- [getUser](#getuser)
- [getSim](#getsim)
- [listSimCards](#listsimcards)
- [getCallRecord](#getcallrecord)
- [listCallRecords](#listcallrecords)
- [createWebhook](#createwebhook)
- [listWebhooks](#listwebhooks)
- [deleteWebhook](#deletewebhook)

## Constructors

### constructor

\+ **new Zevvle**(`key`: *string*, `url?`: *string*): Zevvle

Initialises the SDK.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`key` | *string* | - | Your Zevvle API key.   |
`url` | *string* | https<nolink>://api.zevvle.com | (optional) The Zevvle API URL.   |

**Returns:** Zevvle instance.

## Methods

### logout

▸ **logout**(): *Promise*<ResponseModel\>

Logout and destroy your token.

**Returns:** Response message.

___

### getPricing

▸ **getPricing**(`originIso3?`: *string*, `destinationIso3?`: *string*): *Promise*<PricingModel\>

Get pricing for any country, or between 2 countries.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`originIso3?` | *string* | (optional) Origin country. Defaults to GBR.   |
`destinationIso3?` | *string* | (optional) Destination country. Defaults to originIso3.   |

**Returns:** Pricing for a country, or between 2 countries.

___

### getNonGeoPricing

▸ **getNonGeoPricing**(`phoneNumber`: *string*): *Promise*<NonGeoPricingModel\>

Get pricing for Non-Geographic numbers.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`phoneNumber` | *string* | A non-geographic number.   |

**Returns:** Pricing for a non-geographic number.

___

### getAccount

▸ **getAccount**(`accountId`: *string*): *Promise*<AccountModel\>

Looks up Zevvle account.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`accountId` | *string* | ID of the Zevvle account.   |

**Returns:** Zevvle account details.

___

### getCharge

▸ **getCharge**(`chargeId`: *string*): *Promise*<ChargeModel\>

Looks up a charge.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`chargeId` | *string* | ID of the charge.   |

**Returns:** The details of a charge.

___

### listCharges

▸ **listCharges**(`limit?`: *string*, `before?`: *string*, `after?`: *string*): *Promise*<ChargeModel[]\>

List all charges linked to the Zevvle API key.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`limit?` | *string* | (optional) Limit the number of records; default 10, maximum 100.   |
`before?` | *string* | (optional) Get records before an RFC 3339-encoded timestamp or record id.   |
`after?` | *string* | (optional) Get records after an RFC 3339-encoded timestamp or record id.   |

**Returns:** A list of charges for your account.

___

### getUser

▸ **getUser**(`userId`: *string*): *Promise*<UserModel\>

Looks up Zevvle user.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`userId` | *string* | ID of Zevvle user to look up.   |

**Returns:** Zevvle user details.

___

### getSim

▸ **getSim**(`simId`: *string*): *Promise*<SIMCardModel\>

Looks up a Zevvle SIM card.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`simId` | *string* | ID of the Zevvle SIM card to look up.   |

**Returns:** Zevvle SIM card details.

___

### listSimCards

▸ **listSimCards**(): *Promise*<SIMCardModel[]\>

List all SIM cards linked to the Zevvle API key.

**Returns:** SIM cards for the API key in use.

___

### getCallRecord

▸ **getCallRecord**(`recordId`: *string*): *Promise*<CallRecordModel\>

Looks up Zevvle call record.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`recordId` | *string* | ID of the Zevvle record to look up.   |

**Returns:** Zevvle call record details.

___

### listCallRecords

▸ **listCallRecords**(`simId`: *string*, `type?`: *string*, `limit?`: *string*, `before?`: *string*, `after?`: *string*): *Promise*<CallRecordModel[]\>

List call records for a given Zevvle SIM ID, according to filtering.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`simId` | *string* | ID of the Zevvle SIM card to look up.   |
`type?` | *string* | (optional) Call record type (data, voice, sms, mms) to filter on.   |
`limit?` | *string* | (optional) Limit the number of records; default 10, maximum 100.   |
`before?` | *string* | (optional) Get records before an RFC 3339-encoded timestamp or record id.   |
`after?` | *string* | (optional) Get records after an RFC 3339-encoded timestamp or record id.   |

**Returns:** Call records for the given query.

___

### createWebhook

▸ **createWebhook**(`url`: *string*, `simCardId?`: *string*, `type?`: *string*): *Promise*<WebhookResponseModel\>

Create a webhook.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | *string* | The URL to send notifications to. Must be HTTPS.   |
`simCardId?` | *string* | (optional) ID of SIM card to receive notifications for. If empty will default to all SIM cards.   |
`type?` | *string* | (optional) The matching event type (data.created, voice.created, sms.created, mms.created, charge.created, null)   |

**Returns:** A webhook response.

___

### deleteWebhook

▸ **deleteWebhook**(`webhookId`: *string*): *Promise*<*any*\>

Delete a webhook

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`webhookId` | *string* | Webhook ID.   |

**Returns:** Response message.

___

### listWebhooks

▸ **listWebhooks**(`simCardId?`: *string*): *Promise*<WebhookResponseModel[]\>

List webhooks.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`simCardId?` | *string* | (optional) SIM card to retrieve the webhooks for. Defaults to all your webhooks.   |

**Returns:** A list of webhooks.


## Contributions

Contributions are welcome : )
