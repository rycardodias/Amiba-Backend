const request = require('supertest')
const app = require('../app')

// LOGIN
describe("POST /login", () => {
  describe('given user and password', () => {
    it('should send a 200 status', async () => {
      const response = await request(app).post('/users/login').send({
        email: "user@galinhas.pt",
        password: "1"
      })
      expect('Content-Type, /json/')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('data')

    })
  })

  describe('given wrong data', () => {
    it('should send a 404 error', async () => {
      const response = await request(app).post('/users/login').send({
        email: "user@galinhas.pt",
        password: "12"
      })
      expect('Content-Type, /json/')
      expect(response.statusCode).toBe(404)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('given missing parameters', () => {
    it('should send a 400 error', async () => {
      const response = await request(app).post('/users/login').send({
        email: "user@galinhas.pt",
        // password: "12"
      })
      expect('Content-Type, /json/')
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

})