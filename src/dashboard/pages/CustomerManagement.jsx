import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/PageHeader";
import CustomerStats from "../components/customers/CustomerStats";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import Modal from "../components/common/Modal";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";
import CustomerForm from "../components/customers/CustomerForm";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../api/customerApi";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [openModal, setOpenModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error("Load Customers Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        customer.fullName?.toLowerCase().includes(keyword) ||
        customer.email?.toLowerCase().includes(keyword) ||
        customer.phone?.toLowerCase().includes(keyword);

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
            ? customer.active
            : !customer.active;

      return matchSearch && matchStatus;
    });
  }, [customers, search, status]);

  const handleAdd = () => {
    setEditingCustomer(null);
    setOpenModal(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setOpenModal(true);
  };

  const handleView = (customer) => {
    setEditingCustomer(customer);
    setOpenModal(true);
  };

  const handleSave = async (form) => {
    try {
      setSaving(true);

      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, form);
      } else {
        await createCustomer(form);
      }

      setOpenModal(false);
      setEditingCustomer(null);

      await loadCustomers();
    } catch (error) {
      console.error("Save Customer Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (!selectedCustomer) return;

      setDeleting(true);

      await deleteCustomer(selectedCustomer.id);

      setDeleteOpen(false);
      setSelectedCustomer(null);

      await loadCustomers();
    } catch (error) {
      console.error("Delete Customer Error:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Customers" description="Manage customer accounts" />

      <CustomerStats customers={customers} />

      <CustomerToolbar
        search={search}
        onSearch={setSearch}
        status={status}
        onStatusChange={setStatus}
        onAddCustomer={handleAdd}
      />

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading customers...
        </div>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Add / Edit */}
      <Modal
        open={openModal}
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        onClose={() => {
          if (saving) return;

          setOpenModal(false);
          setEditingCustomer(null);
        }}
      >
        <CustomerForm
          customer={editingCustomer}
          loading={saving}
          onCancel={() => {
            setOpenModal(false);
            setEditingCustomer(null);
          }}
          onSubmit={handleSave}
        />
      </Modal>

      {/* Delete */}
      <DeleteConfirmModal
        open={deleteOpen}
        title="Delete Customer"
        message={`Are you sure you want to delete "${selectedCustomer?.fullName}"?`}
        loading={deleting}
        onCancel={() => {
          setDeleteOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
