# Test Xpress

Browser test automation platform — repository, test runs, and recorder.

## Deploy to Render (free)

1. Push this folder to a GitHub repo
2. Go to https://render.com and sign in
3. Click **New → Web Service**
4. Connect your GitHub repo
5. Render auto-detects the settings from render.yaml
6. Click **Deploy**

Once deployed you get a URL like `https://test-xpress-xxxx.onrender.com`.
Share that URL with your team — everyone uses the same data, no file setup needed.

## Run locally

```bash
npm install
node server.js
```

Then open http://localhost:3000

## Data storage

All data is stored in `data/test-xpress-data.json` on the server.
This file is created automatically on first run.

> Note: Render free tier spins down after 15 minutes of inactivity.
> The first request after a spin-down takes ~30 seconds to wake up.
> Upgrade to a paid Render plan to keep it always-on.
