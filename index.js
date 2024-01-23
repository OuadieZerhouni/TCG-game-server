const connectDB = require('./database'); // Replace with the actual path to your connection file.
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));

const {checkJwt} = require('./middlewares/authMiddleware');

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
// const userCardRoute      = require('./routes/userCardRoute');
const userCardRelatedRoute  = require('./routes/userCardRelatedRoute');
app.get('/api/authCheck',
 (req, res) => {
  res.status(200).json({ isAuth: true });
});
// Register the routes.
app.get('/api/minVersion', (req, res) => {
// app.use('/', kingdomRoute);
  res.json({ version: '0.1.0' });
});
app.use('/api/abilities', abilityRoute);
app.use('/api/cards', cardRoute);
app.use('/api/decks', deckRoute);
app.use('/api/equipments', equipmentRelatedRoute);
app.use('/api/levels', levelRoute);
// app.use('/api/profiles', profileRoute);
app.use('/api/room', roomRoute);
app.use('/api/user-cards', userCardRelatedRoute);
app.use('/api/users', userRoute);

// default route
app.get('/', (req, res) => {
  // header 404
  res.status(404).send('route not found');
});
// Call the connectDB function to establish a MongoDB connection.
connectDB();


// Run the server.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});