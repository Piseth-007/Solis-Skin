import RatingStars from "./RatingStars";
import { useReviews } from "../../context/ReviewContext";

export default function RatingSummary({ productId }) {
  const { getProductReviews, getAverageRating } = useReviews();

  const reviews = getProductReviews(productId);

  const average = getAverageRating(productId);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-5xl font-bold">{average || 0}</span>

        <div>
          <RatingStars rating={Math.round(average)} readOnly size={22} />

          <p className="mt-1 text-gray-500">{reviews.length} Reviews</p>
        </div>
      </div>
    </div>
  );
}
