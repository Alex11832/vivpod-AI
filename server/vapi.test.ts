import { describe, expect, it } from "vitest";

const VAPI_PRIVATE_KEY = process.env.VAPI_PRIVATE_KEY;

describe("Vapi API Integration", () => {
  it("should have VAPI_PRIVATE_KEY environment variable set", () => {
    expect(VAPI_PRIVATE_KEY).toBeDefined();
    expect(VAPI_PRIVATE_KEY).not.toBe("");
  });

  it("should successfully authenticate with Vapi API", async () => {
    if (!VAPI_PRIVATE_KEY) {
      throw new Error("VAPI_PRIVATE_KEY is not set");
    }

    // Call Vapi API to list assistants (lightweight endpoint to validate key)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch("https://api.vapi.ai/assistant", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${VAPI_PRIVATE_KEY}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Should return 200 OK if the key is valid
      expect(response.status).toBe(200);
      
      const data = await response.json();
      // Response should be an array (list of assistants)
      expect(Array.isArray(data)).toBe(true);
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        // Network timeout - skip test but don't fail
        console.log("Vapi API request timed out - skipping");
        return;
      }
      throw error;
    }
  }, 15000); // 15 second timeout for this test
});
