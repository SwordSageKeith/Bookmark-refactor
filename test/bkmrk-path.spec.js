const app = require("../src/app");
require('dotenv').config();
const request = require('supertest');
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: process.env.TEST_URL
});

describe('Handles get requests from the server', () => {
  let testItems = [
    {
      name: 'Google',
      url: 'test 1',
    },
    {
      name: 'Twitter',
      url: 'test 2',
    },
    {
      name: 'Imgur',
      url: 'test 3',
    }
  ];
  before(() => {
    return db('bookmarks').truncate();
  });

  /*afterEach(() => {
    console.log('Deleting test data');
    return db("bookmarks").truncate();
  });*/

  beforeEach(() => {
    return db('bookmarks').truncate();
  });
  beforeEach(() => {
    return db.into("bookmarks").insert(testItems);
  });

  it('responds to / calls', () => {
    return request(app)
    .get('/bookmarks')
    .expect(200)
    .then(actual => {
      expect(actual.body[0]).to.have.all.keys('id', 'name', 'descrip', 'url', 'rating')
    });
  });

  it('returns the correct item on a search', () => {
    return request(app)
    .get('/bookmarks/2')
    .expect(200)
    .then(actual => {
      console.log(actual.body);
      expect(actual.body).to.have.all.keys('id', 'name', 'descrip', 'url', 'rating');
      expect(actual.body.id).to.equal(2);
    });
  });

});