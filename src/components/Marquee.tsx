const ITEMS = [
  "New boutique drops every week",
  "Pastel organza edit",
  "Sequin & stone-work party sarees",
  "Handpicked silk sarees",
  "Easy 7-day returns",
  "Free shipping across India",
  "Order in one tap on WhatsApp",
];

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden bg-maroon py-4 text-ivory md:py-5">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center" aria-hidden={k === 1}>
            {ITEMS.map((t) => (
              <span key={t} className="flex items-center font-serif text-lg italic md:text-xl">
                <span className="px-8 md:px-12">{t}</span>
                <span className="text-ivory/70">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
