import Icon from "../Icon/Icon";

const icons = {
  info: "circle-info-filled",
  warning: "warning-filled",
  error: "circle-error-filled",
};

export default function Banner({
  type = "info", // info | warning | error
  variant = "strong", // strong | subtle
  title,
  children,
  showIcon = true,
  icon,
  showClose = true,
  onClose,
  className = "",
}) {
  const iconName = icon || icons[type];

  return (
    <div
      className={[
        "banner",
        `banner--${type}`,
        variant === "subtle" ? "banner--subtle" : "",
        "modal--fade",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcon && iconName && (
        <span className="banner__icon">
          <Icon name={iconName} size="lg" />
        </span>
      )}

      <div className="banner__content">
        {title && (
          <h3 className="banner__title">
            {title}
          </h3>
        )}

        <p>{children}</p>
      </div>

      {showClose && (
        <button
          type="button"
          className="banner__close"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="mud-inline-flex">
            <Icon name="cross-large" size="sm" />
          </span>
        </button>
      )}
    </div>
  );
}