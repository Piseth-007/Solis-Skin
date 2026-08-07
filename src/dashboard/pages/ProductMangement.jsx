import { useEffect, useState, useCallback, useMemo } from "react";
import { Package, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

import { getCategories } from "../../api/categoryApi";
import { getBrands } from "../../api/brandApi";
import { getImageUrl } from "../../utils/imageUrl";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductTable from "../components/products/ProductTable";
import ProductPagination from "../components/products/ProductPagination";
import ProductSkeleton from "../components/products/ProductSkeleton";
import EmptyState from "../components/products/EmptyState";
import ProductModal from "../components/products/ProductModal";
import DeleteDialog from "../components/products/DeleteDialog";

const LOW_STOCK_THRESHOLD = 5;
const FETCH_ALL_SIZE = 1000; // large enough to cover the whole catalog

export default function ProductManagement() {
  const [allProducts, setAllProducts] = useState([]); // full catalog, unfiltered
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadAllProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getProducts(0, FETCH_ALL_SIZE, "id,desc");

      const mapped = response.content.map((item) => ({
        ...item,
        imageUrl: getImageUrl(item.imageUrl),
      }));

      setAllProducts(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Load categories failed:", error);
    }
  };

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error("Load brands failed:", error);
    }
  };

  useEffect(() => {
    loadAllProducts();
    loadCategories();
    loadBrands();
  }, [loadAllProducts]);

  // Client-side filtering — applied whenever filters or the full list change
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesKeyword = keyword
        ? product.name?.toLowerCase().includes(keyword.toLowerCase())
        : true;

      const matchesCategory = category
        ? String(product.category?.id ?? product.categoryId) ===
          String(category)
        : true;

      const matchesBrand = brand
        ? String(product.brand?.id ?? product.brandId) === String(brand)
        : true;

      const matchesStatus = status
        ? status === "active"
          ? product.active === true
          : product.active === false
        : true;

      return matchesKeyword && matchesCategory && matchesBrand && matchesStatus;
    });
  }, [allProducts, keyword, category, brand, status]);

  // Client-side pagination over the filtered result
  const totalElements = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const pagedProducts = useMemo(() => {
    const start = page * size;
    return filteredProducts.slice(start, start + size);
  }, [filteredProducts, page, size]);

  // Stats computed from the full unfiltered catalog
  const stats = useMemo(() => {
    const total = allProducts.length;
    const lowStock = allProducts.filter(
      (p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD,
    ).length;
    const outOfStock = allProducts.filter((p) => p.stock === 0).length;
    const active = allProducts.filter((p) => p.active === true).length;
    return { total, lowStock, outOfStock, active };
  }, [allProducts]);

  const handleSearch = () => {
    setPage(0); // reset to first page whenever filters change
  };

  const handleReset = () => {
    setKeyword("");
    setCategory("");
    setBrand("");
    setStatus("");
    setPage(0);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleSave = async (form) => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("brandId", form.brandId);
      formData.append("categoryId", form.categoryId);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }

      handleCloseModal();
      await loadAllProducts();
    } catch (error) {
      console.error("Save failed:", error);
      alert(error.response?.data?.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    try {
      setDeleting(true);
      await deleteProduct(selectedProduct.id);
      setDeleteOpen(false);
      setSelectedProduct(null);
      await loadAllProducts();
    } catch (error) {
      console.error("Delete product failed:", error);
      alert(error.response?.data?.message || "Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <ProductToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        status={status}
        setStatus={setStatus}
        onSearch={handleSearch}
        onReset={handleReset}
        onAdd={handleAdd}
        categories={categories}
        brands={brands}
      />

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="mt-2 text-3xl font-bold">{stats.total}</h2>
            </div>
            <Package size={32} className="text-blue-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Low Stock (≤{LOW_STOCK_THRESHOLD})
              </p>
              <h2 className="mt-2 text-3xl font-bold text-amber-600">
                {stats.lowStock}
              </h2>
            </div>
            <AlertTriangle size={32} className="text-amber-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {stats.outOfStock}
              </h2>
            </div>
            <XCircle size={32} className="text-red-500" />
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {stats.active}
              </h2>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>
      </div>

      {loading ? (
        <ProductSkeleton rows={size} />
      ) : pagedProducts.length === 0 ? (
        <EmptyState onAdd={handleAdd} />
      ) : (
        <>
          <ProductTable
            products={pagedProducts}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          <ProductPagination
            page={page}
            size={size}
            totalPages={totalPages}
            totalElements={totalElements}
            setPage={setPage}
            setSize={setSize}
          />
        </>
      )}

      <ProductModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        product={editingProduct}
        categories={categories}
        brands={brands}
        loading={saving}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
        product={selectedProduct}
      />
    </div>
  );
}
