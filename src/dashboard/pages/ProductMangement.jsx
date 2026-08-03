import { useEffect, useState, useCallback } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

import { getCategories } from "../../api/categoryApi";
import { getBrands } from "../../api/brandApi";

import ProductToolbar from "../components/products/ProductToolbar";
import ProductTable from "../components/products/ProductTable";
import ProductPagination from "../components/products/ProductPagination";
import ProductSkeleton from "../components/products/ProductSkeleton";
import EmptyState from "../components/products/EmptyState";
import ProductModal from "../components/products/ProductModal";
import DeleteDialog from "../components/products/DeleteDialog";

export default function ProductManagement() {
  // ==========================================
  // Data
  // ==========================================

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ==========================================
  // Pagination
  // ==========================================

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // ==========================================
  // Search
  // ==========================================

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  // ==========================================
  // Modal
  // ==========================================

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ==========================================
  // Delete Dialog
  // ==========================================

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ==========================================
  // Load Products
  // ==========================================

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getProducts(page, size);

      const products = response.content.map((item) => ({
        ...item,
        imageUrl: item.imageUrl ? `http://localhost:8080${item.imageUrl}` : "",
      }));

      setProducts(products);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  // ==========================================
  // Load Categories
  // ==========================================

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Load categories failed:", error);
    }
  };

  // ==========================================
  // Load Brands
  // ==========================================

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error("Load brands failed:", error);
    }
  };

  // ==========================================
  // Initial Load
  // ==========================================

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  // ==========================================
  // Search
  // ==========================================

  const handleSearch = () => {
    loadProducts();
  };

  // ==========================================
  // Reset
  // ==========================================

  const handleReset = () => {
    setKeyword("");
    setCategory("");
    setBrand("");
    setStatus("");
    setPage(0);
  };

  // ==========================================
  // Add
  // ==========================================

  const handleAdd = () => {
    setEditingProduct(null);
    setOpenModal(true);
  };

  // ==========================================
  // Edit
  // ==========================================

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  // ==========================================
  // Save
  // ==========================================

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

      console.log("Update success"); // <-- add this

      handleCloseModal();
      await loadProducts();
    } catch (error) {
      console.error("Save failed:", error);
      console.log(error.response?.data);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Delete
  // ==========================================

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

      await loadProducts();
    } catch (error) {
      console.error("Delete product failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================
  // Close
  // ==========================================

  const handleCloseModal = () => {
    console.log("Closing modal");

    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedProduct(null);
  };

  // ==========================================
  // UI
  // ==========================================
  useEffect(() => {
    console.log("openModal =", openModal);
  }, [openModal]);
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

      {loading ? (
        <ProductSkeleton rows={size} />
      ) : products.length === 0 ? (
        <EmptyState onAdd={handleAdd} />
      ) : (
        <>
          <ProductTable
            products={products}
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
