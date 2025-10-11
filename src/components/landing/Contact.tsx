"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      size="lg"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

export function Contact() {
  const initialState = { message: "", status: "idle" as const };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Message Sent!",
        description: state.message,
      });
      const form = document.querySelector("#contact-form") as HTMLFormElement;
      if(form) form.reset();

    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="bg-background py-24">
      <div className="container max-w-2xl text-center px-8">
         <h2 className="text-5xl font-bold mb-4">
          Get In Touch
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          Have a project in mind? Let's work together to bring your vision to life.
        </p>

        <form id="contact-form" action={formAction} className="space-y-6 text-left">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">Name</Label>
            <Input id="name" name="name" placeholder="Your Name" required className="bg-secondary border-border h-12 px-4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="bg-secondary border-border h-12 px-4"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-muted-foreground">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              className="h-40 bg-secondary border-border p-4"
              required
            />
          </div>
          <div className="text-center pt-4">
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}
