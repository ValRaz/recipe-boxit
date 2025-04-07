const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  spoonacularId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
