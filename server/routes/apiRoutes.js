const express = require('express');
const router = express.Router();

const {Jobs, JobDetails} = require('../models/jobs')
const jwtAuth = require('../middleware/jwtAuth');

//all job api 
router.get('/job', jwtAuth, async(req, res) => {
    try {
        // Add your logic here
    } catch(e) {
        console.log('/job', e)
        res.status(500).json({message:"Internal Server error.."})
    }
});
module.exports = router;
