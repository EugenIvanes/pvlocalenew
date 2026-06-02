import {platformLogos, defaultLabels} from "./config";
export default function BadgeButton({
  platform = "mpay",
  variant = "primary", // primary | neutral
  children,
  logoSrc,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const label = children || defaultLabels[platform];
  const logo = logoSrc || platformLogos[platform];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "mud-btn",
        "btn-badge",
        `btn-badge--${variant}`,
        `btn-badge--${platform}`,
        loading ? "mud-btn-loading" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="btn-badge__logo" aria-hidden="true">
        <img src={logo} alt="" />
      </span>

      <span className="btn-badge__label">
        {label}
      </span>

      {loading && (
        <span className="sr-only">
          Loading
        </span>
      )}
    </button>
  );
}