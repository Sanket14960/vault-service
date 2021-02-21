const { generateKeyPairSync, generateKeyPair } = require('crypto');
const { sign } = require('jsonwebtoken');
const { v4 } = require('uuid')
const { writeFileSync, unlinkSync } = require('fs');
const { tmpdir } = require('os');
const { resolve } = require('path');

function generateKeypair(passphrase, format = 'pem') {
  return generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: format
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: format,
      cipher: 'aes-256-cbc',
      passphrase: passphrase
    }
  });
}

function withKeyPair(passphrase, callback, format = 'pem') {
  return generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: format
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: format,
      cipher: 'aes-256-cbc',
      passphrase: passphrase
    }
  }, (err, privateKey, publicKey) => {
    if (err) callback(null, null);
    callback(publicKey, privateKey);
  })
}

function createToken(privateKey, secret, payload, opts = {}) {
  return sign(payload, { key: privateKey, passphrase: secret }, { algorithm: 'RS256', ...opts });
}

function executeWithKeyPair(executor) {
  const secret = v4();
  const { privateKey, publicKey } = generateKeypair(secret)
  return async () => {
    writeFileSync(resolve(tmpdir(), 'publicKey.pem'), publicKey);
    writeFileSync(resolve(tmpdir(), 'privateKey.pem'), privateKey);
    process.env.TOKEN_PUB_KEY = secret;
    const results = await executor(secret, privateKey, publicKey);
    unlinkSync(resolve(tmpdir(), 'publicKey.pem'));
    unlinkSync(resolve(tmpdir(), 'privateKey.pem'));
    delete process.env.TOKEN_PUB_KEY;
    return results;
  };
}



module.exports = { generateKeypair, withKeyPair, createToken, executeWithKeyPair };
