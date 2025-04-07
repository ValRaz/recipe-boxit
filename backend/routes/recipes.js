const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// CREATE a new favorite recipe
router.post('/', async (req, res) => {
  try {
    const recipeData = req.body;
    const newRecipe = await Recipe.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all favorite recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one favorite recipe by its MongoDB id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a favorite recipe (e.g., updating notes)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a favorite recipe
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
