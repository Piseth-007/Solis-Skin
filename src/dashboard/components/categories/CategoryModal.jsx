import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
};

export default function CategoryModal({
  open,
  onClose,
  onSave,
  category = null,
  loading = false,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;

    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [category, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-bold">
              {category ? "Edit Category" : "Add Category"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter category information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-pink-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter category description"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-pink-500"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-pink-600 px-6 py-2.5 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : category
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
