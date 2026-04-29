---
title: Creating a Collection
description: Create a collection using parent/child provenance for ord.net verification and trading review.
sidebar:
  order: 2
---

A parent/child collection uses one parent inscription to establish
[provenance](https://docs.ordinals.com/inscriptions/provenance.html) for a set of child
inscriptions. Each child is inscribed as a child of the same parent. This is the ideal method for
creating an Ordinals collection.

Parent/child collections can easily be inscribed using
[inscribe.dev](https://inscribe.dev/) tools.

## Basic process

1. Inscribe the parent
   - Create one parent inscription for the collection
   - This serves as the provenance anchor for all children
2. Prepare each child
   - Assign a title to each child (e.g., Bitcoin Puppet #1)
   - Assign traits/attributes to each child, ensuring a consistent format is used across all
     children
   - This can be accomplished using a `.json`
3. Inscribe each child to the parent
   - Inscribe every collection item as a child of the same parent inscription

## Outcome

Once complete, the collection has on-chain provenance through the parent, and each child carries
its own title and trait metadata. A collection that uses parent/child provenance properly does not
need a gallery to be verified for trading on [ord.net](https://ord.net/).
