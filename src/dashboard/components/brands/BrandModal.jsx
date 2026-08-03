import { useEffect, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  website: "",
  active: true,
  logo: null,
};

export default function BrandModal({
  open,
  onClose,
  onSave,
  brand = null,
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    if (brand) {
      setForm({
        name: brand.name || "",
        description: brand.description || "",
        website: brand.website || "",
        active: brand.active ?? true,
        logo: null,
      });

      if (brand.logoUrl) {
        setPreview(
          brand.logoUrl.startsWith("http")
            ? brand.logoUrl
            : `http://localhost:8080${brand.logoUrl}`,
        );
      } else {
        setPreview("");
      }
    } else {
      setForm(initialForm);
      setPreview("");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [brand, open]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setForm((prev) => ({
      ...prev,
      logo: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(form);
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[95vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              {brand ? "Edit Brand" : "Add Brand"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Fill in the brand information.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Logo */}
          <div>
            <label className="mb-2 block font-medium">Brand Logo</label>

            <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-300 transition hover:border-pink-500">
              {preview ? (
                <img
                  src={preview}
                  alt="Brand Logo"
                  className="h-full w-full rounded-xl object-contain p-3"
                />
              ) : (
                <>
                  <UploadCloud size={50} className="text-pink-500" />

                  <p className="mt-3 text-sm text-gray-500">
                    Click to upload brand logo
                  </p>

                  <p className="text-xs text-gray-400">
                    JPG • PNG • WEBP (Max 5MB)
                  </p>
                </>
              )}

              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleLogo}
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">Brand Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-pink-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-pink-500"
            />
          </div>

          {/* Website */}
          <div>
            <label className="mb-2 block font-medium">Website</label>

            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-lg border p-3 outline-none focus:border-pink-500"
            />
          </div>

          {/* Active */}
          <div className="flex items-center gap-3">
            <input
              id="active"
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />

            <label htmlFor="active">Active Brand</label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg border px-5 py-3 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : brand ? "Update Brand" : "Create Brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
