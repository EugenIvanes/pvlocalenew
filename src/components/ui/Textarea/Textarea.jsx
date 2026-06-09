import { useMemo } from "react";
import Icon from "../Icon/Icon.jsx";

export default function Textarea({
  id,
  label,
  value = "",
  onChange,
  placeholder = "",
  rows = 4,

  status = "default",
  required = false,
  disabled = false,
  readOnly = false,

  message,
  messageIcon,

  maxLength,
  showCounter = false,

  className = "",
  ...props
}) {
  const textareaClass =
    status === "default"
      ? "textarea"
      : `textarea textarea--${status}`;

  const statusIcons = {
    warning: "warning-filled",
    destructive: "circle-error-filled",
    success: "circle-checkmark-filled",
  };

  const iconName =
    messageIcon || statusIcons[status];

  const currentLength = value?.length || 0;

  return (
    <div className={`input-wrapper is-textarea ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={required ? "required" : ""}
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        className={textareaClass}
        {...props}
      />

      {(message || showCounter) && (
        <div className="message message--inline message--info mud-mt-6 justify-content-counter">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {message && iconName && (
              <Icon
                name={iconName}
                size="sm"
              />
            )}

            {message && (
              <span className="message__text">
                {message}
              </span>
            )}
          </div>

          {showCounter && maxLength && (
            <span>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}