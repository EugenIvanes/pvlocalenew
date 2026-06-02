export default function Flag({
  code = "md",
  size = 24,
  rounded = true,
  bordered = true,
  alt = "",
  className = "",
}) {
  const normalizedCode = code.toLowerCase();

  return (
    <span
      className={[
        "mud-inline-flex",
        "mud-items-center",
        "mud-justify-center",
        "mud-flex-shrink-0",
        rounded ? "mud-radius-4" : "",
        "mud-overflow-hidden",
        "mud-bg-gray-100",
        bordered ? "mud-border mud-border-1 mud-border-gray-250" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden={alt ? undefined : "true"}
    >
      <img
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/1x1/${normalizedCode}.svg`}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width: size,
          height: size,
          display: "block",
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.parentElement.textContent = "?";
        }}
      />
    </span>
  );
}