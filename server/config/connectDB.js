import {Pool} from 'pg';
import CONFIG from './config';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || CONFIG.dburl
});

export default pool;



