import { useState } from "react";

export default function ProductGallery({ product }) {
  const images =
    product.gallery && product.gallery.length
      ? product.gallery
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border bg-white">
        <img
          src={selectedImage}
          alt={product.name}
          className="h-125 w-full object-cover"
        />
      </div>

      <div className="flex gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selectedImage === img ? "border-rose-500" : "border-gray-200"
            }`}
          >
            <img src={img} alt="" className="h-20 w-20 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
