import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { ContactForm, contactFormSchema } from "@shared/schema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

interface ContactSectionProps {
  activeSection: string;
}

export default function ContactSection({ activeSection }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "success",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    mutate(data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#0B6623] text-white"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Contact <span className="text-[#FFD700]">Us</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-[#FFD700] mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-lg">
            Get in touch with the Mkhonto National Union to learn more about our organization and how we can support you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white text-[#212121] rounded-lg shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 border-b-2 border-[#FFD700] pb-2">Our Office</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-[#0B6623] text-xl mt-1 mr-4">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Address</h4>
                  <a 
                    href="https://maps.google.com/?q=1415+Manaye+Road,+Imbali+unit+1,+Pietermaritzburg+3201" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="hover:text-[#0B6623] transition-colors duration-300"
                  >
                    1415 Manaye Road<br />
                    Imbali unit 1<br />
                    Pietermaritzburg 3201
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#0B6623] text-xl mt-1 mr-4">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <a 
                    href="mailto:mkhontonationalunion@gmail.com" 
                    className="hover:text-[#0B6623] transition-colors duration-300"
                  >
                    mkhontonationalunion@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#0B6623] text-xl mt-1 mr-4">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <a 
                    href="tel:+27645055259" 
                    className="hover:text-[#0B6623] transition-colors duration-300"
                  >
                    +27 64 505 5259
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-[#0B6623] text-xl mt-1 mr-4">
                  <Clock />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Office Hours</h4>
                  <p>Monday - Friday: 8:00 AM - 4:30 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex space-x-4">
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "#FFD700", color: "#212121" }}
                href="#" 
                className="bg-[#0B6623] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "#FFD700", color: "#212121" }}
                href="#" 
                className="bg-[#0B6623] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "#FFD700", color: "#212121" }}
                href="#" 
                className="bg-[#0B6623] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "#FFD700", color: "#212121" }}
                href="#" 
                className="bg-[#0B6623] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-xl mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.5612700736384!2d30.348788715111928!3d-29.617699982046716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6a3fad45dea3b%3A0x52f90ec57e9d226c!2sImbali%20Unit%201%2C%20Pietermaritzburg%2C%203201!5e0!3m2!1sen!2sza!4v1622813956536!5m2!1sen!2sza" 
                className="absolute top-0 left-0 w-full h-full border-0" 
                allowFullScreen 
                loading="lazy"
                title="MNU Office Location">
              </iframe>
            </div>
            
            <div className="bg-white text-[#212121] rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Your Message" 
                            rows={3} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="bg-[#0B6623] hover:bg-[#084d1a] text-white"
                  >
                    {isPending ? "Sending..." : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
