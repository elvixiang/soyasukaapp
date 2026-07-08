// api/soyasuka-dash.js
const APPS_SCRIPT_URL = 'GANTI_DENGAN_URL_APPS_SCRIPT_KAMU';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const params = req.method === 'POST' ? req.body : req.query;
    const qs = new URLSearchParams(params).toString();
    const r = await fetch(`${APPS_SCRIPT_URL}?${qs}`);
    const data = await r.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
