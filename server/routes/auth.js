const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const libs = require('../modules/lib');
let lib = new libs();
const database = require('../modules/mysql');
let mysql = new database();

passport.use('kakao-login', new KakaoStrategy(lib.auth.kakao,
	async (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		const user_id = `kakao:${profile.id}`;
		const email = profile._json.kakao_account.email;
		const name = profile._json.properties.nickname;

		let query = `SELECT * FROM USER_TBL WHERE user_id = '${user_id}';`;
		mysql.open();
		const result = await mysql.query(query);
		if( result.length === 0 ){
			//Create User
			const salt = Math.round((new Date().valueOf() * Math.random())) + '';
			const hash_key = crypto.createHash('sha512').update(user_id + salt).digest('hex');

			let query2;
			query2 = `INSERT INTO USER_TBL\n`;
			query2 += '(user_id, user_pw, email, nickname, create_date, user_lvl, salt_key)\nVALUES';
			query2 += `('${user_id}', '${hash_key}', '${email}', '${name}', NOW(), '2', '${salt}');`;
			const result2 = await mysql.query(query2);
			mysql.close();
			return done(null, result2[0]);
		} else {
			//Already Have User
			return done(null, result[0]);
		}
	})
);

router.get('/kakao', passport.authenticate('kakao-login'));
router.get('/kakao/callback', passport.authenticate('kakao-login', {
		successRedirect: '/',
		failureRedirect: '/fail'
	})
);
router.post('/kakao/callback', passport.authenticate('kakao-login', {
		successRedirect: '/',
		failureRedirect: '/fail'
	})
);
module.exports = router;

