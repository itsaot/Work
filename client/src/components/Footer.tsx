import { Link } from "wouter";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
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
    <footer className="bg-[#212121] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFD700] rounded-full mr-3">
                <span className="text-[#212121] font-bold text-lg">MNU</span>
              </div>
              <h2 className="text-xl font-bold">Mkhonto National Union</h2>
            </div>
            <p className="mb-4">Advocating for workers' rights and fair treatment across South Africa. Join us in our mission to create better working conditions for all.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition-colors duration-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-[#FFD700] pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("join")}
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Join MNU
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-[#FFD700] pb-2">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-2 h-4 w-4" />
                <a 
                  href="https://maps.google.com/?q=1415+Manaye+Road,+Imbali+unit+1,+Pietermaritzburg+3201" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  1415 Manaye Road, Imbali unit 1, Pietermaritzburg 3201
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-2 h-4 w-4" />
                <a 
                  href="mailto:mkhontonationalunion@gmail.com" 
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  mkhontonationalunion@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-2 h-4 w-4" />
                <a 
                  href="tel:+27645055259" 
                  className="hover:text-[#FFD700] transition-colors duration-300"
                >
                  +27 64 505 5259
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Mkhonto National Union. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
