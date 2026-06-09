import Icon from "../Icon/Icon.jsx";

export default function Menu({
  items = [],
  variant = "contextual", // contextual | selection
  className = "",
}) {
  return (
    <div
      className={[
        "menu",
        "menu--desktop",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-size="desktop"
    >
      <div className="menu__panel" role="presentation">
        <ul
          className="menu__list"
          role={variant === "selection" ? "listbox" : "menu"}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={[
                "menu__item",
                item.disabled ? "is-disabled" : "",
                item.selected ? "is-selected" : "",
                item.destructive ? "is-destructive" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role={variant === "selection" ? "option" : "menuitem"}
              aria-selected={variant === "selection" ? item.selected : undefined}
              aria-disabled={item.disabled || undefined}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick?.(item);
                }
              }}
            >
              {item.icon && (
                <span className="menu__item-icon">
                  <Icon name={item.icon} size="md" />
                </span>
              )}

              <span className="menu__item-label">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}