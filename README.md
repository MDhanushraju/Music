# Tarang

Online city-based radio. Think Spotify, but for live radio: every city has its own channels, RJs and creators go live to talk and play music, and listeners subscribe and tune in. There are no FM frequencies. Everything streams over the internet but feels like radio.

A clickable UI prototype already exists (single HTML file with simulated audio). This README describes the real app to build. If a prototype file (`tarang.html`) is placed in `/prototype`, treat it as the visual and behavioral reference.

---

## 0. Instructions for the AI coding agent

Read this whole file before writing code. Then follow these rules:

1. **Work phase by phase** (see section 12). Finish and verify Phase 1 before starting Phase 2.
2. **Plan first.** Before each phase, write a short plan (files to create, commands to run) and then execute it.
3. **Keep it runnable at every step.** After each milestone the app must start with `pnpm dev` and not crash.
4. **Use the stack in section 3** unless something is unavailable. If you deviate, say why in `docs/DECISIONS.md`.
5. **Do not invent secrets.** Use `.env.example` with empty values and read from environment variables.
6. **Verify your work.** Run the app, open it in the browser, test the flows in section 14 (acceptance criteria), and fix what fails.
7. **Keep code typed and small.** TypeScript everywhere, shared types in `packages/shared`, one responsibility per file.
8. **Ask before big changes.** If a requirement is unclear or conflicts with another, list the options and ask rather than guessing.
9. **Music licensing:** only use royalty-free or user-uploaded audio in seeds and demos.

### Suggested prompts to give the agent, in order

1. "Read README.md. Scaffold the monorepo from section 9, add docker-compose for Postgres and Redis, and get `pnpm dev` running with an empty Next.js app and an empty NestJS API."
2. "Implement the database schema from section 5 with Prisma migrations and a seed script for the 7 cities and 18 demo channels."
3. "Build the auth flow (phone OTP with a dev mode that accepts code 123456) and JWT."
4. "Build the home page: city dial, channel list, filters, subscribe, matching the design tokens in section 8."
5. "Build the persistent player with AutoDJ playback of seeded royalty-free tracks."
6. "Integrate LiveKit: creator Go live flow, listener subscribe, live badge, listener counts via Redis and WebSocket."
7. "Run through the acceptance checklist in section 14 and fix anything failing."

---

## 1. Core concepts

| Term | Meaning |
|---|---|
| City | A geographic hub (Bengaluru, Mumbai, Delhi, ...). Each has its own channel lineup. |
| Channel | A station owned by one creator/RJ, tied to one city. |
| Broadcast | A live session on a channel. One live broadcast per channel at a time. |
| AutoDJ | Fallback playlist that plays when the channel's RJ is offline, so the channel is never silent. |
| Listener | A user who tunes in, subscribes and gets notified. |
| Creator/RJ | A user who owns channels and can go live. |

---

## 2. Features

