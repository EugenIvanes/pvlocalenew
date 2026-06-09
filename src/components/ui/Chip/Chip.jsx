import Icon from "../Icon/Icon.jsx";
import Avatar from "../Avatar/Avatar";

export default function Chip({
                                 children,
                                 selected = false,
                                 disabled = false,

                                 icon,
                                 avatar,

                                 badge,

                                 closable = false,
                                 onClose,

                                 onClick,

                                 className = "",
                             }) {
    return (
        <button
            type="button"
            disabled={disabled}
            aria-pressed={selected}
            onClick={onClick}
            className={[
                "chip ",
                selected ? "is-selected" : "",
                disabled ? "is-disabled" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {icon && (
                <span className="chip__icon">
          <Icon name={icon} size="sm"/>
        </span>
            )}
            {avatar && (
                <span className="chip__avatar">
                    <Avatar
                        src={avatar}
                        size="xs"
                    />
                  </span>
            )}
            <span className="chip__label">
        {children}
      </span>

            {badge !== undefined && (
                <span
                    className="chip__badge"
                    aria-hidden="true"
                >
          {badge}
        </span>
            )}

            {closable && (
                <span
                    className="chip__close"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose?.();
                    }}
                >
          <Icon
              name="cross-small"
              size="sm"
          />
        </span>
            )}
        </button>
    );
}