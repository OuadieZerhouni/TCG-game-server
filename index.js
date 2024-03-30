/* Author: Ouadie ZERHOUNI
   Creation Date: 2024-01-28 01:22:07 */


const connectDB = require('./database'); // Replace with the actual path to your connection file.
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
require('./socket')
const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));

const {checkJwt} = require('./middlewares/authMiddleware');
// print any route that is called
app.use((req, res, next) => {
  console.log(`Route: ${req.url}`);
  next();
});
// Add the ability to parse JSON.
app.use(express.json({ extended: false }));

// Import the routes.
const abilityRoute          = require('./routes/abilityRoute');
const cardRoute             = require('./routes/cardRoute');
const deckRoute          = require('./routes/deckRoute');
// const deckRelatedRoute      = require('./routes/deckRelatedRoute');
const equipmentRelatedRoute = require('./routes/equipmentRelatedRoute');
// const equipmentRoute     = require('./routes/equipmentRoute');
// const kingdomRoute       = require('./routes/kingdomRoute');
const levelRoute            = require('./routes/levelRoute');
// const profileRoute       = require('./routes/profileRoute');
const roomRoute             = require('./routes/roomRoute');
// const shopRoute          = require('./routes/shopRoute');
const userRoute             = require('./routes/userRoute');
const userCardRoute      = require('./routes/userCardRoute');
// const userCardRelatedRoute  = require('./routes/userCardRelatedRoute');


app.use('/api/users', userRoute); // Register the user route.
app.use('/api/cards', cardRoute); // Register the card route.

app.get('/api/minVersion', (req, res) => {
// app.use('/', kingdomRoute);
  res.json({ version: '0.1.0' });
});

app.use(checkJwt); // Register the checkJwt middleware.

// app.use('/api/abilities', abilityRoute);
app.use('/data', express.static(__dirname + '/data'));

app.use('/api/abilities', abilityRoute); // Register the ability route.
app.use('/api/decks', deckRoute); // Register the deck route.
app.use('/api/equipments', equipmentRelatedRoute); // Register the equipment route.
app.use('/api/levels', levelRoute); // Register the level route.
// app.use('/api/profiles', profileRoute); // Register the profile route.
app.use('/api/room', roomRoute); // Register the room route.
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


// Run the server.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});