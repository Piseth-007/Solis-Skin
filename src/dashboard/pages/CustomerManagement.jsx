import { useEffect, useMemo, useState } from "react";

import PageHeader from "../components/PageHeader";
import CustomerStats from "../components/customers/CustomerStats";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import Modal from "../components/common/Modal";
import CustomerForm from "../components/customers/CustomerForm";

import { getCustomers, deleteCustomer } from "../../api/customerApi";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [saving, setSaving] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);
  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpenModal(true);
  };
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };
  const handleSave = async (data) => {
    try {
      setSaving(true);

      if (selectedCustomer) {
        // await updateCustomer(selectedCustomer.id, data);
      } else {
        // await createCustomer(data);
      }

      setOpenModal(false);
      loadCustomers();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };
  const loadCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchSearch =
        customer.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        customer.email?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
            ? customer.active
            : !customer.active;

      return matchSearch && matchStatus;
    });
  }, [customers, search, status]);

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (error) {
      console.error(error);
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

      <CustomerTable
        loading={loading}
        customers={filteredCustomers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        open={openModal}
        title={selectedCustomer ? "Edit Customer" : "Add Customer"}
        onClose={() => setOpenModal(false)}
      >
        <CustomerForm
          customer={selectedCustomer}
          loading={saving}
          onCancel={() => setOpenModal(false)}
          onSubmit={handleSave}
        />
      </Modal>
    </div>
  );
}
