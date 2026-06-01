import Icon from "../Icon/Icon";

const icons = {
  info: "circle-info-filled",
  warning: "warning-filled",
  success: "circle-checkmark-filled",
  error: "circle-error-filled",
};

export default function InlineMessage({
  children,
  type = "info",
  size = "medium",
  showIcon = true,
  className = "",
}) {
  return (
    <div
      className={[
        "message",
        "message--inline",
        `message--${type}`,
        size === "small"
          ? "message--small"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcon && (
        <span className="message__icon">
          <Icon
            name={icons[type]}
            size={
              type === "info" ||
              type === "warning"
                ? "lg"
                : "md"
            }
          />
        </span>
      )}

      <span className="message__text">
        {children}
      </span>
    </div>
  );
}