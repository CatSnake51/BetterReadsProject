const request = require('supertest')

const server = 'http://localhost:3000'

const conditionalBruteForce = {}

describe('/api/reviews', () => {
  describe('GET', () => {
    //it has json in the reviewRouter
    it('sends back response', () => {
      return request(server)
        .get('/api/reviews')
        .expect('Content-Type', /application\/json/)
        .expect(200)
    })
      it('sends back an array', async () => {
      const res = await request(server)
        .get('/api/reviews')
        expect(Array.isArray(res.body)).toEqual(true)
    }) 
  })
  
  describe('POST', () => {
    let data 
    beforeEach(()=> {
      data = {
        name: "The BFG", 
        author: 'Ronald Dahl', 
        comments: 'Made from testing file',
        plotline: 8,
        unpredictability: 4,
        pace: 9,
        writing_style: 2,
        ending: 1,
        overall: 6
      }
    })
    
    it('sends an object on successful response with existing author', async () => {
      const res = await request(server)
        .post('/api/reviews')
        .send(data)
        .expect('Content-Type', /application\/json/)
        .expect(200)
      expect(res.body).toBeInstanceOf(Object)
      delete data.name
      delete data.author
      expect(res.body).toMatchObject(data)
      
    })

    //TODO write route for deleting books
    xit('sends an object on successful response with nonexisting author', async () => {
      data.name = 'Test Name'
      data.author = 'Test Author'
    })
    
    it('sends an error when name or author input is invalid', async () => {
      delete data.name 
      delete data.author
      let res = await request(server)
        .post('/api/reviews')
        .send(data)
        .expect('Content-Type', /application\/json/)
        .expect(400)
      expect(res.body).toEqual({err: "Invalid author or name supplied in body"})
    })
    
    it('sends an error when review info is not sent in the body', async () => {
      delete data.plotline
      delete data.pace
      let res = await request(server)
        .post('/api/reviews')
        .send(data)
        .expect('Content-Type', /application\/json/)
        .expect(400)
      expect(res.body).toEqual({err: 'Invalid review information in body'})
    })
})
})


describe('/api/reviews/:reviewId', () => {
   
   describe('DELETE', () => {

     it('returns an error if review_id is not found', async () => {
      let res = await request(server)
      //test for an id that doesnt exist
      .delete('/api/reviews/-1')
        .expect('Content-Type', /application\/json/)
        .expect(400)
      expect(res.body).toEqual({err: 'Review is not found'})
     })

     it('returns a successful response when deleted', async () => {
        let data = {
          name: "The BFG",
          author: 'Ronald Dahl',
          comments: 'Made from testing file',
          plotline: 8,
          unpredictability: 4,
          pace: 9,
          writing_style: 2,
          ending: 1,
          overall: 6
        }
       
       //Makes a new row in reviews
        let postRes = await request(server)
          .post('/api/reviews')
          .send(data)
        //Deletes the recently created row from reviews
        let res = await request(server)
          .delete(`/api/reviews/${postRes.body.review_id}`)
          .expect('Content-Type', /application\/json/)
          .expect(200)
        expect(res.body).toEqual({ message: 'Successful deletion' })
     })
   })
})