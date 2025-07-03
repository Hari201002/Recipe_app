import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateRecipe, deleteRecipe } from '../api';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  // Fetch recipe
  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${id}/`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Handle toggle tried
  const toggleTried = async () => {
    await updateRecipe(recipe.id, { is_tried: !recipe.is_tried });
    // Re-fetch to reflect the change
    const res = await axios.get(`http://localhost:8000/api/recipes/${id}/`);
    setRecipe(res.data);
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await deleteRecipe(recipe.id);
      navigate('/list'); // Go back to list page
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/')} className="back-button">← Back to Home</button>
        <button onClick={() => navigate('/list')} className="back-button" style={{ marginLeft: '10px' }}>
          ← Back to Saved Recipes
        </button>
      </div>
      <h2>{recipe.title}</h2>

      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="detail-image" />
      )}

      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Status:</strong> {recipe.is_tried ? '✅ Tried' : '❌ To Try'}</p>
      <p><strong>Ingredients:</strong><br />{recipe.ingredients}</p>
      <p><strong>Steps:</strong><br />{recipe.steps}</p>

      {/* 🔁 Toggle tried/to-try button */}
      <button onClick={toggleTried}>
        {recipe.is_tried ? 'Mark as To Try' : 'Mark as Tried'}
      </button>

      {/* ❌ Delete button */}
      <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: '#e74c3c', color: 'white' }}>
        Delete Recipe
      </button>
    </div>
  );
}

export default RecipeDetail;
