import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  agents, InsertAgent, Agent,
  callLogs, InsertCallLog, CallLog,
  userSettings, InsertUserSettings, UserSettings
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER QUERIES ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "phone", "company"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserTrialMinutes(userId: number, minutesUsed: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(users)
    .set({ trialMinutesUsed: minutesUsed })
    .where(eq(users.id, userId));
}

// ============ AGENT QUERIES ============

export async function createAgent(agent: InsertAgent): Promise<Agent> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(agents).values(agent);
  const insertId = result[0].insertId;
  
  const created = await db.select().from(agents).where(eq(agents.id, insertId)).limit(1);
  return created[0];
}

export async function getAgentsByUserId(userId: number): Promise<Agent[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(agents).where(eq(agents.userId, userId)).orderBy(desc(agents.createdAt));
}

export async function getAgentById(agentId: number, userId: number): Promise<Agent | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(agents)
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateAgent(agentId: number, userId: number, updates: Partial<InsertAgent>): Promise<Agent | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  await db.update(agents)
    .set({ ...updates, updatedAt: new Date() })
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));

  return getAgentById(agentId, userId);
}

export async function deleteAgent(agentId: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.delete(agents)
    .where(and(eq(agents.id, agentId), eq(agents.userId, userId)));
  
  return (result[0].affectedRows ?? 0) > 0;
}

export async function incrementAgentCalls(agentId: number, minutes: number) {
  const db = await getDb();
  if (!db) return;

  const agent = await db.select().from(agents).where(eq(agents.id, agentId)).limit(1);
  if (agent.length === 0) return;

  await db.update(agents)
    .set({ 
      totalCalls: (agent[0].totalCalls || 0) + 1,
      totalMinutes: (agent[0].totalMinutes || 0) + minutes
    })
    .where(eq(agents.id, agentId));
}

// ============ CALL LOG QUERIES ============

export async function createCallLog(log: InsertCallLog): Promise<CallLog> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(callLogs).values(log);
  const insertId = result[0].insertId;
  
  const created = await db.select().from(callLogs).where(eq(callLogs.id, insertId)).limit(1);
  return created[0];
}

export async function getCallLogsByUserId(userId: number, limit: number = 50): Promise<CallLog[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(callLogs)
    .where(eq(callLogs.userId, userId))
    .orderBy(desc(callLogs.createdAt))
    .limit(limit);
}

export async function getCallLogsByAgentId(agentId: number, limit: number = 50): Promise<CallLog[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(callLogs)
    .where(eq(callLogs.agentId, agentId))
    .orderBy(desc(callLogs.createdAt))
    .limit(limit);
}

// ============ USER SETTINGS QUERIES ============

export async function getUserSettings(userId: number): Promise<UserSettings | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userSettings).where(eq(userSettings.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertUserSettings(userId: number, settings: Partial<InsertUserSettings>): Promise<UserSettings> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getUserSettings(userId);
  
  if (existing) {
    await db.update(userSettings)
      .set({ ...settings, updatedAt: new Date() })
      .where(eq(userSettings.userId, userId));
  } else {
    await db.insert(userSettings).values({ userId, ...settings });
  }

  const updated = await getUserSettings(userId);
  return updated!;
}
