const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();


router.post('/read/:bookIdx/:page', async (req, res, next) => {
	/* NO POST CHECK */
	const view_count = 5;
	const p_num = req.params.page;
	const e_page = p_num * view_count;
	const s_page = e_page - view_count;

	let query = '';
	query += `SELECT c.comment, c.star, c.date, b.title\n`;
	query += `FROM COMMENT_TBL AS c\n`;
	query += `LEFT JOIN BOOK_TBL AS b\n`;
	query += `ON c.book_idx = b.idx `;
	query += `WHERE c.book_idx = ${req.params.bookIdx}\n`;
	query += `ORDER BY c.idx DESC LIMIT ${s_page}, ${e_page};`;
	
	console.log('query', query);
	mysql.open();
	const result = await mysql.query(query);
	if( result.length !== 0 ){
		lib.rtn.success = true;
		lib.rtn.data = result;
	} else {
		lib.rtn.data = 'no data';
	}
	res.json(lib.rtn_result());
	mysql.close();
});

router.post('/write', async (req, res, next) => {
	const user_idx = req.session.passport.idx;
	const book_idx = req.post('book_idx');
	const comment = req.post('comment');
	const star = req.post('star');

	let query = '';
	query += `INSERT INTO COMMENT_TBL\n`;
	query += `(user_idx, book_idx, date, comment, star) VALUES\n`;
	query += `(${user_idx}, ${book_idx}, NOW(), '${comment}', ${star});`;
	await mysql.query(query);
	lib.rtn.success = await mysql.commit();
	res.json(lib.rtn_result());
});

router.post('/update/:idx', async (req, res, next) => {
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;
	
	if( user_id === sess_id ){
		const user_idx = req.session.passport.idx;
		const book_idx = req.post('book_idx');
		const comment = req.post('comment');
		const star = req.post('star');
		
		let query = '';
		query += `UPDATE COMMENT_TBL\n`;
		query += `user_idx = ${user_idx}\n`;
		query += `book_idx = ${book_idx}\n`;
		query += `comment = '${comment}'\n`;
		query += `star = ${star} WHERE idx = ${req.params.idx};`;
		await mysql.query(query);
		lib.rtn.success = await mysql.commit();
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
	}
	res.json(lib.rtn_result());
});

router.post('/delete/:idx', async (req, res, next) => {
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;
	
	if( user_id === sess_id ){
		await mysql.query(`DELETE FROM COMMENT_TBL WHERE idx = ${req.params.idx};`);
		lib.rtn.success = await mysql.commit();
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
	}
	res.json(lib.rtn_result());
});

router.post('/profile/:page', async (req, res, next) => {
	const user_id = req.body.user_id;
	const sess_id = req.session.passport.user_id;
	
	if( user_id === sess_id ){
		const user_idx = req.session.passport.idx;
		const p_num = req.params.page;
		const e_page = p_num * 10;
		const s_page = e_page - 10;
		let query = '';
		query += `SELECT c.comment, c.star, c.date, b.title\n`;
		query += `FROM COMMENT_TBL AS c\n`;
		query += `LEFT JOIN BOOK_TBL AS b\n`;
		query += `ON c.book_idx = b.idx`;
		query += `WHERE c.user_idx = ${user_idx}\n`;
		query += `ORDER BY c.idx DESC LIMIT ${s_page}, ${e_page};`;
		const result = await mysql.query(query);
		lib.rtn.success = true;
		lib.rtn.data = result;
	} else {
		lib.rtn.data = '접근 권한이 없습니다.';
	}
	res.json(lib.rtn_result());
});

module.exports = router;

