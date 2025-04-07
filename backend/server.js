const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Enable CORS and parse json
const app = express();
app.use(cors());
app.use(express.json());

// Import and use the recipes routes
const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