### Listener
- Pick a city, see its channels sorted by: live first, then listener count
- Filter: All / Live now / Subscribed
- Play/pause, volume, live waveform visualizer
- Player shows LIVE or AutoDJ badge, listener count, and current caption (what is playing or the RJ's segment)
- Subscribe/unsubscribe to channels; get a push notification when a subscribed channel goes live
- Persistent mini-player while browsing

### Creator / RJ
- Create a channel (name, city, genre, tags, cover art)
- "Go live" flow: choose channel, test mic, start broadcast
- During broadcast: mic mute, play music from library/uploads, mix music + voice (auto-duck music under voice), see live listener count, end broadcast
- Schedule upcoming shows (shown on the channel page)
- Upload tracks/jingles; build an AutoDJ playlist for offline hours

### Platform
- Auth (phone OTP or email + Google)
- Roles: listener (default), creator (self-serve upgrade)
- Admin: moderate channels, ban users, feature channels per city

---

## 3. Recommended tech stack

| Layer | Choice | Why |
|---|---|---|
| Web app | Next.js (React, TypeScript), Tailwind | SSR for SEO, fast to build |
| Mobile (later) | React Native or Flutter | Reuse API |
| Backend API | Node.js + NestJS + TypeScript | Simple REST + WebSocket |
| ORM | Prisma | Fast schema + migrations |
| Database | PostgreSQL | Relational: cities, channels, subs |
| Cache / realtime | Redis | Listener counts, presence, pub/sub |
| Live audio | LiveKit (WebRTC SFU) for creator ingest | Low-latency voice, open source, hosted or self-hosted |
| Listener delivery | LiveKit subscribe (small scale), HLS via Egress + CDN (large scale) | Cheap for many listeners |
| Storage | S3-compatible (tracks, covers) | |
| Notifications | Firebase Cloud Messaging + web push | "Your RJ is live" |
| Jobs | BullMQ (Redis) | AutoDJ scheduler, notifications, stats |
| Auth | JWT (access + refresh), OTP via Twilio/MSG91 | |
| Package manager | pnpm workspaces | Monorepo |

Start simple: one Node server + Postgres + Redis + LiveKit Cloud. Move listeners to HLS/CDN when concurrent listeners grow.

---

## 4. Architecture

```
Creator browser (mic + music mix)
      |  WebRTC
      v
  LiveKit SFU  --Egress-->  HLS segments on S3/CDN
      |                          |
      | (small scale)            | (large scale)
      v                          v
        Listener web/mobile player
      ^
      | REST + WebSocket
  Node API  <-->  PostgreSQL
      |
      +--> Redis (presence, listener counts, pub/sub)
      +--> BullMQ workers (AutoDJ, notifications)
```

### Live broadcast flow
1. Creator taps Go live -> `POST /channels/:id/broadcasts` -> API creates a LiveKit room and returns a publish token.
2. Browser publishes mic + a mixed music track (Web Audio API `GainNode` for ducking).
3. API marks channel `is_live = true`, emits `channel:live` over WebSocket, queues push notifications to subscribers.
4. Listeners get a subscribe token (or an HLS URL) and play the stream.
5. Creator ends -> broadcast closed, channel returns to AutoDJ.

### AutoDJ flow
- MVP: AutoDJ is client-side only. The player plays the channel's playlist locally, in sync with server time (`position = (now - epoch) mod playlistDuration`), so nothing runs on the server.
- Later: a worker publishes AutoDJ audio through a LiveKit ingress or pre-built HLS playlist.

---

## 5. Data model

Implement as a Prisma schema. Reference SQL:

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text unique,
  email text unique,
  role text not null default 'listener',       -- listener | creator | admin
  home_city_id int references cities(id),
  created_at timestamptz default now()
);

create table cities (
  id serial primary key,
  name text unique not null,
  slug text unique not null,
  lat double precision, lng double precision
);

create table channels (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id) not null,
  city_id int references cities(id) not null,
  name text not null,
  slug text unique not null,
  description text,
  genre text,
  tags text[] default '{}',
  cover_url text,
  is_live boolean default false,
  created_at timestamptz default now()
);

create table broadcasts (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references channels(id) not null,
  livekit_room text not null,
  hls_url text,
  started_at timestamptz default now(),
  ended_at timestamptz,
  peak_listeners int default 0
);

create table subscriptions (
  user_id uuid references users(id),
  channel_id uuid references channels(id),
  notify boolean default true,
  created_at timestamptz default now(),
  primary key (user_id, channel_id)
);

create table tracks (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references channels(id),
  title text not null,
  artist text,
  audio_url text not null,
  duration_sec int
);

create table autodj_items (
  channel_id uuid references channels(id),
  track_id uuid references tracks(id),
  position int,
  primary key (channel_id, position)
);

create table shows (             -- scheduled programming
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references channels(id),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz
);

create table device_tokens (
  user_id uuid references users(id),
  token text primary key,
  platform text                  -- web | android | ios
);

