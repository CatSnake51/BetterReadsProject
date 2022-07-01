const db = require('../models/betterReadsModel.js')

const tagReviewLinkController = {}


tagReviewLinkController.postTagReview = async (req, res, next) => {
  const { tags } = req.body
  const { review_id } = res.locals.postedReviews
  try {
    if (!tags) return next()
    const data = []
    for (let i = 0; i < tags.length; i++) {
      const row = await db.query(`
      INSERT INTO review_tag_link (review_id, tag_id)
      VAlUES ($1, $2)
      RETURNING *
      `, [review_id, tags[i]])
      data.push(row.rows[0])
    }
    res.locals.postedTagReview = data
    return next()
  } catch (err) {
    console.log(err)
    return next({ message: err })
  }
}

module.exports = tagReviewLinkController
