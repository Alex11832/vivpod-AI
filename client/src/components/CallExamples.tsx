import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, RotateCcw, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallExample {
  id: string;
  industry: string;
  icon: string;
  title: string;
  scenario: string;
  conversation: Array<{
    role: "ai" | "customer";
    text: string;
    delay?: number;
  }>;
}

const callExamples: CallExample[] = [
  {
    id: "handyman",
    industry: "Handyman",
    icon: "🔧",
    title: "TV Mounting Service",
    scenario: "Customer calls to schedule a TV mounting appointment",
    conversation: [
      { role: "ai", text: "Thank you for calling Mike's Handyman Services. This is Sarah, your AI receptionist. How can I help you today?", delay: 0 },
      { role: "customer", text: "Hi, I need someone to mount my TV on the wall.", delay: 2500 },
      { role: "ai", text: "I'd be happy to help you schedule a TV mounting appointment. What size is your TV, and do you have the wall mount already?", delay: 2000 },
      { role: "customer", text: "It's a 65-inch Samsung. Yes, I bought the mount from Amazon.", delay: 3000 },
      { role: "ai", text: "Perfect, 65-inch with your own mount. Our TV mounting service is $89 for TVs up to 70 inches. We have availability tomorrow between 2-4 PM or Thursday morning at 10 AM. Which works better for you?", delay: 2500 },
      { role: "customer", text: "Tomorrow afternoon works great.", delay: 2000 },
      { role: "ai", text: "Excellent! I've booked Mike for tomorrow between 2-4 PM. Can I get your address and phone number for the appointment?", delay: 2000 },
      { role: "customer", text: "Sure, it's 425 Oak Street, Apartment 3B. Phone is 555-0147.", delay: 3000 },
      { role: "ai", text: "Got it. 425 Oak Street, Apartment 3B. You'll receive a confirmation text shortly. Is there anything else I can help with?", delay: 2500 },
      { role: "customer", text: "No, that's all. Thanks!", delay: 1500 },
      { role: "ai", text: "You're welcome! Have a great day, and we'll see you tomorrow.", delay: 1500 },
    ],
  },
  {
    id: "cleaning",
    industry: "Cleaning",
    icon: "🧹",
    title: "Deep Cleaning Booking",
    scenario: "Customer requests a deep cleaning service for their home",
    conversation: [
      { role: "ai", text: "Hello, Sparkle Clean Services. I'm Emma, your AI assistant. How may I help you today?", delay: 0 },
      { role: "customer", text: "Hi, I need a deep cleaning for my apartment. I'm moving out next week.", delay: 2500 },
      { role: "ai", text: "I can definitely help with a move-out deep cleaning. How many bedrooms and bathrooms does your apartment have?", delay: 2000 },
      { role: "customer", text: "It's a 2-bedroom, 2-bathroom.", delay: 2000 },
      { role: "ai", text: "Great. Our move-out deep cleaning for a 2BR/2BA is $249, which includes inside appliances, baseboards, and windows. When do you need to be out?", delay: 2500 },
      { role: "customer", text: "By next Friday. Can you do it Wednesday?", delay: 2500 },
      { role: "ai", text: "Let me check Wednesday... Yes, we have a team available at 9 AM. The cleaning typically takes 4-5 hours. Does that work?", delay: 2500 },
      { role: "customer", text: "Perfect. Let's book it.", delay: 1500 },
      { role: "ai", text: "Done! Wednesday at 9 AM for move-out deep cleaning. I'll send you a confirmation email with the details. Anything else?", delay: 2500 },
      { role: "customer", text: "Do I need to be there?", delay: 2000 },
      { role: "ai", text: "You can let us in and leave, or provide a lockbox code. We'll text you photos when complete.", delay: 2500 },
    ],
  },
  {
    id: "restaurant",
    industry: "Restaurant",
    icon: "🍽️",
    title: "Table Reservation",
    scenario: "Customer makes a dinner reservation for a special occasion",
    conversation: [
      { role: "ai", text: "Good evening, Bella Italia Restaurant. I'm Sofia, how can I help you tonight?", delay: 0 },
      { role: "customer", text: "Hi, I'd like to make a reservation for my wife's birthday dinner.", delay: 2500 },
      { role: "ai", text: "How lovely! Happy birthday to her. For how many guests, and what date and time were you thinking?", delay: 2000 },
      { role: "customer", text: "Party of 6, this Saturday at 7 PM.", delay: 2500 },
      { role: "ai", text: "Let me check Saturday at 7... I have a table available at 7:15 PM. Would that work?", delay: 2500 },
      { role: "customer", text: "7:15 is fine.", delay: 1500 },
      { role: "ai", text: "Perfect! I have you down for 6 guests, Saturday at 7:15 PM. May I have a name for the reservation?", delay: 2000 },
      { role: "customer", text: "Thompson.", delay: 1500 },
      { role: "ai", text: "Thompson, party of 6. Since it's a birthday, would you like us to prepare a complimentary dessert with a candle?", delay: 3000 },
      { role: "customer", text: "Yes! That would be amazing.", delay: 2000 },
      { role: "ai", text: "Wonderful! I've noted the birthday dessert. We'll see you Saturday, Mr. Thompson!", delay: 2500 },
    ],
  },
  {
    id: "pharmacy",
    industry: "Pharmacy",
    icon: "💊",
    title: "Prescription Refill",
    scenario: "Customer calls to refill their prescription medication",
    conversation: [
      { role: "ai", text: "Thank you for calling HealthFirst Pharmacy. I'm Alex, your virtual assistant. How can I help you today?", delay: 0 },
      { role: "customer", text: "I need to refill my blood pressure medication.", delay: 2500 },
      { role: "ai", text: "I can help with that. Would you like me to look it up by your name and date of birth?", delay: 2000 },
      { role: "customer", text: "Sure. Sarah Miller, March 15, 1985.", delay: 3000 },
      { role: "ai", text: "Thank you, Sarah. I see you have Lisinopril 10mg with 2 refills remaining. Would you like me to process that refill now?", delay: 2500 },
      { role: "customer", text: "Yes, please. When will it be ready?", delay: 2000 },
      { role: "ai", text: "I've submitted the refill. It will be ready in about 2 hours, by 3 PM today. Would you like a text notification?", delay: 2500 },
      { role: "customer", text: "Yes, that would be great.", delay: 1500 },
      { role: "ai", text: "Perfect. Your copay will be $12. Is there anything else I can help with?", delay: 2500 },
      { role: "customer", text: "No, that's everything. Thank you!", delay: 1500 },
      { role: "ai", text: "You're welcome, Sarah. Have a great day!", delay: 1500 },
    ],
  },
  {
    id: "legal",
    industry: "Law Firm",
    icon: "⚖️",
    title: "Legal Consultation",
    scenario: "Potential client inquires about a personal injury case",
    conversation: [
      { role: "ai", text: "Good afternoon, Morrison & Associates Law Firm. I'm Rachel, your virtual receptionist. How may I help you?", delay: 0 },
      { role: "customer", text: "I was in a car accident and need to speak with a lawyer.", delay: 2500 },
      { role: "ai", text: "I'm sorry to hear about your accident. Our personal injury attorneys offer free initial consultations. May I gather some information?", delay: 2500 },
      { role: "customer", text: "Sure, go ahead.", delay: 1500 },
      { role: "ai", text: "Thank you. When did the accident occur, and were you the driver or passenger?", delay: 2000 },
      { role: "customer", text: "Two weeks ago. I was driving, and someone ran a red light and hit me.", delay: 3000 },
      { role: "ai", text: "I understand. Were there any injuries, and have you received medical treatment?", delay: 2000 },
      { role: "customer", text: "Yes, I hurt my back and neck. I've been to the ER.", delay: 3000 },
      { role: "ai", text: "Attorney Davis specializes in auto accidents. He has availability tomorrow at 3 PM. Would that work?", delay: 3000 },
      { role: "customer", text: "Tomorrow at 3 works.", delay: 1500 },
      { role: "ai", text: "Perfect. Please bring any accident reports and medical records. Can I get your name and callback number?", delay: 3000 },
    ],
  },
  {
    id: "realestate",
    industry: "Real Estate",
    icon: "🏠",
    title: "Property Viewing",
    scenario: "Buyer inquires about scheduling a property viewing",
    conversation: [
      { role: "ai", text: "Hello, Premier Realty Group. I'm Maya, your virtual assistant. How can I help you find your perfect home?", delay: 0 },
      { role: "customer", text: "I saw a listing on Zillow for a house on Oak Street. Is it still available?", delay: 2500 },
      { role: "ai", text: "Let me check. Is it the 4-bedroom colonial at 245 Oak Street, listed at $485,000?", delay: 2500 },
      { role: "customer", text: "Yes, that's the one!", delay: 1500 },
      { role: "ai", text: "Great news - it's still available! It features 4 bedrooms, 2.5 baths, and a renovated kitchen. Would you like to schedule a viewing?", delay: 3000 },
      { role: "customer", text: "Definitely. Can I see it this weekend?", delay: 2000 },
      { role: "ai", text: "We can show it Saturday at 11 AM or Sunday at 2 PM. Which would you prefer?", delay: 2500 },
      { role: "customer", text: "Saturday at 11 works for me.", delay: 1500 },
      { role: "ai", text: "Excellent! Agent Jennifer Martinez will meet you at the property. May I have your name and phone number?", delay: 3000 },
      { role: "customer", text: "David Chen, 555-0892.", delay: 2000 },
      { role: "ai", text: "Thank you, David. You're all set for Saturday at 11 AM. Jennifer will reach out to confirm!", delay: 3000 },
    ],
  },
];

