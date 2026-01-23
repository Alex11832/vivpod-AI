import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  company: varchar("company", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  // Subscription info
  plan: mysqlEnum("plan", ["free", "starter", "pro", "enterprise"]).default("free").notNull(),
  trialMinutesUsed: int("trialMinutesUsed").default(0).notNull(),
  trialMinutesTotal: int("trialMinutesTotal").default(30).notNull(), // 30 min free trial
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * AI Agents table - stores user's AI voice agents
 */
export const agents = mysqlTable("agents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  vapiAssistantId: varchar("vapiAssistantId", { length: 64 }),
  name: varchar("name", { length: 255 }).notNull(),
  voiceId: varchar("voiceId", { length: 64 }).notNull(),
  voiceName: varchar("voiceName", { length: 64 }),
  voiceProvider: varchar("voiceProvider", { length: 32 }).default("11labs"),
  industry: varchar("industry", { length: 64 }),
  subCategories: json("subCategories").$type<string[]>(),
  systemPrompt: text("systemPrompt"),
  firstMessage: text("firstMessage"),
  status: mysqlEnum("status", ["active", "paused", "draft"]).default("draft").notNull(),
  totalCalls: int("totalCalls").default(0).notNull(),
  totalMinutes: int("totalMinutes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = typeof agents.$inferInsert;

/**
 * Call logs table - stores call history
 */
export const callLogs = mysqlTable("callLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  agentId: int("agentId").notNull(),
  vapiCallId: varchar("vapiCallId", { length: 64 }),
  callerPhone: varchar("callerPhone", { length: 32 }),
  duration: int("duration").default(0), // in seconds
  status: mysqlEnum("status", ["completed", "missed", "transferred", "voicemail"]).default("completed").notNull(),
  summary: text("summary"),
  transcript: text("transcript"),
  sentiment: mysqlEnum("sentiment", ["positive", "neutral", "negative"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CallLog = typeof callLogs.$inferSelect;
export type InsertCallLog = typeof callLogs.$inferInsert;

/**
 * User settings table - stores user preferences
 */
export const userSettings = mysqlTable("userSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  timezone: varchar("timezone", { length: 64 }).default("America/New_York"),
  // Notification preferences
  emailSummary: boolean("emailSummary").default(true),
  emailMissedCalls: boolean("emailMissedCalls").default(true),
  emailWeeklyReport: boolean("emailWeeklyReport").default(true),
  telegramEnabled: boolean("telegramEnabled").default(false),
  telegramChatId: varchar("telegramChatId", { length: 64 }),
  // Integration settings
  googleCalendarConnected: boolean("googleCalendarConnected").default(false),
  hubspotConnected: boolean("hubspotConnected").default(false),
  hubspotApiKey: varchar("hubspotApiKey", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = typeof userSettings.$inferInsert;
