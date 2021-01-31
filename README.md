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

## Table of contents

### Constructors

- [constructor](README.md#constructor)

### Properties

- [\_header](README.md#_header)
- [\_url](README.md#_url)

### Methods

- [\_doRequest](README.md#_dorequest)
- [createWebhook](README.md#createwebhook)
- [deleteWebhook](README.md#deletewebhook)
- [getAccount](README.md#getaccount)
- [getCallRecord](README.md#getcallrecord)
- [getCharge](README.md#getcharge)
- [getNonGeoPricing](README.md#getnongeopricing)
- [getPricing](README.md#getpricing)
- [getSim](README.md#getsim)
- [getUser](README.md#getuser)
- [listCallRecords](README.md#listcallrecords)
- [listCharges](README.md#listcharges)
- [listSimCards](README.md#listsimcards)
- [listWebhooks](README.md#listwebhooks)
- [logout](README.md#logout)

## Constructors

### constructor

\+ **new zevvle**(`key`: *string*, `url?`: *string*): [*zevvle*](README.md)

Initialises the SDK.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | *string* | Your Zevvle API key.   |
`url?` | *string* | (optional) The Zevvle API URL.    |

**Returns:** [*zevvle*](README.md)

Defined in: [index.ts:21](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L21)

## Properties

### \_header

• **\_header**: HeaderModel

Defined in: [index.ts:21](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L21)

___

### \_url

• **\_url**: *string*

Defined in: [index.ts:20](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L20)

## Methods

### \_doRequest

▸ `Private`**_doRequest**(`url`: *string*, `parameters?`: ParametersModel, `configOptions?`: *any*): *Promise*<*any*\>

Makes a request.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | *string* | The full URL of the request   |
`parameters?` | ParametersModel | (optional) Key-value pairs of parameters for the request   |
`configOptions?` | *any* | - |

**Returns:** *Promise*<*any*\>

Promise

Defined in: [index.ts:41](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L41)

___

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

Defined in: [index.ts:239](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L239)

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

Defined in: [index.ts:276](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L276)

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

Defined in: [index.ts:101](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L101)

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

Defined in: [index.ts:181](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L181)

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

Defined in: [index.ts:111](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L111)

___

### getNonGeoPricing

▸ **getNonGeoPricing**(`phoneNumber`: *string*): *Promise*<NonGeoPricingModel\>

Get pricing for Non-Geographic numbers.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`phoneNumber` | *string* |     |

**Returns:** *Promise*<NonGeoPricingModel\>

Defined in: [index.ts:90](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L90)

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

Defined in: [index.ts:73](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L73)

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

Defined in: [index.ts:162](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L162)

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

Defined in: [index.ts:151](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L151)

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

Defined in: [index.ts:196](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L196)

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

Defined in: [index.ts:124](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L124)

___

### listSimCards

▸ **listSimCards**(): *Promise*<SIMCardModel[]\>

List all SIM cards linked to the Zevvle API key.

**Returns:** *Promise*<SIMCardModel[]\>

SIM cards for the API key in use.

Defined in: [index.ts:172](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L172)

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

Defined in: [index.ts:262](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L262)

___

### logout

▸ **logout**(): *Promise*<*any*\>

Logout and destroy your token.

**Returns:** *Promise*<*any*\>

Defined in: [index.ts:63](https://github.com/AbdullahChaudhry/zevvle-sdk-node/blob/b466b2e/src/index.ts#L63)


## Contributions

Contributions are welcome : )
