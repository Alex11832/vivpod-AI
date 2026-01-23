import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Mic, MicOff, Volume2, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Vapi from "@vapi-ai/web";

interface VapiWidgetProps {
  assistantId?: string;
  publicKey?: string;
  onCallStart?: () => void;
  onCallEnd?: () => void;
}

// ViVpod Demo Agent ID created in Vapi Dashboard
const VIVPOD_DEMO_ASSISTANT_ID = "dd3b7620-43a7-46f2-bc0e-0690111f6848";
const VAPI_PUBLIC_KEY = "83d326af-b220-4ade-99c1-9cf99081f63e";

// Conversation hints for users
const conversationHints = [
  "How much does ViVpod cost?",
  "What features do I get?",
  "Can you handle healthcare calls?",
  "How does CRM integration work?",
  "What industries do you support?",
  "How do I set up my AI agent?",
];

export function VapiWidget({
  assistantId = VIVPOD_DEMO_ASSISTANT_ID,
  publicKey = VAPI_PUBLIC_KEY,
  onCallStart,
  onCallEnd,
}: VapiWidgetProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<Array<{ role: string; text: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const vapiRef = useRef<Vapi | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Vapi SDK
  useEffect(() => {
    try {
      const vapi = new Vapi(publicKey);
      vapiRef.current = vapi;
      
      vapi.on("call-start", () => {
        console.log("Call started");
        setIsCallActive(true);
        setIsConnecting(false);
        setError(null);
        setShowHints(false);
        onCallStart?.();
      });

      vapi.on("call-end", () => {
        console.log("Call ended");
        setIsCallActive(false);
        setIsConnecting(false);
        setCallDuration(0);
        setShowHints(true);
        onCallEnd?.();
      });

      vapi.on("error", (err: any) => {
        console.error("Vapi error:", err);
        setError(err?.message || "Connection error. Please try again.");
        setIsConnecting(false);
      });

      vapi.on("message", (message: any) => {
        if (message.type === "transcript") {
          setTranscript((prev) => [
            ...prev,
            { role: message.role, text: message.transcript },
          ]);
        }
      });

      vapi.on("speech-start", () => {
        console.log("AI is speaking");
      });

      vapi.on("speech-end", () => {
        console.log("AI stopped speaking");
      });

      setIsReady(true);
      console.log("Vapi SDK initialized successfully");

      return () => {
        vapi.stop();
      };
    } catch (err) {
      console.error("Failed to initialize Vapi:", err);
      setError("Failed to initialize voice system.");
    }
  }, [publicKey, onCallStart, onCallEnd]);

  // Call duration timer
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startCall = useCallback(async () => {
    if (!vapiRef.current || !isReady) {
      setError("Voice system not ready. Please refresh the page.");
      return;
    }

    setIsConnecting(true);
    setTranscript([]);
    setError(null);

    try {
      console.log("Starting call with assistant:", assistantId);
      await vapiRef.current.start(assistantId);
    } catch (err: any) {
      console.error("Failed to start call:", err);
      setError(err?.message || "Failed to connect. Please try again.");
      setIsConnecting(false);
    }
  }, [assistantId, isReady]);

  const endCall = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setIsCallActive(false);
    setIsConnecting(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (vapiRef.current && isCallActive) {
      vapiRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  }, [isCallActive, isMuted]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl border shadow-xl overflow-hidden">
        {/* Header */}
        <div className="gradient-bg p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            {isCallActive ? (
              <div className="relative">
                <Volume2 className="w-10 h-10 text-white animate-pulse" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full pulse-ring" />
              </div>
            ) : (
              <Phone className="w-10 h-10 text-white" />
            )}
          </div>
          <h3 className="text-white text-xl font-bold mb-1">
            {isCallActive ? "Call in Progress" : "Test Our AI Agent"}
          </h3>
          <p className="text-white/80 text-sm">
            {isCallActive
              ? formatDuration(callDuration)
              : "Experience a live demo call"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        {/* Conversation Hints - Show before call starts */}
        {showHints && !isCallActive && !isConnecting && (
          <div className="p-4 bg-muted/30 border-b">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Try asking about:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {conversationHints.map((hint, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-background rounded-full text-xs text-muted-foreground border hover:border-primary/50 transition-colors cursor-default"
                >
                  <MessageCircle className="w-3 h-3" />
                  {hint}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Transcript Area */}
        {(isCallActive || transcript.length > 0) && (
          <div className="p-4 max-h-48 overflow-y-auto bg-muted/30">
            {transcript.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm">
                Listening...
              </p>
            ) : (
              <div className="space-y-2">
                {transcript.slice(-5).map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "text-sm p-2 rounded-lg",
                      item.role === "assistant"
                        ? "bg-primary/10 text-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    <span className="font-medium">
                      {item.role === "assistant" ? "🤖 AI: " : "👤 You: "}
                    </span>
                    {item.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="p-6 flex justify-center gap-4">
          {isCallActive ? (
            <>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-14 h-14"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-destructive" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </Button>
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-14 h-14"
                onClick={endCall}
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="gradient-bg text-white px-8 py-6 text-lg rounded-full hover:opacity-90"
              onClick={startCall}
              disabled={isConnecting || !isReady}
            >
              {isConnecting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Connecting...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5 mr-2" />
                  Start Demo Call
                </>
              )}
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            🎤 Allow microphone access to talk with our AI agent.
            <br />
            Free 30-minute trial for new users.
          </p>
        </div>
      </div>
    </div>
  );
}
