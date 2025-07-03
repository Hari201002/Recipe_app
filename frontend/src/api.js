import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/';

// Get all recipes (with optional filters/search)
export const getRecipes = (params) =>
  axios.get(`${API_BASE}recipes/`, { params });

// Add a new recipe (with image upload)
export const addRecipe = (data) =>
  axios.post(`${API_BASE}recipes/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Update an existing recipe (e.g., mark as tried)
export const updateRecipe = (id, data) =>
  axios.patch(`${API_BASE}recipes/${id}/`, data);

// Delete a recipe
export const deleteRecipe = (id) =>
  axios.delete(`${API_BASE}recipes/${id}/`);

// 🔍 Suggest recipes based on user-typed ingredients (fuzzy + NLP matching)
export const suggestRecipes = (ingredients) =>
  axios.get(`${API_BASE}suggest/`, {
    params: { ingredients },
  });
