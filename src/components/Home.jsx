import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to Recipe App</h1>
      <p className="text-lg text-center mb-6">
        Discover delicious recipes and learn how to cook them step by step!
      </p>
      <div className="text-center">
        <Link
          to="/recipes"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Recipes
        </Link>
      </div>
    </div>
  );
};

export default Home;