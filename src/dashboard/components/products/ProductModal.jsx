import { useEffect, useState } from "react";
import { X, UploadCloud } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
  brandId: "",
  image: null,
};

export default function ProductModal({
  open,
  onClose,
  onSave,
  product = null,
  categories = [],
  brands = [],
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!open) return;

    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        categoryId: product.category?.id || product.categoryId || "",
        brandId: product.brand?.id || product.brandId || "",
        image: null,
      });

      if (product.imageUrl) {
        setPreview(`http://localhost:8080${product.imageUrl}`);
      } else {
        setPreview("");
      }
    } else {
      setForm(initialForm);
      setPreview("");
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[95vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              {product ? "Edit Product" : "Add Product"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Fill product information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block font-medium">Product Image</label>

            <label className="flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-pink-300 hover:border-pink-500 transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <UploadCloud size={50} className="text-pink-500" />

                  <p className="mt-3 text-sm text-gray-500">
                    Click to choose image
                  </p>

                  <p className="text-xs text-gray-400">JPG • PNG • WEBP</p>
                </>
              )}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">Product Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-pink-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block font-medium">Category</label>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="mb-2 block font-medium">Brand</label>

              <select
                name="brandId"
                value={form.brandId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              >
                <option value="">Select Brand</option>

                {brands.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block font-medium">Price</label>

              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block font-medium">Stock</label>

              <input
                type="number"
                min="0"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : product
                  ? "Update Product"
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
