
import React, { useState } from 'react';
import { suggestRecipes } from '../api';
import { useNavigate } from 'react-router-dom';
import './SuggestedRecipes.css';

function SuggestedRecipes() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSearch = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResults([]);
    setError('');
    setExpandedIndex(null);

    try {
      const res = await suggestRecipes(input);
      if (res.data.ai_suggestions) {
        setResults(res.data.ai_suggestions);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Suggest error:", err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const toggleDetails = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="suggest-container">
      <button className="suggest-back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <h2 className="suggest-heading">Suggest Recipes by Ingredients</h2>

      <div className="suggest-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients (e.g., tomato, onion)"
          className="suggest-input"
        />
        <button onClick={handleSearch} className="suggest-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="suggest-results">
        {results.length > 0 ? (
          results.map((recipe, idx) => (
            <div key={idx} className="suggest-card" onClick={() => toggleDetails(idx)}>
              <h4>{recipe.title}</h4>

              {expandedIndex === idx && (
                <div className="suggest-details">
                  <h5>Ingredients:</h5>
                  <ul>
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>

                  <h5>Instructions:</h5>
                  <ol>
                    {recipe.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))
        ) : (
          !loading && <p style={{ textAlign: 'center' }}>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default SuggestedRecipes;
