export default function Link({
  children,
  href = "#",
  size = "md", // lg | md | sm | xs
  variant = "primary", // primary | strict | white
  underline = true,
  targetSize = "pointer", // pointer | touch
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <a
      href={disabled ? undefined : href}
      className={[
        "link",
        `link-${size}`,
        `link-${variant}`,
        underline ? "link-underline" : "link-no-underline",
        targetSize ? `link-target-${targetSize}` : "",
        disabled ? "is-disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-disabled={disabled ? "true" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}