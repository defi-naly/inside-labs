import type { ContentBlock } from "@/data/insights";

interface ContentRendererProps {
  blocks: ContentBlock[];
}

const ContentRenderer = ({ blocks }: ContentRendererProps) => {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            );

          case "heading":
            return block.level === 2 ? (
              <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-foreground">
                {block.text}
              </h2>
            ) : (
              <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-foreground">
                {block.text}
              </h3>
            );

          case "image":
            return (
              <figure key={i} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-xl"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-primary/40 pl-6"
              >
                <p className="text-base italic leading-relaxed text-foreground">
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.author && (
                  <footer className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{block.author}</span>
                    {block.role && <span> — {block.role}</span>}
                  </footer>
                )}
              </blockquote>
            );

          case "list":
            return (
              <ul key={i} className="space-y-2 pl-5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-base leading-relaxed text-muted-foreground list-disc marker:text-primary/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div
                key={i}
                className="my-8 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5"
              >
                <p className="text-sm leading-relaxed text-foreground">
                  {block.text}
                </p>
              </div>
            );

          case "stats":
            return (
              <div
                key={i}
                className="my-8 grid gap-4 sm:grid-cols-3"
              >
                {block.items.map((stat, j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-border/40 bg-card p-5 text-center"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;
