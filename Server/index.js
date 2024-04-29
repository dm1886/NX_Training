import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';




const port = 3001;
const app = express();
app.use(bodyParser.json());
app.use(express.json());


//Handle Session
app.use(
  session({
    secret: "your_secret_key", // Choose a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
    }, // Set secure: true if using HTTPS
  })
);

//End of session

//setup cors options
const corsOptions = {   
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//end of cors

// Connection to the database using pg and variable dotenv
dotenv.config();

const db = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

db.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
    done();
});


app.get('/', (req, res) => {
    console.log("SERVER response to get /");
    if (req.session.isAuthenticated) {
        res.status(200).json({
          message: "Welcome to the homepage!",
          userInfo: req.session.userInfo  // Ensure userInfo is passed correctly
        });
      } else {
        console.log('Unauthorized reuqest to /');
        res.status(401).json({ error: "Unauthorized" });
      }
  });


// handle the post request into /login, the function need to query into the database if the staffname and password are correct and return an object with the name user email staff number of the user, if match use session to autenticate the user and return the user object, if not return a 401 status code
app.post('/login', (req, res) => {
    console.log("SERVER response to post Login");
    const { staffNumber, password } = req.body;
    console.log('staffnumber:', staffNumber, 'password:', password);
    // query to the database to check if the user exist field staff_number and password
    db.query('SELECT * FROM amu_users WHERE staff_number = $1 AND password = $2', [staffNumber, password], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Internal server error');
            
        } else {
            
            if (result.rows.length === 1) {
                // the user is authenticated
                req.session.userInfo = result.rows[0];
                req.session.isAuthenticated = true;
                res.status(200)
                res.json({result:'success', userInfo: req.session.userInfo});

                
            } else {
                res.status(401).send('Unauthorized');
                
            }
        }
    });
});


app.post('/logout', (req, res) => {
    // Destroy the server-side session
    req.session.destroy(err => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send({ message: 'Failed to log out' });
        }
  
        // Clear the session cookie from the client
        res.clearCookie('connect.sid');  // Make sure to use the correct session cookie name; default is 'connect.sid' for express-session
  
        // Send a success response to the client
        res.send({ message: 'Logout successful' });
    });
  });


app.get('/check-cookie', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ result: 'success' });
    } else {
        res.status(401).json({ result: 'fail' });
    }
  })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
 }
);
