import { useEffect, useState } from "react";

const API_ORIGIN = "http://localhost:8080";

export default function ProductGallery({ product }) {
  const getImageUrl = () => {
    if (!product?.imageUrl) {
      return "/placeholder.png";
    }

    if (product.imageUrl.startsWith("http")) {
      return product.imageUrl;
    }

    return `${API_ORIGIN}${product.imageUrl}`;
  };

  const image = getImageUrl();

  const [selectedImage, setSelectedImage] = useState(image);

  useEffect(() => {
    setSelectedImage(image);
  }, [image]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-3xl border bg-white">
        <img
          src={selectedImage}
          alt={product?.name || "Product"}
          className="h-125 w-full object-contain bg-white p-6"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />
      </div>

      {/* Thumbnail */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setSelectedImage(image)}
          className={`overflow-hidden rounded-xl border-2 transition ${
            selectedImage === image ? "border-rose-500" : "border-gray-200"
          }`}
        >
          <img
            src={image}
            alt={product?.name || "Product"}
            className="h-20 w-20 bg-white object-contain p-2"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />
        </button>
      </div>
    </div>
  );
}
