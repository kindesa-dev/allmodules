import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiPackage, FiHeart, FiLogOut, FiSettings, FiCreditCard, FiMapPin } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const tabs = [
  { id: "profile", label: "Profile", icon: FiUser },
  { id: "orders", label: "Orders", icon: FiPackage },
  { id: "wishlist", label: "Wishlist", icon: FiHeart },
  { id: "addresses", label: "Addresses", icon: FiMapPin },
  { id: "payments", label: "Payment Methods", icon: FiCreditCard },
];

export default function Account() {
  const { user, signOut } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "profile";

  const selectTab = (tabId) => {
    navigate(`/account/${tabId}`);
    setShowMobileMenu(false);
  };

  const handleSignOut = () => {
    signOut();
    success("Signed out successfully");
    navigate("/");
  };

  return (
    <section className="py-14 bg-coffee-cream min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="bg-white border border-coffee-caramel rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-coffee-caramel flex items-center justify-center mx-auto mb-4">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={`${user.name}'s profile`} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-3xl font-extrabold text-coffee-orange">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-coffee-brown">{user?.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-coffee-cream text-coffee-orange rounded-full">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Now"}
                </span>
              </div>

              <nav className="space-y-1" role="tablist" aria-label="Account sections">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`${tab.id}-panel`}
                      id={`${tab.id}-tab`}
                      onClick={() => selectTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                        isActive
                          ? "bg-coffee-orange text-white"
                          : "text-coffee-brown hover:bg-coffee-cream hover:text-coffee-orange"
                      }`}
                    >
                      <Icon size={20} aria-hidden="true" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-coffee-caramel">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <FiLogOut size={20} aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0" role="tabpanel">
            <div className="mb-4 lg:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-coffee-caramel rounded-xl text-coffee-brown font-medium shadow-sm"
                aria-expanded={showMobileMenu}
                aria-label="Choose account section"
              >
                <span className="flex items-center gap-2">
                  <FiUser className="text-coffee-orange" aria-hidden="true" />
                  {tabs.find((t) => t.id === activeTab)?.label}
                </span>
                <FiSettings size={20} />
              </button>
              {showMobileMenu && (
                <div className="mt-2 bg-white border border-coffee-caramel rounded-xl overflow-hidden">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => selectTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                        activeTab === tab.id
                          ? "bg-coffee-orange text-white"
                          : "text-coffee-brown hover:bg-coffee-cream"
                      }`}
                    >
                      <tab.icon size={20} aria-hidden="true" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-coffee-caramel rounded-2xl p-5 sm:p-6 lg:p-8 xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
