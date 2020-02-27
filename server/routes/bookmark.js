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

router.post('/mybook/:page', async (req, res, next) => {
	const p_num = req.params.page;
	const view_count = 5;
	const e_page = p_num * view_count;
	const s_page = e_page - view_count;
	mysql.open();
	let query = `SELECT book.idx, book.title, book.author, book.image\n`;
	query += `FROM BOOK_TBL AS book\n`;
	query += `LEFT JOIN BOOKMARK_TBL AS mk\n`;
	query += `ON book.idx = mk.book_idx\n`;
	query += `WHERE mk.user_idx = ${req.session.passport.idx}\n`;
	query += `ORDER BY book.idx DESC LIMIT ${s_page}, ${view_count};`;

	const result = await mysql.query(query);
	lib.rtn.success = true;
	lib.rtn.data = result;
	res.json(lib.rtn_result());
});
module.exports = router;

