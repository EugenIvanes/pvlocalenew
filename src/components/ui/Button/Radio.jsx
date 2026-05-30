export default function Radio({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  description,
  size = "medium", // medium | small
  error = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <label
      className={[
        "radio",
        `radio--${size}`,
        error ? "radio--error" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      htmlFor={id}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="radio-input"
        {...props}
      />

      <span className="radio-custom"></span>

      <span className="radio-texts">
        {label && (
          <span className="radio-label">
            {label}
          </span>
        )}

        {description && (
          <span className="radio-description">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}