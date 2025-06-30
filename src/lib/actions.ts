"use server";

import { generateEnvironmentalImpactSummary } from "@/ai/flows/generate-environmental-impact-summary";
import { z } from "zod";

const impactSchema = z.object({
  totalWeight: z.coerce.number().positive("Total weight must be a positive number."),
});

export async function getImpactSummary(prevState: any, formData: FormData) {
  try {
    const validatedFields = impactSchema.safeParse({
      totalWeight: formData.get("totalWeight"),
    });

    if (!validatedFields.success) {
      return {
        message: "Invalid input.",
        summary: "",
      };
    }
    
    const { totalWeight } = validatedFields.data;

    // Dummy conversion factors for demonstration
    const treesSaved = totalWeight / 100; // 1 tree per 100kg
    const waterSaved = totalWeight * 25; // 25 liters per kg
    const energySaved = totalWeight * 5; // 5 kWh per kg
    const carbonOffset = totalWeight * 1.5; // 1.5 kg CO2 offset per kg

    const result = await generateEnvironmentalImpactSummary({
      treesSaved,
      waterSaved,
      energySaved,
      carbonOffset,
    });
    
    return {
      message: "success",
      summary: result.summary,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while generating the summary.",
      summary: "",
    };
  }
}
