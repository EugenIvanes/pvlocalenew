import Icon from "../Icon/Icon.jsx";

const toastIcons = {
  info: "circle-info-filled",
  success: "circle-checkmark-filled",
  warning: "warning-filled",
  error: "circle-error-filled",
  neutral: "circle-neutral-filled",
};

export default function Toast({
  type = "info",
  style = "solid",
  title = "",
  messages = [],
  link = "",
  linkText = "",
  showClose = true,
  isHiding = false,
  onClose,
}) {
  const iconName = toastIcons[type] || toastIcons.info;

  return (
      <div
          className={[
            "toast mud-flex mud-items-center mud-justify-center",
            `toast--${type}`,
            `toast--${style}`,
            !isHiding ? "show" : "",
            isHiding ? "is-hiding" : "",
          ].filter(Boolean).join(" ")}
      >
      <span className="toast__icon">
        <Icon name={iconName} size="lg"/>
      </span>

        <div className="toast__content">
          {title && <h5 className="toast__title">{title}</h5>}

          {messages.map((message, index) => (
              <p key={index} className="toast__text">
                {message}
              </p>
          ))}

          {link && linkText && (
              <a href={link} className="toast__link">
                {linkText}
              </a>
          )}
        </div>

        {showClose && (
            <button
                type="button"
                className="toast__close"
                aria-label="Close"
                onClick={onClose}
            >
          <span className="mud-inline-flex">
            <Icon name="cross-large" size="sm"/>
          </span>
            </button>
        )}
      </div>
  );
}