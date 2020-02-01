const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();


router.post('/', (req, res, next) => {
	const user_id = req.post('user_id');
	const user_pw = req.post('user_pw');
	const user_pw2 = req.post('user_pw2');
	const email = req.post('user_email');
	const name = req.post('name');

	if( user_pw !== user_pw2 ){
		lib.rtn.fail_desc = '패스워드가 같지 않습니다';
		res.json(lib.rtn_result());
		return;
	}

	const salt = Math.round((new Date().valueOf() * Math.random())) + '';
	const hash_key = crypto.createHash('sha512').update(user_pw + salt).digest('hex');

	let query = '';
	query += 'INSERT INTO USER_TBL\n';
	query += '(user_id, user_pw, email, nickname, create_date, user_lvl, salt_key)\nVALUES';
	query += `('${user_id}', '${hash_key}', '${email}', '${name}', NOW(), '2', '${salt}');`;
	mysql.open();
	mysql.query(query).then((result) => {
		lib.rtn.success = true;
		lib.rtn.data = result;
		res.json(lib.rtn_result());
		mysql.close();
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = router;

