export default function SegmentedControls({
  items = [],
  value,
  onChange,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`tabs ${className}`}>
      <div className="segmented-control" role="tablist">
        {items.map((item, index) => {
          const itemValue = item.value ?? index;
          const isSelected = value === itemValue;

          return (
            <button
              key={itemValue}
              type="button"
              className={[
                "segment-item",
                isSelected ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={disabled || item.disabled}
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                if (!disabled && !item.disabled) {
                  onChange?.(itemValue, item);
                }
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}