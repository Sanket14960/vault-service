const request = require('supertest');
const app = require('../../src/routes/index');

test('missing field error', async () => {
  await request(app).post('/users').send({
    username: " ",
    password: " "
  })
  .expect(400)
})

test('to see if username exists', async () => {
  await request(app).post('/users').send({
    username: " ",
    password: " "
  })
  .expect(400)
})
