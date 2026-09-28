// WhatsApp number (country code + number, digits only) — taken from the phone number on the brand logo.
export const WHATSAPP_NUMBER = "919345577152";

export const BRAND = {
  name: "Aval Mantra",
  tagline: "For Ladies",
};

export const CONTACT = {
  phone: "+91 93455 77152",
  instagram: { handle: "@aval_mantra", url: "https://www.instagram.com/aval_mantra/" },
  youtube: { name: "Aval Mantra", url: "https://www.youtube.com/results?search_query=Aval+Mantra" },
  website: { label: "www.avalmantra.com", url: "https://www.avalmantra.com" },
  address: ["SLN Complex, Opp. Anjaneya Temple", "K. Channasandra, Horamavu", "Bengaluru – 560113"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=SLN+Complex+Opp+Anjaneya+Temple+K+Channasandra+Horamavu+Bengaluru+560113",
};

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productMessage(p: { name: string; price: number }, extra?: string) {
  return waLink(
    `Hi ${BRAND.name}! I'm interested in *${p.name}* (${formatINR(p.price)})${extra ? ` — ${extra}` : ""}. Is it available?`,
  );
}

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export const img = (name: string) => `/media/img/${name}.webp`;
