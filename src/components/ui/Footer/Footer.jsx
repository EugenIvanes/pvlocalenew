import Icon from "../Icon/Icon";

const socialIcons = {
  facebook: "facebook-filled",
  instagram: "instagram-filled",
  youtube: "youtube-filled",
  linkedin: "linkedin-filled",
};

export default function Footer({
  brand = {},
  contacts = [],
  navigation = [],
  payments = [],
  apps = [],
  logos = [],
  socials = [],
  legalLinks = [],
  copyright,
  compact = false,
  showExtras = true,
  className = "",
}) {
  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="mud-container">
        <div className="mud-row">
          <div className="mud-col-12">
            <div className="footer__container">
              <div
                className={[
                  "footer__top",
                  compact ? "footer__top--compact" : "",
                ].filter(Boolean).join(" ")}
              >
                <div className="footer__brand">
                  <a href={brand.href || "/"} className="footer__logo">
                    {brand.logo && (
                      <div className="footer__brand--logo">
                        <img src={brand.logo} alt={brand.logoAlt || ""} />
                      </div>
                    )}

                    <div className="footer__brand--details mud-flex">
                      {brand.title && (
                        <span className="mud-desktop-body-lg-500 mud-text-gray-900">
                          {brand.title}
                        </span>
                      )}

                      {brand.description && !compact && (
                        <span className="mud-desktop-caption-sm mud-text-gray-700">
                          {brand.description}
                        </span>
                      )}
                    </div>
                  </a>

                  {!compact && contacts.length > 0 && (
                    <ul className="footer__contact">
                      {contacts.map((item, index) => (
                        <li key={index}>
                          <a href={item.href}>
                            {item.icon && (
                              <span className="mud-inline-flex">
                                <Icon name={item.icon} size="md" />
                              </span>
                            )}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {navigation.length > 0 && (
                  <nav className="footer__nav" aria-label="Footer navigation">
                    {navigation.map((column, index) => (
                      <div className="footer__nav-col" key={index}>
                        {!compact && column.title && (
                          <div className="footer__heading">
                            {column.title}
                          </div>
                        )}

                        <ul className="footer__nav--list">
                          {column.links?.map((link, linkIndex) => (
                            <li className="footer__nav--item" key={linkIndex}>
                              <a href={link.href} className="footer__nav--link">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </nav>
                )}

                {showExtras && (
                  <div className="footer__extras">
                    {!compact && payments.length > 0 && (
                      <>
                        <div className="footer__heading">
                          Opțiuni de plată
                        </div>

                        <ul className="footer__payments">
                          {payments.map((payment, index) => (
                            <li key={index}>
                              <img src={payment.src} alt={payment.alt || ""} />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {!compact && brand.extraDescription && (
                      <div className="footer__description">
                        {brand.extraDescription}
                      </div>
                    )}

                    {!compact && apps.length > 0 && (
                      <div className="footer__apps">
                        {apps.map((app, index) => (
                          <a key={index} href={app.href} aria-label={app.label}>
                            <img src={app.src} alt="" />
                          </a>
                        ))}
                      </div>
                    )}

                    {compact && payments.length > 0 && (
                      <ul className="footer__payments">
                        {payments.map((payment, index) => (
                          <li key={index}>
                            <img src={payment.src} alt={payment.alt || ""} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <hr className="separator separator--horizontal separator--thin separator--subtle" />

              <div className="footer__middle">
                {logos.length > 0 && (
                  <div className="footer__logos">
                    {logos.map((logo, index) => (
                      <a href={logo.href || "#"} key={index}>
                        <img src={logo.src} alt={logo.alt || ""} />
                      </a>
                    ))}
                  </div>
                )}

                <hr className="separator separator--horizontal separator--thin separator--subtle mud-sm-hidden" />

                {socials.length > 0 && (
                  <ul className="footer__social">
                    {socials.map((social, index) => (
                      <li className="footer__social--item" key={index}>
                        <a
                          href={social.href}
                          className="footer__social--link"
                          aria-label={social.label}
                        >
                          <span className="mud-inline-flex">
                            <Icon
                              name={social.icon || socialIcons[social.type]}
                              size="lg"
                            />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__container footer__bottom-inner mud-py-0">
          <div className="mud-container">
            <div className="mud-row mud-row-gap-20">
              <div className="mud-col-12 mud-col-md-6">
                <div>{copyright}</div>
              </div>

              {legalLinks.length > 0 && (
                <div className="mud-col-12 mud-col-md-6">
                  <ul className="footer__legal">
                    {legalLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}