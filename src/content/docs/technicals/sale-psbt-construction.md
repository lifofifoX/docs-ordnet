---
title: Sale PSBT Construction
description: How ORD.NET constructs seller-controlled sale PSBTs using 2-of-2 passthrough outputs, recovery transactions, and anchor UTXOs.
sidebar:
  order: 1
---

[ORD.NET](https://ord.net) sale transactions are snipe protected and fully self custodial.

To achieve this, [ORD.NET](https://ord.net) assigns anchor UTXOs to every listing and sale, built around a seller-controlled 2-of-2 passthrough output shared between the seller and [ORD.NET](https://ord.net).

## Listing

When a seller lists an inscription for sale, [ORD.NET](https://ord.net) collects three PSBT
signatures from the seller:

- `TX1` moves the inscription from the seller wallet into the 2-of-2 passthrough output.
- `TX2` spends the passthrough output as part of the sale transaction.
- `TX3` is a presigned recovery transaction that spends the passthrough output back to the seller.

### Sale path

The seller signs `TX2` with `SIGHASH_SINGLE | SIGHASH_ANYONECANPAY`, which locks in the seller
payment and the exact amount they will receive. That payment cannot be changed without invalidating
the signature.

This is similar to how inscription sale PSBTs have worked historically. The difference is that
[ORD.NET](https://ord.net) also signs the inscription input with `SIGHASH_DEFAULT`, which commits to
the full sale transaction. That locks in the remaining inputs and outputs, preventing the seller
signature from being reused in a different transaction and blocking mempool RBF sniping.

Neither buyer nor seller has to trust [ORD.NET](https://ord.net) with custody or pricing. The
seller's signature enforces the payment amount, and [ORD.NET](https://ord.net)'s signature enforces
the finality of the sale transaction.

### Recovery path

If the buyer cancels the sale transaction before it is broadcast, [ORD.NET](https://ord.net)
automatically RBFs `TX1` by spending the anchor UTXO assigned to the listing, invalidating the
transfer before the inscription moves into the passthrough output.

`TX3` exists to make recovery easy in an unlikely worst-case scenario.

## Sale

When a buyer purchases an inscription, [ORD.NET](https://ord.net) constructs the sale transaction
using the inscription output from the seller's `TX1`.

The sale transaction must include the intended seller payment so that it satisfies the seller's
`SIGHASH_SINGLE | SIGHASH_ANYONECANPAY` signature conditions.

[ORD.NET](https://ord.net) signs the inscription input with `SIGHASH_DEFAULT`, committing to the
complete transaction. This means the seller payment, buyer inputs, buyer outputs, and sale structure
are all fixed before broadcast.

[Example sale transaction](https://mempool.space/tx/0f2f22ed557359039a80620bb5d559f3bc2b982f1b03ddfc771668d115a1ce40).

**`TX1` — listing transaction:**

<img
  src="/images/technicals/ord-listing.png"
  alt="Inputs and outputs for the ORD.NET listing transaction"
  style="display: block; width: 100%; height: auto;"
/>

**`TX2` — sale transaction:**

<img
  src="/images/technicals/ord-sale.png"
  alt="Inputs and outputs for an example ORD.NET sale transaction on mempool.space"
  style="display: block; width: 100%; height: auto;"
/>

The buyer only signs the final sale transaction. As a result, the buyer can purchase one inscription
or sweep multiple inscriptions with a single transaction signature flow.

## Anchor UTXOs

[ORD.NET](https://ord.net) includes anchor UTXOs in the seller's `TX1` so the inscription can move
from the seller wallet into the 2-of-2 passthrough output at the minimum mempool relay fee rate of
`0.1 sat/vB`.

The change output from `TX1`, plus an additional anchor UTXO in the sale transaction, act as bump
UTXOs. This removes any buyer wallet preparation step, since the buyer doesn't need to provide bump
UTXOs.

## Passthrough Tapscript

The taproot descriptor for the passthrough output:

```text
tr(
  <seller_pubkey>,
  multi_a(2, <seller_pubkey>, <ordnet_pubkey>)
)
```

[ORD.NET](https://ord.net) public key:

```text
d2dc3222298e2a5f4e1c7d702fae2bcf7821cc0a095a478b95c62195b0df7398
```

**Key path spend:** the seller can **unilaterally spend** the output through the taproot key path
using the seller public key.

**Script path spend:** the intended sale path is the taproot script path. This requires signatures
from both the seller and [ORD.NET](https://ord.net). This is the coordinated sale path used when a
buyer purchases the inscription.
