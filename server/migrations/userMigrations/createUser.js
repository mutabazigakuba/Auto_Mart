import { Pool } from 'pg';
import CONFIG from '../../config/config';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: CONFIG.dburl
});
pool.on('connect', () => {
    console.log('connected to the db');
});

const Users = () => {

    const userTable = `CREATE TABLE IF NOT EXISTS users(
            id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(50) UNIQUE  NOT NULL,
            status VARCHAR(50),
            password VARCHAR(50),
            is_admin BOOL
        );`;

    pool.query(userTable)
        .then((res) => {
            console.log("created successfully");
            pool.end()
        })
        .catch((err) => {
            console.log(err)
            pool.end()
        })

}

module.exports = { Users };

// require('make-runnable');