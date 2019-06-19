import { Pool } from 'pg'; 
import CONFIG from './config'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || CONFIG.dburl
});


export default {
    query(queryText, params) {
      return new Promise((resolve, reject) => {
        pool.query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
  };