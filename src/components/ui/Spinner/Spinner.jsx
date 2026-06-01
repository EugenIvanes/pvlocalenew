export default function Spinner({
  size = "medium", // extra-small | small | medium | large
  variant = "brand", // brand | dark | light | light-on-color
  className = "",
  label = "Loading",
}) {
  return (
    <span
      className={[
        "spinner",
        `spinner--${size}`,
        `spinner--${variant}`,
        className,
      ].filter(Boolean).join(" ")}
      role="status"
      aria-label={label}
    />
  );
}