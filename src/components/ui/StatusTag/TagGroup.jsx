export default function TagGroup({
  children,
  className = "",
}) {
  return (
    <div
      className={[
        "tag-group",
        "mud-flex",
        "mud-gap-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}