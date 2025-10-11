// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Provides AI-driven feedback on user portfolios, tailored to their niche and desired aesthetic.
 *
 * - portfolioFeedback - A function to get feedback on a user's portfolio.
 * - PortfolioFeedbackInput - The input type for the portfolioFeedback function.
 * - PortfolioFeedbackOutput - The return type for the portfolioFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioFeedbackInputSchema = z.object({
  portfolioDescription: z
    .string()
    .describe('Description of the portfolio, including niche and desired aesthetic.'),
  portfolioLink: z.string().describe('Link to the portfolio to be reviewed.'),
});
export type PortfolioFeedbackInput = z.infer<typeof PortfolioFeedbackInputSchema>;

const PortfolioFeedbackOutputSchema = z.object({
  feedback: z.string().describe('AI-generated feedback on the portfolio.'),
  suggestions: z.string().describe('AI-generated suggestions for improvement.'),
});
export type PortfolioFeedbackOutput = z.infer<typeof PortfolioFeedbackOutputSchema>;

export async function portfolioFeedback(input: PortfolioFeedbackInput): Promise<PortfolioFeedbackOutput> {
  return portfolioFeedbackFlow(input);
}

const portfolioFeedbackPrompt = ai.definePrompt({
  name: 'portfolioFeedbackPrompt',
  input: {schema: PortfolioFeedbackInputSchema},
  output: {schema: PortfolioFeedbackOutputSchema},
  prompt: `You are a portfolio review expert, specializing in providing feedback to editors.

You will review the portfolio and provide feedback and suggestions for improvements based on the niche and desired aesthetic.

Portfolio Description: {{{portfolioDescription}}}
Portfolio Link: {{{portfolioLink}}}

Provide clear and actionable feedback and suggestions that the editor can implement to attract more clients.
`,
});

const portfolioFeedbackFlow = ai.defineFlow(
  {
    name: 'portfolioFeedbackFlow',
    inputSchema: PortfolioFeedbackInputSchema,
    outputSchema: PortfolioFeedbackOutputSchema,
  },
  async input => {
    const {output} = await portfolioFeedbackPrompt(input);
    return output!;
  }
);
