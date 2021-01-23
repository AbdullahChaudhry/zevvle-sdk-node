# zevvle-sdk-node
The unofficial Node library and SDK for the [Zevvle](https://zevvle.com/) API.

You can grab a SIM card from them and get hacking with the docs available [here](https://docs.zevvle.com/).

To get an API key, sign in [here](https://developers.zevvle.com/)

## Installation

Now [published on npm](https://www.npmjs.com/package/zevvle-sdk-node)!

Yarn

```js
yarn add zevvle-sdk-node
```

Npm

```javascript
npm install zevvle-sdk-node
```



## Usage

### As an import

```js
import { zevvle } from 'zevvle-sdk-node'

zev = new zevvle(`${ZEVVLE_KEY}`)

zev.listSimCards().then(result => {
  console.log(result)
})
```

### As a CLI tool

1. Create a `.env` file in the repository directory with the folowing:

```
ZEVVLE_KEY="YOUR_ZEVVLE_SECRET_API_KEY"
```

2. Run `zevvle -h` to get usage instructions

## Contributions

Contributions are welcome : )
