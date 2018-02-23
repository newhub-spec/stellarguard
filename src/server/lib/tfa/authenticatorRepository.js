const Authenticator = require('./Authenticator');

class AuthenticatorRepository {
  constructor() {
    this.authenticatorDb = require('./authenticatorDb');
  }

  async enableAuthenticator(user, { secret }) {
    const authenticator = await this.authenticatorDb.create({
      userId: user.id,
      secret
    });
    return new Authenticator(authenticator);
  }

  async getForUser(user) {
    const authenticator = await this.authenticatorDb.getByUserId(user.id);
    return new Authenticator(authenticator);
  }
}

module.exports = new AuthenticatorRepository();
