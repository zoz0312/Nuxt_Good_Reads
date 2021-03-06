const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

router.post('/read/profile/:page', (req, res, next) => {
	/* POST CHECK */
	const user_id = req.post('user_id');
	const view_count = 5;
	const p_num = req.params.page;
	const e_page = p_num * view_count;
	const s_page = e_page - view_count;

	let query = '';
	query += `SELECT c.idx AS commentIdx, c.comment, c.star, c.create_date, b.idx as bookIdx, b.title, user.user_id, user.nickname, user.profile\n`;
	query += `FROM COMMENT_TBL AS c\n`;
	query += `LEFT JOIN BOOK_TBL AS b\n`;
	query += `ON c.book_idx = b.idx `;
	query += `LEFT JOIN USER_TBL AS user\n`;
	query += `ON user.idx = c.user_idx\n`;
	query += `WHERE user.user_id = '${user_id}'\n`;
	query += `ORDER BY c.idx `;
	query += `DESC LIMIT ${s_page}, ${view_count};`;
	mysql.open();
	mysql.query(query).then((result) => {
		if( result.length !== 0 ){
			lib.rtn.success = true;
			lib.rtn.data = result;
		} else {
			lib.rtn.data = 'no data';
		}
		res.json(lib.rtn_result());
		mysql.close();
	}).catch((err) => {
		console.log('comment read err', err);
		res.json(lib.rtn_result());
		mysql.close();
	});
});

router.post('/read/:bookIdx/:page', (req, res, next) => {
	/* NO POST CHECK */
	const view_count = 5;
	const p_num = req.params.page;
	const e_page = p_num * view_count;
	const s_page = e_page - view_count;

	let query = '';
	query += `SELECT c.idx AS commentIdx, c.comment, c.star, c.create_date, b.idx as bookIdx, b.title, user.user_id, user.nickname, user.profile\n`;
	query += `FROM COMMENT_TBL AS c\n`;
	query += `LEFT JOIN BOOK_TBL AS b\n`;
	query += `ON c.book_idx = b.idx `;
	query += `LEFT JOIN USER_TBL AS user\n`;
	query += `ON user.idx = c.user_idx\n`;
	query += `WHERE c.book_idx = ${req.params.bookIdx}\n`;
	query += `ORDER BY c.idx `;
	query += `DESC LIMIT ${s_page}, ${view_count};`;

	mysql.open();
	mysql.query(query).then((result) => {
		if( result.length !== 0 ){
			lib.rtn.success = true;
			lib.rtn.data = result;
		} else {
			lib.rtn.data = 'no data';
		}
		res.json(lib.rtn_result());
		mysql.close();
	}).catch((err) => {
		console.log('comment read err', err);
		res.json(lib.rtn_result());
		mysql.close();
	});
});

router.post('/info/:bookIdx', (req, res, next) => {
	const p_num = req.params.page;

	let query = '';
	query += `SELECT COUNT(idx) AS commentCnt, `;
	query += `ROUND(AVG(star), 1) AS avgStar `;
	query += `FROM COMMENT_TBL `;
	query += `WHERE book_idx = ${req.params.bookIdx};`;

	mysql.open();
	mysql.query(query).then((result) => {
		console.log('query rtn', result);
		lib.rtn.data = result[0];
		res.json(lib.rtn_result());
		mysql.close();
	}).catch((err) => {
		console.log('comment read err', err);
		res.json(lib.rtn_result());
		mysql.close();
	});
});

router.post('/write', async (req, res, next) => {
	/* POST */
	const user_idx = req.session.passport.idx;
	const book_idx = req.post('bookIdx');
	const comment = req.post('comment');
	const star = req.post('star');
	
	let query = '';
	query += `INSERT INTO COMMENT_TBL\n`;
	query += `(user_idx, book_idx, create_date, comment, star) VALUES\n`;
	query += `(${user_idx}, ${book_idx}, NOW(), '${comment}', ${star});`;
	mysql.open();
	await mysql.query(query);
	mysql.close();
	lib.rtn.success = true;
	//lib.rtn.success = await mysql.commit();
	res.json(lib.rtn_result());
});

router.post('/update', (req, res, next) => {
	/* POST */
	const comment_idx = req.post('commentIdx');
	const user_idx = req.session.passport.idx;
	const book_idx = req.post('bookIdx');
	const comment = req.post('comment');
	const star = req.post('star');

	let query = '';
	query += `UPDATE COMMENT_TBL SET\n`;
	query += `user_idx = ${user_idx},\n`;
	query += `book_idx = ${book_idx},\n`;
	query += `comment = '${comment}',\n`;
	query += `star = ${star} WHERE idx = ${comment_idx};`;
	mysql.open();
	mysql.query(query).then((result) => {
		return mysql.commit();
	}).then((result) => {
		lib.rtn.success = true;
		res.json(lib.rtn_result());
		mysql.close();
	}).catch(() => {
		res.json(lib.rtn_result());
		mysql.close();
	});
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


module.exports = router;

