import Icon from "../Icon/Icon.js";
export default function StatusTag({
  children,
  variant = "neutral",
  appearance = "subtle",
  size = "medium",
  icon,
  className = "",
}) {
  return (
    <div
      className={[
        "status-tag",
        `status-tag--${variant}`,
        size === "small"
          ? "status-tag--small"
          : "",
        `is-${appearance}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && (
        <span className="mud-inline-flex">
          <Icon name={icon} size="sm" />
        </span>
      )}

      {children}
    </div>
  );
}