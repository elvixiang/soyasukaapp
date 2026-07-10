// api/soyasuka-dash.js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxzvZubmYMI9rvZJmMf3mMKC1vnj94rlEnUovMW_OI0-mnIK_Irmq7RLPKiM8pe4xBL/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let r;
    if (req.method === 'POST') {
      // Payload besar (mis. foto base64) dikirim di BODY, bukan query string,
      // supaya tidak kena batas panjang URL (HTTP 414).
      const params = req.body || {};
      const body = new URLSearchParams(params).toString();
      r = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body,
      });
    } else {
      const qs = new URLSearchParams(req.query).toString();
      r = await fetch(`${APPS_SCRIPT_URL}?${qs}`);
    }
    const data = await r.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
