import type { SectionItem } from "./types";

export const sectionItems: SectionItem[] = [
  {
    id: "decja",
    name: { sr: "Дечја секција", en: "Children's Section" },
    ageRange: { sr: "6–10 година", en: "6–10 years" },
    description: {
      sr: "Први кораци у народном игру кроз игру и дружење.",
      en: "First steps into folk dance through play and friendship.",
    },
  },
  {
    id: "omladinska",
    name: { sr: "Омладинска секција", en: "Youth Section" },
    ageRange: { sr: "11–17 година", en: "11–17 years" },
    description: {
      sr: "Озбиљнији рад на техници игре и припрема за наступе.",
      en: "More serious work on dance technique and performance preparation.",
    },
  },
  {
    id: "senior",
    name: { sr: "Сениорска секција", en: "Senior Section" },
    ageRange: { sr: "18+ година", en: "18+ years" },
    description: {
      sr: "Најискуснији играчи, носиоци репертоара друштва.",
      en: "Our most experienced dancers, carrying the society's repertoire.",
    },
  },
];
