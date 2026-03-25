import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";
import { FontTester } from "./components/font-tester/FontTester";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import { ContactModal } from "./components/contact-modal";

// Komponen untuk Landing Page agar rapi
const HomePage = () => (
  <>
    <Navigation />
    <Hero />
    <Features />
    <Testimonials />
    <CTA />
    <FontTester />
    <Footer />
    <ContactModal />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="size-full">
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<HomePage />} />
            {/* Halaman Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Halaman Login */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}