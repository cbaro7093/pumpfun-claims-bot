# First GitHub Claims Only

This bot posts **one thing**: the very first time a GitHub user ever claims their social fee PDA on-chain.

Not the first claim we happen to witness. Not the first claim since the last deployment. The **first ever** — meaning no prior claim transaction for that GitHub user ID exists anywhere on Solana.

---

## What "First Ever" Means

Every `claim_social_fee_pda` transaction carries two values:

| Field | Meaning |
|---|---|
| `amountLamports` | SOL claimed in this specific transaction |
| `lifetimeClaimedLamports` | Total SOL ever claimed by this PDA across all time |

If `lifetime == amount`, this is definitively the first claim that has ever been made from this PDA on-chain. No previous transaction can exist.

If `lifetime > amount`, the user has claimed before. We skip it.

This comparison is computed from on-chain data emitted in the transaction logs via the `SocialFeePdaClaimed` event. It is not a guess, not a local counter, and not dependent on how long the bot has been running.

---

## What Gets Posted vs. Skipped

| Condition | Action |
|---|---|
| `lifetime == amount` and user not locally known | **Post** — confirmed first ever claim |
| `lifetime > amount` | Skip — user has claimed before |
| No lifetime data available | Skip — cannot verify; do not post |
| User already in local persistence | Skip — already posted, prevent duplicates |
| Fake claim (no `SocialFeePdaClaimed` event emitted) | Skip — transaction did not result in a real claim |
| GitHub account has 0 public repos | Skip — unverifiable developer account |

The rule is strict: **if we cannot confirm it is the first ever on-chain, we do not post it.**

---

## Why On-Chain Data Is the Source of Truth

Local persistence (`data/github-first-claims.json`) only records users the bot has already posted. It does not know about claims that happened before the bot was deployed, or during periods when the bot was offline.

Relying solely on local state would cause false "FIRST CLAIM" alerts after every redeployment or after being offline when a user made their first claim. The on-chain `lifetimeClaimedLamports` field is immutable and always accurate regardless of the bot's history.

The logic in `src/index.ts` reflects this priority:

1. **Local dedup first** — if we already posted for this user, it's a repeat. No network call needed.
2. **On-chain verification second** — if not locally known, check `lifetime <= amount`.
3. **No data = skip** — if `lifetimeClaimedLamports` is missing, we cannot confirm first-ever and we do not post.

---

## What This Is NOT Tracking

- Repeat claims by the same user (any subsequent claim after the first is silently skipped)
- Cashback claims (`isCashback = true`) — these are user refunds, not creator activity
- Claims on other social platforms (only `socialPlatform === 2`, i.e. GitHub, is monitored)
- Wallet-level or token-level firsts — the only dimension that matters is: has this **GitHub user ID** ever claimed before?

---

## Persistence and Restarts

Confirmed first claims are written to `data/github-first-claims.json` with a 5-second debounce. This file must survive restarts (mount a persistent volume in Railway or your deployment platform) or the bot will rely entirely on on-chain verification — which still works correctly but adds a small amount of redundant lookups for users already posted.

See [railway-github-claims.md](railway-github-claims.md) for how to attach a persistent volume.

---

## Summary

> A GitHub claim is only posted if `lifetimeClaimedLamports == amountLamports` on-chain **and** the GitHub user ID has not been previously recorded in local persistence. Every other claim — repeat, fake, unverifiable, or low-signal — is silently dropped.
