import express from 'express';
import body_parser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

app.get('/', (req, res) =>{
    res.send('Hello Auto Mart');
});

app.listen(PORT, () =>{ console.log(`Listening on port ${PORT}`)});