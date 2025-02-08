/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */


const connectDB = require('../Config/database'); // Replace with the actual path to your connection file.
const express = require('express');
const fs = require('fs');
const app = express();
const https = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken')
// imnport dotenv
require('dotenv').config();
const port = process.env.PORT_NUMBER;
require('./socket/socket')
const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));

const {checkJwt} = require('./middlewares/authMiddleware');
// print any route that is called
// app.use((req, res, next) => {
//   console.log(`Route: ${req.url}`);
//   next();
// });
// Add the ability to parse JSON.
app.use(express.json({ extended: false }));

// Import the routes.
const abilityRoute            = require('./routes/abilityRoute');
const cardRoute               = require('./routes/cardRoute');
const deckRoute               = require('./routes/deckRoute');
const equipmentRelatedRoute   = require('./routes/equipmentRelatedRoute');
const levelRoute              = require('./routes/levelRoute');
const battleRoute             = require('./routes/battleRoute');
const userRoute               = require('./routes/userRoute');
const userCardRoute           = require('./routes/userCardRoute');

app.use('/api/users', userRoute); // Register the user route.
app.use('/api/cards', cardRoute); // Register the card route.

// Admin Login Route in Express.js
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const payload = {
      user: {
        _id: -1,
      },
    };
    // Create and send token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get('/api/minVersion', (req, res) => {
// app.use('/', kingdomRoute);
  res.json({ version: '0.1.0' });
});
// app.use('/api/abilities', abilityRoute);
app.use('/data', express.static(__dirname + '/data'));

app.use(checkJwt); // Register the checkJwt middleware.


app.use('/api/abilities', abilityRoute); // Register the ability route.
app.use('/api/decks', deckRoute); // Register the deck route.
app.use('/api/equipments', equipmentRelatedRoute); // Register the equipment route.
app.use('/api/levels', levelRoute); // Register the level route.
// app.use('/api/profiles', profileRoute); // Register the profile route.
app.use('/api/battleSession', battleRoute); // Register the room route.
app.use('/api/user-cards', userCardRoute); // Register the user card route.

// Register the other routes.
app.get('/api/authCheck',
 (req, res) => {
  res.status(200).json({ isAuth: true });
});

// default route
app.get('/', (req, res) => {
  // header 404
  res.status(404).send('Route not found');
});
// Call the connectDB function to establish a MongoDB connection.
connectDB();


const server = https.createServer(
//   {
//   key: fs.readFileSync(process.env.SSL_KEY_PATH),
//   cert: fs.readFileSync(process.env.SSL_CERT_PATH),
// }, 
{},
app
);

// Run the server.
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});