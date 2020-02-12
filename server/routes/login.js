const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

router.post('/', (req, res, next) => {
	const input_id = req.post('username');
	const input_pw = req.post('pasword');
	let query;

	query = `SELECT * FROM USER_TBL WHERE user_id = '${input_id}';`;

	mysql.open();
	mysql.query(query).then((result) => {
		let rtn;
		if( result.length === 0 ){
			lib.rtn.success = false;
			lib.rtn.data = 'fail'; // No Id
		} else {
			const { user_pw, salt_key } = result[0];
			const hash_key = lib.hash_key(input_pw, salt_key);
			let i=0;
			if( user_pw === hash_key ){
				const data = {
					'user_id': result[0].user_id,
					'user_lvl': result[0].user_lvl
				}
				const rtn = Object.assign({}, result[0]);
				lib.rtn.success = true;
				lib.rtn.data = Object.assign({}, rtn);
				req.session.user = Object.assign({}, rtn);
				console.log('login session', req.session)
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

