import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Moods from "@/components/Moods";
import Signatures from "@/components/Signatures";
import ProductRails from "@/components/ProductRails";
import SilkRoom from "@/components/SilkRoom";
import ChangeLook from "@/components/ChangeLook";
import Edits from "@/components/Edits";
import Offers from "@/components/Offers";
import LatestTrends from "@/components/LatestTrends";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Moods />
        <Signatures />
        <ProductRails />
        <SilkRoom />
        <ChangeLook />
        <Edits />
        <Offers />
        <LatestTrends />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
