import {Pool} from 'pg';
import CONFIG from './config';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || CONFIG.dburl
});
pool.on('connect', () => {
    console.log('connected to the db automart');
});

export default pool;



