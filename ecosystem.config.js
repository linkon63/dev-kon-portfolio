// PM2 process configuration — used on the VPS to run the Next.js server.
// Start:  pm2 start ecosystem.config.js
// Reload: pm2 reload ecosystem.config.js   (zero-downtime, done by deploy.sh)
module.exports = {
  apps: [
    {
      name: "dev-kon-portfolio",
      // `npm start` → `next start`. Serves the production build.
      script: "npm",
      args: "start",
      cwd: __dirname,
      // Cluster mode with 2 workers for zero-downtime reloads + basic HA.
      // Set to "max" to use all CPU cores.
      instances: 2,
      exec_mode: "cluster",
      // Next.js reads PORT; keep it aligned with the Nginx upstream (see docs).
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "512M",
      // Give the server time to boot before PM2 considers it "online".
      wait_ready: false,
      autorestart: true,
    },
  ],
};
