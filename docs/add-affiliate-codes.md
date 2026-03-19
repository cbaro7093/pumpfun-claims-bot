# Earn Affiliate Commissions from Trading Links

> **Time needed:** 2 minutes. Just add your referral codes as Railway variables.

Every claim card the bot posts includes trading links so readers can instantly buy or trade the token. The bot supports three trading platforms — and you can add your own referral code to each one, so you earn a commission on every trade that comes from your channel.

The links look like this in every card:
```
📊 Trade: [Axiom] [GMGN] [Padre]
```

All three are fully optional. You can add one, two, or all three.

---

## Get Your Referral Codes

### Axiom

1. Go to [axiom.trade](https://axiom.trade) and connect your wallet
2. Click your profile → **Referrals**
3. Your referral code will be displayed — copy it (it's a short alphanumeric string)

### GMGN

1. Go to [gmgn.ai](https://gmgn.ai) and connect your wallet
2. Go to your profile → **Invite Friends** or **Referral**
3. Copy your referral code from the invite link

### Padre

1. Go to [padre.gg](https://padre.gg) and connect your wallet
2. Navigate to **Referrals** in your account settings
3. Copy your referral code

> Don't have accounts on these platforms yet? You can come back and add the codes later at any time.

---

## Add the Codes to Railway

1. Go to your Railway project at [railway.app](https://railway.app)
2. Click on the `pumpfun-claims-bot` service → **"Variables"** tab
3. Click **"Raw Editor"** and add whichever lines apply to you:

```
AXIOM_REF=your-axiom-code-here
GMGN_REF=your-gmgn-code-here
PADRE_REF=your-padre-code-here
```

4. Click **"Update Variables"**

Railway redeploys automatically. Within about 60 seconds, every new claim card will include your referral codes in the trading links.

---

## How Commissions Work

When someone clicks a trading link from your channel and executes a trade, the platform credits your referral account with a percentage of the trading fee. Rates vary by platform — check each platform's referral program page for current rates.

The more active your channel, the more clicks → the more commissions.

---

## Want to Check It's Working?

In your Railway logs, if the codes are loaded correctly you'll see them in the startup config log:

```
[INFO] Affiliates: axiom=your-code gmgn=your-code padre=your-code
```

If a code isn't showing up, double-check the variable name is spelled exactly as above (all caps, underscore).
