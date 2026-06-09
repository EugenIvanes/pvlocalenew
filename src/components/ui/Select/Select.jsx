import { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon.jsx";

export default function Select({
  id,
  label,

  value,
  onChange,

  options = [],

  placeholder = "Selectați",

  size = "large", // large | medium
  status = "default", // default | destructive

  required = false,
  disabled = false,

  message,
  messageType = "info",
  truncateMessage = false,

  className = "",
}) {
  const [open, setOpen] = useState(false);

  const selectRef = useRef(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelect = (option) => {
    onChange?.(option.value, option);
    setOpen(false);
  };

  return (
    <div
      className={`select-wrap ${className}`}
      ref={selectRef}
    >
      {label && (
        <label
          id={`${id}-label`}
          htmlFor={`${id}-control`}
          className={`select-label ${
            required ? "required" : ""
          }`}
        >
          <span className="select-label__text">
            {label}
          </span>
        </label>
      )}

      <div
        className="custom-select"
        data-size={size}
        data-variant={
          status === "destructive"
            ? "destructive"
            : undefined
        }
        aria-disabled={disabled}
      >
        <button
          id={`${id}-control`}
          type="button"
          className="select-control"
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen(!open)}
        >
          <span
            className={[
              "select-value",
              !selectedOption
                ? "is-placeholder"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            title={
              selectedOption
                ? selectedOption.label
                : placeholder
            }
          >
            {selectedOption
              ? selectedOption.label
              : placeholder}
          </span>

          <span
            className="select-arrow"
            aria-hidden="true"
          >
            <span className="mud-inline-flex">
              <Icon
                name="chevron-bottom"
                size="sm"
              />
            </span>
          </span>
        </button>

        <div
          className="select-dropdown"
          hidden={!open}
        >
          <ul
            className="select-list"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected =
                option.value === value;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    "select-option",
                    isSelected
                      ? "is-selected"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() =>
                    handleSelect(option)
                  }
                >
                  <span className="select-option__label">
                    {option.label}
                  </span>

                  <span
                    className="select-option__check"
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {message && (
        <div
          className={[
            "message",
            "message--inline",
            `message--${messageType}`,
            "mud-mt-8",
          ]
            .filter(Boolean)
            .join(" ")}
          role={
            messageType === "error"
              ? "alert"
              : "status"
          }
        >
          {messageType === "error" && (
            <span className="message__icon">
              <Icon
                name="circle-error-filled"
                size="md"
              />
            </span>
          )}

          <span className="message__text">
            <span
              className={
                truncateMessage
                  ? "select-doc-assistive-text-clamp"
                  : ""
              }
            >
              {message}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}