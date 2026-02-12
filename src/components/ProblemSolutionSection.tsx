import { ArrowRight } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="py-32 lg:py-40 px-6 border-t border-border/40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Problem */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
              The problem
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl mb-6">
              Tourism brands lose guests after the first visit.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Most destinations have no way to continue the conversation once a guest leaves.
              Fragmented tools, no unified guest data, and generic messaging lead to one-time visits
              and missed revenue.
            </p>
          </div>

          {/* Solution */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              The solution
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl mb-6">
              One platform for the entire guest journey.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-8">
              Inside Labs unifies your guest data, automates engagement across every channel,
              and turns anonymous visitors into repeat buyers — all from a single dashboard.
            </p>
            <a
              href="/product"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Learn how it works
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
