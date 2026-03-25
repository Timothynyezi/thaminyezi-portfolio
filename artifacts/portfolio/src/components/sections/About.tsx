import { motion } from "framer-motion";
import { User, Code2, Database, Rocket } from "lucide-react";
import { useGetProfile } from "@workspace/api-client-react";
import { animationVariants } from "@/lib/utils";

export function About() {
  const { data: profile, isLoading, isError } = useGetProfile();

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationVariants.fadeUp}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-3">
            <User className="text-primary" size={32} /> About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.fadeUp}
          >
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-5/6"></div>
                <div className="h-4 bg-secondary rounded w-4/6"></div>
              </div>
            ) : isError ? (
              <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                Failed to load profile data. But I am an aspiring Software Engineer with a passion for back-end development.
              </div>
            ) : (
              <>
                <p>
                  {profile?.bio || 
                  "I am an aspiring Software Engineer with a passion for back-end development. I enjoy building robust, scalable applications and exploring real-time technologies."}
                </p>
                <p>
                  My journey involves deep dives into C#, ASP.NET Core, and PostgreSQL, always aiming to understand the underlying mechanics of modern web services.
                </p>
              </>
            )}
          </motion.div>

          <motion.div 
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.staggerContainer}
          >
            {[
              { icon: <Code2 />, title: "Backend Focus", desc: "C# & .NET Core architectures" },
              { icon: <Database />, title: "Data Driven", desc: "PostgreSQL & ETL pipelines" },
              { icon: <Rocket />, title: "Continuous Learner", desc: "Always exploring new tech" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={animationVariants.fadeUp}
                className="p-6 rounded-2xl bg-card border border-card-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
