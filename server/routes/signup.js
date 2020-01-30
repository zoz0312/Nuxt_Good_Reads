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
	const user_id = req.post('user_id');
	const user_pw = req.post('user_pw');
	const email = req.post('user_email');
	const name = req.post('name');
	
	let query = '';
	query += 'INSERT INTO USER_TBL\n';
	query += '(user_id, user_pw, email, nickname, create_date, user_lvl)\nVALUES';
	query += `('${user_id}', '${user_pw}', '${email}', '${name}', NOW(), '2');`;
	mysql.open();
	mysql.query(query).then((result) => {
		lib.rtn.success = true;
		//lib.rtn.succ_desc = result;
		res.send(lib.rtn_result());
		return mysql.close();
	}).then((result) => {
		res.end();
	}).catch((err) => {
		res.send(err);
		res.end();
	});
});

module.exports = router;

