import dotenv from 'dotenv'

dotenv.config();

const CONFIG = {}

CONFIG.dburl=process.env.DB_URL || "myPathToDb";
CONFIG.secretkey=process.env.SECRET || 'mySecret';

export default CONFIG;
