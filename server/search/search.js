const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

router.post('/book', async (req, res, next) => {
	const type = req.post('type');
	const s_text = req.post('text');
	let filter = '';
	swtich( type ){
		case 1: filter = 'title'; break;
		case 2: filter = 'author'; break;
		default: filter = false;
	}
	if( filter ){
		let query = `SELECT idx, title FROM BOOK_TBL\n`;
		query += `WHERE ${filter} LIKE '%${s_text}%';`;
		const result = await mysql.query(query);
		lib.rtn.success = true;
		lib.rtn.data = result;
	} else {
		lib.rtn.data = '잘못된 접근입니다.';
	}
	res.json(lib.rtn_result());
});

module.exports = router;

