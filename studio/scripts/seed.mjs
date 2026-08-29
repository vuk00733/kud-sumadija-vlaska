import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01" });

const newsPosts = [
  {
    _id: "newsPost-godisnji-koncert-2026",
    _type: "newsPost",
    titleSr: "Годишњи концерт КУД Шумадија Влашка одржан пред пуном салом",
    titleEn: "KUD Šumadija Vlaška's annual concert held before a full house",
    slug: { _type: "slug", current: "godisnji-koncert-2026" },
    date: "2026-05-10",
    excerptSr: "Наше секције су представиле кореографије из свих крајева Србије.",
    excerptEn: "Our sections performed choreographies from every region of Serbia.",
    bodySr:
      "Годишњи концерт друштва одржан је у Дому културе уз учешће свих узрасних секција. Публика је уживала у играма из Шумадије, Војводине и јужне Србије, као и у ревији народних ношњи.",
    bodyEn:
      "The society's annual concert was held at the House of Culture with all age sections performing. The audience enjoyed dances from Šumadija, Vojvodina, and southern Serbia, along with a folk costume showcase.",
  },
  {
    _id: "newsPost-nova-decja-sekcija",
    _type: "newsPost",
    titleSr: "Отворена нова дечја секција",
    titleEn: "New children's section opened",
    slug: { _type: "slug", current: "nova-decja-sekcija" },
    date: "2026-03-02",
    excerptSr: "Позивамо децу узраста 6-10 година да нам се придруже на пробама.",
    excerptEn: "We invite children aged 6-10 to join us at rehearsals.",
    bodySr:
      "Због великог интересовања, отворили смо нову групу за најмлађе. Пробе се одржавају два пута недељно у Дому културе.",
    bodyEn:
      "Due to high interest, we've opened a new group for the youngest members. Rehearsals are held twice a week at the House of Culture.",
  },
];

const events = [
  {
    _id: "event-festival-sabora-2026",
    _type: "event",
    titleSr: "Међународни фестивал фолклора",
    titleEn: "International Folklore Festival",
    date: "2026-06-20",
    locationSr: "Крагујевац, Градски трг",
    locationEn: "Kragujevac, City Square",
    descriptionSr: "Наше друштво наступа као домаћин фестивала са ансамблима из региона.",
    descriptionEn: "Our society performs as host of the festival alongside regional ensembles.",
  },
  {
    _id: "event-gostovanje-nis",
    _type: "event",
    titleSr: "Гостовање у Нишу",
    titleEn: "Guest performance in Niš",
    date: "2026-09-05",
    locationSr: "Ниш, Дом омладине",
    locationEn: "Niš, Youth Center",
    descriptionSr: "Наступ поводом Дана града Ниша у сарадњи са локалним КУД-ом.",
    descriptionEn: "Performance for Niš City Day in cooperation with the local folklore society.",
  },
];

const tx = client.transaction();
for (const doc of [...newsPosts, ...events]) {
  tx.createOrReplace(doc);
}
const result = await tx.commit();
console.log(`Seeded ${result.results.length} documents.`);
