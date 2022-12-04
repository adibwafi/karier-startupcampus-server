const express = require('express')
const ControllerJob = require('../controllers/ControllerJob')
const router = express.Router()

router.post('/add', ControllerJob.addJob)
router.get('/', ControllerJob.getJobs)
router.get('/:id', ControllerJob.getJobById)
router.patch('/:id', ControllerJob.updateStatus)
router.put('/:id', ControllerJob.editJob)
router.delete('/:id', ControllerJob.deleteJob)

module.exports = router