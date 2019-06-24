import express from 'express';
import body_parser from 'body-parser';
import routes from './routes/Routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

app.use(routes);

app.use('*', (req,res) =>{
    res.status(405).send({
        "status": 405,
        "error": "Method Not Allowed"
    });
});

app.listen(PORT, () =>{ console.log(`Listening on port ${PORT}`)});

export default app