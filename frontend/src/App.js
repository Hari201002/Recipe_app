import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import SuggestedRecipes from './components/SuggestedRecipes'; // ✅ Import new feature

import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Recipe Manager</h1>
      <div className="home-buttons">
        <Link to="/add"><button>Add Recipe</button></Link>
        <Link to="/list"><button>View Saved Recipes</button></Link>
        <Link to="/suggest"><button>Suggest Recipes</button></Link> {/* ✅ New link */}
        

      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<RecipeForm onAdd={() => {}} />} />
        <Route path="/list" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/suggest" element={<SuggestedRecipes />} /> {/* ✅ New route */}
        
      </Routes>
    </Router>
  );
}

export default App;
