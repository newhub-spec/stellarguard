const db = require('../db');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { DuplicateEmailError } = require('errors/user');

class UserDb {
  constructor({ db }) {
    this.db = db;
  }

  async getById(id) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "user" WHERE id = $1',
      [id]
    );

    return rows[0];
  }

  async getByEmail(email) {
    const { rows } = await this.db.pg.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    return rows[0];
  }

  async create({
    email,
    isEmailVerified,
    passwordHash,
    signerPublicKey,
    signerSecretKey
  }) {
    try {
      const { rows } = await this.db.pg.query(
        `INSERT INTO "user" (email, is_email_verified, password_hash, signer_public_key, signer_secret_key)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [email, isEmailVerified, passwordHash, signerPublicKey, signerSecretKey]
      );

      return rows[0];
    } catch (e) {
      switch (e.code) {
        case UNIQUE_VIOLATION:
          throw new DuplicateEmailError();
        default:
          throw e;
      }
    }
  }

  async getBySignerPublicKey(signerPublicKey) {
    const { rows } = await this.db.pg.query(
      `SELECT * from "user" WHERE signer_public_key = $1`,
      [signerPublicKey]
    );

    return rows[0];
  }

  async updateIsEmailVerified({ id, isEmailVerified }) {
    const { rows } = await this.db.pg.query(
      `UPDATE "user"
       SET is_email_verified = $2
       WHERE id = $1`,
      [id, isEmailVerified]
    );

    return rows[0];
  }
}

module.exports = new UserDb({ db });