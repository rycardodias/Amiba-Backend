const request = require('supertest')
const app = require('../app')

describe("GET /races", () => {
    it('valid - all races', async () => {
      await request(app).get('/races')
        .then((response) => {
          expect('Content-Type, /json/')
          expect(response.statusCode).toBe(200)
          expect(response.body).toHaveProperty('message')
          expect(response.body).toHaveProperty('data')
        })
    })
  })
