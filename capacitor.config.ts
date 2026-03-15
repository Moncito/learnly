import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.learnly.app',
  appName: 'Learnly',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'app',
  }
};

export default config;