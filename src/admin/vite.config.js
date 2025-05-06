import { mergeConfig, defineConfig } from 'vite';

export default (config) => {
  return mergeConfig(
    config,
    defineConfig({
      server: {
        // allow your custom host and localhost
        allowedHosts: ['cyberwarrior2025.io', 'localhost'],
        // expose on all network interfaces
        host: true,
      },
    })
  );
};
