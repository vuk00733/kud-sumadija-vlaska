import type { RepertoireRegion } from "./types";

export const repertoireRegions: RepertoireRegion[] = [
  {
    id: "sumadija",
    region: { sr: "Шумадија", en: "Šumadija" },
    dances: [
      { sr: "Ужичко коло", en: "Užičko kolo" },
      { sr: "Шумадијска свита", en: "Šumadija Suite" },
    ],
    costumeNote: {
      sr: "Ношња карактеришу тамна боја сукна и опанци са virnovima.",
      en: "The costume features dark wool cloth and traditional opanci footwear.",
    },
  },
  {
    id: "vojvodina",
    region: { sr: "Војводина", en: "Vojvodina" },
    dances: [
      { sr: "Војвођанско коло", en: "Vojvođansko kolo" },
      { sr: "Потиска свита", en: "Potiska Suite" },
    ],
    costumeNote: {
      sr: "Богато украшене кошуље и сукње са везом карактеристичним за Панонску низију.",
      en: "Richly decorated shirts and skirts with embroidery typical of the Pannonian Plain.",
    },
  },
  {
    id: "juzna-srbija",
    region: { sr: "Јужна Србија", en: "Southern Serbia" },
    dances: [
      { sr: "Врањанка", en: "Vranjanka" },
      { sr: "Прешевска свита", en: "Preševo Suite" },
    ],
    costumeNote: {
      sr: "Живе боје и орнаменти под утицајем оријенталне традиције.",
      en: "Vivid colors and ornaments influenced by oriental tradition.",
    },
  },
];
