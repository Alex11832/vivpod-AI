import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import * as vapi from "./vapi";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Agent management
  agents: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getAgentsByUserId(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        return db.getAgentById(input.id, ctx.user.id);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        voiceId: z.string(),
        voiceName: z.string().optional(),
        voiceProvider: z.string().optional(),
        industry: z.string().optional(),
        subCategories: z.array(z.string()).optional(),
        systemPrompt: z.string().optional(),
        firstMessage: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Create Vapi assistant
        let vapiAssistantId: string | undefined;
        try {
          const vapiAssistant = await vapi.createAssistant({
            name: input.name,
            systemPrompt: input.systemPrompt || "You are a helpful AI receptionist.",
            firstMessage: input.firstMessage || "Hello, thank you for calling. How can I help you today?",
            voiceId: input.voiceId,
            voiceProvider: input.voiceProvider,
          });
          vapiAssistantId = vapiAssistant.id;
        } catch (error) {
          console.error("Failed to create Vapi assistant:", error);
          // Continue without Vapi - agent will be created locally
        }

        // Create agent in database
        const agent = await db.createAgent({
          userId: ctx.user.id,
          vapiAssistantId,
          name: input.name,
          voiceId: input.voiceId,
          voiceName: input.voiceName,
          voiceProvider: input.voiceProvider || "11labs",
          industry: input.industry,
          subCategories: input.subCategories,
          systemPrompt: input.systemPrompt,
          firstMessage: input.firstMessage,
          status: "draft",
        });

        return agent;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        voiceId: z.string().optional(),
        voiceName: z.string().optional(),
        voiceProvider: z.string().optional(),
        systemPrompt: z.string().optional(),
        firstMessage: z.string().optional(),
        status: z.enum(["active", "paused", "draft"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...updates } = input;
        
        // Get existing agent to find Vapi ID
        const existing = await db.getAgentById(id, ctx.user.id);
        if (!existing) {
          throw new Error("Agent not found");
        }

        // Update Vapi assistant if exists
        if (existing.vapiAssistantId) {
          try {
            await vapi.updateAssistant(existing.vapiAssistantId, {
              name: updates.name,
              systemPrompt: updates.systemPrompt,
              firstMessage: updates.firstMessage,
              voiceId: updates.voiceId,
              voiceProvider: updates.voiceProvider,
            });
          } catch (error) {
            console.error("Failed to update Vapi assistant:", error);
          }
        }

        return db.updateAgent(id, ctx.user.id, updates);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Get agent to find Vapi ID
        const agent = await db.getAgentById(input.id, ctx.user.id);
        if (agent?.vapiAssistantId) {
          try {
            await vapi.deleteAssistant(agent.vapiAssistantId);
          } catch (error) {
            console.error("Failed to delete Vapi assistant:", error);
          }
        }

        return db.deleteAgent(input.id, ctx.user.id);
      }),
  }),

  // Call logs
  calls: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ ctx, input }) => {
        return db.getCallLogsByUserId(ctx.user.id, input?.limit || 50);
      }),

    byAgent: protectedProcedure
      .input(z.object({ agentId: z.number(), limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        // Verify agent belongs to user
        const agent = await db.getAgentById(input.agentId, ctx.user.id);
        if (!agent) {
          throw new Error("Agent not found");
        }
        return db.getCallLogsByAgentId(input.agentId, input.limit || 50);
      }),
  }),

  // User settings
  settings: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserSettings(ctx.user.id);
    }),

    update: protectedProcedure
      .input(z.object({
        timezone: z.string().optional(),
        emailSummary: z.boolean().optional(),
        emailMissedCalls: z.boolean().optional(),
        emailWeeklyReport: z.boolean().optional(),
        telegramEnabled: z.boolean().optional(),
        telegramChatId: z.string().optional(),
        googleCalendarConnected: z.boolean().optional(),
        hubspotConnected: z.boolean().optional(),
        hubspotApiKey: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return db.upsertUserSettings(ctx.user.id, input);
      }),
  }),

  // Voice options
  voices: router({
    list: publicProcedure.query(() => {
      return vapi.AVAILABLE_VOICES;
    }),
  }),
});

export type AppRouter = typeof appRouter;
