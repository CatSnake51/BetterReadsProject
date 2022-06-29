const express = require('express')

const tagsController = require('../controller/tagsController')

const router = express.Router()

router.get('/', tagsController.getTags, (req, res) => {
  res.status(200).json(res.locals.tags)
})

router.post('/', tagsController.postTags, (req, res) => {
  res.status(200).json(res.locals.postedTagReview)
})

module.exports = router