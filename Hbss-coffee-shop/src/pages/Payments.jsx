import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { FiCreditCard, FiPlus, FiTrash2 } from "react-icons/fi";

const cardTypes = {
  visa: { prefix: "4", name: "Visa", color: "bg-blue-600" },
  mastercard: { prefix: "5", name: "Mastercard", color: "bg-red-600" },
  amex: { prefix: "3", name: "American Express", color: "bg-green-600" },
  discover: { prefix: "6", name: "Discover", color: "bg-orange-600" },
};

const paymentTypes = {
  card: "Credit or debit card",
  telebirr: "Telebirr",
  cbe: "Commercial Bank of Ethiopia (CBE)",
  awash: "Awash Bank",
  rammis: "Rammis Bank",
};

function detectCardType(number) {
  const cleaned = number.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6/.test(cleaned)) return "discover";
  return null;
}

function formatCardNumber(value) {
  const cleaned = value.replace(/\D/g, "");
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(" ") : "";
}

function formatExpiry(value) {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  return cleaned;
}

function CardIcon({ brand, className = "" }) {
  const config = cardTypes[brand] || { name: paymentTypes[brand] || "Payment", color: "bg-coffee-orange" };
  return (
    <div className={`w-10 h-6 rounded ${config.color} flex items-center justify-center text-white text-xs font-bold ${className}`}>
      {config.name.charAt(0)}
    </div>
  );
}

