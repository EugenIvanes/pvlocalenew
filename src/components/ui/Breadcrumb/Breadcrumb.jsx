import Icon from "../Icon/Icon";

export default function Breadcrumbs({
  items = [],
  withIcon = false,
  mobile = false,
  ariaLabel = "Breadcrumb",
  className = "",
}) {
  if (!items.length) return null;

  if (mobile) {
    const previousItem =
      items.length > 1 ? items[items.length - 2] : items[0];

    return (
      <nav
        className={["breadcrumbs", "breadcrumbs--mobile", className]
          .filter(Boolean)
          .join(" ")}
        aria-label={ariaLabel}
      >
        <ol className="breadcrumbs__list">
          <li className="breadcrumbs__item breadcrumbs__item--back">
            <a href={previousItem.href || "#"} className="breadcrumbs__link mud-flex mud-gap-6">
              {previousItem.label}
            </a>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav
      className={[
        "breadcrumbs",
        withIcon ? "breadcrumbs--with-icon" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
    >
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={[
                "breadcrumbs__item",
                isLast ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isLast ? (
                <span className="breadcrumbs__current">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  className={[
                    "breadcrumbs__link",
                    item.disabled ? "is-disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {withIcon && index === 0 && item.icon && (
                    <span className="mud-inline-flex">
                      <Icon name={item.icon} size="sm" />
                    </span>
                  )}

                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}