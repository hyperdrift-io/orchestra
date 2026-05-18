// PM2 ecosystem for the Hostinger production deploy.
// Mirrors the per-app pattern used by sibling apps (hyper-drift, intel, …).
// Production process is managed centrally via the infra PM2 ecosystem at
// /home/yannvr/nginx-prod/ecosystem.config.js — this file is the per-app
// reference and is also consumed when running orchestra in isolation
// (e.g. `pm2 start ecosystem.config.cjs --only orchestra`).
module.exports = {
  apps: [
    {
      name: 'orchestra',
      script: 'pnpm',
      args: 'run start',
      cwd: '/home/yannvr/hyperdrift/orchestra',
      env: {
        PORT: 3005,
        NODE_ENV: 'production',
      },
      watch: false,
      autorestart: true,
      max_restarts: 5,
      restart_delay: 2000,
    },
  ],
};
