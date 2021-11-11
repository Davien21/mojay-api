module.exports = {
  apps: [
    {
      name: "SERLZ-api",
      script: "app.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
