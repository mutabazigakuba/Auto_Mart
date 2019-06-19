import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {}

CONFIG.dburl="postgres://postgres:1234@localhost:5432/automart";
CONFIG.secretkey="SECRET1234";

module.exports = CONFIG;
