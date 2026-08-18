import { useToast } from "../context/ToastContext";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="text-green-500" size={20} />;
      case "error":
        return <FiAlertCircle className="text-red-500" size={20} />;
      case "warning":
        return <FiAlertCircle className="text-yellow-500" size={20} />;
      default:
        return <FiInfo className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      default:
        return "text-blue-800";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 w-80 max-w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-slide-in ${getBgColor(
            toast.type
          )} ${getTextColor(toast.type)}`}
        >
          <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
          <div className="flex-1 text-sm font-medium">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close notification"
          >
            <FiX size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}