import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomsHero from "@/components/sections/customs/CustomsHero";
import CustomsLicense from "@/components/sections/customs/CustomsLicense";
import CustomsServices from "@/components/sections/customs/CustomsServices";
import CustomsProcess from "@/components/sections/customs/CustomsProcess";
import VEDCodeGuide from "@/components/sections/customs/VEDCodeGuide";
import CertificationTypes from "@/components/sections/customs/CertificationTypes";
import CustomsDocuments from "@/components/sections/customs/CustomsDocuments";
import CustomsCalculator from "@/components/sections/customs/CustomsCalculator";
import CustomsFAQ from "@/components/sections/customs/CustomsFAQ";
import CustomsContactForm from "@/components/sections/customs/CustomsContactForm";

const Customs = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <CustomsHero />
          <CustomsLicense />
          <CustomsServices />
          <CustomsProcess />
          <VEDCodeGuide />
          <CertificationTypes />
          <CustomsDocuments />
          <CustomsCalculator />
          <CustomsFAQ />
          <CustomsContactForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Customs;