// Speech synthesis helper
function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);

  const getVoice = useCallback((role: "ai" | "customer") => {
    // Try to find good voices for each role
    const enVoices = voices.filter(v => v.lang.startsWith("en"));
    
    if (role === "ai") {
      // Prefer female voices for AI
      const femaleVoice = enVoices.find(v => 
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("karen") ||
        v.name.toLowerCase().includes("victoria") ||
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("susan")
      );
      return femaleVoice || enVoices[0] || voices[0];
    } else {
      // Prefer male voices for customer
      const maleVoice = enVoices.find(v => 
        v.name.toLowerCase().includes("daniel") ||
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("alex") ||
        v.name.toLowerCase().includes("male") ||
        v.name.toLowerCase().includes("mark")
      );
      return maleVoice || enVoices[1] || enVoices[0] || voices[0];
    }
  }, [voices]);

  const speak = useCallback((text: string, role: "ai" | "customer"): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!isSupported) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      const voice = getVoice(role);
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.rate = role === "ai" ? 1.0 : 1.1;
      utterance.pitch = role === "ai" ? 1.1 : 0.95;
      utterance.volume = 1;

      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        if (e.error !== "interrupted") {
          reject(e);
        } else {
          resolve();
        }
      };

      window.speechSynthesis.speak(utterance);
    });
  }, [isSupported, getVoice]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
  }, [isSupported]);

  return { speak, stop, isSupported, voices };
}

