import { useReviews } from "../../context/ReviewContext";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ productId }) {
  const { getProductReviews } = useReviews();

  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl bg-gray-100 p-10 text-center">
        <h3 className="text-xl font-semibold">No Reviews Yet</h3>

        <p className="mt-2 text-gray-500">
          Be the first customer to review this product.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
