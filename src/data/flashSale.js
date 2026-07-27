import product1 from "../assets/products/cerave-cleanser.png";
import product2 from "../assets/products/anua-toner.png";
import product3 from "../assets/products/cosrx-serum.png";
import product4 from "../assets/products/boj-sunscreen.png";

const flashSale = [
  {
    id: 1,
    name: "CeraVe Hydrating Cleanser",
    image: product1,
    oldPrice: 24,
    price: 18,  
    sold: 72,
    stock: 100,
    discount: 25,
  },
  {
    id: 2,
    name: "Anua Heartleaf Toner",
    image: product2,
    oldPrice: 30,
    price: 22,
    sold: 54,
    stock: 100,
    discount: 27,
  },
  {
    id: 3,
    name: "COSRX Snail Serum",
    image: product3,
    oldPrice: 28,
    price: 20,
    sold: 88,
    stock: 100,
    discount: 30,
  },
  {
    id: 4,
    name: "Beauty of Joseon Sunscreen",
    image: product4,
    oldPrice: 26,
    price: 19,
    sold: 63,
    stock: 100,
    discount: 27,
  },
];

export default flashSale;
