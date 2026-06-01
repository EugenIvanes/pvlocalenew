import { useEffect, useState } from "react";
import ToastContainer from "./ToastContainer";
import { subscribe } from "../../../js/Toast/toast";

export default function ToastProvider({
  position = "top-right",
}) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribe((toast) => {
      const id = crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

      setToasts((prev) => [
        ...prev,
        { ...toast, id },
      ]);

      if (toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || 4000);
      }
    });

    return unsubscribe;
  }, []);

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id
          ? { ...toast, isHiding: true }
          : toast
      )
    );

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((toast) => toast.id !== id)
      );
    }, 300);
  };

  return (
    <ToastContainer
      toasts={toasts}
      removeToast={removeToast}
      position={position}
    />
  );
}