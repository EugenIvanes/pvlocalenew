import { useEffect } from "react";
import Icon from "../Icon/Icon.jsx";
import Button from "../Button/Button";

export default function Modal({
  open,
  onClose,
  title,
  children,

  size = "md", // sm | md | lg | fullscreen
  type = "simple", // simple | with-image
  imageSrc,
  imageAlt = "",

  footer,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  destructive = false,

  closeOnOverlayClick = true,
  className = "",
}) {
  useEffect(() => {
    if (!open) return;

    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const modalTypeClass =
    type === "with-image" ? "modal--with-image" : "modal--simple";

  return (
    <div
      className="modal-overlay is-active"
      role="presentation"
      onMouseDown={(e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className={[
          "modal",
          `modal--${size}`,
          modalTypeClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close modal"
          onClick={onClose}
        >
          <span className="mud-inline-flex">
            <Icon name="cross-large" size="sm" />
          </span>
        </button>

        {type === "with-image" && imageSrc && (
          <div className="modal-image-wrapper">
            <img src={imageSrc} alt={imageAlt} />
          </div>
        )}

        {title && (
          <div className="modal--header">
            <h2 className="modal--header-title" id="modal-title">
              {title}
            </h2>
          </div>
        )}

        <div className="modal-content">{children}</div>

        {(footer || confirmText || cancelText) && (
          <div className="modal--footer">
            {footer || (
              <div className="modal-buttons">
                {cancelText && (
                  <Button
                    variant="outline"
                    color={destructive ? "destructive" : "primary"}
                    rounded
                    size="md"
                    onClick={onClose}
                  >
                    {cancelText}
                  </Button>
                )}

                {confirmText && (
                  <Button
                    color={destructive ? "destructive" : "primary"}
                    rounded
                    size="md"
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}