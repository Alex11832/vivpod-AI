/**
 * Vapi AI Voice API Integration
 * 
 * This module provides server-side functions for interacting with the Vapi API
 * to manage AI voice assistants, generate voice samples, and handle calls.
 */

const VAPI_API_URL = "https://api.vapi.ai";
const VAPI_PRIVATE_KEY = process.env.VAPI_PRIVATE_KEY;

interface VapiVoice {
  voiceId: string;
  provider: string;
  name?: string;
}

interface VapiAssistant {
  id: string;
  name: string;
  voice?: VapiVoice;
  model?: {
    provider: string;
    model: string;
    systemPrompt?: string;
  };
  firstMessage?: string;
  transcriber?: {
    provider: string;
    model?: string;
    language?: string;
  };
}

interface CreateAssistantParams {
  name: string;
  systemPrompt: string;
  firstMessage: string;
  voiceId?: string;
  voiceProvider?: string;
}

/**
 * Make authenticated request to Vapi API
 */
async function vapiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!VAPI_PRIVATE_KEY) {
    throw new Error("VAPI_PRIVATE_KEY is not configured");
  }

  const response = await fetch(`${VAPI_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${VAPI_PRIVATE_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Vapi API error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * List all assistants
 */
export async function listAssistants(): Promise<VapiAssistant[]> {
  return vapiRequest<VapiAssistant[]>("/assistant");
}

/**
 * Get a specific assistant by ID
 */
export async function getAssistant(assistantId: string): Promise<VapiAssistant> {
  return vapiRequest<VapiAssistant>(`/assistant/${assistantId}`);
}

/**
 * Create a new assistant
 */
export async function createAssistant(params: CreateAssistantParams): Promise<VapiAssistant> {
  const body = {
    name: params.name,
    model: {
      provider: "openai",
      model: "gpt-4o-mini",
      systemPrompt: params.systemPrompt,
    },
    voice: {
      provider: params.voiceProvider || "11labs",
      voiceId: params.voiceId || "21m00Tcm4TlvDq8ikWAM", // Default: Rachel
    },
    firstMessage: params.firstMessage,
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en",
    },
  };

  return vapiRequest<VapiAssistant>("/assistant", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * Update an existing assistant
 */
export async function updateAssistant(
  assistantId: string,
  updates: Partial<CreateAssistantParams>
): Promise<VapiAssistant> {
  const body: Record<string, unknown> = {};

  if (updates.name) body.name = updates.name;
  if (updates.systemPrompt) {
    body.model = {
      provider: "openai",
      model: "gpt-4o-mini",
      systemPrompt: updates.systemPrompt,
    };
  }
  if (updates.voiceId) {
    body.voice = {
      provider: updates.voiceProvider || "11labs",
      voiceId: updates.voiceId,
    };
  }
  if (updates.firstMessage) body.firstMessage = updates.firstMessage;

  return vapiRequest<VapiAssistant>(`/assistant/${assistantId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

/**
 * Delete an assistant
 */
export async function deleteAssistant(assistantId: string): Promise<void> {
  await vapiRequest(`/assistant/${assistantId}`, {
    method: "DELETE",
  });
}

/**
 * Available voice options from ElevenLabs
 * These are pre-selected voices that work well for business calls
 */
export const AVAILABLE_VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel", gender: "female", accent: "US English", description: "Warm and professional", provider: "11labs" },
  { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi", gender: "female", accent: "US English", description: "Confident and clear", provider: "11labs" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella", gender: "female", accent: "US English", description: "Soft and friendly", provider: "11labs" },
  { id: "ErXwobaYiN019PkySvjV", name: "Antoni", gender: "male", accent: "US English", description: "Warm and trustworthy", provider: "11labs" },
  { id: "MF3mGyEYCl7XYWbV9V6O", name: "Elli", gender: "female", accent: "US English", description: "Youthful and energetic", provider: "11labs" },
  { id: "TxGEqnHWrfWFTfGW9XjX", name: "Josh", gender: "male", accent: "US English", description: "Deep and authoritative", provider: "11labs" },
  { id: "VR6AewLTigWG4xSOukaG", name: "Arnold", gender: "male", accent: "US English", description: "Mature and confident", provider: "11labs" },
  { id: "pNInz6obpgDQGcFmaJgB", name: "Adam", gender: "male", accent: "US English", description: "Clear and professional", provider: "11labs" },
  { id: "yoZ06aMxZJJ28mfd3POQ", name: "Sam", gender: "male", accent: "US English", description: "Calm and reassuring", provider: "11labs" },
  { id: "jBpfuIE2acCO8z3wKNLl", name: "Gigi", gender: "female", accent: "US English", description: "Bright and cheerful", provider: "11labs" },
  { id: "oWAxZDx7w5VEj9dCyTzz", name: "Grace", gender: "female", accent: "US English", description: "Elegant and sophisticated", provider: "11labs" },
  { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel", gender: "male", accent: "British English", description: "Distinguished and refined", provider: "11labs" },
];

/**
 * Get voice sample text based on company name
 */
export function getVoiceSampleText(companyName: string = "your company"): string {
  return `Thank you for calling ${companyName}. How can I help you today?`;
}
