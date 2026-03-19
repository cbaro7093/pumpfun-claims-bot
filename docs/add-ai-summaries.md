# Add AI-Written Summaries to Every Claim Card

> **Time needed:** 5 minutes. You only need to add one variable to Railway.

By default, the bot posts claim cards with stats and profile info. When you add a **Groq API key**, the bot automatically adds an AI-generated one-liner to each card — a short, punchy sentence about the developer or the token.

Example of a card without AI:
```
👤 @torvalds · 132K followers · 41 repos
💰 12.4 SOL claimed
🪙 Token: $LINUX
```

Example of the same card with AI:
```
👤 @torvalds · 132K followers · 41 repos
💰 12.4 SOL claimed
🪙 Token: $LINUX
✨ The creator of Linux just collected their first PumpFun bag. We're in the endgame now.
```

---

## Step 1 — Get a Free Groq API Key

Groq is an AI service that runs fast inference. They have a free tier that's more than enough for this bot.

1. Go to [console.groq.com](https://console.groq.com)
2. Click **Sign Up** (Google or GitHub login works)
3. Once in the dashboard, click **API Keys** in the left sidebar
4. Click **"Create API Key"**
5. Give it any name, e.g. `pumpfun-bot`
6. Copy the key — it starts with `gsk_`

> ⚠️ Like the GitHub token, Groq only shows you this key once. Save it somewhere safe.

---

## Step 2 — Add the Key to Railway

1. Go to your Railway project at [railway.app](https://railway.app)
2. Click on the `pumpfun-claims-bot` service
3. Click the **"Variables"** tab
4. Click **"+ New Variable"**
5. Name: `GROQ_API_KEY`
6. Value: paste your `gsk_...` key
7. Click the checkmark to save

Railway automatically redeploys the service when you save a variable — no manual deploy needed.

---

## Step 3 — Verify It's Working

In the **Logs** tab, within the next minute you should see something like:

```
[INFO] Groq one-liner generated for @some_dev (128ms)
```

If you see a Groq error instead:

```
[WARN] Groq API error: 401 Unauthorized
```

Your key is wrong. Go back to [console.groq.com](https://console.groq.com) → API Keys and copy it again.

---

## That's It

The bot now generates a unique AI line for every claim card. Groq's free tier allows thousands of requests per day — you won't hit the limit.

If you ever want to turn it off, just delete the `GROQ_API_KEY` variable from Railway and the bot will go back to cards without AI summaries.
