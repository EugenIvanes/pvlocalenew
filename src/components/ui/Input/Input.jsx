import Icon from "../Icon/Icon";

export default function Input({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  status = "default", // default | warning | destructive | success
  size = "large", // medium | large
  required = false,
  disabled = false,
  readOnly = false,
  loading = false,
  message,
  messageIcon,
  leadingIcon,
  trailingIcon,
  className = "",
  ...props
}) {
  const inputClass =
    status === "default" ? "input" : `input--${status}`;

  const sizeClass = size === "medium" ? "input--medium" : "";
  const wrapperSizeClass = size === "medium" ? "input-wrapper--medium" : "";

  const hasIcons = leadingIcon || trailingIcon || loading;

  const statusIcons = {
      warning: "warning-filled",
      destructive: "circle-error-filled",
      success: "circle-checkmark-filled",
};

const iconName = messageIcon || statusIcons[status];

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className={required ? "required" : ""}>
          {label}
        </label>
      )}

      {hasIcons ? (
        <div className={`input-wrapper ${wrapperSizeClass} ${loading ? "is-loading" : ""}`}>
          {leadingIcon && (
            <span className="input-icon left">
              <Icon name={leadingIcon} size={size === "medium" ? "md" : "lg"} />
            </span>
          )}

          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            className={`${inputClass} ${sizeClass}`}
            {...props}
          />

          {loading ? (
            <span className="spinner spinner--extra-small spinner--brand"></span>
          ) : trailingIcon ? (
            <span className="input-icon right">
              <Icon name={trailingIcon} size={size === "medium" ? "md" : "lg"} />
            </span>
          ) : null}
        </div>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          className={`${inputClass} ${sizeClass}`}
          {...props}
        />
      )}

      {message && (
          <div className={`input-message ${status}`}>
            {iconName && status !== "default" && (
              <Icon name={iconName} size="sm" />
            )}
            <span>{message}</span>
          </div>
      )}
    </div>
  );
}