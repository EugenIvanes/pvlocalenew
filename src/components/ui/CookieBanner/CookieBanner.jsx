import {useState} from "react";
import Button from "../Button/Button";
import Switch from "../Button/Switch";
import Badge from "../Badge/Badge";
import Icon from "../Icon/Icon.jsx";

export default function CookieBanner({
                                         onAcceptAll,
                                         onAcceptNecessary,
                                         onConfirm,
                                     }) {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);

    const [showDetails, setShowDetails] = useState(false);

    const [statistics, setStatistics] = useState(true);

    const closeBanner = () => {
        setClosing(true);

        setTimeout(() => {
            setVisible(false);
        }, 300);
    };

    if (!visible) return null;

    return (
        <>
            <div
                className={`cookie-overlay ${
                    closing ? "fade-out" : ""
                }`}
            />

            <div className="cookie-banner">
                <div className="cookie-header">
                    <div className="cookie-title">
                        Informații despre cookie-uri
                    </div>

                    <p className="cookie-description mud-mb-0">
                        Acest site folosește cookie-uri esențiale
                        pentru funcționarea și performanța de bază.
                        În plus, utilizăm cookie-uri statistice
                        pentru a îmbunătăți experiența utilizatorului.
                    </p>
                </div>

                {!showDetails && (
                    <div className="cookie-buttons">
                        <Button
                            variant="outline"
                            color="strict"
                            className="cookie-manage-btn"
                            onClick={() => setShowDetails(true)}
                        >
                            Gestionează cookie-urile
                        </Button>

                        <div className="cookie-allow-group mud-flex mud-gap-12 mud-flex-wrap">
                            <Button
                                variant="outline"
                                color="primary"
                                className="cookie-allow-btn"
                                onClick={() => {
                                    onAcceptNecessary?.();
                                    closeBanner();
                                }}
                            >
                                Doar cele necesare
                            </Button>

                            <Button
                                color="primary"
                                className="cookie-allow-btn"
                                onClick={() => {
                                    onAcceptAll?.();
                                    closeBanner();
                                }}
                            >
                                Permite tot
                            </Button>
                        </div>
                    </div>
                )}

                {showDetails && (
                    <>
                        <button
                            type="button"
                            className={[
                                "mud-cookie-collapse-btn",
                                "mud-p-8",
                                "mud-bg-gray-200",
                                "mud-radius-full",
                                "mud-border-0",
                                !showDetails ? "mud-hidden" : "",
                            ].filter(Boolean).join(" ")}
                            aria-label="Close details"
                            onClick={() => setShowDetails(false)}
                        >
                          <span className="mud-inline-flex">
                            <Icon name="chevron-bottom" size="sm"/>
                          </span>
                        </button>
                        <div className={`collapse mud-w-100 cookie-detail-container ${showDetails ? "show" : ""}`}>
                            <div className="cookie-header mud-mb-6">
                                <div className="cookie-title">
                                    Alege ce cookie-uri accepți
                                </div>
                            </div>

                            <div className="cookie-body">
                                <p className="cookie-description">
                                    Pe acest site folosim instrumente
                                    de măsurare a audienței pentru a
                                    înțelege comportamentul utilizatorilor
                                    și a optimiza conținutul.
                                </p>

                                <div className="cookie-permissions">
                                    <div className="necessary-row mud-flex mud-items-center">
                                        <div className="necessary-text-col mud-flex mud-flex-col mud-justify-center">
                      <span className="cookie-label mud-flex mud-items-center mud-gap-8">
                        Cookie-uri necesare

                        <Badge
                            variant="accent"
                            size="sm"
                        >
                          Obligatoriu
                        </Badge>
                      </span>

                                            <span className="necessary-cookie-content">
                        Aceste cookie-uri sunt esențiale
                        pentru funcționarea site-ului și
                        nu pot fi dezactivate.
                      </span>
                                        </div>

                                        <div className="necessary-icon-col">
                                            <Icon
                                                name="checkmark-large"
                                                size="lg"
                                            />
                                        </div>
                                    </div>

                                    <hr className="separator separator--horizontal separator--thin separator--subtle"/>

                                    <div className="necessary-row mud-flex mud-items-center">
                                        <div className="necessary-text-col mud-flex mud-flex-col mud-justify-center">
                      <span className="cookie-label">
                        Cookie-uri statistice
                      </span>

                                            <p className="necessary-cookie-content mud-mb-0">
                                                Cookie-urile statistice
                                                colectează informații despre
                                                modul în care utilizatorii
                                                folosesc site-ul.
                                            </p>
                                        </div>

                                        <div className="necessary-icon-col">
                                            <Switch
                                                checked={statistics}
                                                onChange={(e) =>
                                                    setStatistics(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cookie-footer">
                                <Button
                                    color="primary"
                                    className="cookie-confirm-btn"
                                    onClick={() => {
                                        onConfirm?.({
                                            necessary: true,
                                            statistics,
                                        });

                                        closeBanner();
                                    }}
                                >
                                    Confirmă selecția
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}