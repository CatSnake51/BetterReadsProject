const express = require('express')

const booksController = require('../controller/booksController.js')
const reviewsController = require('../controller/reviewsController.js')
const tagReviewLinkController = require('../controller/tagReviewLinkController.js')

const router = express.Router()

router.get("/", reviewsController.getReviews, (req, res) => {
  res.status(200).json(res.locals.reviews)
})

router.post("/", booksController.getBookId, reviewsController.postReviews, tagReviewLinkController.postTagReview, (req, res) => {
  res.status(200).json({...res.locals.postedReviews, tags: res.locals.postedTagReview})
})

router.delete("/:reviewId", reviewsController.deleteReviews, (req, res) => {
  res.status(200).json({message: 'Successful deletion'})
})

module.exports = router