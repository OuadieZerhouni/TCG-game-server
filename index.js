const connectDB = require('./database'); // Replace with the actual path to your connection file.
const express = require('express');
const app = express();
const port = 3000;

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
const userCardRoute = require('./routes/userCardRoute');
const equipmentRoute = require('./routes/equipmentRoute');
const deckRoute = require('./routes/deckRoute');

// Register the routes.
app.use('/', userCardRelatedRoute);
app.use('/', equipmentRelatedRoute);
app.use('/', deckRelatedRoute);
app.use('/', userRoute);
app.use('/', profileRoute);
app.use('/', abilityRoute);
app.use('/', cardRoute);
// app.use('/', kingdomRoute);
app.get('/api/minVersion', (req, res) => {
  res.json({ version: '0.11.0' });
});

// Call the connectDB function to establish a MongoDB connection.
connectDB();

// Add the ability to parse JSON.
app.use(express.json({ extended: false }));

// Run the server.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});