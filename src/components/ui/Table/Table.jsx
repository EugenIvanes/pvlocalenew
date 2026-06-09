import Icon from "../Icon/Icon.jsx";

export default function Table({
  columns = [],
  data = [],
  variant = "default", // default | subtle | strong | white | desktop | mobile
  responsive = true,
  sortBy,
  sortDirection,
  onSort,
  emptyMessage = "Nu există date",
  className = "",
}) {
  const table = (
    <table
      className={[
        "table",
        `table--${variant}`,
        onSort ? "table--trailing-icon" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <thead className="table__head">
        <tr className="table__row">
          {columns.map((column) => {
            const sortable = Boolean(column.sortable);
            const activeSort = sortBy === column.key;

            return (
              <th
                key={column.key}
                className={[
                  "table__head-cell",
                  sortable ? "table__head-cell--sortable" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                scope="col"
                aria-sort={
                  activeSort
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : sortable
                    ? "none"
                    : undefined
                }
              >
                {sortable ? (
                  <button
                    type="button"
                    className="table__sort-button"
                    onClick={() => onSort?.(column.key)}
                  >
                    {column.label}

                    <span className="table__sort-icon">
                      <Icon name="chevron-grabber" size="sm" />
                    </span>
                  </button>
                ) : (
                  column.label
                )}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr className="table__row">
            <td
              className="table__body-cell"
              colSpan={columns.length}
            >
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="table__row"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="table__body-cell"
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  if (!responsive) {
    return table;
  }

  return <div className="table-responsive">{table}</div>;
}