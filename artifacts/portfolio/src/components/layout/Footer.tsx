import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-card/30 mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl">Thamsanqa Nyezi</span>
          </div>
          
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {year} Designed & Built by Thamsanqa Timothy Nyezi. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/Timothynyezi" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/tt-nyezi" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:thaminyezi@gmail.com" 
              className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
