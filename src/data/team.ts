export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
  imageClass?: string;
}

export const team: TeamMember[] = [
  { name: "Kristian Paasila", role: "CEO & Co-Founder", photo: "/images/team/kris.jpg", linkedin: "https://www.linkedin.com/in/kris-paasila-2202b017/" },
  { name: "Julian Vaupel", role: "Head of Product", photo: "/images/team/julian.jpg", linkedin: "https://www.linkedin.com/in/julian-vaupel-a5027923/" },
  { name: "Michael Eberle", role: "Head of Customer Success", photo: "/images/team/michi.jpg", linkedin: "https://www.linkedin.com/in/michael-eberle-digital/" },
  { name: "Jeremy Lewis", role: "Head of Tech", photo: "/images/team/jeremy-lewis.png", linkedin: "https://www.linkedin.com/in/jerezle/" },
  { name: "Silvan Schuppisser", role: "Head of Sales & Marketing", photo: "/images/team/silvan.jpg", linkedin: "https://www.linkedin.com/in/silvan-schuppisser-620087106/", imageClass: "scale-125 object-[center_30%]" },
  { name: "Vanessa Stalmierski", role: "Customer Success & Engagement", photo: "/images/team/vanessa.png", linkedin: "https://www.linkedin.com/in/vanessa-stalmierski-67b491120/" },
  { name: "Franziska Heins", role: "Customer Success", photo: "/images/team/franziska.png", linkedin: "https://www.linkedin.com/in/franziska-heins-54a5a7148/" },
];

export const board: TeamMember[] = [
  { name: "Kristian Paasila", role: "Co-Founder & Chairman", photo: "/images/team/kris.jpg", linkedin: "https://www.linkedin.com/in/kris-paasila-2202b017/" },
  { name: "Daniel Medina", role: "Co-Founder & Board Member", photo: "/images/team/daniel.jpg", linkedin: "https://www.linkedin.com/in/dmkmedina/" },
  { name: "Rasmus Nutzhorn", role: "Board Member", photo: "/images/team/rasmus.png", linkedin: "https://www.linkedin.com/in/rasmus-nutzhorn/" },
  { name: "Jean-Philippe Tripet", role: "Board Member", photo: "/images/team/jean-philippe.png", linkedin: "https://www.linkedin.com/in/jean-philippe-tripet-b62127/" },
];
