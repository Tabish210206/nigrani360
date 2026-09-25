# Nigrani360

Smart Real-Time Monitoring & Inspection Platform for the Ministry of Social Justice and Empowerment.

## Production Deployment (Railway)

This application is configured for single-service full-stack deployment on Railway (or Render) using Express to serve the built Vite frontend alongside the API and Socket.io server.

### Steps to Deploy on Railway:

1. Connect your GitHub repository to Railway.
2. Railway will automatically detect the `railway.json` and Node.js environment.
3. Add a Volume in Railway for the SQLite database.
4. Set the `DATABASE_URL` environment variable to point to the mounted volume path (e.g., `file:/data/nigrani360.db`).
5. Set `PORT` (Railway usually injects this automatically).
6. Set `FRONTEND_URL` to your Railway deployment URL to allow CORS (optional since it serves its own static files).

### Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

### Production Build

\`\`\`bash
npm run build
npm run start
\`\`\`
