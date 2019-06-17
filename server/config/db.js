import pg from 'pg';
import CONFIG from './config'

class SetDb {
    constructor(){
        this.pool = new pg.Pool({
            connectionString: process.env.DATABASE_URL || CONFIG.dburl
        });
        this.pool.on('connect', () =>{
            console.log("DB is connected");
        });
    }
}

export default SetDb;