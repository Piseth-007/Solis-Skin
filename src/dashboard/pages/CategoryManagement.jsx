import { useEffect, useMemo, useState } from "react";
import { Plus, Search, FolderOpen, Package } from "lucide-react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoryApi";

import { getProducts } from "../../api/productApi";

import CategoryTable from "../components/categories/CategoryTable";
import CategoryModal from "../components/categories/CategoryModal";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [categoryData, productData] = await Promise.all([
        getCategories(),
        getProducts(0, 100),
      ]);

      setCategories(categoryData);
      setProducts(productData.content || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const handleAdd = () => {
    setEditingCategory(null);
    setOpenModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpenModal(true);
  };

  const handleSave = async (form) => {
  try {
    setSaving(true);

    if (editingCategory) {
      await updateCategory(editingCategory.id, form);
    } else {
      await createCategory(form);
    }

    setOpenModal(false);
    setEditingCategory(null);

    await loadData();

  } catch (error) {
    console.error("Save Error:", error);
    console.log(error.response?.data);
  } finally {
    setSaving(false);
  }
};

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!selectedCategory) return;

      await deleteCategory(selectedCategory.id);

      setDeleteOpen(false);
      setSelectedCategory(null);

      await loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const totalCategories = categories.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-gray-500">Manage your product categories</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Categories</p>

              <h2 className="mt-2 text-3xl font-bold">{totalCategories}</h2>
            </div>

            <FolderOpen size={36} className="text-pink-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>

              <h2 className="mt-2 text-3xl font-bold">{totalProducts}</h2>
            </div>

            <Package size={36} className="text-blue-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl bg-white p-5 shadow">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-pink-500"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          Loading...
        </div>
      ) : (
        <CategoryTable
          categories={filteredCategories}
          products={products}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modal */}
      <CategoryModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        category={editingCategory}
        loading={saving}
      />

      {/* Delete */}
      <DeleteConfirmModal
        open={deleteOpen}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
