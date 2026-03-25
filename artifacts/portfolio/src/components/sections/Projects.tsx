import { motion } from "framer-motion";
import { FolderGit2, Star, ExternalLink, Github } from "lucide-react";
import { useGetProjects } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { animationVariants } from "@/lib/utils";

// Fallback to ensure UI works even if API is missing
const fallbackProjects = [
  {
    id: 1, name: "Calculator", language: "C#",
    description: "A console-based Calculator application built with C#. Introduces file persistence — calculation history is saved to a text file.",
    githubUrl: "https://github.com/Timothynyezi/Calculator", stars: 0, tags: [".NET", "Console", "I/O"], featured: true, updatedAt: "2026-03-19"
  },
  {
    id: 2, name: "real-time-docs-clone", language: "C#",
    description: "A real-time collaborative document editor built with C# and .NET, inspired by Google Docs using SignalR WebSockets.",
    githubUrl: "https://github.com/Timothynyezi/real-time-docs-clone", stars: 0, tags: ["SignalR", "WebSockets", ".NET"], featured: true, updatedAt: "2026-03-18"
  },
  {
    id: 3, name: "Math-Game", language: "C#",
    description: "A math game console application serving to solidify C# fundamentals.",
    githubUrl: "https://github.com/Timothynyezi/Math-Game", stars: 0, tags: ["C#", "Fundamentals"], featured: false, updatedAt: "2026-03-14"
  },
  {
    id: 4, name: "codecrafters-grep-java", language: "Java",
    description: "My own grep implementation built in Java to learn deep regular expressions.",
    githubUrl: "https://github.com/Timothynyezi/codecrafters-grep-java", stars: 0, tags: ["Java", "Regex", "CLI"], featured: false, updatedAt: "2025-09-18"
  }
];

export function Projects() {
  const { data, isLoading, isError } = useGetProjects();
  
  const projectsData = isError || (!isLoading && (!data || data.length === 0)) 
    ? fallbackProjects 
    : data;

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4].map(i => (
              <Card key={i} className="h-64 animate-pulse bg-secondary/50" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationVariants.staggerContainer}
          >
            {projectsData?.map((project) => (
              <motion.div key={project.id} variants={animationVariants.fadeUp}>
                <Card className="h-full flex flex-col group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 bg-card/80 backdrop-blur">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <FolderGit2 size={24} />
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        {project.language && <Badge variant="outline">{project.language}</Badge>}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-base mt-2 line-clamp-3">
                      {project.description || "No description available."}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags?.map(tag => (
                        <span key={tag} className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t border-border pt-4 flex justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm font-medium">
                      <Star size={16} className={project.stars > 0 ? "text-yellow-500 fill-yellow-500" : ""} />
                      <span>{project.stars}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github size={16} /> Code
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" asChild className="rounded-full border-primary/30 hover:border-primary">
            <a href="https://github.com/Timothynyezi" target="_blank" rel="noreferrer">
              View All on GitHub <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
