import Icon from "../Icon/Icon.jsx";
import Button from "../Button/Button";
import Link from "../Link/Link";

const icons = {
  neutral: "circle-info-filled",
  info: "circle-info-filled",
  warning: "warning-filled",
  error: "circle-error-filled",
};

export default function InfoBox({
  type = "info", // neutral | info | warning | error
  title,
  children,

  showIcon = true,
  icon,

  link,
  linkText,

  action,
  actionText,
  onAction,

  showClose = false,
  onClose,

  className = "",
}) {
  const iconName = icon || icons[type];

  return (
    <div
      className={[
        "info-box",
        `info-box--${type}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcon && iconName && (
        <span className="info-box__icon">
          <Icon name={iconName} size="lg" />
        </span>
      )}

      <div className="info-box__content">
        {title && (
          <h5 className="info-box__title">
            {title}
          </h5>
        )}

        <p>{children}</p>

        {(link || action) && (
          <div className="info-box__action">
            {link && linkText && (
              <Link href={link}>
                {linkText}
              </Link>
            )}

            {action && actionText && (
              <Button
                color="primary"
                onClick={onAction}
              >
                {actionText}
              </Button>
            )}
          </div>
        )}
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