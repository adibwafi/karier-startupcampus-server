const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const applicationRoute = require('./applicationRoute')
const jobRoute = require('./jobRoute')

router.use('/', userRoute)
router.use('/jobs', jobRoute)
router.use('/applications', applicationRoute)

module.exports = router