import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import StarRating from './Ratings';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send, ThumbsUp, Clock } from 'lucide-react';

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
    <div className="container mx-auto px-[7%] py-8">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : !recipe ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <ClipLoader color="#facc15" size={80} />
        </div>
      ) : (
        <>
          <div className="recipe-print-container max-w-3xl mx-auto">
            {/* Recipe Title */}
            <div className="mb-6">
              <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} inline-block relative pb-2`}>
                {recipe.title}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 transform -translate-y-1"></span>
              </h1>
            </div>

            <div className="w-full max-w-4xl mx-auto mb-6 flex justify-center">
              <div className="w-full max-w-3xl">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-1/2 h-auto max-h-[500px] object-contain ml-0"
                  loading="lazy"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              {recipe.prepTime && (
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-100">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
              )}
              
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: recipe.title,
                      text: `Check out this delicious recipe: ${recipe.title}`,
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    const shareUrl = `whatsapp://send?text=Check out this recipe: ${recipe.title} - ${window.location.href}`;
                    window.open(shareUrl, '_blank');
                  }
                }}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Share recipe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${theme === "dark" ? "text-white border-gray-600" : "text-gray-900 border-gray-300"}`}>
                Ingredients
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className={`flex items-start gap-3 text-lg p-3 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-800"}`}>
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold mb-4 pb-2 border-b ${theme === "dark" ? "text-white border-gray-600" : "text-gray-900 border-gray-300"}`}>
                Instructions
              </h2>
              <div className="space-y-4">
                {recipe.method && Array.isArray(recipe.method) ? (
                  recipe.method.map((step, index) => (
                    <div key={index} className={`flex items-start gap-4 p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className={`text-lg flex-grow ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {step.replace(/^\d+\.\s*/, '')}
                      </p>
                    </div>
                  ))
                ) : recipe.method ? (
                  <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                    <p className="text-lg">{recipe.method}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-4xl mx-auto reviews-section">
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
                            )}
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
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
                        <div className={`py-8 px-[7%] ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>{review.text}</div>
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
