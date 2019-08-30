const bookmarkService = require("../src/bookmarkService");
require('dotenv').config();
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: process.env.TEST_URL
});

describe('Bookmark service', () => {
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

  afterEach(() => {
    return db("bookmarks").truncate();
  });
  beforeEach(() => {
    return db.into("bookmarks").insert(testItems);
  });

  it ('Should get an array with appropriate keys of length 3', () => {
    return bookmarkService.getAll(db).then(res => {
      expect(res).to.be.an("Array");
      expect(res[0]).to.have.all.keys(
        "id", "name", "url", "descrip", "rating"
      );
      expect(res.length).to.equal(3);
    });
  });

  it ('Should get back 1 item from id search', () => {
    return bookmarkService.getSearch(db, 2).then(res => {
      expect(res).to.have.all.keys(
        "id", "name", "url", "descrip", "rating"
      );
      expect(res.id).to.equal(2);
    })
  })

})