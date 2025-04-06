import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AboutSectionProps {
  activeSection: string;
}

export default function AboutSection({ activeSection }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-[#0B6623]">MNU</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-[#FFD700] mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-lg">
            The Mkhonto National Union is dedicated to improving the working conditions and protecting the rights of workers across South Africa.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
                alt="Union members collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-700">To advocate for the rights and welfare of workers across all sectors, ensuring fair wages, safe working conditions, and equal opportunities for all.</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
                alt="Professional diverse workers" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Our Values</h3>
              <p className="text-gray-700">Integrity, solidarity, equality, and justice form the foundation of our union's approach to representing our members across South Africa.</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
                alt="Union meeting discussion" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Our Impact</h3>
              <p className="text-gray-700">We have successfully negotiated better working conditions, fair wages, and improved benefits for thousands of workers across various industries.</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              South African <span className="text-[#0B6623]">Heritage</span>
            </h3>
            <p className="mb-4">Our union is deeply rooted in South African history and culture, committed to building a just and equitable society for all workers.</p>
            <p className="mb-4">We advocate for policies that support sustainable economic growth while ensuring the dignity and rights of every worker are respected.</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="bg-[#0B6623] text-white px-4 py-2 rounded-full text-sm">Government Sector</span>
              <span className="bg-[#0B6623] text-white px-4 py-2 rounded-full text-sm">Private Sector</span>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Table Mountain, Cape Town" 
              className="rounded-lg shadow-md w-full h-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1540819346262-8bd7cbc3b321?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Nelson Mandela Bridge, Johannesburg" 
              className="rounded-lg shadow-md w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
