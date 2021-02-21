const { StatusCodes } = require('http-status-codes');
const request = require('supertest');
const { generateKeypair, createToken, executeWithKeyPair } = require('./utils/helper');

const app = require('../src/app');

describe('Password Endpoints', () => {

  it('should send UNAUTHORIZED when no authorization is present', () => {
    return request(app).get('/password/')
      .expect(StatusCodes.UNAUTHORIZED);
  });

  it('should send UNAUTHORIZED when authorization is not verified', () => {
    return request(app).get('/password/')
      .set('Authorization', 'Bearer invalid_token')
      .expect(StatusCodes.UNAUTHORIZED);
  });

  it('should send UNAUTHORIZED when authorization is expired', () => {
    return request(app).get('/password/')
      .set('Authorization', 'Bearer expired_token')
      .expect(StatusCodes.UNAUTHORIZED);
  });

  it('should send OK and returns data when the token is good', executeWithKeyPair((secret, privateKey, publicKey) => {
    const token = createToken(privateKey, secret, { username: 'user', acct_id: '' });

    return request(app).get('/password/')
      .auth(token, { type: 'bearer' })
      .expect(StatusCodes.OK);
  }));

})
