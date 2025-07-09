import { createContext, useState, useContext, useEffect } from "react";

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites')
    
    if (storedFavs) setFavorites(JSON.parse(storedFavs)) 
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (recipe) => { 
    setFavorites(prev => [...prev, recipe])
  }

  const removeFromFavorites = (recipeId) =>{
    setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId)) 
  }

  const isFavorite = (recipeId) => {
    return favorites.some(recipe => recipe.id === recipeId)
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }
  return <RecipeContext.Provider value={value}>
    {children}
  </RecipeContext.Provider>;
};
