import { img } from "./site";

export type Product = {
  id: string;
  name: string;
  fabric: string;
  price: number;
  mrp?: number;
  image: string;
  rating?: number;
  tag?: "NEW" | "BESTSELLER" | "SALE";
};

const p = (
  id: string,
  name: string,
  fabric: string,
  price: number,
  image: string,
  extra: Partial<Product> = {},
): Product => ({ id, name, fabric, price, image: img(image), ...extra });

// Boutique sarees are the main range; silks are a smaller handpicked edit ("The Silk Room").
export const newArrivals: Product[] = [
  p("kavya", "Kavya Red Organza", "Organza · Scalloped border", 4850, "red-organza", { tag: "NEW" }),
  p("prerna", "Prerna Mustard Tissue", "Tissue · Zari border", 5200, "festive-yellow", { tag: "NEW", mrp: 6400 }),
  p("nayana", "Nayana Starlight Georgette", "Georgette · Sequin buttis", 3950, "grey-drape"),
  p("suhana", "Suhana Pastel Linen", "Linen · Easy drape", 3200, "linen-yellow", { tag: "NEW" }),
  p("devasena", "Devasena Printed Chiffon", "Chiffon · Digital print", 2850, "blue-patola"),
  p("ira", "Ira Chikankari Georgette", "Georgette · Chikankari", 5600, "red-chikan", { tag: "NEW" }),
];

export const bestSellers: Product[] = [
  p("maya", "Maya Blush Net", "Net · Hand embroidery", 7800, "rose-embroidered", { rating: 4.9, tag: "BESTSELLER" }),
  p("rani", "Rani Magenta Party Saree", "Satin silk · Contrast pallu", 4600, "magenta-black", { rating: 4.8 }),
  p("chandni", "Chandni Black Sequin", "Georgette · Sequin & stone work", 6900, "black-silver", { rating: 4.8, tag: "BESTSELLER" }),
  p("pista", "Pista Tissue Bloom", "Tissue · Zari buttis", 5400, "mint-silk", { rating: 4.9 }),
  p("sandhya", "Sandhya Ivory Organza", "Organza · Hand-painted border", 4200, "ivory-orange", { rating: 4.7, tag: "BESTSELLER" }),
  p("jamuni", "Jamuni Floral Georgette", "Georgette · Woven florals", 3600, "purple-jamdani", { rating: 4.6 }),
];

export const trending: Product[] = [
  p("aaranya", "Aaranya Sage Tissue", "Tissue silk · Zari checks", 8900, "sage-silk", { rating: 4.8 }),
  p("saanjh", "Saanjh Ivory Organza", "Organza · Gold scallops", 4500, "cream-kasavu", { rating: 4.7 }),
  p("ruhani", "Ruhani Butter Yellow", "Chanderi · Mustard border", 3900, "ivory-yellow", { rating: 4.6 }),
  p("kaveri", "Kaveri Hand-painted Organza", "Organza · Hand-painted florals", 5600, "golden-hour", { rating: 4.8 }),
  p("leela", "Leela Coral Party Saree", "Soft silk · Floral pallu", 6800, "pink-orange-trees", { rating: 4.8 }),
  p("gauri", "Gauri Grey Starlight", "Georgette · Sequin buttis", 3950, "grey-drape", { rating: 4.7 }),
];

export const silks: Product[] = [
  p("nila", "Nila Peacock Kanjivaram", "Kanjivaram · Pure zari", 17900, "peacock-silk"),
  p("neelima", "Neelima Banarasi Silk", "Banarasi · Silver zari", 12800, "blue-banarasi"),
  p("noor", "Noor Temple Kanjivaram", "Kanjivaram · Gold border", 16600, "kanjivaram-pink"),
  p("rajnigandha", "Rajnigandha Zari Silk", "Soft silk · Antique border", 11200, "purple-zari"),
  p("tara", "Tara Magenta Ikat", "Silk ikat · Black pallu", 8300, "magenta-ikat"),
  p("vasudha", "Vasudha Coastal Banarasi", "Banarasi · Kadhua weave", 14400, "sea-banarasi"),
];

export type Look = {
  id: string;
  name: string[];
  price: number;
  rating: number;
  reviews: number;
  watermark: string;
  swatch: string;
  image: string;
  description: string;
  features: string[];
};

export const looks: Look[] = [
  {
    id: "pista",
    name: ["Pista Tissue", "Bloom"],
    price: 5400,
    rating: 4.8,
    reviews: 120,
    watermark: "Pista",
    swatch: "#c9dfcf",
    image: "/media/look/look-mint.webp",
    description:
      "Featherweight tissue silk in soft pista green, woven with gold zari buttis and a shimmering border that catches the light in every fold.",
    features: ["Pure tissue silk", "Airy & light", "Zari butti work", "Blouse piece included"],
  },
  {
    id: "neel",
    name: ["Neelambari", "Banarasi"],
    price: 12800,
    rating: 4.9,
    reviews: 86,
    watermark: "Neel",
    swatch: "#2f3a8f",
    image: "/media/look/look-blue.webp",
    description:
      "Midnight-blue Banarasi silk with a silver jaal pallu and a bright pink-and-marigold border. A modern heirloom for evenings you want to remember.",
    features: ["Katan silk", "Silver zari jaal", "Contrast border", "Blouse piece included"],
  },
  {
    id: "jamuni",
    name: ["Jamuni Zari", "Silk"],
    price: 11200,
    rating: 4.7,
    reviews: 64,
    watermark: "Jamuni",
    swatch: "#4a2356",
    image: "/media/look/look-purple.webp",
    description:
      "Deep jamun purple silk framed by a wide antique-gold brocade border, finished with a rani-pink edge. Regal, rich and quietly dramatic.",
    features: ["Pure silk", "Antique zari", "Brocade border", "Blouse piece included"],
  },
];
