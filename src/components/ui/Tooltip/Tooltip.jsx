import {useEffect} from "react";

export default function Tooltip({
                                    children,
                                    content,
                                    placement = "top-center",
                                    size,
                                    close = false,
                                }) {
    useEffect(() => {
        setTimeout(() => {
            window.initTooltips?.();
        }, 0);
    }, [content, placement, size, close]);

    return (
        <span
            data-tooltip={content}
            data-placement={placement}
            data-size={size}
            data-close={close}
            style={{
                display: "inline-flex",
            }}
        >
      {children}
    </span>
    );
}