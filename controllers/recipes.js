const express = require('express');
const recipes = express();

const recipesModel = require('../models/recipe');

// index
recipes.get('/', (req, res) => {
  let recipesDatabase = recipesModel.getAll();
  res.locals.recipesDatabase = recipesDatabase;
  res.render('recipes/index');
});

// get new recipe form
recipes.get('/new', (req, res) => {
  res.render('recipes/new');
});

// show recipe
recipes.get('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  res.local.recipe = recipesModel.get(id);
  res.render('recipes/show');
});

// create recipe
recipes.post('/', (req, res) => {
  recipesModel.create(req.body.recipename);
  res.redirect('recipes');
});

// get edit form
recipes.get('/:id/edit', (req, res) => {
  let id = parseInt(req.params.id);
  let recipe = recipesModel.get(id);
  res.locals.recipes = recipe;
  res.render('recipes/edit');
});

// update recipe
recipes.put('/:id/update', (req, res) => {
  let id = parseInt(req.params.id);
  let newName = req.body.recipename;
  recipesModel.update(id, newName);
  res.redirect('/recipes');
});

// delete recipe
recipes.delete('/:id/delete', (req, res) => {
  let id = parseInt(req.params.id);
  recipesModel.destroy(id);
  res.redirect('/recipes');
});

module.exports = recipes;