export function CallExamples() {
  const [activeExample, setActiveExample] = useState(callExamples[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeaking, setCurrentSpeaking] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  
  const { speak, stop, isSupported } = useSpeechSynthesis();

  // Play message with speech
  const playMessage = useCallback(async (index: number) => {
    if (!playingRef.current) return;
    
    const message = activeExample.conversation[index];
    if (!message) {
      setIsPlaying(false);
      setIsAutoPlaying(false);
      playingRef.current = false;
      return;
    }

    setVisibleMessages(index + 1);
    setCurrentSpeaking(index);

    // Scroll to bottom
    if (conversationRef.current) {
      setTimeout(() => {
        conversationRef.current?.scrollTo({
          top: conversationRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }

    // Speak if not muted
    if (!isMuted && isSupported) {
      try {
        await speak(message.text, message.role);
      } catch (e) {
        console.log("Speech interrupted");
      }
    } else {
      // Wait for the delay if muted
      await new Promise(resolve => setTimeout(resolve, message.delay || 2000));
    }

    setCurrentSpeaking(null);

    // Play next message
    if (playingRef.current && index < activeExample.conversation.length - 1) {
      // Small pause between messages
      await new Promise(resolve => setTimeout(resolve, 500));
      playMessage(index + 1);
    } else {
      setIsPlaying(false);
      setIsAutoPlaying(false);
      playingRef.current = false;
    }
  }, [activeExample, isMuted, isSupported, speak]);

  const handleTabChange = (example: CallExample) => {
    stop();
    playingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveExample(example);
    setVisibleMessages(0);
    setIsPlaying(false);
    setIsAutoPlaying(false);
    setCurrentSpeaking(null);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause
      stop();
      playingRef.current = false;
      setIsPlaying(false);
      setIsAutoPlaying(false);
      setCurrentSpeaking(null);
    } else {
      // Play
      playingRef.current = true;
      setIsPlaying(true);
      setIsAutoPlaying(true);
      const startIndex = visibleMessages > 0 ? visibleMessages : 0;
      playMessage(startIndex);
    }
  };

  const handleRestart = () => {
    stop();
    playingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisibleMessages(0);
    setIsPlaying(false);
    setIsAutoPlaying(false);
    setCurrentSpeaking(null);
  };

  const toggleMute = () => {
    if (!isMuted) {
      stop();
    }
    setIsMuted(!isMuted);
  };

  const showAllMessages = () => {
    stop();
    playingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisibleMessages(activeExample.conversation.length);
    setIsPlaying(false);
    setIsAutoPlaying(false);
    setCurrentSpeaking(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
      playingRef.current = false;
    };
  }, [stop]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Industry Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {callExamples.map((example) => (
          <button
            key={example.id}
            onClick={() => handleTabChange(example)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeExample.id === example.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            )}
          >
            <span>{example.icon}</span>
            <span className="hidden sm:inline">{example.industry}</span>
          </button>
        ))}
      </div>

      {/* Call Simulation Card */}
      <div className="bg-card rounded-2xl border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="gradient-bg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              ) : (
                <span className="text-xl">{activeExample.icon}</span>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold">{activeExample.title}</h3>
              <p className="text-white/80 text-sm">{activeExample.scenario}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRestart}
              disabled={visibleMessages === 0}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>

        {/* Conversation */}
        <div 
          ref={conversationRef}
          className="p-6 space-y-4 max-h-[450px] overflow-y-auto scroll-smooth"
        >
          {visibleMessages === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Volume2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Press Play to Start</p>
              <p className="text-sm">Watch how our AI handles a real {activeExample.industry.toLowerCase()} call</p>
              {isSupported && (
                <p className="text-xs mt-2 text-muted-foreground/70">
                  🔊 Audio enabled - hear the conversation
                </p>
              )}
            </div>
          ) : (
            activeExample.conversation.slice(0, visibleMessages).map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                  message.role === "ai" ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm transition-all",
                    message.role === "ai"
                      ? "bg-primary text-primary-foreground rounded-bl-sm"
                      : "bg-secondary text-secondary-foreground rounded-br-sm",
                    currentSpeaking === index && "ring-2 ring-yellow-400 ring-offset-2"
                  )}
                >
                  <p className="text-xs font-medium mb-1 opacity-70">
                    {message.role === "ai" ? "🤖 AI Receptionist" : "👤 Caller"}
                  </p>
                  {message.text}
                </div>
              </div>
            ))
          )}
          
          {/* Typing indicator */}
          {isAutoPlaying && visibleMessages > 0 && visibleMessages < activeExample.conversation.length && !currentSpeaking && (
            <div className={cn(
              "flex",
              activeExample.conversation[visibleMessages]?.role === "ai" ? "justify-start" : "justify-end"
            )}>
              <div className={cn(
                "rounded-2xl px-4 py-3",
                activeExample.conversation[visibleMessages]?.role === "ai"
                  ? "bg-primary/20 rounded-bl-sm"
                  : "bg-secondary/50 rounded-br-sm"
              )}>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show All Button */}
        {visibleMessages > 0 && visibleMessages < activeExample.conversation.length && !isAutoPlaying && (
          <div className="px-6 pb-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={showAllMessages}
            >
              Show full conversation ({activeExample.conversation.length - visibleMessages} more messages)
            </Button>
          </div>
        )}

        {/* Completion Message */}
        {visibleMessages >= activeExample.conversation.length && (
          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              ✅ Call completed successfully
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Replay
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
