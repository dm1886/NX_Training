import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';


const port = process.env.PORT || 3001;
// This should ideally be your local network IP or domain name if set in the .env file
const serverIp = process.env.API_URL || 'localhost:3001';
const app = express();
app.use(bodyParser.json());
app.use(express.json());


//MARK: Handle Session
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

//TODO: setup cors options
dotenv.config();
const allowedOrigins = ['http://localhost:3000', `http://${serverIp}:3000`, 'http://192.168.50.52:3000', 'http://192.168.50.10:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Origin of request ${origin}`);  // Log the origin to see what is being checked
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      console.log('Allowed CORS for:', origin);
      callback(null, true); // Origin is allowed
    } else {
      console.log('Blocked CORS for:', origin);
      callback(new Error('CORS not allowed for this origin')); // Origin is not allowed
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight across-the-board
//end of cors

// MARK: DB Connection
const db = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database at:', res.rows[0].now);
    }
});


// MARK: Routes server
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


//MARK: Login
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

//MARK: Logout
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


  //MARK: Check Cookie
app.get('/check-cookie', (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).json({ result: 'success' });
    } else {
        res.status(401).json({ result: 'fail' });
    }
  })

  //MARK: Get Users
app.get('/users', (req, res) => {
    console.log("SERVER response to get /users");
    if (req.session.isAuthenticated) {
        db.query('SELECT * FROM amu_users', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).send('Internal server error');
            } else {
                console.log("SERVER response sending the users " + result.rows.length);
                res.status(200).json(result.rows);
            }
        });
    } else {
        console.log('Unauthorized request to /users');
        res.status(401).json({ error: "Unauthorized" });
    }
});
//TODO: Get User by ID 
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('DELETE FROM amu_users WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: "Error deleting user" });
    }
  });

 //MARK: Create new User
  app.post('/users', (req, res) => {
    console.log("SERVER response to POST /users");
    const {id, staff_number, name, surname, email, access_level, password, rank, instructor_type } = req.body;
    
    const query = `
      INSERT INTO amu_users (id, staff_number, name, surname, email, access_level, password, rank, instructor_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9)
      ON CONFLICT (id) DO UPDATE
      SET staff_number = EXCLUDED.staff_number,
          name = EXCLUDED.name,
          surname = EXCLUDED.surname,
          email = EXCLUDED.email,
          access_level = EXCLUDED.access_level,
          password = EXCLUDED.password,
          rank = EXCLUDED.rank,
          instructor_type = EXCLUDED.instructor_type
      RETURNING *;
    `;
  
    db.query(query, [id, staff_number, name, surname, email, access_level, password, rank, instructor_type ], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal server error');
      } else {
        // If the row was updated, the RETURNING * clause will return the updated row.
        res.status(201).json(result.rows[0]);
      }
    });
  });
  
  //MARK: Delete the user by ID
  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Received ID for deletion:", id);  // This will show what ID is actually received.
  
    try {
      const deleteQuery = 'DELETE FROM amu_users WHERE id = $1';
      const result = await db.query(deleteQuery, [id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: "Error deleting user" });
    }
  });

  // Assuming Express app setup is done and 'app' is your Express instance
app.get('/licensesforid', async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId:", userId);  // This will show what ID is actually received.
  try {
    const result = await db.query(
      'SELECT id, license_type, number, issue_date, expire_date, type FROM licenses WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
    console.log("SERVER response to get /licensesforid");
    console.log(result.rows);
  } catch (error) {
    console.error('Error retrieving licenses:', error);
    res.status(500).send('Failed to retrieve licenses');
  }
});

  //MARK: Server run on port
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://${serverIp}:${port}`);
});
