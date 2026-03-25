import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom"; // 1. Tambah import ini

export function Navigation() {
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              YourBrand
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* 3. Tambah onClick untuk Sign In */}
            <Button
              variant="outline"
              className="border-2 border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>

            {/* 4. Tambah onClick untuk Get Started (Scroll ke Form) */}
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700 shadow-md px-6"
              onClick={() => {
                const element = document.getElementById("contact-form");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}