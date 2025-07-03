import React from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe, onToggle, onDelete }) {
  console.log('Image value:', recipe.image); // already a full URL

  return (
    <div className="card">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-image"
        />
      )}
      <div className="card-content">
        <h3>{recipe.title}</h3>
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Status:</strong> {recipe.is_tried ? '✅ Tried' : '❌ To Try'}</p>
        <p><strong>Ingredients:</strong><br />{recipe.ingredients}</p>
        <p><strong>Steps:</strong><br />{recipe.steps}</p>

        <button onClick={() => onToggle(recipe)}>
          {recipe.is_tried ? 'Mark as To Try' : 'Mark as Tried'}
        </button>

        {/* ✅ Delete Button */}
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this recipe?')) {
              onDelete(recipe.id);
            }
          }}
          className="delete-btn"
        >
          ❌ Delete
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
