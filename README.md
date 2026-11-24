# SnapFind Events

Standalone events-only app: photographers upload event photos, guests scan
a QR code, check in with a selfie, and face-matching finds every photo
they appear in. Extracted from SnapFind's Photos & Events product — this
repo has **no couple-gallery code** (that lives in SnapFind).

## Stack

- **Frontend:** Next.js 14 (static export), React 18, Tailwind, face-api.js
  (on-device face detection), html5-qrcode (QR scanning).
- **Backend:** Flask + SQLAlchemy, face descriptors compared with numpy.
  Face detection runs in the browser; the server only stores descriptors.
  (`backend/gallery_cloudinary.py` is the generic Cloudinary helper used
  for event photos and selfies — the name is kept from SnapFind.)

## Local run

```bash
# Backend (http://localhost:5000)
cd backend
pip install -r requirements.txt
python app.py

# Frontend (http://localhost:3000)
cd frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:5000` in `frontend/.env.local`
for local dev (see `frontend/.env.local.example`). With it empty, the
frontend calls the API same-origin — that's the single-container deploy.

## Env vars

See `.env.example`. The important ones:

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend base URL for the frontend |
| `DATABASE_URL` | Postgres URL (e.g. Neon); without it, local SQLite `snapfind-events.db` |
| `SECRET_KEY` / `JWT_SECRET` | Flask + auth token signing |
| `ADMIN_EMAIL` / `ADMIN_NAME` / `ADMIN_PASSWORD` | First admin account, auto-created on startup |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset (no API secret in code) — event photos & selfies live here permanently; without them, uploads fall back to local disk, which free hosts wipe on restart |
| `CLOUDINARY_FOLDER` | Cloudinary folder root, default `snapfind-events` |
| `FRONTEND_URL` / `BACKEND_URL` | Public URLs used in join links / QR codes |
| `MAX_UPLOAD_MB` | Max upload size per request (default 100) |

## Deploy notes

- **Frontend:** Vercel (static export — `npm run build` outputs `out/`).
- **Backend:** Render (see `render.yaml` — Blueprint, Docker).
- Use **own accounts / own database**, separate from SnapFind: own
  Cloudinary cloud + preset, own Postgres database, own Render service
  (`snapfind-events`). Never point this app at SnapFind's database or
  Cloudinary folder — the two apps share no data.
- `Dockerfile` also supports a single-container deploy (frontend static
  export served by Flask, `SERVE_FRONTEND=1`).
