import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { animationVariants } from "@/lib/utils";

const timelineData = [
  {
    type: "experience",
    title: "Software Engineering Trainee",
    organization: "WeThinkCode_ — Johannesburg",
    date: "2024 – 2026",
    bullets: [
      "Built a production-style RESTful Finance Tracker API in ASP.NET Core 8 with JWT authentication, EF Core, SQLite, and Swagger — demonstrating clean Controller → Service → Repository architecture.",
      "Developed a real-time collaborative document editor using SignalR, implementing WebSocket hub architecture with live bi-directional communication across connected clients.",
      "Worked across greenfield and brownfield codebases, applying OOP, separation of concerns, and error handling patterns throughout.",
      "Designed relational database schemas applying normalisation principles and wrote complex SQL queries, integrating both relational and non-relational database layers.",
      "Tested and debugged source code against client requirements, implementing acceptance testing and CI/CD build pipelines across multiple project cycles.",
      "Produced system design artefacts and technical specifications across all four semesters of the programme.",
    ],
  },
  {
    type: "education",
    title: "Occupational Certificate: Software Engineer — NQF Level 6",
    organization: "WeThinkCode_ | QCTO Accredited (No. 07-QCTO/SDP281124132921)",
    date: "2024 – 2026",
    bullets: [
      "242/240 Credits | Final Outcome: Pass | 16-Month Accredited Programme.",
      "100% in Python Consolidation (Sequences, Recursion & Algorithms).",
      "100% in Java OOP; 96.9% in Java Encapsulation & BigInteger Money Modelling.",
      "Comprehensive curriculum covering software development life cycles, algorithms, OOP, and database management.",
    ],
  },
  {
    type: "education",
    title: "Data Engineering Elective Specialisation",
    organization: "WeThinkCode_",
    date: "Completed Jan 2026",
    bullets: [
      "44/44 Credits | Outcome: Competent.",
      "Built end-to-end ETL pipelines and managed distributed storage using HDFS and Amazon S3.",
      "Developed batch and stream processing solutions using Apache Spark and Apache Kafka.",
      "Orchestrated complex data workflows using Apache Airflow in containerised Docker environments.",
      "Completed a Data Engineering capstone project demonstrating end-to-end pipeline design and implementation.",
    ],
  },
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
                {item.type === "experience" ? (
                  <Briefcase size={18} />
                ) : (
                  <GraduationCap size={18} />
                )}
              </div>

              <div className="bg-card border border-card-border p-6 rounded-2xl shadow-md hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                    {item.date}
                  </span>
                </div>
                <h4 className="text-lg text-muted-foreground mb-4">{item.organization}</h4>
                <ul className="space-y-2">
                  {item.bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}