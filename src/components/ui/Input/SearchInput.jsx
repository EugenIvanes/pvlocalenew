import Icon from "../Icon/Icon.jsx";

export default function SearchInput({
  id,
  label,
  value = "",
  onChange,
  onClear,
  onSearch,
  placeholder = "Caută...",
  shape = "rectangular", // rectangular | circular
  size = "large", // large | medium
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const hasValue = Boolean(value);

  const handleSubmit = () => {
    if (onSearch && !disabled && !loading) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label className="mud-mb-8 mud-block" htmlFor={id}>
          {label}
        </label>
      )}

      <div
        className={[
          "search-input",
          shape,
          size,
          loading ? "loading" : "",
          hasValue ? "has-value is-ready" : "",
          disabled ? "disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="mud-p-2 mud-radius-8 mud-inline-flex icon-search">
          <Icon name="search" size="md" />
        </span>

        <input
          id={id}
          type="text"
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          {...props}
        />

        <div className="mud-items-center mud-gap-6 mud-btn-group">
          {loading && (
            <span className="spinner spinner--extra-small spinner--brand" />
          )}

          {hasValue && !loading && (
            <button
              type="button"
              className="mud-btn-icon clear"
              aria-label="Clear search"
              onClick={handleClear}
            >
              <Icon name="cross-small" size="sm" />
            </button>
          )}

          <button
            type="button"
            className="mud-btn mud-btn-primary mud-btn-search"
            aria-label="Submit search"
            onClick={handleSubmit}
            disabled={disabled || loading}>
            <Icon name="arrow-left" size="md" />
          </button>
        </div>
      </div>
    </div>
  );
}