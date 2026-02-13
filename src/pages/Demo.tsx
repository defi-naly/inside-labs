import { useState, useRef } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Demo = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission (replace with real endpoint)
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

  const stats = [0, 1, 2, 3].map((i) => ({
    value: t(`demo.proof.stats[${i}].value`),
    label: t(`demo.proof.stats[${i}].label`),
  }));

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24" />

      <section className="py-20 lg:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column — value proposition */}
            <div className="lg:sticky lg:top-32">
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t("demo.eyebrow")}
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-6">
                {t("demo.headline")}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                {t("demo.subtitle")}
              </p>

              {/* Social proof stats */}
              <div className="mb-10">
                <p className="text-sm font-semibold text-foreground mb-5">
                  {t("demo.proof.headline")}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border/40 bg-card/30 px-4 py-4"
                    >
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client logos */}
              <div className="flex items-center gap-5 opacity-40">
                <img src="/images/logos/laax.svg" alt="LAAX" className="h-6 brightness-0 invert" />
                <img src="/images/logos/zermatt.svg" alt="Zermatt" className="h-6 brightness-0 invert" />
                <img src="/images/logos/engadin_logo.svg" alt="Engadin" className="h-5 brightness-0 invert" />
              </div>
            </div>

            {/* Right column — form */}
            <div>
              {submitted ? (
                /* Success state */
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Check size={32} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    {t("demo.form.successHeadline")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("demo.form.successMessage")}
                  </p>
                </div>
              ) : (
                /* Form */
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm p-8 md:p-10"
                >
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        {t("demo.form.name")} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t("demo.form.namePlaceholder")}
                        className="w-full rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        {t("demo.form.email")} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t("demo.form.emailPlaceholder")}
                        className="w-full rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        {t("demo.form.company")} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder={t("demo.form.companyPlaceholder")}
                        className="w-full rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/20"
                      />
                    </div>

                    {/* Message (optional) */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        {t("demo.form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder={t("demo.form.messagePlaceholder")}
                        className="w-full rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={sending}
                    className={cn(
                      "mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    )}
                  >
                    {sending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        {t("demo.form.submit")}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {/* Privacy note */}
                  <p className="mt-4 text-center text-xs text-muted-foreground/60">
                    {t("demo.form.privacy")}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Demo;
