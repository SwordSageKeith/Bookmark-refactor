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
 bookmarkService.insert(db, newBook)
  .then(data => {
    return res.status(201).json(data);
  });
  logger.info('made new book')
});

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

  bookmarkService.deleteByID(db, id)
  .then(data => {
    return res.status(202).send('deleted');
  });
});

module.exports = bookmarkRouter;