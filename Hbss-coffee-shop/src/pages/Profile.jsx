import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useOrders } from "../context/OrderContext";
import { useWishlist } from "../context/WishlistContext";
import { FiUser, FiMail, FiCalendar, FiHeart, FiMapPin, FiPackage, FiCamera, FiPhone, FiX } from "react-icons/fi";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();
  const { getUserOrders } = useOrders();
  const { wishlistCount } = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", avatar: user?.avatar || "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const orderCount = getUserOrders(user?.id).length;
  const defaultAddress = user?.addresses?.find((address) => address.isDefault);

  function validateForm(form) {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (form.phone && !/^\+?[0-9\s-]{9,16}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      error("Please choose an image file");
      return;
    }
    if (file.size > 1024 * 1024) {
      error("Please choose an image smaller than 1 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, avatar: reader.result }));
    reader.onerror = () => error("Unable to read that image");
    reader.readAsDataURL(file);
  }

  function beginEditing() {
    setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", avatar: user?.avatar || "" });
    setErrors({});
    setIsEditing(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      await updateProfile(form);
      success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", avatar: user?.avatar || "" });
    setErrors({});
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-coffee-brown">Profile Information</h2>
          <button
            onClick={beginEditing}
            className="px-4 py-2 bg-coffee-orange text-white rounded-lg hover:bg-coffee-brown transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-coffee-cream rounded-xl">
            <div className="w-12 h-12 rounded-full bg-coffee-caramel flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <FiUser className="text-coffee-orange text-2xl" size={28} aria-hidden="true" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-coffee-brown">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-coffee-cream rounded-xl">
            <div className="w-12 h-12 rounded-full bg-coffee-caramel flex items-center justify-center">
              <FiPhone className="text-coffee-orange text-2xl" size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-coffee-brown">{user?.phone || "Not added"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-coffee-cream rounded-xl">
            <div className="w-12 h-12 rounded-full bg-coffee-caramel flex items-center justify-center">
              <FiMail className="text-coffee-orange text-2xl" size={28} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-coffee-brown">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-coffee-cream rounded-xl">
            <div className="w-12 h-12 rounded-full bg-coffee-caramel flex items-center justify-center">
              <FiCalendar className="text-coffee-orange text-2xl" size={28} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-semibold text-coffee-brown">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl border border-coffee-caramel p-4 text-center">
            <FiPackage className="mx-auto text-coffee-orange" size={22} aria-hidden="true" />
            <p className="mt-2 text-2xl font-bold text-coffee-brown">{orderCount}</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          <div className="rounded-xl border border-coffee-caramel p-4 text-center">
            <FiHeart className="mx-auto text-coffee-orange" size={22} aria-hidden="true" />
            <p className="mt-2 text-2xl font-bold text-coffee-brown">{wishlistCount}</p>
            <p className="text-xs text-gray-500">Wishlist items</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-coffee-caramel p-4 text-center">
            <FiMapPin className="mx-auto text-coffee-orange" size={22} aria-hidden="true" />
            <p className="mt-2 truncate font-bold text-coffee-brown">{defaultAddress?.city || "None saved"}</p>
            <p className="text-xs text-gray-500">Default location</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-coffee-brown">Edit Profile</h2>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-coffee-caramel text-coffee-brown rounded-lg hover:bg-coffee-cream transition"
        >
          Cancel
        </button>
      </div>

      <div>
        <p className="block text-sm font-semibold text-coffee-brown mb-2">Profile photo</p>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-coffee-caramel flex items-center justify-center">
            {form.avatar ? (
              <img src={form.avatar} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <FiUser className="text-coffee-orange" size={34} aria-hidden="true" />
            )}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-coffee-caramel px-4 py-2 font-semibold text-coffee-brown hover:bg-coffee-cream transition">
            <FiCamera aria-hidden="true" />
            Upload photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" disabled={isLoading} />
          </label>
          {form.avatar && (
            <button type="button" onClick={() => setForm((prev) => ({ ...prev, avatar: "" }))} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700">
              <FiX aria-hidden="true" /> Remove
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500">JPG, PNG, or WebP. Maximum size: 1 MB.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-coffee-brown mb-1">Full Name</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${
              errors.name ? "border-red-500 focus:border-red-500" : "border-coffee-caramel"
            }`}
            disabled={isLoading}
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-coffee-brown mb-1">Email</label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${
              errors.email ? "border-red-500 focus:border-red-500" : "border-coffee-caramel"
            }`}
            disabled={isLoading}
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-coffee-brown mb-1">Phone number <span className="font-normal text-gray-500">(optional)</span></label>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-orange" size={20} />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+251 9XX XXX XXX"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-coffee-orange transition ${errors.phone ? "border-red-500 focus:border-red-500" : "border-coffee-caramel"}`}
            disabled={isLoading}
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 px-6 bg-coffee-orange text-white rounded-lg font-bold hover:bg-coffee-brown transition disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 py-3 px-6 border border-coffee-caramel text-coffee-brown rounded-lg font-bold hover:bg-coffee-cream transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
