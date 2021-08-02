const request = require('supertest')
const app = require('../app')

const randomWord = Math.random().toString(36).substring(7)
const randomNumber = Math.floor(100000000 + Math.random() * 900000000)

describe('POST /users/create', () => {

  describe('given all data', () => {
    it('should send a 200 status', async () => {
      
      const response = await request(app).post('/users/create').send({
        email: randomWord + "@amiba.pt",
        password: "$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.",
        name: "User " + randomWord,
        address: "Rua",
        locale: "Local",
        zipcode: "postal",
        fiscalNumber: randomNumber,
        telephone: randomNumber,
        mobilePhone: randomNumber
      })
      expect('Content-Type, /json/')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('data')
    })
  })

  describe('given invalid parameters', () => {
    it('should send a 400 status', async () => {
      const response = await request(app).post('/users/create').send({
        email: "",
      })
      expect('Content-Type, /json/')
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

  describe('given repeted data', () => {
    it('should send a 400 status', async () => {
      
      const response = await request(app).post('/users/create').send({
        email: randomWord + "@amiba.pt",
        password: "$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.",
        name: "User " + randomWord,
        address: "Rua",
        locale: "Local",
        zipcode: "postal",
        fiscalNumber: randomNumber,
        telephone: randomNumber,
        mobilePhone: randomNumber
      })
      expect('Content-Type, /json/')
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('error')
    })
  })

})


describe("GET /users/", () => {
  it('should send a 200 status', async () => {
    const response = await request(app).get('/users')
    expect('Content-Type, /json/')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('data')
  })

  // it('should send a 404 status', async () => {
  //   const response = await request(app).get('/users')
  //   expect('Content-Type, /json/')
  //   expect(response.statusCode).toBe(404)
  //   expect(response.body).toHaveProperty('error')
  // })
})


// LOGIN
describe("POST /login", () => {
  describe('given user and password', () => {
    it('should send a 200 status', async () => {
      const response = await request(app).post('/users/login').send({
        email: "admin@amiba.pt",
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
        email: "admin@amiba.pt",
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

