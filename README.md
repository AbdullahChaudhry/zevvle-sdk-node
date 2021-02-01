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
import { zevvle } from 'zevvle-sdk-node'
const zev = new zevvle(`${ZEVVLE_KEY}`)

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

- [createWebhook](#createwebhook)
- [deleteWebhook](#deletewebhook)
- [getAccount](#getaccount)
- [getCallRecord](#getcallrecord)
- [getCharge](#getcharge)
- [getNonGeoPricing](#getnongeopricing)
- [getPricing](#getpricing)
- [getSim](#getsim)
- [getUser](#getuser)
- [listCallRecords](#listcallrecords)
- [listCharges](#listcharges)
- [listSimCards](#listsimcards)
- [listWebhooks](#listwebhooks)
- [logout](#logout)

## Constructors

### constructor

\+ **new zevvle**(`key`: *string*, `url?`: *string*): [*zevvle*]()

Initialises the SDK.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Your Zevvle API key.   |
`url?` | *string* | (optional) The Zevvle API URL.    |

**Returns:** [*zevvle*]()

## Methods

### createWebhook

▸ **createWebhook**(`url`: *string*, `simCardId?`: *string*, `type?`: DATA\_CREATED \| VOICE\_CREATED \| SMS\_CREATED \| MMS\_CREATED \| CHARGE\_CREATED \| NULL): *Promise*<WebhookResponseModel\>

Create a webhook.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | *string* | The URL to send notifications to. Must be HTTPS.   |
`simCardId?` | *string* | (optional) ID of SIM card to receive notifications for.   |
`type?` | DATA\_CREATED \| VOICE\_CREATED \| SMS\_CREATED \| MMS\_CREATED \| CHARGE\_CREATED \| NULL | The matching event type (data.created, voice.created, sms.created, mms.created, charge.created, null)   |

**Returns:** *Promise*<WebhookResponseModel\>

___

### deleteWebhook

▸ **deleteWebhook**(`webhookId`: *string*): *Promise*<*any*\>

Delete a webhook

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`webhookId` | *string* | Webhook ID   |

**Returns:** *Promise*<*any*\>

void

___

### getAccount

▸ **getAccount**(`accountId`: *string*): *Promise*<AccountModel\>

Looks up Zevvle account.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`accountId` | *string* | ID of the Zevvle account.   |

**Returns:** *Promise*<AccountModel\>

Zevvle account details.

___

### getCallRecord

▸ **getCallRecord**(`callRecordId`: *string*): *Promise*<CallRecordModel\>

Looks up Zevvle call record.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callRecordId` | *string* | ID of the Zevvle record to look up.   |

**Returns:** *Promise*<CallRecordModel\>

Zevvle call record details.

___

### getCharge

▸ **getCharge**(`chargeId`: *string*): *Promise*<ChargeModel\>

Looks up a charge.

#### Parameters:

Name | Type |
------ | ------ |
`chargeId` | *string* |

**Returns:** *Promise*<ChargeModel\>

The details of a charge.

___

### getNonGeoPricing

▸ **getNonGeoPricing**(`phoneNumber`: *string*): *Promise*<NonGeoPricingModel\>

Get pricing for Non-Geographic numbers.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`phoneNumber` | *string* |     |

**Returns:** *Promise*<NonGeoPricingModel\>

___

### getPricing

▸ **getPricing**(`originIso3?`: *string*, `destinationIso3?`: *string*): *Promise*<PricingModel\>

Get pricing for any country, or between 2 countries.

#### Parameters:

Name | Type |
------ | ------ |
`originIso3?` | *string* |
`destinationIso3?` | *string* |

**Returns:** *Promise*<PricingModel\>

Pricing for a country, or between 2 countries

___

### getSim

▸ **getSim**(`simId`: *string*): *Promise*<SIMCardModel\>

Looks up a Zevvle SIM card.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`simId` | *string* | ID of the Zevvle SIM card to look up.   |

**Returns:** *Promise*<SIMCardModel\>

Zevvle SIM card details.

___

### getUser

▸ **getUser**(`userId`: *string*): *Promise*<UserModel\>

Looks up Zevvle user.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`userId` | *string* | ID of Zevvle user to look up.   |

**Returns:** *Promise*<UserModel\>

Zevvle user details.

___

### listCallRecords

▸ **listCallRecords**(`simId`: *string*, `type?`: DATA \| VOICE \| SMS \| MMS, `limit?`: *string*, `before?`: *null* \| *string*, `after?`: *null* \| *string*): *Promise*<CallRecordModel[]\>

List call records for a given Zevvle SIM ID, according to filtering.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`simId` | *string* | - | - |
`type?` | DATA \| VOICE \| SMS \| MMS | - | (optional) Call record type (data, voice, sms, mms) to filter on.   |
`limit` | *string* | "" | (optional) How many records to limit the results to.   |
`before` | *null* \| *string* | null | Limit results to records before a given datetime.   |
`after` | *null* \| *string* | null | Limit results ot records after a given datetime.   |

**Returns:** *Promise*<CallRecordModel[]\>

Call records for the given query.

___

### listCharges

▸ **listCharges**(`limit?`: *string*, `before?`: *null* \| *string*, `after?`: *null* \| *string*): *Promise*<ChargeModel[]\>

List all charges linked to the Zevvle API key.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`limit` | *string* | "" | (optional) How many charges to limit the results to.   |
`before` | *null* \| *string* | null | Limit results to charges before a given datetime.   |
`after` | *null* \| *string* | null | Limit results of charges after a given datetime.   |

**Returns:** *Promise*<ChargeModel[]\>

A list of charges for your account.

___

### listSimCards

▸ **listSimCards**(): *Promise*<SIMCardModel[]\>

List all SIM cards linked to the Zevvle API key.

**Returns:** *Promise*<SIMCardModel[]\>

SIM cards for the API key in use.

___

### listWebhooks

▸ **listWebhooks**(`simCardId?`: *string*): *Promise*<WebhookResponseModel[]\>

List webhooks.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`simCardId?` | *string* | (optional) SIM card to retrieve the webhooks for. Defaults to all your webhooks   |

**Returns:** *Promise*<WebhookResponseModel[]\>

A list of webhooks

___

### logout

▸ **logout**(): *Promise*<*any*\>

Logout and destroy your token.

**Returns:** *Promise*<*any*\>

## Contributions

Contributions are welcome : )
