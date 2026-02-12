import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";

const navLinks = [
  { label: "Omni Suite", href: "/omni-suite" },
  { label: "Omni App", href: "/omni-app" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "DE">("EN");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-secondary">
        <div className="flex gap-3">
          <button
            onClick={() => setLang("EN")}
            className={cn(
              "font-semibold transition-colors",
              lang === "EN" ? "text-foreground" : "text-secondary hover:text-foreground"
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLang("DE")}
            className={cn(
              "font-semibold transition-colors",
              lang === "DE" ? "text-primary" : "text-secondary hover:text-foreground"
            )}
          >
            DE
          </button>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a href="/subscribe" className="transition-colors hover:text-foreground">Subscribe</a>
          <a href="/about" className="transition-colors hover:text-foreground">Our Team</a>
          <a href="/career" className="transition-colors hover:text-foreground">Career</a>
          <a href="/contact" className="transition-colors hover:text-foreground">Contact</a>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="Inside Labs" className="h-10 brightness-0 invert" />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 md:inline-flex"
          >
            Get in Touch
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-foreground transition-colors hover:text-primary lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/40 bg-background px-6 pb-6 pt-2 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
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
            href="/contact"
            className="mt-3 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Get in Touch
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
