import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactDock from '@/components/ContactDock';
import BrandLoader from '@/components/BrandLoader';
import Home from '@/pages/Home';
import NewCarFinance from '@/pages/services/NewCarFinance';
import UsedCarFinance from '@/pages/services/UsedCarFinance';
import CarRefinance from '@/pages/services/CarRefinance';
import CommercialVehicleFinance from '@/pages/services/CommercialVehicleFinance';
import InsuranceAssistance from '@/pages/services/InsuranceAssistance';
import EmiCalculatorPage from '@/pages/EmiCalculatorPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <BrandLoader />
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/new-car-finance" element={<NewCarFinance />} />
            <Route path="/services/used-car-finance" element={<UsedCarFinance />} />
            <Route path="/services/car-refinance" element={<CarRefinance />} />
            <Route path="/services/commercial-vehicle-finance" element={<CommercialVehicleFinance />} />
            <Route path="/services/insurance-assistance" element={<InsuranceAssistance />} />
            <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ContactDock />
      </div>
    </BrowserRouter>
  );
}
