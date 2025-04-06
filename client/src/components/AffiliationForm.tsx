import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AffiliationForm, affiliationFormSchema } from "@shared/schema";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Send } from "lucide-react";

interface AffiliationFormProps {
  activeSection: string;
}

export default function AffiliationFormSection({ activeSection }: AffiliationFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<AffiliationForm>({
    resolver: zodResolver(affiliationFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      age: undefined,
      gender: "",
      sector: "",
      disability: "none",
      nationality: "",
      province: "",
      municipality: "",
      ward: "",
      qualifications: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AffiliationForm) => {
      const response = await apiRequest("POST", "/api/affiliations", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in joining MNU. We will contact you soon.",
        variant: "success",
      });
      form.reset();
      setStep(1);
    },
    onError: (error) => {
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AffiliationForm) => {
    mutate(data);
  };

  const validateStep1 = () => {
    const { name, surname, age, gender, sector, nationality } = form.getValues();
    
    if (!name || !surname || !age || !gender || !sector || !nationality) {
      form.trigger(["name", "surname", "age", "gender", "sector", "nationality"]);
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    } else {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    setStep(1);
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
      id="join" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Join <span className="text-[#0B6623]">MNU</span> Today
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-[#FFD700] mx-auto mb-6"></motion.div>
          <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-lg">
            Complete the form below to affiliate with the Mkhonto National Union and become part of our growing family of workers.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-8"
        >
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 1 ? 'bg-[#0B6623]' : 'bg-[#4CAF50]'} text-white font-bold mr-2`}>1</span>
                <span className="font-medium md:font-semibold">Personal Information</span>
              </div>
              <div className="ml-4 border-t-2 border-gray-300 flex-grow"></div>
              <div className="flex items-center ml-4">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 2 ? 'bg-[#0B6623]' : 'bg-gray-300'} text-white font-bold mr-2`}>2</span>
                <span className="font-medium md:font-semibold">Location & Qualifications</span>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your surname" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Your age" 
                                min={18} 
                                max={100} 
                                {...field}
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="non-binary">Non-binary</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sector <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sector" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="government">Government</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="disability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Disability</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || "none"}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select disability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="physical">Physical</SelectItem>
                                <SelectItem value="visual">Visual</SelectItem>
                                <SelectItem value="hearing">Hearing</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Nationality <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your nationality" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="bg-[#0B6623] hover:bg-[#084d1a] text-white"
                      >
                        Next Step <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province <span className="text-red-500">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select province" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                                <SelectItem value="Free State">Free State</SelectItem>
                                <SelectItem value="Gauteng">Gauteng</SelectItem>
                                <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                                <SelectItem value="Limpopo">Limpopo</SelectItem>
                                <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                                <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                                <SelectItem value="North West">North West</SelectItem>
                                <SelectItem value="Western Cape">Western Cape</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="municipality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Local Municipality <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your local municipality" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ward <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your ward number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="qualifications"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Qualifications</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your educational and professional qualifications" 
                                {...field} 
                                rows={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button 
                        type="button" 
                        onClick={prevStep}
                        variant="outline"
                        className="border-2 border-[#0B6623] text-[#0B6623] hover:bg-[#0B6623] hover:text-white"
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isPending}
                        className="bg-[#FFD700] text-[#212121] hover:bg-opacity-90"
                      >
                        {isPending ? "Submitting..." : (
                          <>
                            Submit Application <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
