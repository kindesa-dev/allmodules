import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { FiMapPin, FiPlus, FiTrash2, FiHome, FiBriefcase } from "react-icons/fi";

export default function Addresses() {
  const { user, addAddress, updateAddress, removeAddress } = useAuth();
  const { success, error } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    type: "home",
    isDefault: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(form) {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.zip.trim()) newErrors.zip = "ZIP code is required";
    return newErrors;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function openAddModal() {
    setEditingAddress(null);
    setForm({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      type: "home",
      isDefault: user?.addresses?.length === 0,
    });
    setShowModal(true);
  }

  function openEditModal(address) {
    setEditingAddress(address);
    setForm({
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      type: address.type,
      isDefault: address.isDefault,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingAddress(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm(form);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, form);
        success("Address updated successfully");
      } else {
        await addAddress(form);
        success("Address added successfully");
      }
      closeModal();
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(addressId) {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await removeAddress(addressId);
      success("Address removed");
    } catch (err) {
      error(err.message);
    }
  }

  async function handleSetDefault(addressId) {
    try {
      await updateAddress(addressId, { isDefault: true });
      success("Default address updated");
    } catch (err) {
      error(err.message);
    }
  }

  const addresses = user?.addresses || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-coffee-brown">Saved Addresses</h2>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-coffee-orange text-white rounded-lg hover:bg-coffee-brown transition">
          <FiPlus size={20} aria-hidden="true" />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <FiMapPin className="mx-auto text-coffee-orange opacity-50" size={64} />
          <h3 className="mt-4 text-xl font-bold text-coffee-brown">No addresses saved</h3>
          <p className="mt-2 text-gray-500">Add your first address for faster checkout</p>
          <button onClick={openAddModal} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown">
            <FiPlus size={20} aria-hidden="true" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className={`bg-white border rounded-xl p-5 ${address.isDefault ? "border-coffee-orange" : "border-coffee-caramel"} relative`}>
              {address.isDefault && (
                <span className="absolute -top-2 right-4 px-2 py-1 bg-coffee-orange text-white text-xs font-semibold rounded-full">
                  Default
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${address.type === "work" ? "bg-blue-100" : "bg-coffee-cream"}`}>
                  {address.type === "work" ? (
                    <FiBriefcase className="text-blue-500" size={20} aria-hidden="true" />
                  ) : (
                    <FiHome className="text-coffee-orange" size={20} aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-coffee-brown">{address.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${address.type === "work" ? "bg-blue-100 text-blue-700" : "bg-coffee-cream text-coffee-brown"}`}>
                      {address.type === "work" ? "Work" : "Home"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{address.address}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-coffee-caramel">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1 py-2 px-3 text-sm font-medium text-coffee-brown border border-coffee-caramel rounded-lg hover:bg-coffee-cream transition"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => openEditModal(address)}
                  className="flex-1 py-2 px-3 text-sm font-medium text-coffee-brown border border-coffee-caramel rounded-lg hover:bg-coffee-cream transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="py-2 px-3 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-coffee-brown">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiTrash2 size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-coffee-brown mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-coffee-brown mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">Address Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="home"
                      checked={form.type === "home"}
                      onChange={handleChange}
                      className="text-coffee-orange focus:ring-coffee-orange"
                    />
                    <span className="text-coffee-brown">Home</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="work"
                      checked={form.type === "work"}
                      onChange={handleChange}
                      className="text-coffee-orange focus:ring-coffee-orange"
                    />
                    <span className="text-coffee-brown">Work</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                  className="w-4 h-4 text-coffee-orange border-coffee-caramel rounded focus:ring-coffee-orange"
                />
                <label className="text-sm text-coffee-brown cursor-pointer">Set as default address</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 px-4 border border-coffee-caramel text-coffee-brown rounded-lg font-semibold hover:bg-coffee-cream transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 bg-coffee-orange text-white rounded-lg font-semibold hover:bg-coffee-brown transition disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : editingAddress ? "Update" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
