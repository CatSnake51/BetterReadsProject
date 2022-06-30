const db = require("../models/betterReadsModel.js"); 

const reviewsController = {}; 


// Gets all reviews from the database
reviewsController.getReviews = async (req, res, next) => {
  try {
    const reviewData =  await db.query(`
    SELECT review.*, book.name, book.author, string_agg(tag.name, ',') AS tags
    FROM review 
    INNER JOIN book ON review.book_id = book.book_id
    LEFT OUTER JOIN review_tag_link ON review.review_id = review_tag_link.review_id
    LEFT OUTER JOIN tag ON review_tag_link.tag_id = tag.tag_id
    GROUP BY review.review_id, book.name, book.author
    `)
 
  
    res.locals.reviews = reviewData.rows
    return next()
  } catch(err) {
    console.log(err)
    return next(err);
  }
}

// posting reviews to the database 
reviewsController.postReviews = async (req, res, next) => {
  const { comments, plotline, unpredictability, 
    pace, writing_style, ending, overall } = req.body
  try {
    if (!comments || !plotline || !unpredictability || !pace || !writing_style || !ending || !overall) return next({ message: {err: 'Invalid review information in body'} })
    const data = await db.query(`
    INSERT INTO review (book_id, comments, plotline, unpredictability, pace, writing_style, ending, overall)  
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `, [res.locals.bookId, comments, plotline, unpredictability, pace, writing_style, ending, overall])
    res.locals.postedReviews = data.rows[0]
    return next()
  } catch(err) {
    console.log(err)
    return next({message: err})
  }
}

// Deletes a review from the database
reviewsController.deleteReviews = async (req, res, next) => {
  try {
    const data = await db.query(`
    DELETE FROM review 
    WHERE review_id = $1
    RETURNING *
    `, [req.params.reviewId])
    if (!data.rowCount) return next({log:'Review not found', message: {err: 'Review is not found'}})
    return next()
  } catch(err) {
    console.log(err)
    return next({message: 'Error in Review'})
  }
}

module.exports = reviewsController