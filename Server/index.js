import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';

const port = 3001;
const app = express();
app.use(bodyParser.json());

// Connection to the database using pg and variable dotenv
dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
    done();
});


app.get('/', (req, res) => {
    res.send('Hello World im the server express!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
 }
);
