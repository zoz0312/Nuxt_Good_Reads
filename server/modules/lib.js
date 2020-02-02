const server_config = require('/home/ahnhc/nomad_config.json');

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
constructor.prototype.auth = server_config.auth;


module.exports = constructor;
