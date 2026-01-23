import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  getAgentsByUserId: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      name: "Test Agent",
      voiceId: "voice-1",
      voiceName: "Sarah",
      voiceProvider: "11labs",
      industry: "handyman",
      status: "active",
      totalCalls: 10,
      totalMinutes: 45,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getAgentById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    name: "Test Agent",
    voiceId: "voice-1",
    voiceName: "Sarah",
    voiceProvider: "11labs",
    industry: "handyman",
    status: "active",
  }),
  createAgent: vi.fn().mockResolvedValue({
    id: 2,
    userId: 1,
    name: "New Agent",
    voiceId: "voice-2",
    status: "draft",
  }),
  updateAgent: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    name: "Updated Agent",
    status: "active",
  }),
  deleteAgent: vi.fn().mockResolvedValue(true),
  getUserSettings: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    timezone: "America/New_York",
    emailSummary: true,
    emailMissedCalls: true,
    telegramEnabled: false,
  }),
  upsertUserSettings: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    timezone: "America/Los_Angeles",
    telegramEnabled: true,
    telegramChatId: "123456789",
  }),
  getCallLogsByUserId: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      agentId: 1,
      callerPhone: "+1234567890",
      duration: 120,
      status: "completed",
      summary: "Customer inquiry about service",
      createdAt: new Date(),
    },
  ]),
  getCallLogsByAgentId: vi.fn().mockResolvedValue([]),
}));

// Mock Vapi functions
vi.mock("./vapi", () => ({
  createAssistant: vi.fn().mockResolvedValue({ id: "vapi-assistant-123" }),
  updateAssistant: vi.fn().mockResolvedValue({ id: "vapi-assistant-123" }),
  deleteAssistant: vi.fn().mockResolvedValue(true),
  AVAILABLE_VOICES: [
    { id: "voice-1", name: "Sarah", provider: "11labs", gender: "female" },
    { id: "voice-2", name: "James", provider: "11labs", gender: "male" },
  ],
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("agents router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists agents for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agents.list();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Test Agent");
    expect(result[0].industry).toBe("handyman");
  });

  it("gets a specific agent by id", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agents.get({ id: 1 });

    expect(result).toBeDefined();
    expect(result?.name).toBe("Test Agent");
  });

  it("creates a new agent", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agents.create({
      name: "New Agent",
      voiceId: "voice-2",
      voiceName: "James",
      voiceProvider: "11labs",
      industry: "healthcare",
      systemPrompt: "You are a helpful healthcare receptionist.",
      firstMessage: "Hello, thank you for calling our clinic.",
    });

    expect(result).toBeDefined();
    expect(result.name).toBe("New Agent");
  });

  it("updates an existing agent", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agents.update({
      id: 1,
      name: "Updated Agent",
      status: "active",
    });

    expect(result).toBeDefined();
    expect(result.name).toBe("Updated Agent");
  });

  it("deletes an agent", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.agents.delete({ id: 1 });

    expect(result).toBe(true);
  });
});

describe("settings router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gets user settings", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.settings.get();

    expect(result).toBeDefined();
    expect(result?.timezone).toBe("America/New_York");
    expect(result?.emailSummary).toBe(true);
  });

  it("updates user settings", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.settings.update({
      timezone: "America/Los_Angeles",
      telegramEnabled: true,
      telegramChatId: "123456789",
    });

    expect(result).toBeDefined();
    expect(result.timezone).toBe("America/Los_Angeles");
    expect(result.telegramEnabled).toBe(true);
  });
});

describe("calls router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists call logs for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calls.list({ limit: 10 });

    expect(result).toHaveLength(1);
    expect(result[0].callerPhone).toBe("+1234567890");
    expect(result[0].status).toBe("completed");
  });
});

describe("voices router", () => {
  it("lists available voices (public)", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(ctx);

    const result = await caller.voices.list();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Sarah");
  });
});
