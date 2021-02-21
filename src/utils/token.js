const { resolve } = require('path');
const { homedir, tmpdir } = require('os');
const { readFileSync } = require('fs');

const { verify } = require('jsonwebtoken');

const { notNull, fileExists } = require('./filters');

function validatePayload(token, publicKey, opts = {}) {
  return verify(token, publicKey, { algorithms: ['RS256'], ...opts })
}

function loadPublicKey() {
  const fileName = 'publicKey.pem';

  const searchPaths = [
    process.env.TOKEN_PUB_KEY_FILE,
    resolve('./', fileName),
    resolve(homedir(), fileName),
    resolve(tmpdir(), fileName)
  ];

  const path = searchPaths.filter(notNull).find(fileExists);
  if (path) {
    return readFileSync(path).toString();
  }

  return process.env.TOKEN_PUB_KEY || null;
}


module.exports = { validatePayload, loadPublicKey }
