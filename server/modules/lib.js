const server_config = require('/home/ahnhc/nomad_config.json');
const crypto = require('crypto');

function constructor(){
	this.rtn = {
		success: false,
		data: null,
		succ_desc: '',
		fail_desc: ''
	}
	this.rtn_result = () => {
		const tmp = Object.assign({}, this.rtn);
		this.rtn.success = false;
		this.rtn.data = null;
		this.rtn.succ_desc = '';
		this.rtn.fail_desc = '';
		return tmp;
	}
}
constructor.prototype.is_val = (val) => {
	if( val === undefined ){
		return false;
	}
	if( val === null ){
		return false;
	}
	if( val === '' ){
		return false;
	}
	if( val === NaN ){
		return false;
	}
	return true;
}
constructor.prototype.auth = server_config.auth;
constructor.prototype.salt = () => {
	return Math.round((new Date().valueOf() * Math.random())) + '';
};
constructor.prototype.hash_key = (value, key) => {
	return crypto.createHash('sha512').update(value + key).digest('hex');
};
constructor.prototype.host = server_config.host;

module.exports = constructor;
