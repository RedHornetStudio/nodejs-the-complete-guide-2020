const express = require('express');

const error = require('../controllers/error');

const router = express.Router();

router.get('/*', error);

module.exports = router;