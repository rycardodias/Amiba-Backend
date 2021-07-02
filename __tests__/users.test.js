const request = require('supertest')
const app = require('../app')



describe("POST /login", () => {
  describe('given user and password', () => {
    //should have a token
    it('should send a 200 status', async () => {
      const response = await request(app).post('/users/login').send({
        email: "user@galinhas.pt",
        password: "1"
      })
    
      expect(response.statusCode).toBe(200)
       expect(response.body).toHaveProperty('data')
      expect('Content-Type, /json/')
    })
  })
})