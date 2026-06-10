import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { animationVariants } from "@/lib/utils";

const projectsData = [
  {
    id: 1,
    name: "Finance Tracker API",
    language: "C#",
    description:
      "Production-style RESTful API built in ASP.NET Core 8 featuring JWT Bearer authentication, secure user registration and login, full CRUD endpoints for transactions and categories, global error handling middleware, and Swagger documentation. Structured using a clean Controller → Service → Repository pattern with EF Core and SQLite persistence.",
    githubUrl: "https://github.com/Timothynyezi/FinanceTrackerAPI",
    tags: ["ASP.NET Core 8", "JWT", "EF Core", "SQLite", "Swagger", "REST API"],
    featured: true,
  },
  {
    id: 2,
    name: "Real-Time Docs Clone",
    language: "C#",
    description:
      "A real-time collaborative document editor inspired by Google Docs, built with C# and .NET using SignalR WebSockets. Implements a SignalR hub to broadcast document changes to all connected clients in real time, with a test client to validate hub functionality and message routing.",
    githubUrl: "https://github.com/Timothynyezi/real-time-docs-clone",
    tags: ["SignalR", "WebSockets", ".NET", "Real-Time", "Event-Driven"],
    featured: true,
  },
  {
    id: 3,
    name: "Habit Logger",
    language: "C#",
    description:
      "A console-based habit tracking application built with C# using SQLite and ADO.NET for direct database interaction without an ORM. Demonstrates raw SQL queries, database creation, and CRUD operations — a foundational project for understanding database connectivity in .NET.",
    githubUrl: "https://github.com/Timothynyezi",
    tags: ["C#", "SQLite", "ADO.NET", "Console", "CRUD"],
    featured: false,
  },
  {
    id: 4,
    name: "Calculator",
    language: "C#",
    description:
      "A console-based Calculator application built with C#. Introduces file persistence — calculation history is saved to a text file, demonstrating basic I/O operations and state management in a .NET console application.",
    githubUrl: "https://github.com/Timothynyezi/Calculator",
    tags: [".NET", "Console", "File I/O", "C#"],
    featured: false,
  },
  {
    id: 5,
    name: "Math Game",
    language: "C#",
    description:
      "A console math game built to solidify C# fundamentals — covering loops, conditionals, random number generation, and user input handling. A clean entry-level project demonstrating core language mechanics.",
    githubUrl: "https://github.com/Timothynyezi/Math-Game",
    tags: ["C#", "Console", "Fundamentals"],
    featured: false,
  },
  {
    id: 6,
    name: "Grep Implementation",
    language: "Java",
    description:
      "A custom grep implementation built in Java as part of the CodeCrafters challenge. Explores deep regular expression mechanics, pattern matching, and CLI argument parsing — demonstrating Java proficiency beyond typical academic projects.",
    githubUrl: "https://github.com/Timothynyezi/codecrafters-grep-java",
    tags: ["Java", "Regex", "CLI", "CodeCrafters"],
    featured: false,
  },
];

export function Projects() {
  const featured = projectsData.filter((p) => p.featured);
  const others = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationVariants.fadeUp}
          className="mb-16 flex flex-col items-center sm:items-start"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-3">
            <FolderGit2 className="text-primary" size={32} /> Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.staggerContainer}
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={animationVariants.fadeUp}>
              <Card className="h-full flex flex-col group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 bg-card/80 backdrop-blur border-primary/20">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <FolderGit2 size={24} />
                    </div>
                    {project.language && (
                      <Badge variant="outline">{project.language}</Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="border-t border-border pt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github size={16} /> View Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.fadeUp}
          className="mb-6"
        >
          <h3 className="text-xl font-bold text-muted-foreground mb-6">Other Projects</h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.staggerContainer}
        >
          {others.map((project) => (
            <motion.div key={project.id} variants={animationVariants.fadeUp}>
              <Card className="h-full flex flex-col group hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 bg-card/80 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-3">
                    <FolderGit2 size={20} className="text-primary" />
                    {project.language && (
                      <Badge variant="outline" className="text-xs">{project.language}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1 line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="border-t border-border pt-3 flex justify-end">
                  <Button variant="ghost" size="sm" asChild className="gap-2 text-xs">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github size={14} /> Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full border-primary/30 hover:border-primary"
          >
            <a href="https://github.com/Timothynyezi" target="_blank" rel="noreferrer">
              View All on GitHub <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}