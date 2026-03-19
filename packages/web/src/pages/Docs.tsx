import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function BotMsg({ children, time = '10:00' }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-8 h-8 rounded-full bg-tg-input flex items-center justify-center text-sm shrink-0">📖</div>
      <div className="bg-tg-bubble-in rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
        <p className="text-tg-blue text-sm font-medium mb-1">PumpKit Docs</p>
        {children}
        <span className="text-[11px] text-zinc-500 block text-right mt-1">{time}</span>
      </div>
    </div>
  )
}

function UserMsg({ children, time = '10:01' }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="bg-tg-bubble rounded-2xl rounded-br-sm max-w-[85%] ml-auto px-4 py-3">
      {children}
      <span className="text-[11px] text-zinc-500 block text-right mt-1">{time}</span>
    </div>
  )
}

const SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'architecture',    label: 'Architecture' },
  { id: 'packages',        label: 'Packages' },
  { id: 'commands',        label: 'Bot Commands' },
  { id: 'api',             label: 'API' },
  { id: 'tutorials',       label: 'Tutorials' },
  { id: 'faq',             label: 'FAQ' },
]

export default function Docs() {
  const [active, setActive] = useState('getting-started')
  const containerRef = useRef<HTMLDivElement>(null)

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div className="flex flex-col h-full">

      {/* Sticky TOC */}
      <div className="sticky top-0 z-10 bg-tg-chat/95 backdrop-blur-sm border-b border-tg-border px-4 py-2">
        <div className="flex gap-2 overflow-x-auto">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition shrink-0 ${
                active === s.id ? 'bg-tg-blue text-white' : 'bg-tg-input text-zinc-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 p-4 max-w-3xl mx-auto pb-20">

          {/* 1 – Getting Started */}
          <div id="getting-started" className="pt-2" />
          <BotMsg time="09:00">
            <p className="text-white font-bold mb-2">📖 Getting Started</p>
            <p className="text-zinc-300 text-sm leading-relaxed mb-3">
              PumpKit is an open-source TypeScript framework for building PumpFun Telegram bots on Solana.
              It provides production-ready building blocks so you can ship a bot in hours, not weeks.
            </p>
            <p className="text-zinc-400 text-xs font-semibold mb-1">Prerequisites:</p>
            <ul className="text-zinc-400 text-xs space-y-0.5 mb-3">
              <li>• Node.js ≥ 20</li>
              <li>• A Telegram Bot Token (from @BotFather)</li>
              <li>• A Solana RPC URL (Helius, Quicknode, etc.)</li>
            </ul>
            <p className="text-white text-xs font-semibold mt-3 mb-1">Quick install via npm</p>
            <div className="bg-[#1a2332] rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto mb-3">
              <p><span className="text-pump-green">$</span> npx pumpfun-claims-bot</p>
              <p className="text-zinc-500 mt-1"># or install globally</p>
              <p><span className="text-pump-green">$</span> npm install -g pumpfun-claims-bot</p>
              <p><span className="text-pump-green">$</span> pumpfun-claims-bot</p>
            </div>
            <a
              href="https://www.npmjs.com/package/pumpfun-claims-bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-tg-blue hover:underline mb-3"
            >
              📦 pumpfun-claims-bot on npm →
            </a>
            <p className="text-white text-xs font-semibold mt-2 mb-1">From source (full bot + Telegram feed)</p>
            <div className="bg-[#1a2332] rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
              <p><span className="text-pump-green">$</span> git clone https://github.com/nirholas/pumpfun-claims-bot.git</p>
              <p><span className="text-pump-green">$</span> cd pumpfun-claims-bot && npm install</p>
            </div>
          </BotMsg>

          {/* 2 – Architecture */}
          <div id="architecture" className="pt-2" />
          <BotMsg time="09:01">
            <p className="text-white font-bold mb-2">🏗️ Architecture</p>
            <div className="bg-[#1a2332] rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
              <pre>{`┌───────────────────────────────────────────────┐
│                @pumpkit/core                  │
│  bot/ • monitor/ • solana/ • formatter/       │
│  storage/ • config/ • health/ • logger/       │
└──────┬──────────────────┬─────────────────────┘
       │                  │
 ┌─────▼──────┐    ┌──────▼──────┐
 │  monitor   │    │  tracker    │
 │ DM + API   │    │ Groups +    │
 │ Channel    │    │ Leaderboard │
 └────────────┘    └─────────────┘`}</pre>
            </div>
          </BotMsg>

          {/* 3 – Packages */}
          <div id="packages" className="pt-2" />
          {[
            {
              pkg: '@pumpkit/core',
              desc: 'Shared framework: bot scaffolding, Solana monitoring, formatters, storage, config, health checks',
              features: ['Grammy bot scaffolding + command router', 'WebSocket + HTTP event monitors', 'Solana RPC client + program decoders', 'File-based + SQLite storage adapters'],
            },
            {
              pkg: '@pumpkit/monitor',
              desc: 'All-in-one PumpFun monitor: fee claims, launches, graduations, whale trades, CTO alerts',
              features: ['REST API + SSE streaming', 'Configurable thresholds', 'Webhook support', 'Railway-ready Docker image'],
            },
            {
              pkg: '@pumpkit/channel',
              desc: 'Read-only Telegram channel feed broadcasting token events',
              features: ['Zero interaction needed', 'Customizable templates', 'Filter by event type', 'Rate limiting built in'],
            },
            {
              pkg: '@pumpkit/claim',
              desc: 'Fee claim tracker: look up claims by token CA or creator X handle',
              features: ['/claim <CA>', '/creator <handle>', 'CSV export', 'Historical claim data'],
            },
            {
              pkg: '@pumpkit/tracker',
              desc: 'Group call-tracking bot with leaderboards, PNL cards, and multi-chain support',
              features: ['Daily/weekly/monthly leaderboards', 'Win rate & multiplier tracking', 'Rank tiers: Amateur → Oracle', 'Multi-chain: SOL, ETH, Base, BSC'],
            },
          ].map(p => (
            <BotMsg key={p.pkg} time="09:02">
              <p className="text-tg-blue font-bold font-mono text-sm mb-1">✅ {p.pkg}</p>
              <p className="text-zinc-300 text-xs mb-2">{p.desc}</p>
              <ul className="text-zinc-500 text-xs space-y-0.5">
                {p.features.map(f => <li key={f}>├─ {f}</li>)}
              </ul>
            </BotMsg>
          ))}

          {/* 4 – Commands */}
          <div id="commands" className="pt-2" />
          <BotMsg time="09:05">
            <p className="text-white font-bold mb-2">🤖 Monitor Bot Commands</p>
            <div className="bg-[#1a2332] rounded-lg p-3 text-xs overflow-x-auto space-y-1">
              {[
                ['/start',       'Start the bot & show welcome'],
                ['/help',        'Show all commands'],
                ['/watch CA',    'Watch a wallet for fee claims'],
                ['/unwatch CA',  'Stop watching a wallet'],
                ['/list',        'Show watched wallets'],
                ['/claims',      'Recent claim events'],
                ['/status',      'Bot health & uptime'],
                ['/alerts',      'Configure alert settings'],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-2">
                  <span className="text-pump-green font-mono w-28 shrink-0">{cmd}</span>
                  <span className="text-zinc-400">{desc}</span>
                </div>
              ))}
            </div>
          </BotMsg>

          {/* 5 – API */}
          <div id="api" className="pt-2" />
          <BotMsg time="09:06">
            <p className="text-white font-bold mb-2">📡 Monitor API Endpoints</p>
            <div className="bg-[#1a2332] rounded-lg p-3 text-xs overflow-x-auto space-y-1">
              {[
                ['GET',  '/api/v1/health',         'Bot status, uptime'],
                ['GET',  '/api/v1/watches',         'List watched wallets'],
                ['POST', '/api/v1/watches',         'Add a watch'],
                ['DEL',  '/api/v1/watches/:addr',   'Remove a watch'],
                ['GET',  '/api/v1/claims',          'Recent claims (paginated)'],
                ['GET',  '/api/v1/claims/stream',   'SSE real-time stream'],
                ['POST', '/api/v1/webhooks',        'Register webhook'],
                ['DEL',  '/api/v1/webhooks/:id',    'Remove webhook'],
              ].map(([method, path, desc]) => (
                <div key={path} className="flex gap-2 items-start">
                  <span className={`font-mono font-bold w-10 shrink-0 ${method === 'GET' ? 'text-pump-green' : method === 'POST' ? 'text-tg-blue' : 'text-pump-pink'}`}>{method}</span>
                  <span className="text-zinc-300 font-mono w-52 shrink-0">{path}</span>
                  <span className="text-zinc-500">{desc}</span>
                </div>
              ))}
            </div>
          </BotMsg>

          {/* 6 – Tutorials */}
          <div id="tutorials" className="pt-2" />
          <BotMsg time="09:07">
            <p className="text-white font-bold mb-2">📚 Tutorials</p>
            <ol className="text-tg-blue text-sm space-y-1">
              {[
                'Set up your first monitor bot',
                'Deploy to Railway in 5 minutes',
                'Add custom event handlers',
                'Build a channel feed bot',
                'Create a call-tracking group bot',
                'Integrate with PumpFun SDK',
              ].map((t, i) => (
                <li key={t}>
                  <span className="text-zinc-500 mr-1">{i + 1}.</span>
                  <a href="#" className="hover:underline">{t}</a>
                </li>
              ))}
            </ol>
          </BotMsg>

          {/* 7 – FAQ */}
          <div id="faq" className="pt-2" />
          {[
            ['Is PumpKit free to use?', 'Yes! PumpKit is MIT licensed. Use it for personal or commercial projects.'],
            ['Does it work with PumpSwap?', 'Yes. The monitor detects token graduations and can track AMM pool activity via @pumpkit/core.'],
            ['Can I run multiple bots?', 'Absolutely. Each package is independent. Run monitor, tracker, and channel bots simultaneously.'],
          ].map(([q, a]) => (
            <div key={q} className="flex flex-col gap-2">
              <UserMsg time="09:08"><p className="text-sm text-white">{q}</p></UserMsg>
              <BotMsg time="09:08"><p className="text-zinc-300 text-sm">{a}</p></BotMsg>
            </div>
          ))}

          {/* Footer CTA */}
          <BotMsg time="09:10">
            <p className="text-white font-semibold mb-1">🚀 Ready to start building?</p>
            <p className="text-zinc-300 text-sm mb-2">Join the community or dive into the code:</p>
            <div className="grid grid-cols-3 gap-2">
              <a href="https://github.com/nirholas/pumpkit" target="_blank" rel="noreferrer"
                 className="bg-tg-input text-tg-blue text-xs rounded-lg px-2 py-1.5 text-center hover:bg-tg-hover transition">
                ⭐ GitHub
              </a>
              <a href="#" className="bg-tg-input text-tg-blue text-xs rounded-lg px-2 py-1.5 text-center hover:bg-tg-hover transition">
                💬 Telegram
              </a>
              <Link to="/create" className="bg-tg-input text-tg-blue text-xs rounded-lg px-2 py-1.5 text-center hover:bg-tg-hover transition">
                🪙 Create Coin
              </Link>
            </div>
          </BotMsg>
        </div>
      </div>
    </div>
  )
}
