const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();


router.post('/', (req, res, next) => {
	/*
	mysql.open();
	*/
	lib.rtn.success = true;
	lib.rtn.succ_desc = '성공!';
	res.send(lib.rtn_result());
	res.end();
});

module.exports = router;

