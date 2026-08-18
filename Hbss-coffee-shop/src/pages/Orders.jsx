import { Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiRefreshCw } from "react-icons/fi";

const statusIcons = {
  confirmed: { icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Confirmed" },
  processing: { icon: FiClock, color: "text-yellow-500", bg: "bg-yellow-50", label: "Processing" },
  shipped: { icon: FiTruck, color: "text-blue-500", bg: "bg-blue-50", label: "Shipped" },
  delivered: { icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Delivered" },
  cancelled: { icon: FiXCircle, color: "text-red-500", bg: "bg-red-50", label: "Cancelled" },
};

export default function Orders() {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();

  const userOrders = getUserOrders(user?.id);

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-16">
        <FiPackage className="mx-auto text-coffee-orange opacity-50" size={64} />
        <h3 className="mt-4 text-xl font-bold text-coffee-brown">No orders yet</h3>
        <p className="mt-2 text-gray-500">Your order history will appear here</p>
        <Link
          to="/menu"
          className="mt-6 inline-block px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-coffee-brown mb-6">Order History</h2>
      <div className="space-y-4">
        {userOrders.map((order) => {
          const statusConfig = statusIcons[order.status] || statusIcons.confirmed;
          const StatusIcon = statusConfig.icon;

          return (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="block p-5 bg-white border border-coffee-caramel rounded-xl hover:border-coffee-orange hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-coffee-cream flex items-center justify-center">
                    <FiPackage className="text-coffee-orange" size={28} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-coffee-brown">{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end md:flex-row md:items-center gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon size={12} className="inline-block mr-1" aria-hidden="true" />
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-coffee-orange">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                  </div>

                  <FiRefreshCw className="text-coffee-orange text-lg ml-2 md:ml-4" aria-label="Reorder" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
