module.exports = {
  apps: [
    {
      name: "thymebridge",
      script: "dist/index.cjs",
      cwd: "/var/www/thymebridge",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "700M",
      env: {
        NODE_ENV: "production",
      },
      error_file: "/var/www/thymebridge/logs/pm2-error.log",
      out_file: "/var/www/thymebridge/logs/pm2-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
