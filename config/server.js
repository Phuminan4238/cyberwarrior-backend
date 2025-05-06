module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  cors: {
    enabled: true,
    origin: ['https://cyberwarrior2025.io', 'http://localhost:1337'],
  },
  settings: {
    allowedHosts: ['cyberwarrior2025.io', 'localhost'],
  },
  url: env('URL', 'https://cyberwarrior2025.io'),  // Ensure HTTPS is set here
});
