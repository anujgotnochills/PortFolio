"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  status: "success" | "error" | "idle";
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];

    return {
      message: firstError || "Invalid input. Please check the form and try again.",
      status: "error",
    };
  }

  // In a real app, you'd send an email or save to a database here.
  // For now, we'll just log it and return success.
  console.log("Contact form submitted:");
  console.log(validatedFields.data);

  return {
    message: "Thank you for your message! I will get back to you soon.",
    status: "success",
  };
}
