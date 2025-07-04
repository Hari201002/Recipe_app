
import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import './RecipeList.css';

function RecipeList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchRecipes = async () => {
    const res = await getRecipes();
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes by title and category
  const filteredRecipes = recipes.filter((r) => {
    const matchesTitle = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  return (
    <div>
      <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
      <h2>Saved Recipes</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes by title"
        className="search-input"
      />

      {/* 🔘 Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-filter"
      >
        <option value="all">All Categories</option>
        <option value="veg">Vegetarian</option>
        <option value="non-veg">Non-Vegetarian</option>
        <option value="dessert">Dessert</option>
      </select>

      {/* 📋 Recipe Preview List */}
      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((r) => (
            <Link to={`/recipe/${r.id}`} key={r.id} className="preview-card">
              {r.image && (
                <img src={r.image} alt={r.title} className="preview-image" />
              )}
              <h4>{r.title}</h4>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeList;

