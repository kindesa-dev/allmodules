import { useParams, Link } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { FiPackage, FiCreditCard, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

const statusIcons = {
  confirmed: { icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Confirmed" },
  processing: { icon: FiClock, color: "text-yellow-500", bg: "bg-yellow-50", label: "Processing" },
  shipped: { icon: FiTruck, color: "text-blue-500", bg: "bg-blue-50", label: "Shipped" },
  delivered: { icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Delivered" },
  cancelled: { icon: FiXCircle, color: "text-red-500", bg: "bg-red-50", label: "Cancelled" },
};

export default function OrderDetails() {
  const { id } = useParams();
  const { getOrderById, reorder } = useOrders();
  const { addToCart } = useCart();
  const { success } = useToast();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="text-center py-16">
        <FiPackage className="mx-auto text-coffee-orange opacity-50" size={64} />
        <h3 className="mt-4 text-xl font-bold text-coffee-brown">Order not found</h3>
        <Link
          to="/account/orders"
          className="mt-4 inline-block px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusConfig = statusIcons[order.status] || statusIcons.confirmed;
  const StatusIcon = statusConfig.icon;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/account/orders"
          className="p-2 text-coffee-brown hover:text-coffee-orange hover:bg-coffee-cream rounded-lg transition"
        >
          <FiArrowLeft size={24} aria-hidden="true" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-coffee-brown">Order {order.id}</h2>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-coffee-caramel rounded-xl p-5">
            <h3 className="font-bold text-coffee-brown mb-4 flex items-center gap-2">
              <FiPackage className="text-coffee-orange" size={20} aria-hidden="true" />
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-coffee-cream rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-coffee-brown">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-coffee-orange">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-coffee-caramel rounded-xl p-5">
            <h3 className="font-bold text-coffee-brown mb-4 flex items-center gap-2">
              <FiTruck className="text-coffee-orange" size={20} aria-hidden="true" />
              Shipping Address
            </h3>
            <address className="text-coffee-brown not-italic">
              {order.shippingAddress?.name}<br />
              {order.shippingAddress?.address}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
            </address>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-coffee-caramel rounded-xl p-5 sticky top-24">
            <h3 className="font-bold text-coffee-brown mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${order.subtotal?.toFixed(2) || order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{order.shipping === 0 ? "Free" : `$${order.shipping?.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">${order.tax?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
            <div className="border-t border-coffee-caramel pt-3">
              <div className="flex justify-between text-lg font-bold text-coffee-brown">
                <span>Total</span>
                <span className="text-coffee-orange">${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-coffee-caramel">
              <h4 className="font-semibold text-coffee-brown mb-3 flex items-center gap-2">
                <StatusIcon size={18} className={statusConfig.color} aria-hidden="true" />
                Status: <span className={statusConfig.color}>{statusConfig.label}</span>
              </h4>
              <div className="space-y-2">
                {["confirmed", "processing", "shipped", "delivered"].map((step, index) => {
                  const isCompleted = ["confirmed", "processing", "shipped", "delivered"].indexOf(order.status) >= index;
                  const isCurrent = order.status === step;
                  return (
                    <div
                      key={step}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isCompleted ? "bg-coffee-orange border-coffee-orange" : "border-coffee-caramel"
                        }`}
                      >
                        {isCompleted && <FiCheckCircle size={12} className="text-white" />}
                      </div>
                      <span className={`${isCurrent ? "font-semibold text-coffee-brown" : "text-gray-500"}`}>
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-coffee-caramel">
              <h4 className="font-semibold text-coffee-brown mb-3 flex items-center gap-2">
                <FiCreditCard className="text-coffee-orange" size={18} aria-hidden="true" />
                Payment Method
              </h4>
              <p className="text-gray-600 text-sm">
                {order.paymentMethod?.type === "card" ? "Credit/Debit Card" : order.paymentMethod?.type}
                {order.paymentMethod?.last4 && ` ending in ${order.paymentMethod.last4}`}
              </p>
            </div>

            {order.status !== "delivered" && order.status !== "cancelled" && (
              <button
                onClick={() => {
                  reorder(order.id, addToCart);
                  success("Items added to your cart");
                }}
                className="w-full mt-4 py-3 px-4 bg-coffee-cream border border-coffee-caramel text-coffee-brown rounded-lg font-semibold hover:bg-coffee-orange hover:text-white hover:border-coffee-orange transition flex items-center justify-center gap-2"
              >
                <FiRefreshCw size={18} aria-hidden="true" />
                Reorder Items
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
