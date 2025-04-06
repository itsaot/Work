import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Affiliation form schema
export const affiliations = pgTable("affiliations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  sector: text("sector").notNull(),
  disability: text("disability"),
  nationality: text("nationality").notNull(),
  province: text("province").notNull(),
  municipality: text("municipality").notNull(),
  ward: text("ward").notNull(),
  qualifications: text("qualifications"),
  createdAt: text("created_at").notNull(),
});

export const insertAffiliationSchema = createInsertSchema(affiliations).omit({
  id: true,
  createdAt: true,
});

export const affiliationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  age: z.coerce.number().int().min(18, "You must be at least 18 years old").max(100, "Age must be 100 or less"),
  gender: z.string().min(1, "Please select a gender"),
  sector: z.string().min(1, "Please select a sector"),
  disability: z.string().optional(),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  province: z.string().min(1, "Please select a province"),
  municipality: z.string().min(2, "Municipality must be at least 2 characters"),
  ward: z.string().min(1, "Ward is required"),
  qualifications: z.string().optional(),
});

export type InsertAffiliation = z.infer<typeof insertAffiliationSchema>;
export type Affiliation = typeof affiliations.$inferSelect;
export type AffiliationForm = z.infer<typeof affiliationFormSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
