const express = require('express');
const logger = require('./logger');
const bodyParser = express.json();
const uuid = require('uuid/v4');
const bookmarkService = require('./bookmarkService');
require('dotenv').config();
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: process.env.TEST_URL
});

const bookmarkRouter = express.Router();

bookmarkRouter.route('/')
.get((req, res) => {
  //logger.info('returning bookmarks')
  bookmarkService.getAll(db)
  .then(data => {
    return res.status(200).json(data);
  });
  

})
.post(bodyParser, (req, res) => {
  const { title, url } = req.body

  if (!title || !url) {
    logger.error('url or title not provided')
    return res
      .status(400)
      .send('Must provide a title and url');
  }

  const newBook = {id: uuid(), title, url}
  //bookmarks.push(newBook);
  logger.info('made new book')
  res 
    .status(201)
    .send(newBook.id)

})

bookmarkRouter.route('/:id')
.get((req, res) => {
  id = req.params.id;
  bookmarkService.getSearch(db, id)
  .then(data => {
    if(data === undefined){
      return res.status(404).send('No item with that id found');
    } else {
      return res.status(200).json(data);
    }
    
  });
})
.delete((req, res) => {
  id = req.params.id;
  for (let i=0; i<bookmarks.length; i++) {
    if (bookmarks[i].id === id) {
      //bookmarks.splice(i, 1)
      logger.info('deleted item with id '+id)
      return res
        .status(202)
        .send('successfully deleted')
    }
  }
  logger.error('no book with provided id')
  return res
    .status(400)
    .send('No book with that ID, cannnot delete it')
})

module.exports = bookmarkRouter;