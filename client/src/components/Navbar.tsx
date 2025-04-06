import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsOpen(false);
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-[#0B6623] shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-[#FFD700] rounded-full mr-3">
              <span className="text-[#212121] font-bold text-lg">MNU</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Mkhonto National Union</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection("home")}
              className="relative text-white hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="relative text-white hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("join")}
              className="relative text-white hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 hover:after:w-full"
            >
              Join Us
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="relative text-white hover:text-[#FFD700] transition-colors duration-300 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0B6623] shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-[#FFD700] transition-colors duration-300 py-2 text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-[#FFD700] transition-colors duration-300 py-2 text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("join")}
              className="text-white hover:text-[#FFD700] transition-colors duration-300 py-2 text-left"
            >
              Join Us
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-[#FFD700] transition-colors duration-300 py-2 text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
