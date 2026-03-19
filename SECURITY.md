# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email or DM:

- **GitHub**: Open a [private security advisory](https://github.com/nirholas/pumpfun-claims-bot/security/advisories/new)

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### What to expect

- **Acknowledgment** within 48 hours
- **Status update** within 7 days
- **Fix timeline** depends on severity — critical issues addressed immediately

## Security Best Practices

When running this bot, keep in mind:

- **Never commit `.env` files** — they contain API keys and tokens
- **Use read-only GitHub tokens** — no scopes needed for the GitHub PAT
- **Rotate X/Twitter cookies** — session cookies expire; refresh periodically
- **Use dedicated RPC endpoints** — public RPCs rate-limit aggressively
- **Run as non-root** — the Dockerfile creates a dedicated `bot` user
- **Keep dependencies updated** — run `npm audit` regularly

## Scope

This policy covers the `pumpfun-claims-bot` codebase. Third-party services (Telegram, Solana RPC providers, PumpFun API) have their own security policies.
