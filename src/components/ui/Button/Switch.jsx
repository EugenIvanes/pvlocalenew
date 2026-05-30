export default function Switch({
  id,
  name,
  checked = false,
  onChange,

  label,
  description,

  size = "default", // default | large | medium | small
  error = false,
  disabled = false,

  className = "",
  ...props
}) {
  const sizeClass =
    size === "default" ? "" : `switch--${size}`;

  return (
    <div
      className={[
        "switch",
        sizeClass,
        error ? "switch--error" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label className="switch-wrapper" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="switch-input"
          {...props}
        />

        <div className="switch-track">
          <div className="switch-thumb"></div>
        </div>

        {(label || description) && (
          <div className="switch-text">
            {label && (
              <span className="switch-label">
                {label}
              </span>
            )}

            {description && (
              <span className="switch-description">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    </div>
  );
}