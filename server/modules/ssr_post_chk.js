const database = require('../modules/mysql');
let mysql = new database();

const ssr_post_chk = async (req, res, next) => {
	const user_pw = req.post('user_pw');
	const user_idx = req.post('idx');

	if( req.method === 'POST' ){
		if( user_pw === undefined || user_idx === undefined ){
			res.json({ session: false, data: '로그인 후 이용해주세요.'});
			res.end();
		} else {
			mysql.open();
			const query = `SELECT user_id FROM USER_TBL WHERE idx = ${user_idx} AND user_pw = '${user_pw}'`;
			const result = await mysql.query(query);
			if( result.length !== 0 ){
				console.log('ssr_post_chk PASS!');
				next();
			} else {
				res.json({ session: false, data: '접근 권한이 없습니다.'});
				res.end();
			}
			mysql.close();
		}
	} else {
		next();
	}
}
module.exports = ssr_post_chk;
