import {useEffect, useRef, useState} from "react";
import Icon from "../Icon/Icon.jsx";
import Avatar from "../Avatar/Avatar";
import SearchInput from "../Input/SearchInput.jsx";
import "./Header.css";

export default function Header({
                                   preHeader,
                                   brand,

                                   languages = [],
                                   activeLanguage,
                                   onLanguageChange,

                                   showPreHeader = true,
                                   showLanguageSwitcher = true,
                                   showSearch = true,
                                   showHelp = true,
                                   showPlatforms = true,
                                   showAuthActions = true,
                                   showMobileAuth = true,

                                   navItems = [],
                                   platforms = [],
                                   helpLinks = [],

                                   search = true,
                                   searchPlaceholder = "Caută",
                                   onSearch,

                                   auth,

                                   user,
                               }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [platformsOpen, setPlatformsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const platformsRef = useRef(null);
    const navRef = useRef(null);
    useEffect(() => {
        if (!openMenu) return;

        function handleClickOutside(event) {
            if (!navRef.current?.contains(event.target)) {
                setOpenMenu(null);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setOpenMenu(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [openMenu]);

    useEffect(() => {
        if (!platformsOpen) return;

        function handleClickOutside(event) {
            if (!platformsRef.current?.contains(event.target)) {
                setPlatformsOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setPlatformsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [platformsOpen]);

    return (
        <>
            {showPreHeader && (
                <div className="pre-header">
                    <div className="pre-header__content">
                        <div className="pre-header__left">
                            {preHeader && (
                                <div className="pre-header__logo">
                                    <a href={preHeader.href || "#"} target="_blank" rel="noreferrer">
                                ls        {preHeader.logo && (
                                            <img src={preHeader.logo} alt="" width="24" height="24"/>
                                        )}
                                        {preHeader.label && (
                                            <span className="pre-header__label">{preHeader.label}</span>
                                        )}
                                    </a>
                                </div>
                            )}
                        </div>

                        {showLanguageSwitcher && languages.length > 0 && (
                            <div className="pre-header__right">
                                <div className="language-switcher" data-language-switcher>
                                    <ul>
                                        {languages.map((lang) => {
                                            const isActive = activeLanguage === lang.value;

                                            return (
                                                <li key={lang.value}>
                                                    <button
                                                        type="button"
                                                        className={[
                                                            "language-switcher__btn",
                                                            isActive ? "active" : "",
                                                        ].filter(Boolean).join(" ")}
                                                        data-lang={lang.value}
                                                        aria-pressed={isActive}
                                                        aria-label={lang.ariaLabel || lang.label || lang.shortLabel}
                                                        onClick={() => onLanguageChange?.(lang.value, lang)}
                                                    >
                                                        {lang.shortLabel || lang.label}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <header className="header header--desktop mud-hidden mud-md-flex">
                <div className="header__wrapper">
                    {brand && (
                        <a href={brand.href || "#"} className="header__brand" aria-label={brand.ariaLabel}>
                            {brand.logo && (
                                <div className="header__brand--logo">
                                    <img src={brand.logo} alt={brand.alt || ""}/>
                                </div>
                            )}

                            {(brand.title || brand.description) && (
                                <div className="header__brand--details mud-hidden mud-sm-flex">
                                    {brand.title && <span className="brand-text">{brand.title}</span>}
                                    {brand.description && (
                                        <span className="brand-description">{brand.description}</span>
                                    )}
                                </div>
                            )}
                        </a>
                    )}

                    <nav ref={navRef} className="nav" role="navigation" aria-label="Meniu principal">
                        {navItems.map((item, index) => {
                            const hasMega = Array.isArray(item.mega) && item.mega.length > 0;
                            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                            const hasDropdown = hasMega || hasChildren;
                            const id = `header-nav-${index}`;
                            const isOpen = openMenu === id;

                            return (
                                <div
                                    key={index}
                                    className={[
                                        "nav__item",
                                        hasDropdown ? "nav__item--has-dropdown" : "",
                                        isOpen ? "is-open" : "",
                                    ].filter(Boolean).join(" ")}
                                >
                                    {hasDropdown ? (
                                        <>
                                            <button
                                                type="button"
                                                className="nav__link"
                                                aria-expanded={isOpen}
                                                aria-haspopup={hasMega ? "true" : "menu"}
                                                aria-controls={`${id}-panel`}
                                                onClick={() => {
                                                    setPlatformsOpen(false);
                                                    setSearchOpen(false);
                                                    setOpenMenu(isOpen ? null : id);
                                                }}
                                            >
                                                {item.label}
                                                <span className="nav__icon mud-p-2 mud-inline-flex">
                                                  <Icon name="chevron-bottom" size="sm"/>
                                                </span>
                                            </button>

                                            {isOpen && (
                                                <div
                                                    id={`${id}-panel`}
                                                    className={`nav__menu ${hasMega ? "full" : "header-menu"}`}
                                                    role={hasMega ? "region" : "menu"}
                                                    aria-label={item.label}
                                                    hidden={!isOpen}
                                                    style={isOpen ? {
                                                        display: "block",
                                                        visibility: "visible",
                                                        opacity: 1,
                                                        pointerEvents: "auto",
                                                        position: "absolute",
                                                        top: "100%",
                                                        left: hasMega ? 0 : "auto",
                                                        right: hasMega ? 0 : "auto",
                                                        minWidth: hasMega ? "100%" : "240px",
                                                        width: hasMega ? "100%" : "max-content",
                                                        background: "var(--white, #fff)",
                                                        zIndex: 9999,
                                                    } : undefined}
                                                >
                                                    {hasMega ? (
                                                        <div className="mud-container">
                                                            <div className="mud-row">
                                                                {item.mega.map((col, colIndex) => (
                                                                    <div
                                                                        key={colIndex}
                                                                        className="mud-col-12 mud-col-md-6 mud-col-lg-4"
                                                                    >
                                                                        {col.title && (
                                                                            <h3 className="nav__menu--heading">
                                                                                {col.title}
                                                                            </h3>
                                                                        )}
                                                                        <hr className="separator separator--horizontal separator--thin separator--subtle"/>
                                                                        <ul className="nav__submenu" role="none">
                                                                            {(col.links || []).map((link, linkIndex) => (
                                                                                <li key={linkIndex}>
                                                                                    <div className="descriptor">
                                                                                        <a
                                                                                            href={link.href || "#"}
                                                                                            className="nav__submenu-item"
                                                                                            target={link.target}
                                                                                            rel={link.rel}
                                                                                            onClick={() => setOpenMenu(null)}
                                                                                        >
                                                                                            {link.label}
                                                                                        </a>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="menu menu--desktop">
                                                            <div className="menu__panel">
                                                                <ul className="menu__list" role="menu">
                                                                    {(item.children || []).map((child, childIndex) => (
                                                                        <li key={childIndex}>
                                                                            <div className="descriptor">
                                                                                <a
                                                                                    href={child.href || "#"}
                                                                                    className="menu__item"
                                                                                    target={child.target}
                                                                                    rel={child.rel}
                                                                                    onClick={() => setOpenMenu(null)}
                                                                                >
                                                                                  <span className="menu__label">
                                                                                    {child.label}
                                                                                  </span>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <a href={item.href || "#"} className="nav__link">
                                            {item.label}
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    <nav className="mainNav" role="navigation" aria-label="Meniu principal">
                        <button
                            type="button"
                            className="mainNav__toggle"
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((prev) => !prev)}
                        >
                            <span className="mainNav__toggleText">Meniu</span>
                            <span className="mainNav__toggleIcon nav__icon mud-inline-flex">
                <Icon name={mobileOpen ? "cross-large" : "plus-large"} size="sm"/>
              </span>
                        </button>
                    </nav>

                    <div className="header__actions">
                        <div className="header__utilities">
                            {showSearch && search && (
                                <div className="header__search">
                                    <button
                                        type="button"
                                        className="header__toggle"
                                        aria-label="Caută"
                                        aria-expanded={searchOpen}
                                        onClick={() => {
                                            setOpenMenu(null);
                                            setPlatformsOpen(false);
                                            setSearchOpen(true);
                                        }}
                                    >
                    <span className="mud-inline-flex">
                      <Icon name="search" size="lg"/>
                    </span>
                                    </button>
                                </div>
                            )}

                            {showHelp && helpLinks.length > 0 && (
                                <div className="header__help mud-hidden mud-md-block">
                                    <button className="header__toggle" aria-label="Ajutor">
                                        <Icon name="bubble-question" size="lg"/>
                                    </button>
                                </div>
                            )}

                            {showPlatforms && platforms.length > 0 && (
                                <div
                                    ref={platformsRef}
                                    className="header__platforms mud-hidden mud-lg-block"
                                >
                                    <button
                                        type="button"
                                        className="header__toggle"
                                        aria-label="Platforme utile"
                                        aria-expanded={platformsOpen}
                                        onClick={() => {
                                            setOpenMenu(null);
                                            setPlatformsOpen((prev) => !prev);
                                        }}
                                    >
                                        <Icon name="dot-grid" size="md"/>
                                    </button>

                                    {platformsOpen && (
                                        <div
                                            className="platform-panel"
                                            role="region"
                                            aria-label="Platforme utile"
                                            tabIndex="-1"
                                        >
                                            <div className="platform-panel__title">Platforme utile</div>

                                            <div className="platform-grid" role="group" aria-label="Platforme utile">
                                                {platforms.map((platform, index) => (
                                                    <div className="platform-grid__item featured"
                                                         key={platform.id || index}>
                                                        <a
                                                            href={platform.href || "#"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="platform-grid__link stretched-link"
                                                            title={platform.title}
                                                            aria-label={platform.ariaLabel || platform.title}
                                                        >
                                                            {platform.logo && (
                                                                <div className="platform-grid__image">
                                                                    <img
                                                                        src={platform.logo}
                                                                        alt={platform.alt || platform.title || ""}
                                                                        loading="lazy"
                                                                    />
                                                                </div>
                                                            )}

                                                            <div className="platform-grid__content">
                                                                <div
                                                                    className="platform-grid__title">{platform.title}</div>
                                                                <p className="platform-grid__description">
                                                                    {platform.description}
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {auth && !auth?.isAuthenticated && showAuthActions ? (
                            <div className="header__cta mud-hidden mud-lg-flex mud-gap-12">
                                <a
                                    href={auth?.loginHref || "#"}
                                    className="mud-btn mud-btn-primary mud-btn-rounded mud-btn-md"
                                >
                                    {auth?.loginText}
                                </a>

                                <a
                                    href={auth?.secondaryHref || "#"}
                                    className="mud-btn mud-btn-secondary mud-btn-rounded mud-btn-md"
                                >
                                    {auth?.secondaryText}
                                </a>
                            </div>
                        ) : (
                            <div className="header__profile">
                                <button
                                    type="button"
                                    className="profile-toggle mud-btn avatar avatar--image avatar--md mud-p-0 mud-border-0"
                                    aria-expanded={profileOpen}
                                    onClick={() => setProfileOpen((prev) => !prev)}
                                >
                                    <Avatar src={user?.avatar} alt={user?.name} size="md"/>
                                </button>

                                {profileOpen && (
                                    <div className="profile-dropdown">
                                        <div className="profile-header">
                                            <Avatar src={user?.avatar} alt="" size="xl"/>

                                            <div className="profile-info">
                                                <h3 className="profile-name">{user?.name}</h3>
                                                <p className="profile-role">{user?.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <header className="header header__mobile mud-flex mud-md-hidden">
                <div className="header__wrapper">
                    {brand && (
                        <a href={brand.href || "#"} className="header__brand" aria-label={brand.ariaLabel}>
                            <span className="sr-only">{brand.mobileSrLabel || "Mergi la pagina principală"}</span>

                            {brand.logo && (
                                <div className="header__brand--logo">
                                    <img src={brand.logo} alt={brand.alt || ""}/>
                                </div>
                            )}
                        </a>
                    )}

                    <div className="header__actions">
                        {auth && !auth?.isAuthenticated && showMobileAuth && (
                            <a
                                href={auth?.loginHref || "#"}
                                className="mud-btn mud-btn-primary mud-btn-sm mud-btn-rounded"
                            >
                                Autentificare
                            </a>
                        )}

                        {showSearch && search && (
                            <button
                                type="button"
                                className="header__toggle"
                                aria-label="Caută"
                                aria-expanded={searchOpen}
                                onClick={() => setSearchOpen(true)}
                            >
                                <Icon name="search" size="lg"/>
                            </button>
                        )}

                        <button
                            className="header__toggle"
                            aria-label="Meniu"
                            onClick={() => setMobileOpen((prev) => !prev)}
                        >
                            <Icon name={mobileOpen ? "cross-large" : "menu"} size="lg"/>
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="mainNav__panel">
                        <div className="mainNav__content">
                            <section className="mainNav__section">
                                <ul className="mainNav__list">
                                    {navItems.map((item, index) => (
                                        <li className="mainNav__list--item" key={index}>
                                            {item.children?.length || item.mega?.length ? (
                                                <button className="mainNav__list--button">
                                                    <span>{item.label}</span>
                                                    <span className="mud-inline-flex">
                            <Icon name="chevron-bottom" size="md"/>
                          </span>
                                                </button>
                                            ) : (
                                                <a href={item.href} className="mainNav__list--link">
                                                    {item.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <div
                            className="mainNav__actions mud-px-16 mud-pb-24 mud-border-top-1 mud-border-top-solid mud-border-gray-200">
                            {auth && !auth?.isAuthenticated && showMobileAuth && (
                                <>
                                    <a href={auth?.loginHref || "#"} className="mud-btn mud-btn-primary">
                                        {auth?.loginText}
                                    </a>
                                    <a href={auth?.secondaryHref || "#"} className="mud-btn mud-btn-secondary">
                                        {auth?.secondaryText}
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {searchOpen && (
                <div
                    className="modal-overlay is-active"
                    aria-hidden="false"
                    onMouseDown={() => setSearchOpen(false)}
                >
                    <div
                        className="modal modal--md modal--simple mud-py-72 mud-px-40"
                        tabIndex="-1"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Căutare"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <SearchInput
                            id="header-search"
                            className="header-search-input"
                            value={searchValue}
                            placeholder={searchPlaceholder}
                            shape="rectangular"
                            size="medium"
                            autoFocus
                            onChange={(event) => setSearchValue(event.target.value)}
                            onClear={() => setSearchValue("")}
                            onSearch={(value) => {
                                onSearch?.(value);
                                setSearchOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}