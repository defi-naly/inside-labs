import usp3 from "@/assets/usp-3.png";

const ProductDemoSection = () => {
  return (
    <section className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            The Omni Suite
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-6">
            See the platform in action.
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            From campaign creation to real-time guest analytics — one unified workspace
            designed for tourism teams.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="rounded-xl border border-border overflow-hidden shadow-2xl shadow-primary/5">
            <img
              src={usp3}
              alt="Omni Suite dashboard"
              className="w-full h-auto"
            />
          </div>
          {/* Glow */}
          <div
            className="pointer-events-none absolute -inset-12 -z-10 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at 50% 80%, hsl(355 85% 40% / 0.06), transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDemoSection;
