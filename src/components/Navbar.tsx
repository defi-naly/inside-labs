import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation, type Locale } from "@/i18n";
import logo from "@/assets/logo.svg";

const LanguageToggle = ({ className }: { className?: string }) => {
  const { locale, setLocale } = useTranslation();
  const options: Locale[] = ["en", "de"];
  return (
    <div className={cn("inline-flex rounded-full border border-border/40 bg-muted/10 p-0.5", className)}>
      {options.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-all duration-200 cursor-pointer",
            locale === l
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.product"), href: "/product" },
    { label: t("nav.useCases"), href: "/use-cases" },
    { label: t("nav.insights"), href: "/insights" },
    { label: t("nav.about"), href: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="Inside Labs" className="h-8 brightness-0 invert" />
          </a>
        </div>

        {/* Desktop links — absolutely centered */}
        <div className="hidden items-center gap-1 md:flex absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden md:inline-flex" />
          <a
            href="/demo"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 md:inline-flex"
          >
            {t("nav.bookDemo")}
            <ArrowRight size={14} />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-foreground transition-colors hover:text-primary md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/40 bg-background px-6 pb-6 pt-2 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-3 flex justify-center">
            <LanguageToggle />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/demo"
            className="mt-3 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            {t("nav.bookDemo")}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
