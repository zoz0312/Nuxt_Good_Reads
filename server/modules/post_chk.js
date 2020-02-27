const database = require('../modules/mysql');
let mysql = new database();

const post_chk = async (req, res, next) => {
	if( req.method === 'POST' ){
		/* POST */
		const user_id = req.post('user_id');
		const sess_id = req.session.passport ? req.session.passport.user_id : null;

		/* SSR */
		const user_pw = req.post('user_pw');
		const user_idx = req.post('idx');

		let chk_flag = false;

		if( !!user_id && !!sess_id ){ /* POST */
			if( user_id === sess_id ){
				// 전송한 ID와 session ID가 일치함
				chk_flag = true;
			}
		} else if( !!user_pw && !!user_idx ){ /* SSR */
			mysql.open();
			const query = `SELECT user_id FROM USER_TBL WHERE idx = ${user_idx} AND user_pw = '${user_pw}'`;
			const result = mysql.query(query);
			if( result.length !== 0 ){
				// 값을 전송한 USER의 인증절차 성공
				chk_flag = true;
			}
			mysql.close();
		}

		if( chk_flag ){
			next();
		} else {
			res.json({ session: false, data: '접근 권한이 없습니다.'});
			res.end();
		}
	} else {
		next();
	}
}
module.exports = post_chk;
