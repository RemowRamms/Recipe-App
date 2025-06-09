import { useRecipeContext } from "../contexts/RecipeContext";
import { useAuthContext } from "../contexts/AuthContext"; // Optional for auth check
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const { favorites } = useRecipeContext();
  const { user } = useAuthContext(); // Optional

  if (!user) {
    return (
      <div className="text-center p-16 bg-white/5 rounded-xl max-w-xl mx-auto my-8">
        <h2 className="mb-4 text-2xl text-red-600 font-semibold">Please Sign In</h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          You must be logged in to view your favorite recipes.
        </p>
      </div>
    );
  }

  if (favorites && favorites.length > 0) {
    return (
      <div className="w-full px-8 py-8 box-border">
        <h2 className="mb-8 text-center text-4xl font-bold text-shadow-sm">
          Your Favorites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="animate-fadeIn">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-16 bg-white/5 rounded-xl max-w-xl mx-auto my-8">
      <h2 className="mb-4 text-2xl text-red-600 font-semibold">No Favorite Recipes Yet</h2>
      <p className="text-gray-500 text-lg leading-relaxed">
        Start adding recipes to your favorites and they will appear here!
      </p>
    </div>
  );
}

export default Favorites;
