import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChinaHero from "@/components/sections/china/ChinaHero";
import DeliveryMethods from "@/components/sections/china/DeliveryMethods";
import ChinaMap from "@/components/sections/china/ChinaMap";
import DeliveryTimeline from "@/components/sections/china/DeliveryTimeline";
import ChinaOffices from "@/components/sections/china/ChinaOffices";
import ChinaAdvantages from "@/components/sections/china/ChinaAdvantages";
import ChinaStats from "@/components/sections/china/ChinaStats";
import ChinaFAQ from "@/components/sections/china/ChinaFAQ";
import ChinaContactForm from "@/components/sections/china/ChinaContactForm";

const ChinaDelivery = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <ChinaHero />
          <DeliveryMethods />
          <ChinaMap />
          <ChinaOffices />
          <DeliveryTimeline />
          <ChinaAdvantages />
          <ChinaStats />
          <ChinaFAQ />
          <ChinaContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ChinaDelivery;
