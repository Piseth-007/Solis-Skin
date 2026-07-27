import { useRef, useState } from "react";
import { Camera, Trash2 } from "lucide-react";

export default function AvatarUploader({
  name = "John Doe",
  image = "",
  onChange,
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(image);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);

    onChange?.(file);
  };

  const removeImage = () => {
    setPreview("");
    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            className="h-32 w-32 rounded-full object-cover ring-4 ring-rose-100"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-r from-rose-500 to-pink-500 text-4xl font-bold text-white ring-4 ring-rose-100">
            {initials}
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="absolute bottom-1 right-1 rounded-full bg-white p-3 shadow-lg transition hover:scale-110"
        >
          <Camera size={18} className="text-rose-600" />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="mt-5 rounded-xl bg-rose-600 px-6 py-2 font-semibold text-white transition hover:bg-rose-700"
      >
        Upload Photo
      </button>

      {preview && (
        <button
          type="button"
          onClick={removeImage}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
          Remove Photo
        </button>
      )}
    </div>
  );
}
