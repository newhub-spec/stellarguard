import { Networks, Server } from 'stellar-sdk';

class StellarGuardConfig {
  isTestNetwork = !process.env.USE_STELLAR_PUBLIC_NETWORK;
  isPublicNetwork = !!process.env.USE_STELLAR_PUBLIC_NETWORK;
  version = process.env.APP_VERSION || '';
  recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
  showScfBeg = !!process.env.SHOW_SCF_BEG;
  stellarGuardPublicKey =
    'GCVHEKSRASJBD6O2Z532LWH4N2ZLCBVDLLTLKSYCSMBLOYTNMEEGUARD'; // can be used by third parties to check whether an account has StellarGuard enabled

  get networkPassphrase() {
    return this.isPublicNetwork ? Networks.PUBLIC : Networks.TESTNET;
  }

  get horizonServer() {
    return this.isPublicNetwork ? new Server('https://horizon.stellar.org') : new Server('https://horizon-testnet.stellar.org');
  }
}

export default new StellarGuardConfig();
