const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

router.post('/all/:page', async (req, res, next) => {
	/* SSR POST */
	const p_num = req.params.page;
	const e_page = p_num * 10;
	const s_page = e_page - 10;

	mysql.open();
	let query = `SELECT idx, title, author, image FROM BOOK_TBL ORDER BY idx DESC LIMIT ${s_page}, ${e_page};`;
	const result = await mysql.query(query);
	lib.rtn.success = true;
	lib.rtn.data = result;
	res.json(lib.rtn_result());
});

router.post('/mybook/:page', async (req, res, next) => {
	/* SSR POST */
	const idx = req.post('idx');
	const p_num = req.params.page;
	const e_page = p_num * 10;
	const s_page = e_page - 10;
	mysql.open();
	let query = `SELECT idx, title, author, image FROM BOOK_TBL WHERE user_idx = '${idx}' ORDER BY idx DESC LIMIT ${s_page}, ${e_page};`;
	const result = await mysql.query(query);
	lib.rtn.success = true;
	lib.rtn.data = result;
	res.json(lib.rtn_result());
});

router.post('/detail/:id', async (req, res, next) => {
	/* NO POST CHECK */
	let query = '';
	query += `SELECT * FROM BOOK_TBL WHERE idx = '${req.params.id}';`;
	mysql.open();
	const result = await mysql.query(query);
	if( result.length !== 0 ){
		lib.rtn.success = true;
		lib.rtn.data = result[0];
	} else {
		lib.rtn.data = 'no data';
	}
	res.json(lib.rtn_result());
	mysql.close();
});

router.post('/write', async (req, res, next) => {
	/* POST */
	const title = req.post('title');
	const author = req.post('author');
	const contents = req.post('contents');
	const image = req.post('thumbnail');

	let query = '';
	query += `INSERT INTO BOOK_TBL\n`;
	query += `(title, author, contents, user_idx, image, write_date)\nVALUES`;
	query += `('${title}', '${author}', '${contents}', '${req.session.passport.idx}', '${image}', NOW());`;
	mysql.open();
	const result = await mysql.query(query);
	lib.rtn.success = true;
	lib.rtn.data = result;
	res.json(lib.rtn_result());
});

router.post('/modify/:id', async (req, res, next) => {
	/* POST */
	const u_idx = req.post('idx');
	const b_id = req.params.id;
	mysql.open();
	const b_result = await mysql.query(`SELECT * FROM BOOK_TBL WHERE idx = ${b_id} AND user_idx = ${u_idx};`);
	if( b_result.length !== 0 ){
		const title = req.post('title');
		const author = req.post('author');
		const contents = req.post('contents');
		const image = req.post('thumbnail');

		let query = '';
		query += `UPDATE BOOK_TBL SET\n`;
		query += `title = '${title}',`;
		query += `author = '${author}',`;
		query += `contents = '${contents}',`;
		query += `image = '${image}'`;
		query += `WHERE idx = '${b_id}';`;
		const result = await mysql.query(query);
		mysql.close();
		lib.rtn.success = true;
		lib.rtn.data = result;
	} else {
		lib.rtn.data = '잘못된 접근입니다.';
	}
	mysql.close();
	res.json(lib.rtn_result());
});
module.exports = router;

