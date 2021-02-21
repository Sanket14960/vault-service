const request = require('supertest');
const app = require('../src/app');

describe('Vault Server', () => {
  it('should start up', () => request(app).get('/health').expect(200))
})
