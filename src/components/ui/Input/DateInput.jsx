import Input from "../Input/Input";

export default function DateInput({
  id,
  label,
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  size = "large",
  status = "default",
  required = false,
  disabled = false,
  helperText,
  errorText,
  warningText,
  message,
  className = "",
  ...props
}) {
  return (
    <Input
      id={id}
      label={label}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size={size}
      status={status}
      required={required}
      disabled={disabled}
      trailingIcon="calendar"
      helperText={helperText}
      errorText={errorText}
      warningText={warningText}
      message={message}
      className={className}
      inputMode="numeric"
      autoComplete="off"
      {...props}
    />
  );
}