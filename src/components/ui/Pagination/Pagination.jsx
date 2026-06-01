import Icon from "../Icon/Icon";

function getPaginationItems(currentPage, totalPages, maxSlots = 7) {
  if (totalPages <= maxSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items = [];

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  compact = false,
  maxSlots = 7,
  ariaLabel = "Page navigation",
  className = "",
}) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(
    currentPage,
    totalPages,
    maxSlots
  );

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    onPageChange?.(page);
  };

  return (
    <nav aria-label={ariaLabel}>
      <ul
        className={[
          "pagination",
          compact ? "pagination--compact" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <li
          className={[
            "pagination__item",
            currentPage === 1 ? "mud-hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            className={[
              "pagination__link",
              currentPage === 1
                ? "pagination__link--disabled"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="pagination__icon" aria-hidden="true">
              <Icon name="chevron-left" size="md" />
            </span>
            <span className="pagination__link--text">Prev</span>
          </button>
        </li>

        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="pagination__item"
          >
            {item === "..." ? (
              <button
                type="button"
                className="pagination__link"
                disabled
                aria-hidden="true"
              >
                ...
              </button>
            ) : (
              <button
                type="button"
                className={[
                  "pagination__link",
                  item === currentPage
                    ? "pagination__link--active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={
                  item === currentPage ? "page" : undefined
                }
                onClick={() => goToPage(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}

        <li
          className={[
            "pagination__item",
            currentPage === totalPages ? "mud-hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            className={[
              "pagination__link",
              currentPage === totalPages
                ? "pagination__link--disabled"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="pagination__link--text">Next</span>
            <span className="pagination__icon" aria-hidden="true">
              <Icon name="chevron-right" size="md" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}