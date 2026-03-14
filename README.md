# $hopback

Shopee Affiliate app (frontend + backend).

## Stack
- Frontend: Next.js + Tailwind + Framer Motion
- Backend: Express + TypeScript
- Deploy: Vercel (FE), Railway (BE)

## Local run

### 1) Backend
```bash
cd backend
npm i
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm i
cp .env.example .env.local
npm run dev
```

## Env
### backend/.env
```env
PORT=8080
SHOPEE_AFFILIATE_ID=17393830293
```

### frontend/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Deploy
- FE: import `frontend` into Vercel
- BE: deploy `backend` in Railway

