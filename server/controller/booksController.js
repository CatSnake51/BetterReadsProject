const db = require("../models/betterReadsModel.js")

const booksController = {}

// Gets a Book ID given the name and author. Creates a new book if not found.
booksController.getBookId = async (req, res, next) => {
  const { name, author } = req.body
  if (!name || !author) return next({ message: { err: 'Invalid author or name supplied in body' } })
  try {
    let data = await db.query(`
    SELECT book_id 
    FROM book
    WHERE name = $1 AND author = $2
    `, [name, author])
    if (!data.rows.length) {
      data = await db.query(`
      INSERT INTO book (name, author)
      VALUES ($1, $2)
      RETURNING *
      `, [name, author])
    }
    res.locals.bookId = data.rows[0].book_id
    return next()
  } catch (err) {
    console.log(err)
    return next({ message: err })
  }
}

module.exports = booksController
