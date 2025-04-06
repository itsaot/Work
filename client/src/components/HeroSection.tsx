import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  activeSection: string;
}

export default function HeroSection({ activeSection }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="pt-20 md:pt-24 min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#212121] to-[#0B6623] text-white"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Unite with <span className="text-[#FFD700]">Strength</span>
            </h2>
            <p className="text-lg mb-6">
              Join the Mkhonto National Union and become part of a movement dedicated to protecting worker rights and ensuring fair treatment in all sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const joinSection = document.getElementById("join");
                  if (joinSection) {
                    joinSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-[#FFD700] text-[#212121] font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300 text-center shadow-lg"
              >
                Join Now
              </motion.button>
              <motion.button
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToAbout}
                className="border-2 border-white text-white font-bold py-3 px-6 rounded-md hover:bg-white hover:text-[#0B6623] transition-all duration-300 text-center"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
              alt="Union members in a meeting" 
              className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[400px]"
            />
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-12">
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 
            }}
            className="bg-white p-2 w-10 h-10 ring-1 ring-[#FFD700] shadow-lg rounded-full flex items-center justify-center cursor-pointer"
            onClick={scrollToAbout}
          >
            <ArrowDown className="w-6 h-6 text-[#0B6623]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
