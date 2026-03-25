import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { animationVariants } from "@/lib/utils";

const timelineData = [
  {
    type: 'experience',
    title: "Software Engineering Trainee",
    organization: "WeThinkCode_",
    date: "2024 - 2026",
    description: "Intensive peer-to-peer software engineering program focusing on problem-solving, test-driven development, and scalable architectures."
  },
  {
    type: 'education',
    title: "Occupational Certificate: Software Engineer",
    organization: "NQF Level 6",
    date: "In Progress",
    description: "Specializing in Data Engineering. Comprehensive curriculum covering software development life cycles, algorithms, and database management."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationVariants.fadeUp}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-3">
            <Briefcase className="text-primary" size={32} /> Journey
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationVariants.fadeUp}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[21px] top-1 w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                {item.type === 'experience' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              </div>
              
              <div className="bg-card border border-card-border p-6 rounded-2xl shadow-md hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                    {item.date}
                  </span>
                </div>
                <h4 className="text-lg text-muted-foreground mb-4">{item.organization}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
