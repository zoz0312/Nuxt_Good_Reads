const express = require('express');
const router = express.Router();
const libs = require('./modules/lib');
let lib = new libs();

router.all('/', (req, res, next) => {
	//console.log("ALL IN");
	next();
});

module.exports = router;

