export default function ChipGroup({
  children,
  className = "",
}) {
  return (
    <div
      className={[
        "chip-group",
        "mud-flex",
        "mud-gap-8",
        "mud-flex-wrap",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}