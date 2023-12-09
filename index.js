const connectDB = require('./database'); // Replace with the actual path to your connection file.
const express = require('express');
const app = express();
const port = 3000;
const {checkJwt} = require('./middlewares/authMiddleware');

// Add the ability to parse JSON.
app.use(express.json({ extended: false }));

// Import the routes.
const userCardRelatedRoute = require('./routes/userCardRelatedRoute');
const equipmentRelatedRoute = require('./routes/equipmentRelatedRoute');
const deckRelatedRoute = require('./routes/deckRelatedRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const abilityRoute = require('./routes/abilityRoute');
const cardRoute = require('./routes/cardRoute');
// const kingdomRoute = require('./routes/kingdomRoute');
// const shopRoute = require('./routes/shopRoute');
// const userCardRoute = require('./routes/userCardRoute');
// const equipmentRoute = require('./routes/equipmentRoute');
// const deckRoute = require('./routes/deckRoute');

app.get('/api/authCheck',
 (req, res) => {
  res.status(200).json({ isAuth: true });
});
// Register the routes.
app.use('/api/user-cards', userCardRelatedRoute);
app.use('/api/equipments', equipmentRelatedRoute);
app.use('/api/decks', deckRelatedRoute);
app.use('/api/users', userRoute);
app.use('/api/profiles', profileRoute);
app.use('/api/abilities', abilityRoute);
app.use('/api/cards', cardRoute);
// app.use('/', kingdomRoute);
app.get('/api/minVersion', (req, res) => {
  res.json({ version: '0.1.0' });
});

// default route
app.get('/', (req, res) => {
  // header 404
  res.status(404).send('Page not found');
});
// Call the connectDB function to establish a MongoDB connection.
connectDB();


// Run the server.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});