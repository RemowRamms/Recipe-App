export const fetchRecipesBySearch = async (query) => {
  const res = await fetch(`/api/search.php?s=${query}`);
  const data = await res.json();

  console.log(data);

  return data.meals || [];
  
};

export const searchById = async (query) => {
  const res = await fetch(`/api/lookup.php?i=${query}`);
  const data = await res.json();

  console.log(data);

  return data.meals || [];
  
};


export const fetchRecipesByCategory = async (category) => {
  try {
    const res = await fetch(`/api/filter.php?c=${category}`);
    const data = await res.json();
   
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching recipes for category ${category}:`, error);
    return [];
  }
};

export const fetchAllCategories = async () => {
  try {
    const res = await fetch('/api/categories.php');
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchMealOfTheDay = async () => {
  try {
    const res = await fetch('/api/random.php');
    const data = await res.json();
    
    console.log('Meal of the Day:', data);
    
    return data.meals && data.meals.length > 0 ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching meal of the day:', error);
    return null;
  }
};

export function transformMealPayloadToMockDataStructure(payload) {
  
  if (!payload.strInstructions) {
    return {
      id: payload.idMeal,
      title: payload.strMeal,
      image: payload.strMealThumb,
      
      description: `A delicious ${payload.strMeal}. Click to see more details.`,
      method: [],
      ingredients: [],
      category: "General",
      diet: null,
      meat: null,
      trending: false,
      holiday: null,
      season: null,
      rating: 0.0,
      servings: 0,
    };
  }
  const ingredients = [];
  if (payload) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = payload["strIngredient" + i];
      const measure = payload["strMeasure" + i];

      if (ingredient && ingredient.trim() !== "") {
        let ingredientString = "";
        if (measure && measure.trim() !== "") {
          ingredientString += measure.trim() + " ";
        }
        ingredientString += ingredient.trim();
        ingredients.push(ingredientString);
      }
    }
  }

  const methodSteps =
    payload && payload.strInstructions
      ? payload.strInstructions
          .split(/\r?\n/) 
          .map((step) => step.trim()) 
          .filter((step) => step !== "")
      : [];

  let mealId = null;
  if (payload && payload.idMeal) {
    const parsedId = parseInt(payload.idMeal, 10);
    if (!isNaN(parsedId)) {
      mealId = parsedId;
    }
  }
  
  let description = "";
  if (payload.strCategory && payload.strArea) {
    description = `A delicious ${payload.strArea}-style ${payload.strCategory.toLowerCase()} dish featuring ${payload.strMeal}, prepared with carefully selected ingredients and traditional cooking methods.`;
  } else if (payload.strCategory) {
    description = `A mouthwatering ${payload.strCategory.toLowerCase()} recipe featuring ${payload.strMeal}, perfect for any occasion.`;
  } else {
    description = `A delightful recipe featuring ${payload.strMeal}, made with love and attention to detail.`;
  }

  return {
    id: mealId,
    title: (payload && payload.strMeal) || "Untitled Recipe",
    description: description,
    image: (payload && payload.strMealThumb) || null, 
    method: methodSteps,
    ingredients: ingredients,
    category: (payload && payload.strArea) || "General",
    diet: null,
    meat: (payload && payload.strCategory) || null, 
    trending: false, 
    holiday: null, 
    season: null, 
    rating: 0.0, 
    servings: 0,
  };
}