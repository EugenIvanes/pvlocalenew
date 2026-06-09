// src/components/ui/Button/Button.jsx

export default function Button({
  children,
  variant = "filled", // filled | outline | text
  color = "primary", // primary | secondary | strict | neutral | destructive
  size = "default", // default | sm | md | lg
  rounded = false,
  loading = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  type = "button",
  className = "",
  ...props
}) {
  const variantClass =
    variant === "filled"
      ? `mud-btn-${color}`
      : `mud-btn-${variant}-${color}`;

  const sizeClass = size !== "default" ? `mud-btn-${size}` : "";
  const roundedClass = rounded ? "mud-btn-rounded" : "";
  const loadingClass = loading ? "mud-btn-loading" : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "mud-btn",
        variantClass,
        sizeClass,
        roundedClass,
        loadingClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <span className="sr-only">loading</span>
      ) : (
        <>
          {leadingIcon}
          {!iconOnly && children}
          {trailingIcon}
        </>
      )}
    </button>
  );
}