import { useEffect, useRef } from "react";

export default function Checkbox({
  id,
  name,
  checked = false,
  indeterminate = false,
  onChange,

  label,
  description,

  size = "medium", // medium | small
  error = false,
  disabled = false,

  className = "",
  ...props
}) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      className={[
        "checkbox",
        `checkbox--${size}`,
        error ? "checkbox--error" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={checkboxRef}
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="checkbox-input"
        {...props}
      />

      <span className="checkbox-custom"></span>

      <span className="checkbox-texts">
        {label && (
          <span className="checkbox-label">
            {label}
          </span>
        )}

        {description && (
          <span className="checkbox-description">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}