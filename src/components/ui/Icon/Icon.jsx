export default function Icon({
  name,
  size = "md",
  title,
  className = "",
  spritePath = "/src/assets/icons/sprite.svg",
}) {
  const sizeClass = {
    sm: "small",
    md: "",
    lg: "large",
  }[size];

  return (
    <svg
      className={["icon", sizeClass, className].filter(Boolean).join(" ")}
      aria-hidden={title ? "false" : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <use href={`${spritePath}#icon-${name}`} />
    </svg>
  );
}