import { Compass, Radio, ShoppingBag, Gamepad2, Wallet } from "lucide-react";
import usp3 from "@/assets/usp-3.png";
import usp4 from "@/assets/usp-4.png";
import usp5 from "@/assets/usp-5.png";

const pillars = [
  { icon: Compass, label: "For You", desc: "Personalized guides, trails & destination info" },
  { icon: Radio, label: "Live", desc: "Real-time webcams, weather & lift status" },
  { icon: ShoppingBag, label: "Shop", desc: "Tickets, rentals & experiences in a few taps" },
  { icon: Gamepad2, label: "Play", desc: "Gamification, challenges & rewards" },
  { icon: Wallet, label: "Wallet", desc: "Digital guestcard, loyalty & payments" },
];

const ProductDemoSection = () => {
  return (
    <section className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            The Omni App
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
            For You. Live. Shop. Play. Wallet.
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            A white-label native app that becomes the key to your resort —
            configured to your destination's goals and your guests' needs.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.label} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
                  <Icon size={20} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">{p.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* App screenshots */}
        <div className="relative flex items-center justify-center gap-6 lg:gap-10">
          <div className="w-1/3 max-w-[240px] rounded-2xl border border-border overflow-hidden shadow-xl shadow-primary/5 -rotate-3 translate-y-4">
            <img src={usp5} alt="Omni App — communication" className="w-full h-auto" />
          </div>
          <div className="w-1/3 max-w-[280px] rounded-2xl border border-primary/20 overflow-hidden shadow-2xl shadow-primary/10 z-10 scale-105">
            <img src={usp3} alt="Omni App — explore" className="w-full h-auto" />
          </div>
          <div className="w-1/3 max-w-[240px] rounded-2xl border border-border overflow-hidden shadow-xl shadow-primary/5 rotate-3 translate-y-4">
            <img src={usp4} alt="Omni App — membership" className="w-full h-auto" />
          </div>

          {/* Glow behind */}
          <div
            className="pointer-events-none absolute -inset-16 -z-10 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, hsl(355 85% 40% / 0.06), transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDemoSection;
