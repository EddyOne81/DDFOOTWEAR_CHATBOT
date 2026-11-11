const express = require('express');
const { createOrder } = require('../controllers/webhookController');

const router = express.Router();

router.post('/', createOrder);

module.exports = router;
