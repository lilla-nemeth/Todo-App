const { Pool } = require('pg');

const devSettings = {
	host: process.env.PG_HOST,
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
};

const prodSettings = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: process.env.NODE_ENV === 'production' ? false : true,
	},
};

let pool;

try {
	pool = new Pool(process.env.NODE_ENV === 'production' ? prodSettings : devSettings);
} catch (error) {
	console.error('Error initializing database connection:', error);
}

module.exports = pool;
