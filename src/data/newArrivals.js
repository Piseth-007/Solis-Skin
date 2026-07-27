import cleanser from "../assets/products/cerave-cleanser.png";
import toner from "../assets/products/anua-toner.png";
import serum from "../assets/products/cosrx-serum.png";
import sunscreen from "../assets/products/boj-sunscreen.png";

const newArrivals = [
  {
    id: 1,
    brand: "CeraVe",
    name: "Hydrating Cleanser",
    skinType: "Dry Skin",
    image: cleanser,
    price: 18,
    oldPrice: 24,
    rating: 5,
    isNew: true,
    discount: 25,
  },
  {
    id: 2,
    brand: "Anua",
    name: "Heartleaf Toner",
    skinType: "Sensitive Skin",
    image: toner,
    price: 22,
    oldPrice: 30,
    rating: 5,
    isNew: true,
    discount: 27,
  },
  {
    id: 3,
    brand: "COSRX",
    name: "Snail Essence",
    skinType: "All Skin Types",
    image: serum,
    price: 20,
    oldPrice: 28,
    rating: 4,
    isNew: true,
    discount: 29,
  },
  {
    id: 4,
    brand: "Beauty of Joseon",
    name: "Relief Sun SPF50+",
    skinType: "All Skin Types",
    image: sunscreen,
    price: 19,
    oldPrice: 26,
    rating: 5,
    isNew: true,
    discount: 27,
  },
];

export default newArrivals;
