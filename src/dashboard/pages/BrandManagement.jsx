import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Tag, Package } from "lucide-react";

import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../api/brandApi";

import BrandTable from "../components/brands/BrandTable";
import BrandModal from "../components/brands/BrandModal";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

export default function BrandManagement() {
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);

      const data = await getBrands();

      const mappedBrands = data.map((brand) => ({
        ...brand,
        logoUrl: brand.logoUrl
          ? brand.logoUrl.startsWith("http")
            ? brand.logoUrl
            : `http://localhost:8080${brand.logoUrl}`
          : "",
      }));

      setBrands(mappedBrands);
    } catch (error) {
      console.error("Load Brands Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [brands, search]);

  const handleAdd = () => {
    setEditingBrand(null);
    setOpenModal(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setOpenModal(true);
  };

  const handleSave = async (form) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("website", form.website);
      formData.append("active", form.active);

      if (form.logo) {
        formData.append("logo", form.logo);
      }

      if (editingBrand) {
        await updateBrand(editingBrand.id, formData);
      } else {
        await createBrand(formData);
      }

      setOpenModal(false);
      setEditingBrand(null);

      await loadBrands();
    } catch (error) {
      console.error("Save Brand Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (brand) => {
    setSelectedBrand(brand);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!selectedBrand) return;

      setDeleting(true);

      await deleteBrand(selectedBrand.id);

      setDeleteOpen(false);
      setSelectedBrand(null);

      await loadBrands();
    } catch (error) {
      console.error("Delete Brand Error:", error);
    } finally {
      setDeleting(false);
    }
  };

  const totalBrands = brands.length;

  const totalProducts = brands.reduce(
    (sum, brand) => sum + (brand.productCount ?? brand.products?.length ?? 0),
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brand Management</h1>
          <p className="text-gray-500">
            Manage your product brands
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white hover:bg-pink-700"
        >
          <Plus size={18} />
          Add Brand
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Brands
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalBrands}
              </h2>
            </div>

            <Tag size={36} className="text-pink-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalProducts}
              </h2>
            </div>

            <Package size={36} className="text-blue-500" />
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="rounded-xl bg-white p-5 shadow">
        <div className="relative max-w-md">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search brand..."
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
        <BrandTable
          brands={filteredBrands}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modal */}
      <BrandModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingBrand(null);
        }}
        onSave={handleSave}
        brand={editingBrand}
        loading={saving}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={deleteOpen}
        title="Delete Brand"
        message={`Are you sure you want to delete "${selectedBrand?.name}"?`}
        loading={deleting}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedBrand(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}