const mysql = require('mysql');
const server_config = require('/home/ahnhc/nomad_config.json');

function database(){
	this.connection = null;
	this.open = () => {
		this.connection = mysql.createConnection(server_config.server);
	}
	this.query = (sql) => {
		return Promise((resolve, reject) => {
			this.connection.query(sql, (err, rows) =>{
				if( err ){
					return reject(err);
				}
				resolve(rows);
			});
		});
	}
	this.close = () => {
		return Promise((resolve, reject) => {
			this.connection.end( err => {
				if( err ){
					return reject(err);
				}
				this.connection = null;
				resolve();
			});
		});
	}
}

module.exports = database;
