const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();


router.post('/read', async (req, res, next) => {
	const user_pw = req.post('user_pw');
	const user_idx = req.post('idx');

	let query = '';
	query += 'SELECT user_id, create_date, last_login_date, email, nickname, profile, social_kakao\n';
	query += `FROM USER_TBL WHERE idx = ${user_idx} AND user_pw = '${user_pw}';`;
	mysql.open();
	const result = await mysql.query(query);
	lib.rtn.success = true;
	lib.rtn.data = result[0];
	res.json(lib.rtn_result());
	mysql.close();
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

