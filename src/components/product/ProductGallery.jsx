import { useEffect, useState } from "react";

export default function ProductGallery({ product }) {
  const image = `http://localhost:8080${product.imageUrl}`;

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
          alt={product.name}
          className="h-125 w-full object-contain p-6"
        />
      </div>

      {/* Thumbnail */}
      <div className="flex gap-3">
        <button
          onClick={() => setSelectedImage(image)}
          className={`overflow-hidden rounded-xl border-2 transition ${
            selectedImage === image
              ? "border-rose-500"
              : "border-gray-200"
          }`}
        >
          <img
            src={image}
            alt={product.name}
            className="h-20 w-20 object-contain bg-white p-2"
          />
        </button>
      </div>
    </div>
  );
}