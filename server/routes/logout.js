const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

router.post('/', (req, res, next) => {
	req.logout();
	req.session.passport = null;
	lib.rtn.success = true;
	lib.rtn.succ_desc = 'logout!';
	res.json(lib.rtn_result());
});

module.exports = router;

