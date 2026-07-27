import { ImagePlus, X } from "lucide-react";

export default function ReviewGallery({ images, onChange }) {
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    onChange([...images, ...newImages].slice(0, 5));
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium">Photos (Optional)</label>

      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative h-24 w-24 overflow-hidden rounded-xl border"
          >
            <img
              src={image.preview}
              alt="Review"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {images.length < 5 && (
          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-rose-500">
            <ImagePlus className="mb-2 text-gray-500" />

            <span className="text-xs text-gray-500">Add Photo</span>

            <input
              hidden
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
            />
          </label>
        )}
      </div>

      <p className="text-sm text-gray-500">Maximum 5 images</p>
    </div>
  );
}
