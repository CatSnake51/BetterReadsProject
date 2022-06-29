const db = require('../models/betterReadsModel.js')

const tagsController = {}

tagsController.getTags = async (req, res, next) => {
  try {
    const data = await db.query('SELECT * from tag')
    res.locals.tags = data.rows
    return next()
  } catch (err) {
    return next(err)
  }
}

tagsController.postTags = async (req, res, next) => {
  const { tag } = req.body
  try {
    const data = await db.query(`
    INSERT INTO tag (name)
    VALUES ($1)
    RETURNING * 
    `, [tag])
    res.locals.tags = data.rows[0]
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = tagsController