const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

const is_user = async (user_id) => {
	let query = `SELECT * FROM USER_TBL WHERE user_id = '${user_id}';`;
	mysql.open();
	const result = await mysql.query(query);
	mysql.close();
	
	if( result.length === 0 ){
		return result[0];
	} else {
		return false;
	}
};

passport.use('kakao-login', new KakaoStrategy(lib.auth.kakao,
	async (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		const user_id = `${profile.id}`;
		
		const chk_user = is_user(user_id);
		if( !chk_user ){
			mysql.open();
			//Create User
			const email = profile._json.kakao_account.email;
			const name = profile._json.properties.nickname;
			const salt = lib.salt();
			const hash_key = lib.hash_key(user_id, salt);

			let query2;
			query = `INSERT INTO USER_TBL\n`;
			query += '(user_id, user_pw, email, nickname, create_date, user_lvl, salt_key, kakao)\nVALUES';
			query += `('${user_id}', '${hash_key}', '${email}', '${name}', NOW(), '2', '${salt}', '1');`;
			const result = await mysql.query(query);
			mysql.close();
			return done(null, result[0]);
		} else {
			//Already Have User
			return done(null, chk_user);
		}
	})
);

router.get('/kakao', passport.authenticate('kakao-login'));
router.get('/kakao/callback', passport.authenticate('kakao-login', {
		successRedirect: '/',
		failureRedirect: '/fail'
	})
);
module.exports = router;

