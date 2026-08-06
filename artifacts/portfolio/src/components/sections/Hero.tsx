import { motion } from "framer-motion";
import { MapPin, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { animationVariants } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat mix-blend-screen"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-glow.png)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center md:text-left"
            variants={animationVariants.staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={animationVariants.fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for work
            </motion.div>
            
            <motion.h1 variants={animationVariants.fadeUp} className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">
                Thamsanqa Timothy Nyezi
              </span>
            </motion.h1>
            
            <motion.h2 variants={animationVariants.fadeUp} className="text-2xl md:text-3xl text-muted-foreground font-medium mb-6">
              Junior C# / .NET Developer
            </motion.h2>
            
            <motion.p variants={animationVariants.fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto md:mx-0 mb-8 flex items-center justify-center md:justify-start gap-2">
              <MapPin size={20} className="text-primary" />
              Cape Town, Western Cape, South Africa
            </motion.p>
            
            <motion.div variants={animationVariants.fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Button variant="glow" size="lg" asChild>
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-primary to-accent">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent blur-2xl opacity-40 animate-pulse" />
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-background relative z-10 bg-card">
                <img 
                  src={`${import.meta.env.BASE_URL}profile.jpg`} 
                  alt="Thamsanqa Timothy Nyezi" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
