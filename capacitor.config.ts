import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.birthdaybud.app',
  appName: 'Birthday Bud',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
