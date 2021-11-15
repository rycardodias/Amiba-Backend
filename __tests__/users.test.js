const request = require('supertest')
const app = require('../app')

describe('POST /users/create', () => {

  const randomWord = Math.random().toString(36).substring(7)
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000)

  it('valid - new user', async () => {
    return await request(app).post('/users/create')
      .send({
        email: randomWord + "@amiba.pt",
        password: "$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.",
        name: "User " + randomWord,
        address: "Rua",
        locale: "Local",
        zipcode: "postal",
        fiscalNumber: randomNumber,
      })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })

  it('invalid - missing parameters', async () => {
    await request(app).post('/users/create')
      .send({ email: "" })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('error')
      })
  })

  it('invalid - repeated data', async () => {
    await request(app).post('/users/create')
      .send({
        email: randomWord + "@amiba.pt",
        password: "$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.",
        name: "User " + randomWord,
        address: "Rua",
        locale: "Local",
        zipcode: "postal",
        fiscalNumber: randomNumber,
      })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('error')
      })
  })
})


describe("GET /users/", () => {
  it('valid - all users', async () => {
    await request(app).get('/users')
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })
})

describe("GET /users/id/", () => {
  it('valid - existing uuid', async () => {
    await request(app).get('/users/id/f49bff1d-cde0-4f7f-9ce3-8531dfb13ba5')
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })

  it('invalid - no uuid', async () => {
    await request(app).get('/users/id/aaa')
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('error')
      })
  })

  it('invalid - no data', async () => {
    await request(app).get('/users/id/f49bff1d-cde0-4f7f-9ce3-8531dfb13ba6')
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('error')
      })
  })
})

describe("POST /login", () => {
  it('valid - login', async () => {
    await request(app).post('/users/login')
      .send({
        email: "admin@amiba.pt",
        password: "1"
      })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })

  it('should send a 404 error', async () => {
    const response = await request(app).post('/users/login').send({
      email: "admin@amiba.pt",
      password: "12"
    })
    expect('Content-Type, /json/')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('error')
  })

  it('invalid - missing parameters', async () => {
    await request(app).post('/users/login')
      .send({ email: "user@galinhas.pt" })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('error')
      })
  })
})

