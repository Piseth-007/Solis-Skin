import { useState } from "react";
import RatingStars from "./RatingStars";
import { useReviews } from "../../context/ReviewContext";
import toast from "react-hot-toast";
import ReviewGallery from "./ReviewGallery";
export default function ReviewForm({ order, product, onSuccess }) {
  const { addReview } = useReviews();

  const [form, setForm] = useState({
    rating: 0,
    title: "",
    comment: "",
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!form.comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    addReview({
      id: crypto.randomUUID(),
      orderId: order.id,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      rating: form.rating,
      title: form.title,
      comment: form.comment,
      images: form.images,
      createdAt: new Date().toISOString(),
    });

    toast.success("Review submitted successfully!");

    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-6 shadow"
    >
      <div>
        <h2 className="text-xl font-bold">{product.name}</h2>

        <p className="text-gray-500">
          Share your experience with this product.
        </p>
      </div>

      {/* Rating */}
      <div>
        <label className="mb-2 block font-medium">Rating</label>

        <RatingStars
          rating={form.rating}
          onChange={(value) =>
            setForm({
              ...form,
              rating: value,
            })
          }
        />
      </div>

      {/* Title */}
      <div>
        <label className="mb-2 block font-medium">Review Title</label>

        <input
          type="text"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          placeholder="Amazing product!"
          className="w-full rounded-xl border p-3 outline-none focus:border-rose-500"
        />
      </div>

      {/* Comment */}
      <div>
        <label className="mb-2 block font-medium">Your Review</label>

        <textarea
          rows={5}
          value={form.comment}
          onChange={(e) =>
            setForm({
              ...form,
              comment: e.target.value,
            })
          }
          placeholder="Tell other customers about your experience..."
          className="w-full rounded-xl border p-3 outline-none focus:border-rose-500"
        />
      </div>
      <ReviewGallery
        images={form.images}
        onChange={(images) =>
          setForm({
            ...form,
            images,
          })
        }
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-rose-600 py-3 font-semibold text-white transition hover:bg-rose-700"
      >
        Submit Review
      </button>
    </form>
  );
}
