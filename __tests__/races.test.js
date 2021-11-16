const request = require('supertest')
const app = require('../app')

const randomWord = Math.random().toString(36).substring(7)

describe("POST /races/create", () => {
  it('valid - new race', async () => {
    await request(app).post('/races/create')
      .send({
        name: randomWord,
        description: randomWord
      })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })
})

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

describe("GET /races/id", () => {
  it('valid - all races', async () => {

    const validId = (await request(app).get('/races')).body.data[0].id

    await request(app).get('/races/id/' + validId)
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })
})

describe("PUT /races/update", () => {
  it('valid - update race', async () => {

    const validId = (await request(app).get('/races')).body.data[0].id
    const randomWord2 = Math.random().toString(36).substring(7)

    await request(app).put('/races/update')
      .send({
        id: validId,
        name: randomWord2,
        description: randomWord2
      })
      .then((response) => {
        expect('Content-Type, /json/')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('data')
      })
  })
})
