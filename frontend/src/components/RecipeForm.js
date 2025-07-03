import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation hook
import { addRecipe } from '../api';
import './RecipeForm.css';

function RecipeForm({ onAdd }) {
  const navigate = useNavigate(); // ✅ Create navigate function

  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    steps: '',
    category: 'veg',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append('is_tried', false);
    await addRecipe(formData);
    onAdd();
    setForm({ title: '', ingredients: '', steps: '', category: 'veg', image: null });
    navigate('/list'); // ✅ Redirect to recipe list after submission
  };

  return (
    <div className="form-wrapper">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Home
      </button>

      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add New Recipe</h2>

        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          required
        />

        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          required
        />

        <label>Steps</label>
        <textarea
          name="steps"
          value={form.steps}
          onChange={handleChange}
          placeholder="Preparation steps"
          required
        />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
          <option value="dessert">Dessert</option>
        </select>

        <label>Image</label>
        <input type="file" name="image" onChange={handleChange} />

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default RecipeForm;
