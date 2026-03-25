import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { animationVariants } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const { mutate, isPending } = useSubmitContact({
    mutation: {
      onSuccess: (data) => {
        toast({
          title: "Message Sent!",
          description: data.message || "I'll get back to you as soon as possible.",
          variant: "default",
        });
        reset();
      },
      onError: (error) => {
        toast({
          title: "Failed to send message",
          description: error.error || "There was an error submitting the form.",
          variant: "destructive",
        });
      }
    }
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate({ data });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={animationVariants.fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center justify-center gap-3">
            <Mail className="text-primary" size={32} /> Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <motion.div 
          className="max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.fadeUp}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card/50 backdrop-blur border border-white/5 p-8 rounded-3xl shadow-2xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">Name</label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                {...register("name")} 
                className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                {...register("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
              <Textarea 
                id="message" 
                placeholder="Hi Thamsanqa, I'd like to talk about..." 
                {...register("message")}
                className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
            </div>
            
            <Button type="submit" variant="glow" size="lg" className="w-full" disabled={isPending}>
              {isPending ? "Sending..." : "Send Message"} 
              {!isPending && <Send className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
