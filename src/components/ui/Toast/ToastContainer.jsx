import Toast from "./Toast";

export default function ToastContainer({
  toasts = [],
  removeToast,
  position = "top-right",
}) {
  return (
    <div
      className={`toast-container toast-container--${position}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}