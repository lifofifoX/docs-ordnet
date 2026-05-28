---
title: Collection Offers
description: How ORD.NET collection offers are trust-minimized, gated by four independent signers, and rate-limited by an immutable ICP canister.
sidebar:
  order: 3
---

Collection offers on [ORD.NET](https://ord.net) are buyer-funded standing bids for any inscription
in a collection. The design is trust-minimized: every fill must clear three independent co-signers
plus a marketplace-held secret, and the funding parent publishes the buyer's tap internal key and
tap merkle root in an `OP_RETURN` so any indexer can reconstruct the offer output for the buyer to
key-path spend if [ORD.NET](https://ord.net) is unavailable.

## Offer Tapscript

Every collection offer commits to a buyer-controlled offer tapscript:

```text
OP_0 IF
  "ordnet-offer/v2"
  <priceSats, 8 bytes LE>
  <expiresAtUnixSeconds, 8 bytes LE>
  <buyerReceiveScript>
  <eligibleRoot, 32 bytes>
  <offerCriteriaHash, 32 bytes>
ENDIF
SHA256 <offerAuthSecretHash> EQUALVERIFY
<buyerXOnlyPubkey>      CHECKSIG
<marketAuthXOnlyPubkey> CHECKSIGADD 1 NUMEQUALVERIFY
<icpGateXOnlyPubkey>    CHECKSIGVERIFY
<nitroXOnlyPubkey>      CHECKSIG
```

Price, expiry, buyer receive script, and eligibility merkle root cannot drift between what the
buyer agreed to and what a fill enforces, because changing any of them changes the offer
address.

## Four-Key Fill Gate

Spending the offer input requires:

- **Buyer or market-auth** — `CHECKSIG` + `CHECKSIGADD 1 NUMEQUALVERIFY` accepts exactly one.
  Market-auth proves [ORD.NET](https://ord.net) ran full offer policy. The buyer slot exists for
  future direct-fill flows.
- **Nitro signer** — an AWS Nitro enclave that re-derives the eligible set from the ord indexer
  and re-verifies the seller's merkle proof before signing.
- **Timelock admission gate** — an immutable Internet Computer canister that enforces a per-tier
  fill rate limit via the admission UTXO (see below).
- **Offer auth secret** — a 32-byte preimage whose hash is committed in the script. Only
  [ORD.NET](https://ord.net) holds the secret, so every fill requires
  [ORD.NET](https://ord.net) to release it.

All three signatures are bound to the same sighash by `SIGHASH_DEFAULT`, so no input, output,
amount, or sequence can be mutated after signing without invalidating one of them.

## Nitro Enclave

The Nitro signer holds its key inside an AWS Nitro enclave that runs in isolation from the
marketplace: no persistent storage, no access to the marketplace database, and an independent
connection to an ord indexer. The enclave cannot be inspected or modified at runtime, and its
attested image is reproducible from source.

It re-runs the offer policy end-to-end every fill: it rebuilds the eligible inscription set from
the ord indexer, verifies the seller's merkle proof against the committed root, re-verifies the
attached market-auth signature, and checks outputs, fees, and expiry before signing.

Nitro refuses to sign if the collection's eligible set has changed since the offer was created
(for example, a parent inscription getting a new child), if the offer has expired, or if the
settlement has been mutated.

## Tier Admission UTXOs

Every fill must spend a 333 SAT admission UTXO
[at](https://mempool.space/address/bc1puddw2z6kq0hry4tug7k472f66feddyzd0uwrrmk0f0rlksd9lelsh72j4w)
[one](https://mempool.space/address/bc1pcpm4n4czsppxnu2ka76hvsa5jmslsyzlt0t86l7sl7ch524mgnlsv5g7hs)
[of](https://mempool.space/address/bc1pj9kn02d7zqdcdsxcqxfzcyu4vlyjmw2ljz0lafnrwatcexpd6c7san920y)
[six](https://mempool.space/address/bc1pfsfghzhzcjrmkacephdrhwj7prld7g2uam598he6vk0phf5almkqcqzkjg)
[tier](https://mempool.space/address/bc1pw49ndf07engra63ld4ac45c4p6964zanhrvql9f5r8mc9ulcyhds7tm6z5)
[addresses](https://mempool.space/address/bc1plueelchsug76lecelvswu77crwjjcph8jz3e4gylyrhgt0pvkzpsagp0kn),
each gating a different price range from 0.01 BTC up to 1 BTC, with a BIP68 relative locktime
tied to the offer value. Each settlement
recycles a fresh admission UTXO back to the same tier address. The recycled UTXO
cannot be spent again until `144` blocks (~1 day) later, capping how many offers
[ORD.NET](https://ord.net) can fill per tier per day.

The cap is enforced by the ICP gate: an immutable Internet Computer canister that signs the offer
input only when the admission UTXO has the correct tier scriptPubKey, sequence, and value.

The canister's policy cannot be changed, and only the [ORD.NET](https://ord.net) anchor signer
principal can call it. To raise the fill rate per tier, [ORD.NET](https://ord.net) must fund
additional admission UTXOs at the tier address; each new UTXO is unusable until `144` blocks
after creation.

## Package Construction

The fill is a TRUC v3 1-parent-1-child package. The zero-fee funding parent moves the buyer's
payment into the offer output; the settlement child spends the offer output, the seller's
inscription, and the admission UTXO, and pays the package fee. TRUC v3 enforces the 1P1C
topology at the relay layer, preventing third-party pinning of the parent.
