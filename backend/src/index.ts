import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const AFFILIATE_ID = process.env.SHOPEE_AFFILIATE_ID || '17393830293';

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/links/generate', (req, res) => {
  const schema = z.object({ sourceUrl: z.string().url(), subId: z.string().min(2).max(64).optional() });
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload' });

  const { sourceUrl, subId } = parse.data;
  const encoded = encodeURIComponent(sourceUrl);
  const tag = encodeURIComponent(subId || 'addlivetag-hopback');
  const affiliateUrl = `https://s.shopee.vn/an_redir?url=${encoded}&affiliate_id=${AFFILIATE_ID}&sub_id=${tag}`;

  return res.json({ sourceUrl, affiliateUrl, affiliateId: AFFILIATE_ID });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`hopback backend running on :${port}`));
