const post_chk = (req, res, next) => {
	/* POST */
	if( req.method === 'POST' ){
		const user_id = req.post('user_id');
		const sess_id = req.session.passport.user_id;
		if( user_id === sess_id ){
			console.log('post_chk PASS!');
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
