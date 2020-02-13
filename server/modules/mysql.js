const mysql = require('mysql');
const server_config = require('/home/ahnhc/nomad_config.json');

function database(){
	this.connection = null;
	this.open = () => {
		this.connection = mysql.createConnection(server_config.server);
	}
	this.query = (sql) => {
		console.log('query', sql);
		return new Promise((resolve, reject) => {
			this.connection.query(sql, (err, rows) =>{
				if( err ){
					return reject({
						success: false,
						fail_desc: err
					});
				}
				resolve(rows);
			});
		});
	}
	this.commit = () => {
		return new Promise((resolve, reject) => {
			this.connection.commit((err) => {
				if( err ){
					this.connection.rollback(() => {
						reject(false);
					});
				} else {
					resolve(true);
				}
			});
		});
	}
	this.close = () => {
		return new Promise((resolve, reject) => {
			this.connection.end( err => {
				if( err ){
					return reject({
						success: false,
						fail_desc: err
					});
				}
				this.connection = null;
				resolve();
			});
		});
	}
}

module.exports = database;
