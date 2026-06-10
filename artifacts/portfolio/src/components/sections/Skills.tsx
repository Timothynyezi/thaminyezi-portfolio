import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { animationVariants } from "@/lib/utils";

const skillsData = [
  {
    id: 1,
    category: "Primary",
    skills: ["C#", ".NET 8", "ASP.NET Core Web API", "Entity Framework Core", "SignalR", "LINQ"],
  },
  {
    id: 2,
    category: "Auth & API",
    skills: ["JWT Bearer Authentication", "REST APIs", "Swagger / OpenAPI", "DTOs"],
  },
  {
    id: 3,
    category: "Databases",
    skills: ["SQL Server", "SQLite", "SQL", "NoSQL", "Database Design & Normalisation"],
  },
  {
    id: 4,
    category: "Data Engineering",
    skills: ["ETL Pipelines", "Apache Spark", "Apache Kafka", "Apache Airflow", "HDFS", "Amazon S3"],
  },
  {
    id: 5,
    category: "Cloud & DevOps",
    skills: ["Microsoft Azure", "Docker", "CI/CD Pipelines", "Git", "GitHub"],
  },
  {
    id: 6,
    category: "Other Languages",
    skills: ["Python", "Java", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: 7,
    category: "Tools & Methods",
    skills: ["OOP", "Agile / Scrum", "Systems Design", "Visual Studio Code", "Linux (Ubuntu)", "Windows"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationVariants.fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center justify-center gap-3">
            <Terminal className="text-primary" size={32} /> Technical Arsenal
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.staggerContainer}
        >
          {skillsData.map((group) => (
            <motion.div key={group.id} variants={animationVariants.fadeUp}>
              <Card className="h-full hover:shadow-[0_8px_30px_rgba(0,229,255,0.05)] transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-primary/90">{group.category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={group.category === "Primary" ? "glow" : "outline"}
                      className="text-sm py-1.5 px-3"
                    >
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}