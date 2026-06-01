import { useState } from "react";
import Icon from "../Icon/Icon";
import Badge from "../Badge/Badge";

export default function Tabs({
  tabs = [],
  value,
  onChange,
  size = "desktop", // desktop | mobile
  className = "",
}) {
  const [internalValue, setInternalValue] = useState(
    tabs[0]?.value
  );

  const activeValue = value ?? internalValue;

  const handleChange = (tabValue) => {
    if (value === undefined) {
      setInternalValue(tabValue);
    }

    onChange?.(tabValue);
  };

  return (
    <div
      className={[
        "tabs",
        size === "mobile" ? "tabs--sm" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="tab-buttons" role="tablist">
        {tabs.map((tab, index) => {
          const active = tab.value === activeValue;
          const tabId = `tab-${tab.value}`;
          const panelId = `panel-${tab.value}`;

          return (
            <button
              key={tab.value}
              id={tabId}
              type="button"
              role="tab"
              className={[
                "tab-button",
                active ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-selected={active}
              aria-controls={panelId}
              onClick={() => handleChange(tab.value)}
            >
              {tab.icon && (
                <span className="mud-inline-flex">
                  <Icon name={tab.icon} size="md" />
                </span>
              )}

              {tab.label}

              {tab.badge !== undefined && (
                <Badge
                  variant="neutral"
                  size={size === "mobile" ? "sm" : "md"}
                >
                  {tab.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      <div className="tab-panels">
        {tabs.map((tab) => {
          const active = tab.value === activeValue;
          const tabId = `tab-${tab.value}`;
          const panelId = `panel-${tab.value}`;

          return (
            <div
              key={tab.value}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              className="tab-panel"
              hidden={!active}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}