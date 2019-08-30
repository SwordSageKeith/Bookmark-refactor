const bookmarkService = {
  getAll(db){
    return db('bookmarks').select('*');
  },
  getSearch(db, query){
    return db.from('bookmarks').select('*').where('id', query).first();
  }
}

module.exports = bookmarkService;