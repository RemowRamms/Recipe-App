import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import StarRating from './Ratings';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send, ThumbsUp } from 'lucide-react';

import {
  searchById,
  transformMealPayloadToMockDataStructure,
} from '../api/fetchRecipes';

const RecipeDetails = ({ theme, isLoggedIn, setShowLoginModal, currentUser }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const calculateAverageRating = (reviewList) => {
    if (!reviewList?.length) return 0;
    const total = reviewList.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviewList.length;
  };

  const getUserDisplayName = (email) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email);
    return user?.displayName || email.split('@')[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchById(id);
        const transformedData = data.map(meal =>
          transformMealPayloadToMockDataStructure(meal)
        );
        setRecipe(transformedData[0]);
        
        const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`) || '[]');
        setReviews(savedReviews);
        setAverageRating(calculateAverageRating(savedReviews));

        if (isLoggedIn) {
          const userReview = savedReviews.find(review => review.email === currentUser.email);
          if (userReview) {
            setUserRating(userReview.rating || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError("Failed to load recipe details");
      }
    };
    fetchData();
  }, [id, isLoggedIn, currentUser]);

  const handleRatingChange = (rating) => {
    setUserRating(rating);
    if (!comment.trim()) {
      handleSubmitReview(null, rating);
    }
  };

  const handleSubmitReview = async (e, ratingOnly = null) => {
    if (e) e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!comment.trim() && !userRating && !ratingOnly) {
      setError("Please add a rating or comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const displayName = currentUser.displayName || currentUser.email.split('@')[0];
      const newReview = {
        id: Date.now(),
        text: comment.trim(),
        userId: displayName,
        userInitial: displayName[0].toUpperCase(),
        email: currentUser.email,
        rating: ratingOnly || userRating,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: []
      };

      const filteredReviews = reviews.filter(review => review.email !== currentUser.email);
      const updatedReviews = [newReview, ...filteredReviews];
      
      setReviews(updatedReviews);
      setAverageRating(calculateAverageRating(updatedReviews));
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
      
      if (!ratingOnly) {
        setComment("");
        setUserRating(0);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeReview = (reviewId) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    setReviews(prevReviews => {
      const updatedReviews = prevReviews.map(review => {
        if (review.id === reviewId) {
          const hasLiked = review.likedBy.includes(currentUser.email);
          return {
            ...review,
            likes: hasLiked ? review.likes - 1 : review.likes + 1,
            likedBy: hasLiked 
              ? review.likedBy.filter(email => email !== currentUser.email)
              : [...review.likedBy, currentUser.email]
          };
        }
        return review;
      });
      localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
      return updatedReviews;
    });
  };

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <ClipLoader color="#facc15" size={80} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : !recipe ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <ClipLoader color="#facc15" size={80} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <img
                src={recipe.image}
                alt={`Image of ${recipe.title}`}
                className="w-full h-auto object-cover rounded-lg shadow-lg mb-6"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                </p>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-4">
              <h1 className={`text-3xl font-bold mb-6 border-b-4 border-yellow-400 inline-block pb-1
                ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {recipe.title}
              </h1>

              <div className="flex">
                <div className="flex w-full h-100 overflow-y-auto">                  <div className="w-1/2 pr-2">
                    <h2 className={`text-xl font-semibold mb-3
                      ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Ingredients
                    </h2>
                    <div className="space-y-2">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className={`flex items-start gap-2 text-lg
                          ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
                          <span className="text-yellow-500 mt-1">•</span>
                          <span>{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-1/2 pl-2">
                    {recipe.method && Array.isArray(recipe.method) ? (
                      <>
                        <h2 className={`text-xl font-semibold mb-2
                          ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Instructions
                        </h2>
                        <ol className="list-decimal pl-5 mb-4 list-outside">
                          {recipe.method.map((step, index) => (
                            <li key={index} className={`text-lg
                              ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </>
                    ) : recipe.method ? (
                      <>
                        <h2 className={`text-xl font-semibold mb-2
                          ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Method
                        </h2>
                        <p className={`text-lg
                          ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {recipe.method}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className={theme === "dark" ? "text-white" : "text-gray-900"} />
              <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Reviews
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">
                  ({reviews.length})
                </span>
                {reviews.length > 0 && (
                  <span className="text-sm text-gray-500">
                    · {averageRating.toFixed(1)} avg rating
                  </span>
                )}
              </div>
            </div>

            {isLoggedIn ? (
              <form onSubmit={handleSubmitReview} className="mb-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {currentUser.email[0].toUpperCase()}
                  </div>
                  <div className="flex-grow">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Rate this recipe</label>
                      <StarRating
                        initialRating={userRating}
                        onRatingChange={handleRatingChange}
                        readOnly={false}
                        theme={theme}
                      />
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about this recipe... (optional)"
                      className={`w-full p-3 rounded-lg border focus:ring-2 transition min-h-[100px] 
                        ${theme === "dark" 
                          ? "bg-[#2d2d2d] border-gray-600 text-white focus:ring-yellow-500" 
                          : "bg-white border-gray-300 text-black focus:ring-yellow-500"}`}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || (!comment.trim() && !userRating)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                          disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Posting..." : "Post Review"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Please <button onClick={() => setShowLoginModal(true)} className="text-yellow-500 hover:underline">sign in</button> to leave a review
                </p>
              </div>
            )}

            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className={`p-4 rounded-lg border
                    ${theme === "dark" 
                      ? "bg-[#2d2d2d] border-gray-600" 
                      : "bg-white border-gray-200"}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {review.userInitial}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{review.userId}</h4>
                          <div className="flex items-center gap-2">
                            {review.rating > 0 && (
                              <StarRating 
                                initialRating={review.rating} 
                                readOnly={true}
                                noOfStars={5}
                                theme={theme}
                              />
                            )}                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLikeReview(review.id)}
                          className={`flex items-center gap-1 text-sm px-2 py-1 rounded
                            ${review.likedBy.includes(currentUser?.email)
                              ? "text-yellow-500"
                              : "text-gray-500 hover:text-yellow-500"}`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {review.likes > 0 && <span>{review.likes}</span>}
                        </button>
                      </div>
                      {review.text && (
                        <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>{review.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No reviews yet. Be the first to share your thoughts!
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
