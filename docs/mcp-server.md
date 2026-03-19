# MCP Server

The bot includes a built-in [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server. It exposes PumpFun on-chain data as tools that AI assistants (Claude, Cursor, VS Code Copilot, etc.) can call conversationally.

---

## Quickstart — npx (no clone needed)

```bash
npx pumpfun-claims-bot
```

This starts the MCP server in stdio mode. Add it to your AI client config and start querying immediately.

---

## Available Tools

| Tool | Description |
|------|-------------|
| `get_token_info` | Token metadata, market cap, bonding curve progress, flags (NSFW, banned, cashback) |
| `get_token_holders` | Top holders with concentration metrics |
| `get_token_trades` | Recent trade activity — volume, buy/sell counts |
| `get_pool_liquidity` | PumpSwap AMM pool liquidity for graduated tokens |
| `get_bundle_info` | Bundle detection — scam indicator based on coordinated buys at launch |
| `get_creator_profile` | Creator launch history, estimated scam rate, recent coins |
| `get_github_user` | GitHub profile by username or numeric user ID |
| `get_claim_history` | Claim status for a GitHub user — count, mints claimed, lifetime SOL |
| `get_sol_price` | Current SOL/USD price |

---

## Transport Options

### Stdio (Claude Desktop, Cursor, VS Code)

The default and recommended option for AI desktop clients. Communication happens over stdin/stdout.

**Add to your MCP client config** (e.g. `claude_desktop_config.json` or `mcp.json`):

```json
{
  "mcpServers": {
    "pumpfun": {
      "command": "npx",
      "args": ["pumpfun-claims-bot"]
    }
  }
}
```

**Run from source:**
```bash
# Development
npm run mcp:dev

# Production
npm run build && npm run mcp
```

---

### Streamable HTTP (embedded alongside the Telegram bot)

Set `MCP_ENABLED=true` to run the MCP server on the same process as the bot:

```bash
MCP_ENABLED=true MCP_PORT=3001 npm run dev
```

The MCP endpoint is available at `POST /mcp` on the configured port. Connect with any client that supports the MCP Streamable HTTP transport.

---

## Config File Location

### Claude Desktop

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

### Cursor

Edit → Preferences → Cursor Settings → MCP, or add to `~/.cursor/mcp.json`.

### VS Code Copilot

Add to `.vscode/mcp.json` in your project, or to `~/.vscode/mcp.json` globally.

---

## Example Queries

Once connected, ask your AI assistant:

- *"Look up token info for mint 7xKXt...p3Bz"*
- *"Has GitHub user ID 12345 ever claimed PumpFun fees?"*
- *"Who are the top holders of this token and how concentrated is ownership?"*
- *"Check if this token launch was bundled"*
- *"What's the current SOL price?"*
- *"Show me the creator's launch history and scam estimate"*
- *"What's the pool liquidity for this graduated token?"*

---

## Environment Variables

No environment variables are required for the MCP server in stdio mode — it connects to public Solana RPC and PumpFun API endpoints by default.

To use a dedicated RPC (recommended for reliability):

```json
{
  "mcpServers": {
    "pumpfun": {
      "command": "npx",
      "args": ["pumpfun-claims-bot"],
      "env": {
        "SOLANA_RPC_URL": "https://mainnet.helius-rpc.com/?api-key=YOUR_KEY"
      }
    }
  }
}
```

---

## Troubleshooting

**Tool calls return no data**
- Check your Solana RPC URL is valid and not rate-limited
- Set `LOG_LEVEL=debug` in the env block to see request details

**Client says "server not found" or fails to connect**
- Verify the `command` path is correct — `npx` must be in your PATH
- Test by running `npx pumpfun-claims-bot` directly in a terminal

**Streamable HTTP: connection refused**
- Confirm `MCP_ENABLED=true` and check `MCP_PORT` isn't blocked
- The endpoint is `POST http://localhost:3001/mcp` by default
