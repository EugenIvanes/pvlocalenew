import Icon from "../Icon/Icon";
import Badge from "../Badge/Badge.jsx";

export default function Avatar({
  src,
  initials,
  icon = "user",
  size = "md",
  badge,
  dot = false,
  alt = "",
  className = "",
}) {
  let type = "icon";

  if ((badge !== undefined || dot) && src) {
  type = null;
  } else if (src) {
    type = "image";
  } else if (initials) {
    type = "initials";
  }

  return (
    <div
      className={[
        "avatar",
        type ? `avatar--${type}` : "",
        `avatar--${size}`,
        dot ? "avatar--dot" : "",
        badge !== undefined ? "avatar--numbered" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-count={badge}
    >
      {src && (badge !== undefined || dot) ? (
          <div className="avatar--image">
            <img src={src} alt={alt} />
          </div>
        ) : src ? (
          <img src={src} alt={alt} />
        ) : null}

      {initials && initials}

      {!src && !initials && (
        <span className="mud-flex">
          <Icon name={icon} size="md" />
        </span>
      )}

      {badge !== undefined && (
        <Badge variant="notification" size="md">
          {badge}
        </Badge>
      )}
    </div>
  );
}