create index on channels (city_id, is_live);
```

Listener counts live in Redis only (`SADD listeners:{channelId} {sessionId}`, TTL heartbeat). Write the peak to `broadcasts.peak_listeners` on end.

### Seed data
Cities: Bengaluru, Mumbai, Delhi, Chennai, Kolkata, Hyderabad, Kochi.

Demo channels (2-3 per city, a mix of live and offline):

- Bengaluru: Namma Morning (RJ Kavya), Silk Board Sessions (RJ Arjun), Filter Kaapi FM (RJ Meera)
- Mumbai: Local Train Radio (RJ Zoya), Marine Drive Midnight (RJ Kabir), Vada Pav Beats (RJ Sid)
- Delhi: Dilli Dhun (RJ Ananya), Chandni Chowk Qawwali (RJ Imran), Metro Line Mixtape (RJ Rohan)
- Chennai: Marina Beach FM (RJ Divya), Filter Coffee Ragas (RJ Lakshmi), Kollywood Kacheri (RJ Karthik)
- Kolkata: Adda Radio (RJ Sourav), Rabindra Sangeet Nights (RJ Ishita), Tram Line Tunes (RJ Deb)
- Hyderabad: Charminar Chai FM (RJ Farah), Biryani Beats (RJ Nikhil)
- Kochi: Backwater Bulletin (RJ Anu), Monsoon Malayalam (RJ Vishnu)

Seed a few royalty-free tracks per channel for AutoDJ. In dev, "live" seed channels can be flagged `is_live = true` with simulated listener counts so the UI is populated.

---

## 6. API

Base: `/api/v1`. JSON. Auth via `Authorization: Bearer <jwt>`.

### Auth
- `POST /auth/otp/request` `{ phone }`
- `POST /auth/otp/verify` `{ phone, code }` -> `{ accessToken, refreshToken, user }`
- `POST /auth/refresh`
- Dev mode: when `NODE_ENV=development`, OTP code `123456` always works.

### Cities and channels
- `GET /cities` -> cities with `liveCount`
- `GET /cities/:slug/channels?filter=all|live` -> channels sorted live-first
- `GET /channels/:id` -> details, schedule, is_live, listeners
- `POST /channels` (creator) `{ name, cityId, genre, tags, coverUrl }`
- `PATCH /channels/:id`, `DELETE /channels/:id` (owner)

### Subscriptions
- `GET /me/subscriptions`
- `PUT /channels/:id/subscribe`
- `DELETE /channels/:id/subscribe`

### Broadcasting (owner only)
- `POST /channels/:id/broadcasts` -> `{ broadcastId, livekitUrl, publishToken }`
- `POST /broadcasts/:id/end`

### Listening
- `POST /channels/:id/listen` -> `{ mode: "live" | "autodj", streamUrl | subscribeToken, nowPlaying }`
- `POST /channels/:id/heartbeat` (every 20s, updates presence)

### Library and AutoDJ
- `POST /channels/:id/tracks` (multipart upload)
- `PUT /channels/:id/autodj` `{ trackIds: [] }`

### Notifications
- `POST /me/device-tokens` `{ token, platform }`

---

## 7. WebSocket events

Connect: `wss://.../ws?token=<jwt>`. Join rooms `city:{slug}` and `channel:{id}`.

| Event | Direction | Payload |
|---|---|---|
| `channel:live` | server -> city room | `{ channelId, name, city }` |
| `channel:offline` | server -> city room | `{ channelId }` |
| `listeners:update` | server -> channel room | `{ channelId, count }` (throttle to every 3-5s) |
| `nowplaying:update` | server -> channel room | `{ title, artist, type: "music" or "talk" }` |
| `chat:message` (v2) | both | `{ user, text }` |

---

## 8. Frontend

### Pages
- `/` City picker + channels for the selected city (home)
- `/c/:channelSlug` Channel page: about, schedule, subscribe, play
- `/studio` Creator dashboard: my channels, Go live, library, AutoDJ
- `/studio/live/:broadcastId` Live console: mic, mixer, listener count, end
- `/library` Subscriptions
- `/login`

### Key components
- `CityDial`: horizontal scrolling city selector with live counts
- `ChannelRow`: cover glyph, name, RJ, tags, live badge + listeners, subscribe button
- `Player`: fixed bottom bar, persists across routes (React context + a single `<audio>`/LiveKit room)
- `Visualizer`: canvas bars from `AnalyserNode`
- `GoLiveModal`, `LiveConsole` (mic meter, mute, music deck, ducking slider)

### Design tokens (match the prototype)
- Light: bg `#EAEDF8`, surface `#FFFFFF`, ink `#1E2160`, live pink `#E4306F`, saffron `#F2A20F`, chip `#DDE2F5`
- Dark: bg `#12143A`, surface `#1B1E52`, ink `#ECEEFF`, live `#FF5C93`, saffron `#FFB833`
- Fonts: Bricolage Grotesque (headings), Figtree (body)
- Follow `prefers-color-scheme`; respect `prefers-reduced-motion`
- Layout: max width ~980px, city dial on top, channel rows below, fixed player at bottom, rounded corners, no heavy shadows

### Behaviors to keep from the prototype
- Live channels first, then by listeners
- Music auto-ducks while the RJ talks
- Offline channels show "AutoDJ playing" and are still playable
- Subscribing shows a toast; state persists per user
- Mini-player keeps playing while switching cities
- Keyboard accessible: channel rows are focusable, Enter/Space plays

