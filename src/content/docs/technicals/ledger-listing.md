---
title: Ledger Listing
description: How ORD.NET signs listing PSBTs when the seller's ordinals wallet is a Ledger imported into Xverse.
sidebar:
  order: 2
---

[ORD.NET](https://ord.net) requires registering a seller-controlled 2-of-2 passthrough policy on the Ledger device for a [sniping protected](/technicals/sale-psbt-construction/) trading experience.

Once the policy is registered, the seller can list inscriptions held on the Ledger while connected as an Xverse wallet that imports that same Ledger account. Xverse signs `TX1` (transfer) and Ledger signs `TX2` (settlement) and `TX3` (recovery) against the registered policy.

## Wallet Policy

The policy lets the seller unilaterally recover the inscription at any time, and requires both the seller and [ORD.NET](https://ord.net) to co-sign the sale.

Ledger registers the policy as `ORD.NET Passthrough Policy`:

```text
tr(@0/**, multi_a(2,@1/**, @2/**))
```

- `@0` seller key-path key (Ledger account `m/86'/0'/n'`)
- `@1` seller script-path key (Ledger account `m/86'/0'/(n+1)'`)
- `@2` [ORD.NET](https://ord.net) co-signer key-info:

  ```text
  [52266fd1/86'/0'/0']xpub6D1FCxdiqLnCTPXY8ddYjjms3dvnLeD7zNtNPCXG9cKW2A7bdAR5fkjz5Mhzxm85cQX2VKuPAaBoiQuBXWLWJwsiSjgxQ3cKbVGqkpzNre2
  ```

This key-info derives the [ORD.NET](https://ord.net) public key used in the tapscript:

```text
d2dc3222298e2a5f4e1c7d702fae2bcf7821cc0a095a478b95c62195b0df7398
```
