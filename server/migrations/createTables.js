import pool from '../config/connectDB'
import '@babel/polyfill'

const Users = async () => {
    try {
        const userTable =
            `CREATE TABLE IF NOT EXISTS users(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                email VARCHAR(50) UNIQUE  NOT NULL,
                password VARCHAR(50),
                is_admin BOOL,
                address VARCHAR(50)
            );

            CREATE TABLE IF NOT EXISTS orders(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                car_id VARCHAR(50),
                created_on DATE DEFAULT CURRENT_DATE,
                status VARCHAR(50),
                price VARCHAR(50),
                price_offered VARCHAR(50)
            );
            
            CREATE TABLE IF NOT EXISTS cars(
                id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
                owner VARCHAR(50),
                created_on DATE DEFAULT CURRENT_DATE,
                state VARCHAR(50),
                status VARCHAR(50),
                price VARCHAR(50),
                manufacturer VARCHAR(50),
                model VARCHAR(50),
                body_type VARCHAR(50)
            );`;

        const answer = await pool.query(userTable);
        console.log("Tables created Successfully");
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

Users();