const bookmarkService = {
  getAll(db){
    return db('bookmarks').select('*');
  },
  getSearch(db, query){
    return db.from('bookmarks').select('*').where('id', query).first();
  },
  insert(db, newBookmark){
    return db.insert(newBookmark).into('bookmarks')
    .returning('*').then(rows => {
      return rows[0];
    })
  },
  deleteByID(db, id){
    return db('bookmarks')
      .where({ id })
      .delete()
  }
}

module.exports = bookmarkService;