import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hm.classroom',
  appName: 'HM CLASSROOM',
  webDir: 'dist'
,
    android: {
       buildOptions: {
          keystorePath: '/Users/macbookpro/Desktop/tchop-et-ndjoka/biskeys.jks',
          keystoreAlias: 'keyBis',
       }
    }
  };

export default config;
