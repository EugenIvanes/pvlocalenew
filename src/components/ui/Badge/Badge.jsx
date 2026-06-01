export default function Badge({
  children,
  variant = "neutral", // dark | light | neutral | accent | notification
  size = "md", // lg | md | sm | xs
  className = "",
  ...props
}) {
  return (
    <span
      className={[
        "badge",
        `badge--solid-${variant}`,
        `badge--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}