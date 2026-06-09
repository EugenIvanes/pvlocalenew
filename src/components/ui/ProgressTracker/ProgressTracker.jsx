import {useLayoutEffect, useRef} from "react";

export default function ProgressTracker({
                                            steps = [],
                                            currentStep = 1,
                                            orientation = "horizontal",
                                            mobile = false,
                                            onStepClick,
                                            className = "",
                                        }) {
    const trackerRef = useRef(null);

    useLayoutEffect(() => {
        const calculate = () => {
            const tracker = trackerRef.current;
            if (!tracker) return;

            const stepElements = tracker.querySelectorAll(".progress-step");
            if (stepElements.length <= 1) return;

            const isVertical = orientation === "vertical";

            const circle = stepElements[0].querySelector(".progress-step__circle");
            if (!circle) return;

            const totalLength = isVertical
                ? tracker.offsetHeight
                : tracker.offsetWidth;

            const circleSize = isVertical
                ? circle.offsetHeight
                : circle.offsetWidth;

            const connectorLength =
                isVertical
                    ? (totalLength - stepElements.length * circleSize) /
                    (stepElements.length - 1)
                    : (totalLength - stepElements.length * circleSize) /
                    (stepElements.length - 1) -
                    circleSize * 2;

            stepElements.forEach((step) => {
                step.style.setProperty(
                    "--connector-length",
                    `${Math.max(connectorLength, 0)}px`
                );
            });
        };

        const frame = requestAnimationFrame(calculate);

        window.addEventListener("resize", calculate);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", calculate);
        };
    }, [steps, currentStep, orientation, mobile]);

    const getStatus = (step, index) => {
        if (step.status) return step.status;

        const stepNumber = index + 1;

        if (stepNumber < currentStep) return "completed";
        if (stepNumber === currentStep) return "current";
        return "incomplete";
    };

    const getCircleContent = (status, index) => {
        if (mobile) {
            return status === "completed" ? "✔" : "";
        }

        if (status === "completed") return "✔";
        if (status === "blocked") return "!";
        return index + 1;
    };

    return (
        <div
            ref={trackerRef}
            className={[
                "progress-tracker",
                orientation === "vertical" ? "progress-tracker--vertical" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            data-orientation={orientation}
            id={mobile ? "tracker-mobile" : undefined}
        >
            {steps.map((step, index) => {
                const status = getStatus(step, index);

                return (
                    <div
                        key={step.id || index}
                        className={[
                            "progress-step",
                            `progress-step--${status}`,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        onClick={() => {
                            if (!step.disabled) {
                                onStepClick?.(step, index);
                            }
                        }}
                    >
                        {orientation === "vertical" ? (
                            <>
                                <div className="progress-step__circle">
                                    {getCircleContent(status, index)}
                                </div>

                                <div className="progress-step__label">
                                    {step.label || "Step"}
                                </div>
                            </>
                        ) : (
                            <div className="progress-cell">
                                <div className="progress-step__circle">
                                    {getCircleContent(status, index)}
                                </div>

                                {!mobile && (
                                    <div className="progress-step__label">
                                        {step.label || "Step"}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}