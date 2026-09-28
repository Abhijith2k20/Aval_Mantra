import { BRAND, waLink } from "@/lib/site";
import { WhatsApp } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(`Hi ${BRAND.name}! I'd like help choosing a saree.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.6)] transition hover:pr-5 md:right-6 md:bottom-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.4s]" />
      <WhatsApp className="relative size-6" />
      <span className="relative hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 md:inline">
        Chat with us
      </span>
    </a>
  );
}
