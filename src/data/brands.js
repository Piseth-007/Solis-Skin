import cerave from "../assets/brands/cerave.png";
import cosrx from "../assets/brands/cosrx.png";
import ordinary from "../assets/brands/ordinary.png";
import laroche from "../assets/brands/laroche.png";
import boj from "../assets/brands/boj.jpg";
import anua from "../assets/brands/anua.png";

const brands = [
  {
    id: 1,
    name: "CeraVe",
    slug: "cerave",
    logo: cerave,
    description:
      "Dermatologist-developed skincare focused on restoring and protecting the skin barrier.",
    founded: "2005",
    country: "United States",
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "COSRX",
    slug: "cosrx",
    logo: cosrx,
    description:
      "Korean skincare brand known for gentle, effective formulas and minimal ingredients.",
    founded: "2013",
    country: "South Korea",
    color: "#111827",
  },
  {
    id: 3,
    name: "The Ordinary",
    slug: "the-ordinary",
    logo: ordinary,
    description:
      "Clinical skincare with ingredient-focused formulas at affordable prices.",
    founded: "2016",
    country: "Canada",
    color: "#4B5563",
  },
  {
    id: 4,
    name: "La Roche-Posay",
    slug: "la-roche-posay",
    logo: laroche,
    description:
      "French dermatologist-recommended skincare for sensitive skin.",
    founded: "1975",
    country: "France",
    color: "#2563EB",
  },
  {
    id: 5,
    name: "Beauty of Joseon",
    slug: "beauty-of-joseon",
    logo: boj,
    description:
      "Traditional Korean herbal skincare inspired by Hanbang ingredients.",
    founded: "2016",
    country: "South Korea",
    color: "#D97706",
  },
  {
    id: 6,
    name: "Anua",
    slug: "anua",
    logo: anua,
    description:
      "Minimalist Korean skincare designed to soothe and strengthen sensitive skin.",
    founded: "2019",
    country: "South Korea",
    color: "#16A34A",
  },
];

export default brands;