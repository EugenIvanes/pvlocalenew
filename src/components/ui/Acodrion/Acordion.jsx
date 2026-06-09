import { useState } from "react";
import Icon from "../Icon/Icon.jsx";

export default function Accordion({
  items = [],
  defaultOpen = [],
  allowMultiple = true,
  className = "",
}) {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const toggleItem = (value) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(value);

      if (isOpen) {
        return prev.filter((item) => item !== value);
      }

      if (!allowMultiple) {
        return [value];
      }

      return [...prev, value];
    });
  };

  return (
    <section
      className={["accordion", className].filter(Boolean).join(" ")}
      data-accordion
    >
      {items.map((item, index) => {
        const value = item.value ?? index;
        const isOpen = openItems.includes(value);

        const triggerId = `accordion-trigger-${value}`;
        const panelId = `accordion-panel-${value}`;

        return (
          <div className="accordion__item" key={value}>
            <h4 className="accordion__header">
              <button
                id={triggerId}
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(value)}
              >
                <span className="accordion__heading">
                  {item.title}
                </span>

                {item.supportingText && (
                  <span className="accordion__supporting">
                    {item.supportingText}
                  </span>
                )}

                <span className="accordion__icon" aria-hidden="true">
                  <Icon name="plus-large" size="md" />
                </span>
              </button>
            </h4>

            <div
              id={panelId}
              className="accordion__panel"
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </section>
  );
}