export default function Payments() {
  const { user, addPaymentMethod, updatePaymentMethod, removePaymentMethod } = useAuth();
  const { success, error } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form, setForm] = useState({
    type: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    isDefault: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cardType, setCardType] = useState(null);

  function validateForm(form) {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Account holder name is required";
    if (form.type === "card") {
      if (!form.cardNumber.replace(/\s/g, "").match(/^\d{13,19}$/)) newErrors.cardNumber = "Invalid card number";
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = "Invalid expiry date (MM/YY)";
      if (!form.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "Invalid CVV";
    } else if (!form.accountNumber.replace(/\s/g, "").match(/^\d{8,15}$/)) {
      newErrors.accountNumber = form.type === "telebirr" ? "Enter a valid Telebirr number" : "Enter a valid bank account number";
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;
    if (name === "cardNumber") formattedValue = formatCardNumber(value);
    if (name === "expiry") formattedValue = formatExpiry(value);
    if (name === "cvv") formattedValue = value.replace(/\D/g, "");
    if (name === "accountNumber") formattedValue = value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : formattedValue }));
    if (name === "cardNumber") {
      setCardType(detectCardType(formattedValue));
    }
  }

  function openAddModal() {
    setEditingPayment(null);
    setForm({ type: "card", cardNumber: "", accountNumber: "", expiry: "", cvv: "", name: "", isDefault: user?.paymentMethods?.length === 0 });
    setCardType(null);
    setShowModal(true);
  }

  function openEditModal(payment) {
    setEditingPayment(payment);
    setForm({
      type: payment.type || "card",
      cardNumber: payment.last4 ? "**** **** **** " + payment.last4 : "",
      accountNumber: payment.last4 ? "******" + payment.last4 : "",
      expiry: payment.expiry || "",
      cvv: "",
      name: payment.name || "",
      isDefault: payment.isDefault,
    });
    setCardType(payment.type === "card" ? payment.brand?.toLowerCase() : payment.type);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingPayment(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = editingPayment ? (form.name.trim() ? {} : { name: "Account holder name is required" }) : validateForm(form);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const paymentData = {
        type: form.type,
        brand: form.type === "card" ? (cardType || detectCardType(form.cardNumber) || "visa") : form.type,
        last4: editingPayment ? editingPayment.last4 : (form.type === "card" ? form.cardNumber : form.accountNumber).replace(/\s/g, "").slice(-4),
        expiry: form.type === "card" ? form.expiry : "",
        name: form.name,
        isDefault: form.isDefault,
      };

      if (editingPayment) {
        await updatePaymentMethod(editingPayment.id, paymentData);
        success("Payment method updated");
      } else {
        await addPaymentMethod(paymentData);
        success("Payment method added");
      }
      closeModal();
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(paymentId) {
    if (!window.confirm("Remove this payment method?")) return;
    try {
      await removePaymentMethod(paymentId);
      success("Payment method removed");
    } catch (err) {
      error(err.message);
    }
  }

  async function handleSetDefault(paymentId) {
    try {
      await updatePaymentMethod(paymentId, { isDefault: true });
      success("Default payment method updated");
    } catch (err) {
      error(err.message);
    }
  }

  const payments = user?.paymentMethods || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-coffee-brown">Payment Methods</h2>
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-coffee-orange text-white rounded-lg hover:bg-coffee-brown transition">
          <FiPlus size={20} aria-hidden="true" />
          Add Payment Method
        </button>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-16">
          <FiCreditCard className="mx-auto text-coffee-orange opacity-50" size={64} />
          <h3 className="mt-4 text-xl font-bold text-coffee-brown">No payment methods saved</h3>
          <p className="mt-2 text-gray-500">Save a card, Telebirr, CBE, Awash, or Rammis Bank method for faster checkout</p>
          <button onClick={openAddModal} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown">
            <FiPlus size={20} aria-hidden="true" />
            Add Payment Method
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {payments.map((payment) => (
            <div key={payment.id} className={`bg-white border rounded-xl p-5 ${payment.isDefault ? "border-coffee-orange" : "border-coffee-caramel"} relative`}>
              {payment.isDefault && (
                <span className="absolute -top-2 right-4 px-2 py-1 bg-coffee-orange text-white text-xs font-semibold rounded-full">
                  Default
                </span>
              )}
              <div className="flex items-center gap-4 mb-4">
                <CardIcon brand={payment.brand} />
                <div className="flex-1">
                  <p className="font-semibold text-coffee-brown">{payment.type === "card" || !payment.type ? payment.brand?.charAt(0).toUpperCase() + payment.brand?.slice(1) : paymentTypes[payment.type]}</p>
                  <p className="text-sm text-gray-500">{payment.type === "card" || !payment.type ? "Ending in" : "Account ending in"} {payment.last4}</p>
                </div>
                {payment.expiry && <p className="text-sm text-gray-500">Expires {payment.expiry}</p>}
              </div>
              <p className="text-sm text-gray-600 mb-4">{payment.name}</p>
              <div className="flex items-center gap-2">
                {!payment.isDefault && (
                  <button
                    onClick={() => handleSetDefault(payment.id)}
                    className="flex-1 py-2 px-3 text-sm font-medium text-coffee-brown border border-coffee-caramel rounded-lg hover:bg-coffee-cream transition"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => openEditModal(payment)}
                  className="flex-1 py-2 px-3 text-sm font-medium text-coffee-brown border border-coffee-caramel rounded-lg hover:bg-coffee-cream transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
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
                {editingPayment ? "Edit Payment Method" : "Add Payment Method"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiTrash2 size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">Payment type</label>
                <select name="type" value={form.type} onChange={handleChange} disabled={Boolean(editingPayment)} className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none disabled:bg-gray-100">
                  <option value="card">Credit or debit card</option>
                  <option value="telebirr">Telebirr</option>
                  <option value="cbe">Commercial Bank of Ethiopia (CBE)</option>
                  <option value="awash">Awash Bank</option>
                  <option value="rammis">Rammis Bank</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">Account holder name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                  required
                />
              </div>

              {form.type === "card" ? <>
              <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none font-mono"
                    required
                    maxLength={19}
                  />
                  {cardType && <CardIcon brand={cardType} className="absolute right-3 top-1/2 -translate-y-1/2" />}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-coffee-brown mb-1">Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                    required
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-coffee-brown mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none"
                    required
                    maxLength={4}
                  />
                </div>
              </div>
              </> : <div>
                <label className="block text-sm font-semibold text-coffee-brown mb-1">{form.type === "telebirr" ? "Telebirr mobile number" : "Bank account number"}</label>
                <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} disabled={isLoading || Boolean(editingPayment)} placeholder={form.type === "telebirr" ? "09XXXXXXXX" : "Account number"} className="w-full px-4 py-3 border border-coffee-caramel rounded-lg focus:border-coffee-orange focus:outline-none disabled:bg-gray-100" required />
              </div>}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                  className="w-4 h-4 text-coffee-orange border-coffee-caramel rounded focus:ring-coffee-orange"
                />
                <label className="text-sm text-coffee-brown cursor-pointer">Set as default payment method</label>
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
                  {isLoading ? "Saving..." : editingPayment ? "Update" : "Save Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
