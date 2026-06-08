---
title: "F◉UNDRY Ordinals Launchpad"
description: "Learn how F◉UNDRY works as ◉RD's permissionless Ordinals launchpad for verified collections."
sidebar:
  order: 5
---

F◉UNDRY is ◉RD's premier, permissionless distribution system/launchpad for verified Ordinals collections.

[Foundry](https://ord.net/foundry) allows for any user with at least 10 Ordinals from the same verified collection to utilize our distribution system for others to mint Ordinals. In essence, Foundry is an easy-to-use self-service launchpad, requiring nothing more than a pre-inscribed, verified collection on ◉RD.

## Key Features

Foundry is a unique, first-of-its-kind distribution system for Ordinals. Features include:

- Self-custodial
- Pre-inscribed Ordinals only
- Randomized mint; mint never revealed prior to broadcast
- No sniping
- Up to 3 mint stages
- Bulk mint allocations (up to 8) into different wallets
- Pay with any wallet

For example, if a minter has 8 allocations across profile wallets in a FCFS stage, they can mint all 8 allocations at once with a single payment transaction.

## Stages

Mints can be carried out in up to 3 stages (e.g., Allowlist/FCFS/Public), each with its own price, including free, if desired.

For allowlist and FCFS stages, creators will input values from a `.csv` with eligible Bitcoin addresses and mint count per address in each row. The allowlist stage will show the allocation amount (i.e., over- or under-allocated) for full transparency.

For priced mints, funds from each minted inscription, less fees, will be directly received to the payment address associated with the wallet holding the minted collection.

Foundry mints are exclusively from verified collections on ◉RD. Thus, trading is always live.

## Fees

Regardless of mint price (even if free), minters will always only pay a 2000 sats service fee per minted inscription.

Creators "pay" a variable service fee based on mint price, which is directly taken from the mint price. The breakdown is as follows:

- Price <= 1000 sats: 0 fee
- Price 1001 to 100,000 sats: 10% of full mint price
- Price > 100,000 sats: 10,000 sats + 3% of the amount above 100,000 sats

## Getting Started

To distribute your Ordinals collection using Foundry, first have a complete, verified Ordinals collection using either parent/child provenance or a gallery. Then, connect the wallet holding the Ordinals collection to be minted, and navigate to 'Foundry' on your Profile. From there, set your date/time of mint, stages, and allowlist allocations.

For larger collections (>1000 inscriptions), we recommend using a Unisat wallet for much faster transaction signing. Xverse only supports 25 PSBT's per batch, while Unisat supports 100 PSBT's per batch and processes much faster.

Please also note that if you have inscriptions with varying UTXO sizes, minters will be able to see this before broadcasting their mint transaction.
