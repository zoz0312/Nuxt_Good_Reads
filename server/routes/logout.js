const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

router.get('/', (req, res, next) => {
	req.logout();
	console.log('/logout session?', req.session);
	res.redirect('/');
});

module.exports = router;

