const express = require('express');
const router = express.Router();
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
			const hash_key = lib.hash_key(input_pw, salt_key);

			if( user_pw === hash_key ){
				//TODO CREATE Session
				lib.rtn.success = true;
				lib.rtn.data = 'success';
				req.session.passport = result[0];
			} else {
				lib.rtn.success = false;
				lib.rtn.data = 'fail';
			}
		}
		mysql.close();
		res.json(lib.rtn_result());
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = router;

