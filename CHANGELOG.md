# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-01

### Added

- **GitHub Social Fee Claim monitoring** — real-time detection of `claim_social_fee_pda` transactions on the PumpFees program
- **First-time claim detection** — persistent tracking with `🚨 FIRST TIME CLAIM` banners
- **Fake claim detection** — identifies instructions called with no actual payout
- **SocialFeeIndex** — bootstraps ~148K SharingConfig → mint mappings for instant token resolution
- **GitHub enrichment** — user profiles, followers, repos, account age via GitHub API
- **X/Twitter enrichment** — follower counts and influencer tier badges
- **PumpFun enrichment** — token metadata, market cap, curve progress, creator profiles
- **Groq AI summaries** — one-liner token descriptions via Groq API
- **Token graduation cards** — rich cards for tokens graduating from bonding curve to PumpAMM
- **Rich HTML Telegram cards** — emoji-rich, section-based card formatting
- **Trading affiliate links** — Axiom, GMGN, Padre with configurable ref codes
- **Multi-RPC failover** — round-robin rotation with automatic fallback on 429/5xx/timeout
- **WebSocket + HTTP polling** — dual-mode transaction monitoring
- **Persistent claim tracking** — survives restarts via debounced disk persistence
- **Docker support** — multi-stage build with non-root user and volume mounts
- **Railway deployment** — one-click deploy with pre-configured `railway.json`
- **Health check endpoint** — HTTP server for container orchestration liveness probes
- **Configurable feeds** — toggle claims, graduations, launches, whales, fee distributions
- **Web dashboard** — React + Vite frontend with live event streaming
