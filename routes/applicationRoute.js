const express = require('express')
const router = express.Router()
const ControllerApplication = require('../controllers/ControllerApplication')
const upload = require("../middlewares/multer");

router.post('/:id', upload.single("fileURL"), ControllerApplication.addApplication)
router.get('/', ControllerApplication.getApplications)

module.exports = router