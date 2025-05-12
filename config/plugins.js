module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.cpe.kmutt.ac.th'),
        port: env.int('SMTP_PORT', 587),
        secure: false,
        username: env('SMTP_USERNAME'),
        password: env('SMTP_PASSWORD'),
        rejectUnauthorized: true,
        requireTLS: true,
        connectionTimeout: 1,
      },
    },
    settings: {
      defaultFrom: 'cyberwarrior2025@cpe.kmutt.ac.th',  // Default from email
      defaultReplyTo: 'cyberwarrior2025@cpe.kmutt.ac.th',  // Default reply-to email
    },
  },

upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 2 * 1024 * 1024, // 2MB in bytes
      },
    },
  },
});
