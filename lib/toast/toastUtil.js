import { toast } from "react-toastify";

// Global toast function with default configuration
export function showToast(message, options = {}) {
  const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  // Merge default options with any custom options provided
  toast(message, { ...defaultOptions, ...options });
}

// Specific function for success toasts
export function showSuccessToast(message, options = {}) {
  const defaultOptions = {
    // ... same as above or any specific for success
  };

  toast.success(message, { ...defaultOptions, ...options });
}
