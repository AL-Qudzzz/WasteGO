'use server';
/**
 * @fileOverview Generates a personalized environmental impact summary based on user recycling activity.
 *
 * - generateEnvironmentalImpactSummary - A function that generates the environmental impact summary.
 * - EnvironmentalImpactInput - The input type for the generateEnvironmentalImpactSummary function.
 * - EnvironmentalImpactOutput - The return type for the generateEnvironmentalImpactSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnvironmentalImpactInputSchema = z.object({
  treesSaved: z
    .number()
    .describe('The estimated number of trees saved due to recycling.'),
  waterSaved: z
    .number()
    .describe('The estimated amount of water saved (in liters) due to recycling.'),
  energySaved: z
    .number()
    .describe('The estimated amount of energy saved (in kWh) due to recycling.'),
  carbonOffset: z
    .number()
    .describe('The estimated amount of carbon offset (in kg) due to recycling.'),
});
export type EnvironmentalImpactInput = z.infer<typeof EnvironmentalImpactInputSchema>;

const EnvironmentalImpactOutputSchema = z.object({
  summary: z
    .string()
    .describe('A personalized summary of the user environmental impact.'),
});
export type EnvironmentalImpactOutput = z.infer<typeof EnvironmentalImpactOutputSchema>;

export async function generateEnvironmentalImpactSummary(
  input: EnvironmentalImpactInput
): Promise<EnvironmentalImpactOutput> {
  return generateEnvironmentalImpactSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'environmentalImpactSummaryPrompt',
  input: {schema: EnvironmentalImpactInputSchema},
  output: {schema: EnvironmentalImpactOutputSchema},
  prompt: `You are an environmental expert who specializes in communicating the impact of recycling to motivate users.

  Based on the following recycling activity, generate a short, personalized message summarizing the user's environmental impact:

  Trees saved: {{treesSaved}}
  Water saved: {{waterSaved}} liters
  Energy saved: {{energySaved}} kWh
  Carbon offset: {{carbonOffset}} kg

  Focus on creating a positive and encouraging message that highlights the benefits of their efforts. Be creative and ensure the message is no more than 100 words. Make the message in Indonesian.
  `,
});

const generateEnvironmentalImpactSummaryFlow = ai.defineFlow(
  {
    name: 'environmentalImpactSummaryFlow',
    inputSchema: EnvironmentalImpactInputSchema,
    outputSchema: EnvironmentalImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
