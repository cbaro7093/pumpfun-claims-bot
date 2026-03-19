# X/Twitter Setup (Influencer Detection)

Adding X/Twitter credentials enables follower counts and influencer tier badges on claim cards.

Without this, influencer tiers rely on GitHub follower data only. With it, the bot also checks the claimer's linked X/Twitter account.

---

## What You Get

When a GitHub user has an X/Twitter profile linked, claim cards show:

```
𝕏 nichxbt · 1.2K followers
🔥 Influencer
```

Without X credentials, only GitHub followers are used for tier classification.

---

## Influencer Tiers

| Tier | Badge | X Followers | GitHub Followers |
|------|-------|-------------|------------------|
| Mega | 🔥🔥 MEGA INFLUENCER | ≥ 100K | ≥ 10K |
| Influencer | 🔥 Influencer | ≥ 10K | ≥ 1K |
| Notable | ⭐ Notable | ≥ 1K | ≥ 100 |

Either threshold (X **or** GitHub) triggers the tier. A user with 50K X followers and 50 GitHub followers still qualifies as **Influencer**.

---

## How to Get Your X Cookies

The bot uses your X session cookies to look up follower counts via the X API. You need two cookies: `auth_token` and `ct0`.

> **Important:** Use a throwaway or secondary X account, not your main account. Session cookies are sensitive.

### Steps

1. Open [x.com](https://x.com) in your browser and log in
2. Open **Developer Tools** — press `F12` or right-click → Inspect
3. Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox)
4. In the left panel, expand **Cookies** → click on `https://x.com`
5. Find the cookie named **`auth_token`** — copy its value
6. Find the cookie named **`ct0`** — copy its value

---

## Add to Your Configuration

### Railway

In your Railway project → `pumpfun-claims-bot` service → **Variables** tab:

```
X_AUTH_TOKEN=paste-your-auth_token-value-here
X_CT0_TOKEN=paste-your-ct0-value-here
```

### Local `.env`

```env
X_AUTH_TOKEN=your_auth_token_value
X_CT0_TOKEN=your_ct0_value
```

---

## Verify It's Working

In your bot logs, you should see lines like:

```
[INFO] X profile fetched: @nichxbt (1200 followers)
```

If you see errors:

```
[WARN] X profile fetch failed: 401
```

Your cookies have expired. Repeat the steps above to get fresh cookies — X sessions expire periodically.

---

## Notes

- X cookies expire after a period of inactivity or when you log out. If follower counts stop appearing, refresh your cookies.
- The bot only fetches X profiles for GitHub users who have an X/Twitter URL in their GitHub profile.
- Without X credentials, the bot gracefully falls back to GitHub-only tier classification — no errors, just no X follower data.
