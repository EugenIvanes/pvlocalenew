import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../Icon/Icon";

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function getMondayBasedStart(date) {
  const day = date.getDay(); // 0 Sunday
  return day === 0 ? 6 : day - 1;
}

export default function DatePicker({
  id,
  label = "Label",
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  today = new Date(),
}) {
  const rootRef = useRef(null);
  const selectedDate = value ? new Date(value) : null;

  const initialDate = selectedDate || today;

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const startOffset = getMondayBasedStart(firstDay);
    const startDate = new Date(year, month, 1 - startOffset);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      return {
        date,
        iso: toISO(date),
        label: date.getDate(),
        isOutside: date.getMonth() !== month,
        isToday: toISO(date) === toISO(today),
        isSelected: selectedDate && toISO(date) === toISO(selectedDate),
      };
    });
  }, [year, month, today, selectedDate]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const goPrevMonth = () => {
    const next = new Date(year, month - 1, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const goNextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  const handleSelect = (date) => {
    onChange?.(toISO(date), date);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="date-picker__field"
      data-date-picker
      data-type="default"
      data-open={open ? "true" : "false"}
      data-year={year}
      data-month={month}
      data-selected={value}
      data-today={toISO(today)}
    >
      <div className="input-group input-date-wrapper">
        {label && <label htmlFor={id}>{label}</label>}

        <div className="input-wrapper">
          <input
            id={id}
            type="text"
            className="input js-date-picker-input"
            placeholder={placeholder}
            autoComplete="off"
            value={selectedDate ? formatDate(selectedDate) : ""}
            // readOnly
            onClick={() => setOpen(true)}
          />

          <button
            type="button"
            className="input-icon right icon-calendar mud-border-0 mud-bg-transparent js-date-picker-toggle"
            aria-label="Open calendar"
            aria-controls={`panel-${id}`}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Icon name="calendar" size="md" />
          </button>
        </div>
      </div>

      <div
        id={`panel-${id}`}
        className="date-picker-panel"
        aria-hidden={!open}
        hidden={!open}
      >
        <div className="date-picker" role="dialog" aria-label="Choose date">
          <div className="date-picker__header">
            <button
              className="date-picker__nav js-date-picker-prev"
              type="button"
              aria-label="Previous month"
              onClick={goPrevMonth}
            >
              <Icon name="chevron-left" size="md" />
            </button>

            <div className="date-picker__month js-date-picker-label">
              {months[month]} {year}
            </div>

            <button
              className="date-picker__nav js-date-picker-next"
              type="button"
              aria-label="Next month"
              onClick={goNextMonth}
            >
              <Icon name="chevron-right" size="md" />
            </button>
          </div>

          <div className="date-picker__grid date-picker__grid--days" data-view="day">
            <div className="date-picker__weekdays">
              {weekdays.map((day, index) => (
                <div key={index} className="date-picker__weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="date-picker__days js-date-picker-days">
              {days.map((day) => (
                <button
                  key={day.iso}
                  type="button"
                  className={[
                    "date-picker__day",
                    day.isOutside ? "is-outside" : "",
                    day.isToday ? "is-today" : "",
                    day.isSelected ? "is-selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleSelect(day.date)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}