"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  portfolioFeedback,
  type PortfolioFeedbackOutput,
} from "@/ai/flows/portfolio-feedback-gen-ai";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  portfolioDescription: z.string().min(10, {
    message:
      "Please provide a detailed description of your niche and aesthetic (min. 10 characters).",
  }),
  portfolioLink: z.string().url({ message: "Please enter a valid URL." }),
});

export function AiAnalyzer() {
  const [result, setResult] = useState<PortfolioFeedbackOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioDescription: "",
      portfolioLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await portfolioFeedback(values);
      setResult(aiResult);
    } catch (error) {
      console.error("AI Feedback Error:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get AI feedback. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="analyzer" className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline flex items-center justify-center gap-3">
          <Bot className="w-10 h-10" /> AI Portfolio Analyzer
        </h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get instant, AI-powered feedback on your portfolio to help you
          attract more clients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Analyze Your Portfolio</CardTitle>
            <CardDescription>
              Fill out the form below and our AI will review your work.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="portfolioLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-portfolio.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolioDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your editing niche (e.g., fast-paced commercials, emotional documentaries) and desired aesthetic (e.g., clean, gritty, cinematic)."
                          className="resize-none h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Get Feedback"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col">
          <h3 className="text-2xl font-headline mb-4">Analysis Results</h3>
          <Card className="flex-grow min-h-[300px]">
            <CardContent className="p-6 h-full">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
                  <p>Our AI is analyzing your portfolio...</p>
                </div>
              )}
              {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Sparkles className="w-12 h-12 mb-4 text-primary" />
                  <p>Your feedback will appear here.</p>
                </div>
              )}
              {result && (
                <div className="space-y-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-lg font-headline mb-2 text-primary">
                      Feedback
                    </h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">
                      {result.feedback}
                    </p>
                  </div>
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-lg font-headline mb-2 text-primary">
                      Suggestions
                    </h4>
                    <p className="text-foreground/90 whitespace-pre-wrap">
                      {result.suggestions}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
