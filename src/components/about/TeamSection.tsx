import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Linkedin } from "lucide-react";
import { team, board, type TeamMember } from "@/data/team";
import { useTranslation } from "@/i18n";

const teamRoleKeys = [
  "kristianCeo", "julian", "michael", "jeremy", "silvan", "vanessa", "franziska"
];
const boardRoleKeys = [
  "kristianBoard", "daniel", "rasmus", "jeanPhilippe"
];

const MemberCard = ({
  member,
  visible,
  delay,
  roleLabel,
}: {
  member: TeamMember;
  visible: boolean;
  delay: number;
  roleLabel: string;
}) => (
  <div
    className={cn(
      "rounded-xl border border-border/30 bg-black/20 overflow-hidden transition-all duration-700",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={member.photo}
        alt={member.name}
        className={cn("h-full w-full object-cover object-[center_20%]", member.imageClass)}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-1.5 text-white/60 hover:text-white transition"
        >
          <Linkedin size={16} />
        </a>
      )}
    </div>
    <div className="px-4 py-3">
      <p className="text-sm font-semibold text-foreground">{member.name}</p>
      <p className="text-xs text-muted-foreground">{roleLabel}</p>
    </div>
  </div>
);

const TeamSection = () => {
  const [visible, setVisible] = useState(false);
  const [boardVisible, setBoardVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBoardVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (boardRef.current) observer.observe(boardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-32 px-6 border-t border-border/40">
      <div className="mx-auto max-w-5xl">
        <div ref={ref} className="text-center mb-16">
          <span
            className={cn(
              "inline-block mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-500",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {t("teamSection.eyebrow")}
          </span>
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl transition-all duration-700 mb-5",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            {t("teamSection.headline")}
          </h2>
          <p
            className={cn(
              "max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            {t("teamSection.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              visible={visible}
              delay={300 + i * 100}
              roleLabel={t(`teamSection.roles.${teamRoleKeys[i]}`)}
            />
          ))}
        </div>

        <div ref={boardRef}>
          <h3
            className={cn(
              "text-xs uppercase tracking-[0.25em] text-muted-foreground mt-20 mb-8 text-center transition-all duration-500",
              boardVisible ? "opacity-100" : "opacity-0"
            )}
          >
            {t("teamSection.boardTitle")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {board.map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                visible={boardVisible}
                delay={100 + i * 100}
                roleLabel={t(`teamSection.roles.${boardRoleKeys[i]}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
