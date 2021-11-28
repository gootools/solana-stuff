# Solana Stuff

[Lodash](https://lodash.com/)-like utility functions and helpers for working with [Solana web3.js](https://github.com/solana-labs/solana-web3.js) projects.

Very likely to change over the coming weeks, don't rely on it for anything yet.

## Installation

`npm i @gootools/solana-stuff`

You probably want to pin it to a specific version number if you're brave enough to use this right now.

Until `0.1.0` it's going to be an extremely wild and unpredictable ride!

## Methods

### `jsonify()(DATA)`

Converts `PublicKey`s and `big.js BN`s into base58 and base10 strings respectively so that logs and JSON etc are readable.

Accepts an optional configuration object inside the first set of parentheses.
