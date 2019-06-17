import express from 'express';
import body_parser from 'body-parser';
import routes from './routes/Routes';
import pg from 'pg';
import DbSet from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

app.use(routes);

app.listen(PORT, () =>{ console.log(`Listening on port ${PORT}`)});

export default app