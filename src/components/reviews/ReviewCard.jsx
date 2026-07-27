import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{review.title || "Customer Review"}</h3>

          <RatingStars rating={review.rating} readOnly size={18} />

          <p className="mt-2 text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-700">{review.comment}</p>

      {review.images.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image.preview}
              alt="Review"
              className="h-24 w-24 rounded-xl object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
