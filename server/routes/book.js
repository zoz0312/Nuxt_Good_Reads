const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

router.post('/', async (req, res, next) => {
	res.send(lib.rtn_result());
});
router.post('/all/:page', async (req, res, next) => {
	const p_num = req.params.page;
	const e_page = p_num * 10;
	const s_page = e_page - 10;

	mysql.open();
	let query = `SELECT idx, title, author, image FROM BOOK_TBL ORDER BY idx DESC LIMIT ${s_page}, ${e_page};`;
	const result = await mysql.query(query);
	lib.rtn.success = true;
	lib.rtn.data = result;
	res.send(lib.rtn_result());
	res.end();
});

router.post('/detail/:id', async (req, res, next) => {
	let query = '';
	query += `SELECT * FROM BOOK_TBL WHERE id = ${req.params.id};`;
	mysql.open();
	const result = await mysql.query(query);
	if( result.length === 0 ){
		lib.rtn.success = true;
		lib.rtn.data = result[0];
	} else {
		lib.rtn.data = 'no data';
	}
	res.json(lib.rtn_result());
	mysql.close();
});

router.post('/write', async (req, res, next) => {
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;
	if( user_id === sess_id ){
		const title = req.post('title');
		const author = req.post('author');
		const contents = req.post('contents');
		//const image = req.body.image;
		
		let query = '';
		query += `INSERT INTO BOOK_TBL\n`;
		query += `(title, author, contents, user_idx)\nVALUES`;
		query += `('${title}', '${author}', '${contents}', '${req.session.passport.idx}');`;
		const result = await mysql.query(query);
		lib.rtn.success = true;
		lib.rtn.data = result;
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
	}
	res.json(lib.rtn_result());
});

router.post('/modify/:id', async (req, res, next) => {
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;
	if( user_id === sess_id ){
		const u_idx = req.session.passport.idx;
		const b_id = req.params.id;
		const b_result = await mysql.query(`SELECT * FROM BOOK_TBL WHERE idx = ${b_id} AND user_idx = ${u_idx};`);
		if( b_result.length !== 0 ){
			const title = req.post('title');
			const author = req.post('author');
			const contents = req.post('contents');
			//const image = req.body.image;

			let query = '';
			query += `UPDATE BOOK_TBL SET\n`;
			query += `title = ${title},`;
			query += `author = ${author},`;
			query += `contents = ${contents} WHERE idx = ${b_id};`;
			const result = await mysql.query(query);
			lib.rtn.success = true;
			lib.rtn.data = result;
		} else {
			lib.rtn.data = '잘못된 접근입니다.';
		}
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
	}
	res.json(lib.rtn_result());
});
module.exports = router;

