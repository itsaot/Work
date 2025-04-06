import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./email";
import { affiliationFormSchema, contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // API route for submitting the affiliation form
  app.post("/api/affiliations", async (req, res) => {
    try {
      // Validate the form data
      const validatedData = affiliationFormSchema.parse(req.body);
      
      // Store the affiliation in the database
      const affiliation = await storage.createAffiliation({
        ...validatedData,
        disability: validatedData.disability || "none",
        qualifications: validatedData.qualifications || "",
      });

      // Send email notification
      const emailResult = await sendEmail({
        to: "mkhontonationalunion@gmail.com",
        subject: "New MNU Affiliation Request",
        html: `
          <h2>New Affiliation Request</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Surname:</strong> ${validatedData.surname}</p>
          <p><strong>Age:</strong> ${validatedData.age}</p>
          <p><strong>Gender:</strong> ${validatedData.gender}</p>
          <p><strong>Sector:</strong> ${validatedData.sector}</p>
          <p><strong>Disability:</strong> ${validatedData.disability || "None"}</p>
          <p><strong>Nationality:</strong> ${validatedData.nationality}</p>
          <p><strong>Province:</strong> ${validatedData.province}</p>
          <p><strong>Municipality:</strong> ${validatedData.municipality}</p>
          <p><strong>Ward:</strong> ${validatedData.ward}</p>
          <p><strong>Qualifications:</strong> ${validatedData.qualifications || "None"}</p>
        `,
      });

      if (!emailResult.success) {
        console.error("Failed to send email:", emailResult.error);
        // Still return success since we stored the affiliation
        return res.status(200).json({
          message: "Affiliation stored successfully but email notification failed",
          affiliation,
        });
      }

      return res.status(200).json({
        message: "Affiliation submitted successfully",
        affiliation,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }
      console.error("Error processing affiliation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // API route for contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the form data
      const validatedData = contactFormSchema.parse(req.body);

      // Send email
      const emailResult = await sendEmail({
        to: "mkhontonationalunion@gmail.com",
        subject: "New Contact Message from MNU Website",
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong> ${validatedData.message}</p>
        `,
      });

      if (!emailResult.success) {
        console.error("Failed to send email:", emailResult.error);
        return res.status(500).json({
          message: "Failed to send message",
          error: emailResult.error,
        });
      }

      return res.status(200).json({
        message: "Message sent successfully",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
