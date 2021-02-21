const { createToken, executeWithKeyPair } = require('./helper');
const { writeFileSync, unlinkSync } = require('fs');
const { tmpdir } = require('os');
const { resolve } = require('path');

const { validatePayload, loadPublicKey } = require('../../src/utils/token');

describe("Token Utils", () => {
  describe('When validatePayload is called', () => {
    it('Should return the decoded payload if it is signed using the right key', executeWithKeyPair((secret, privateKey, publicKey) => {
      const payload = { foo: 'bar' };
      const token = createToken(privateKey, secret, payload);

      const decoded = validatePayload(token, publicKey);
      Object.keys(payload).forEach(key => expect(payload[key]).toBe(decoded[key]));
    }))

    it('Should be able to add additional check options such as expiry and issuer',executeWithKeyPair((secret, privateKey, publicKey) => {
      const payload = { foo: 'bar' };
      const metadata = { issuer: 'uaa' };

      const token = createToken(privateKey, secret, payload, metadata);
      const decoded = validatePayload(token, publicKey, metadata);

      Object.keys(payload).forEach(key => expect(payload[key]).toBe(decoded[key]));
    }))

    it('Should throw an error if it is not matching the issuer', executeWithKeyPair((secret, privateKey, publicKey) => {
      const payload = { foo: 'bar' };
      const metadata = { issuer: 'uaa' };

      const token = createToken(privateKey, secret, payload, metadata);
      expect(() => validatePayload(token, publicKey, { issuer: 'vaa' })).toThrow()
    }))
  })

  describe('When loadPublicKey is called', () => {
    it('should load the public key from one of the available sources', () => {
      const content = "some-key";
      const file = resolve(tmpdir(), 'publicKey.pem');

      writeFileSync(file, content);

      expect(loadPublicKey()).toStrictEqual(content);

      unlinkSync(file);
    })

    it('should load the public key from the env if no file is given', () => {
      process.env.TOKEN_PUB_KEY = "some-key";
      expect(loadPublicKey()).toStrictEqual("some-key");
      delete process.env.TOKEN_PUB_KEY;
    })

    it('should return null if no filepath or key is loaded', () => {
      const key = loadPublicKey();

      expect(key).toBeNull()
    })
  })

})
