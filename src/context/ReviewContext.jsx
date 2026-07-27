import { createContext, useContext, useEffect, useState } from "react";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("solis-reviews");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("solis-reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Add a new review
  const addReview = (review) => {
    setReviews((prev) => [...prev, review]);
  };

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  // Get review by order
  const getOrderReview = (orderId, productId) => {
    return reviews.find(
      (review) => review.orderId === orderId && review.productId === productId,
    );
  };

  // Update an existing review
  const updateReview = (updatedReview) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === updatedReview.id ? updatedReview : review,
      ),
    );
  };

  // Delete review
  const deleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };

  // Average rating
  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);

    if (!productReviews.length) return 0;

    const total = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    return (total / productReviews.length).toFixed(1);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getOrderReview,
        updateReview,
        deleteReview,
        getAverageRating,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);
