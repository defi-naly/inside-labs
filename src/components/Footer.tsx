import logo from "@/assets/logo.svg";
import { useTranslation } from "@/i18n";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    [t("footer.sections.product")]: [
      { label: t("footer.links.omniSuite"), href: "/product" },
      { label: t("footer.links.omniApp"), href: "/product" },
      { label: t("nav.bookDemo"), href: "/demo" },
    ],
    [t("footer.sections.company")]: [
      { label: t("footer.links.about"), href: "/about" },
      { label: t("footer.links.career"), href: "/about" },
      { label: t("nav.bookDemo"), href: "/demo" },
    ],
    [t("footer.sections.resources")]: [
      { label: t("footer.links.caseStudies"), href: "/use-cases" },
      { label: t("footer.links.insights"), href: "/insights" },
      { label: t("footer.links.subscribe"), href: "/subscribe" },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img src={logo} alt="Inside Labs" className="mb-4 h-10 brightness-0 invert" />
            <p className="text-sm leading-relaxed text-secondary max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t("footer.privacy")}</a>
            <a href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t("footer.terms")}</a>
            <a href="/imprint" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t("footer.imprint")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
