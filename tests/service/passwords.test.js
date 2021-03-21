const request = require('supertest');
const app = require('../../src/routes/index');

test('missing field error', async () => {
  await request(app).post('/passwords').send({
    owner: " ",
    name:  " ", 
    username: " ", 
    password:  " ", 
    description: " ", 
  })
  .expect(400)
})