import { users, type User, type InsertUser, affiliations, type Affiliation, type InsertAffiliation } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAffiliation(affiliation: InsertAffiliation): Promise<Affiliation>;
  getAllAffiliations(): Promise<Affiliation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private affiliations: Map<number, Affiliation>;
  usersCurrentId: number;
  affiliationsCurrentId: number;

  constructor() {
    this.users = new Map();
    this.affiliations = new Map();
    this.usersCurrentId = 1;
    this.affiliationsCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.usersCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAffiliation(insertAffiliation: InsertAffiliation): Promise<Affiliation> {
    const id = this.affiliationsCurrentId++;
    const createdAt = new Date().toISOString();
    const affiliation: Affiliation = { ...insertAffiliation, id, createdAt };
    this.affiliations.set(id, affiliation);
    return affiliation;
  }

  async getAllAffiliations(): Promise<Affiliation[]> {
    return Array.from(this.affiliations.values());
  }
}

export const storage = new MemStorage();
