const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();


router.post('/read', async (req, res, next) => {
	console.log('PROFILE!!!');
	console.log('req.body', req.body);
	console.log('req.session', req.session);
	//const name = req.post('name');
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;

	if( user_id === sess_id ){
		let query = '';
		query += 'SELECT user_id, create_date, last_login_date, email, nickname, profile, social_kakao\n';
		query += `FROM USER_TBL WHERE idx = ${req.session.passport.idx};`;
		mysql.open();
		const result = await mysql.query(query);
		lib.rtn.success = true;
		lib.rtn.data = result[0];
		res.json(lib.rtn_result());
		mysql.close();
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
		res.json(lib.rtn_result());
	}
});

router.post('/update', async (req, res, next) => {
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;

	if( user_id === sess_id ){
		const email = req.post('email');
		const nickname = req.post('nickname');
		const profile = req.post('profile');

		let query = '';
		query += `UPDATE USER_TBL SET\n`;
		query += `email = ${eamil},`;
		query += `nickname = ${nickname},`;
		query += `profile = ${profile} WHERE idx = ${req.session.passport.idx};`;
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
		res.json(lib.rtn_result());
	}
});

module.exports = router;

