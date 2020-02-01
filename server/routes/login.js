const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();


router.post('/', (req, res, next) => {
	const input_id = req.post('user_id');
	const input_pw = req.post('user_pw');
	let query;

	query = `SELECT * FROM USER_TBL WHERE user_id = '${input_id}';`;

	mysql.open();
	mysql.query(query).then((result) => {
		if( result.length === 0 ){
				lib.rtn.success = false;
				lib.rtn.data = 'fail'; // No Id
		} else {
			const { user_pw, salt_key } = result[0];
			const hash_key = crypto.createHash('sha512').update(input_pw + salt_key).digest('hex');

			if( user_pw === hash_key ){
				//TODO CREATE Session
				lib.rtn.success = true;
				lib.rtn.data = 'success';
			} else {
				lib.rtn.success = false;
				lib.rtn.data = 'fail';
			}
		}
		res.json(lib.rtn_result());
		mysql.close();
	}).catch((err) => {
		res.json(err);
	});
/*
	const salt = Math.round((new Date().valueOf() * Math.random())) + '';
	const hash_key = crypto.createHash('sha512').update(user_pw + salt).digest('hex');

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
	*/
});

module.exports = router;