---

## 9. Folder structure

```
tarang/
  apps/
    web/                 # Next.js
      app/
      components/
      lib/               # api client, livekit hooks, audio mixer
    api/                 # NestJS
      src/
        auth/ cities/ channels/ broadcasts/
        subscriptions/ library/ notifications/ realtime/
      prisma/            # schema + migrations + seed
    worker/              # BullMQ: autodj, push notifications
  packages/
    shared/              # types, zod schemas
  prototype/
    tarang.html          # UI reference
  docs/
    DECISIONS.md
  docker-compose.yml     # postgres, redis
  .env.example
  README.md
```

---

## 10. Environment variables

```
DATABASE_URL=postgres://tarang:tarang@localhost:5432/tarang
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too

LIVEKIT_URL=wss://<project>.livekit.cloud
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=

S3_ENDPOINT=
S3_BUCKET=tarang-media
S3_ACCESS_KEY=
S3_SECRET_KEY=
CDN_BASE_URL=

OTP_PROVIDER_KEY=          # Twilio / MSG91
FCM_SERVER_KEY=
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

---

## 11. Local setup

```bash
git clone <repo> && cd tarang
cp .env.example .env
docker compose up -d           # postgres + redis
pnpm install
pnpm --filter api prisma migrate dev
pnpm --filter api seed         # seeds cities + demo channels
pnpm dev                       # web on :3000, api on :4000, worker
```

---

## 12. Build plan

**Phase 1: MVP**
1. Monorepo scaffold, docker-compose, env handling
2. Prisma schema, migrations, seed (cities, channels, tracks)
3. Auth with dev-mode OTP, JWT, roles
4. Home page: city dial, channel list, filters, subscribe
5. Persistent player with client-side AutoDJ
6. Go live with LiveKit: creator publishes mic, listeners subscribe
7. Redis listener counts + WebSocket `channel:live` / `listeners:update`

**Phase 2**
8. Music deck + auto-ducking in the creator console
9. Scheduled shows and channel pages
10. Push notifications for subscribed channels going live
11. HLS egress + CDN for large audiences

**Phase 3**
12. Live chat and song requests
13. Mobile apps
14. Analytics (peak listeners, listening time), creator dashboards
15. Moderation tools, reporting, admin panel

---

## 13. Notes and gotchas

- Browsers block autoplay: audio must start from a user tap.
- Ducking: route music and mic through Web Audio `GainNode`s, then publish the mixed `MediaStreamDestination` track.
- Music licensing: playing copyrighted songs on a public stream needs licences (PRS/IPRS/Novex etc. in India). For MVP, use royalty-free or creator-owned music, and plan for licensing before launch.
- Listener counts: use heartbeat + TTL in Redis; never count from open sockets alone.
- Scale: WebRTC to every listener gets expensive past a few hundred; switch listeners to HLS.
- Latency: WebRTC ~1s, HLS ~5-10s (LL-HLS ~2-3s). Pick per channel size.
- Mobile: background audio + lock-screen controls (MediaSession API on web).
- Microphone access needs HTTPS (localhost is fine in dev).

---

## 14. Acceptance checklist (Phase 1)

The agent should test each of these in a browser before calling Phase 1 done.

- [ ] `docker compose up -d && pnpm install && pnpm dev` starts everything without errors
- [ ] Seed creates 7 cities and 18 channels; home page shows them per city
- [ ] Switching city updates the list; live channels appear first, sorted by listeners
- [ ] Filters All / Live now / Subscribed work; empty states show helpful text
- [ ] Logging in with any phone number and code `123456` works in dev
- [ ] Subscribe/unsubscribe persists after page reload
- [ ] Clicking an offline channel plays AutoDJ audio; badge says AutoDJ
- [ ] Player stays visible and keeps playing while changing city or route
- [ ] A creator can create a channel, click Go live, and speak; a second browser sees the channel as LIVE and hears audio
- [ ] Listener count on a live channel updates within ~5 seconds of someone joining or leaving
- [ ] Ending a broadcast returns the channel to AutoDJ and updates other clients without refresh
- [ ] UI works on a 375px-wide phone screen and in both light and dark mode
- [ ] Keyboard: Tab reaches channel rows and buttons; Enter/Space plays
