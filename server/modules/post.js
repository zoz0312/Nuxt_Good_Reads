const post_middleware = (req, res, next) => {
	req.post = (key_) => {
		if( req.body ){
			if( key_ === undefined ){
				const keys = Object.keys(req.body);
				let rtn = {};
				for( let i=0; i<keys.length; i++ ){
					const key1 = keys[i];
					const val1 = req.body[key1];
					const k_type = typeof key1;
					if( k_type == 'object' ){
						//TODO: check object
					} else if( k_type == 'undefined' ){
						//TODO: XSS & SQL INJECTION
						rtn[key1] = val1;
					}
				}
				return rtn;
			} else {
				let rtn = null;
				const val = req.body[key_];
				if( val !== undefined ){
					rtn = val;
				} else {
					rtn = '';
				}
				return rtn;
			}
		}
	}
	next();
}

module.exports = post_middleware;

