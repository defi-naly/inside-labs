import logo from "@/assets/logo.svg";

const footerLinks = {
  Product: [
    { label: "Omni Suite", href: "/omni-suite" },
    { label: "Omni App", href: "/omni-app" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Career", href: "/career" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Subscribe", href: "/subscribe" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo / tagline */}
          <div className="lg:col-span-2">
            <img src={logo} alt="Inside Labs" className="mb-4 h-10 invert dark:invert-0" />
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Engage with Intelligence. Tourism's leading data-driven customer engagement platform.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Inside Labs AG. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Privacy</a>
            <a href="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Terms</a>
            <a href="/imprint" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;