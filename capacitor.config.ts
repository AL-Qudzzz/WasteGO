import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wastego.app',
  appName: 'WasteGO',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
