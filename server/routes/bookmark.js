const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

router.post('/add/:book_idx', async (req, res, next) => {
	const user_idx = req.session.passport.idx;
	const book_idx = req.params.book_idx;
	let query = '';
	query += `INSERT INTO BOOKMARK_TBL\n`;
	query += `(user_idx, book_idx, status, add_date)\nVALUES`;
	query += `('${user_idx}', '${book_idx}', 1, NOW());`;
	mysql.open();
	const result = await mysql.query(query);
	lib.rtn.success = await mysql.commit();
	lib.rtn.data = result;
	mysql.close();
	res.json(lib.rtn_result());
});

router.post('/del/:idx', async (req, res, next) => {
	mysql.open();
	let query = `DELETE FROM BOOKMARK_TBL WHERE idx = '${req.params.idx}';`;
	const result = await mysql.query(query);
	lib.rtn.success = await mysql.commit();
	lib.rtn.data = result;
	mysql.close();
	res.json(lib.rtn_result());
});

module.exports = router;

