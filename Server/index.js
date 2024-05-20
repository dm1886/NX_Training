import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import scoresfile from './scores.js'

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



app.get('/pilots', async (req, res) => {
  try {
    // SQL query to join amu_users with licenses table
    const queryText = `
      SELECT u.id, u.staff_number, u.name, u.surname, u.rank,
             l.license_type, l.number, l.issue_date, l.expire_date,ir_expire_date, l.type
      FROM amu_users u
      LEFT JOIN licenses l ON u.id = l.user_id; 
    `;

    const result = await db.query(queryText);
    console.log(result.rows); // Debugging the raw output

    // Reduce the result set into grouped data by user id
    const pilots = result.rows.reduce((acc, row) => {
      const staffNumberStr = row.staff_number ? row.staff_number.toString() : 'Not available';
      
      // Initialize the pilot data structure if not already present
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          staff_number: staffNumberStr,
          name: row.name,
          surname: row.surname,
          rank: row.rank,
          licenses: []  // Prepare an array to hold licenses
        };
      }

      // Add license info if present
      if (row.license_type && row.number) {
        acc[row.id].licenses.push({
          license_type: row.license_type,
          number: row.number,
          issue_date: row.issue_date,
          expire_date: row.expire_date,
          ir_expire_date: row.ir_expire_date,
          type: row.type,

        });
      }
      return acc;
    }, {});
    
    console.log("SERVER response to get /pilots: " + JSON.stringify(pilots)); // Proper logging
    res.json(Object.values(pilots));  // Convert the accumulated object back to array for response
    // console.log('contain: ', pilots.licenses.length)
  } catch (error) {
    console.error('Failed to fetch pilots:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Endpoint to get the last report_id
app.get('/lastReportId', async (req, res) => {
  try {
    const result = await db.query('SELECT report_id FROM reports ORDER BY report_id DESC LIMIT 1');
    const lastReportId = result.rows.length > 0 ? result.rows[0].report_id : 0;
    res.json({ lastReportId });
  } catch (error) {
    console.error('Error fetching last report_id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const getOperationValue = (formData) => {
  if (formData.ftd) return 1;
  if (formData.sim) return 2;
  if (formData.aircraft) return 3;
  if (formData.line) return 4;
  if (formData.area_route_qual) return 5;
  return null;
};

const getTypeValue = (formData) => {
  if (formData.initialQualification) return 1;
  if (formData.recurrent) return 2;
  if (formData.requalification) return 3;
  if (formData.specialQualification) return 4;
  if (formData.postRelease) return 5;
  return null;
};

const getCheckFormTypeValue = (checkFormType) => {
  if (checkFormType === 'CK') return 1;
  if (checkFormType === 'TN') return 2;
  return null; // handle unexpected values if necessary
};



app.post('/saveReport', async (req, res) => {
  console.log("SERVER response to POST /saveReport", req.body);
  const { id, name, AMU_no, date, ACFT_SIM_type, reg, routeLocal, session, licenseNumber, licenseValidity, instrumentValidity, medicalValidity, simValidity, captain, firstOfficer, initialQualification, recurrent, requalification, specialQualification, postRelease, ftd, sim, aircraft, line, area_route_qual, checkFormType, instructor_id, user_id } = req.body;
  const operation = getOperationValue(req.body);
  const type = getTypeValue(req.body);
  const checkFormTypeValue = getCheckFormTypeValue(checkFormType);

  const client = await db.connect(); // MARK: Connect client
  try {
    await client.query('BEGIN'); // MARK: Start transaction

    const result = await client.query(
      `INSERT INTO reports (report_id, user_id, checkFormType, operation, type, ACFT_SIM_type, routeLocal, reg, date, session, instructor_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       ON CONFLICT (report_id) DO UPDATE SET
         user_id = EXCLUDED.user_id,
         checkFormType = EXCLUDED.checkFormType,
         operation = EXCLUDED.operation,
         type = EXCLUDED.type,
         ACFT_SIM_type = EXCLUDED.ACFT_SIM_type,
         routeLocal = EXCLUDED.routeLocal,
         reg = EXCLUDED.reg,
         date = EXCLUDED.date,
         session = EXCLUDED.session,
         instructor_id = EXCLUDED.instructor_id
       RETURNING report_id`,
      [id, user_id, checkFormTypeValue, operation, type, ACFT_SIM_type, routeLocal, reg, date, session, instructor_id]
    );

    const reportId = result.rows[0].report_id;

    // Insert scores
    const scoreResult = await scoresfile.insertScores(client, reportId);

    if (scoreResult.success) {
      await client.query('COMMIT'); // MARK: Commit transaction
      res.status(200).json({ message: "Report saved successfully", reportId: reportId });
    } else {
      throw new Error(scoreResult.message);
    }
  } catch (error) {
    await client.query('ROLLBACK'); // MARK: Rollback transaction
    console.error("Failed to save report:", error);
    res.status(500).json({ message: "Failed to save report" });
  } finally {
    client.release(); // MARK: Release client
  }
});




  //MARK: Server run on port
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://${serverIp}:${port}`);
});
