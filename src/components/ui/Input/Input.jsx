import Icon from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";
import InlineMessage from "../InlineMessage/InlineMessage";

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

  helperText,
  errorText,
  warningText,

  message,
  messageType = "info",
  showMessageIcon,

  leadingIcon,
  trailingIcon,

  className = "",
  ...props
}) {
  const inputClass =
    status === "default"
      ? "input"
      : `input--${status}`;

  const sizeClass =
    size === "medium"
      ? "input--medium"
      : "";

  const wrapperSizeClass =
    size === "medium"
      ? "input-wrapper--medium"
      : "";

  const hasIcons =
    leadingIcon ||
    trailingIcon ||
    loading;

  const finalMessage =
    errorText ||
    warningText ||
    message ||
    helperText;

  const finalMessageType =
    errorText
      ? "error"
      : warningText
      ? "warning"
      : messageType;

  const shouldShowIcon =
    showMessageIcon ??
    Boolean(
      errorText ||
      warningText ||
      message
    );

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={
            required
              ? "required"
              : ""
          }
        >
          {label}
        </label>
      )}

      {hasIcons ? (
        <div
          className={[
            "input-wrapper",
            wrapperSizeClass,
            loading
              ? "is-loading"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {leadingIcon && (
            <span className="input-icon left">
              <Icon
                name={leadingIcon}
                size={
                  size === "medium"
                    ? "md"
                    : "lg"
                }
              />
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
            <span className="input-spinner">
              <Spinner
                size="extra-small"
                variant="brand"
              />
            </span>
          ) : trailingIcon ? (
            <span className="input-icon right">
              <Icon
                name={trailingIcon}
                size={
                  size === "medium"
                    ? "md"
                    : "lg"
                }
              />
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

      {finalMessage && (
        <InlineMessage
          type={finalMessageType}
          size="small"
          showIcon={shouldShowIcon}
          className="mud-mt-4"
        >
          {finalMessage}
        </InlineMessage>
      )}
    </div>
  );
}