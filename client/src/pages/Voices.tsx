import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

interface Voice {
  id: string;
  name: string;
  gender: "male" | "female";
  description: string;
  tags: string[];
  sampleText: string;
  // Voice characteristics for differentiation
  pitch: number; // 0.5 to 2.0
  rate: number;  // 0.5 to 2.0
}

// American voices only from 11labs (Vapi Voice Library)
// Each voice has unique pitch and rate to sound different
const voices: Voice[] = [
  // Female Voices - American Accent (varied pitch and rate for differentiation)
  { 
    id: "sarah", 
    name: "Sarah", 
    gender: "female", 
    description: "Mature, reassuring, and confident. Perfect for professional customer service.", 
    tags: ["Professional", "Reassuring", "Confident"],
    sampleText: "Hi, thank you for calling. This is Sarah, your AI receptionist. How can I help you today?",
    pitch: 1.0,
    rate: 0.95
  },
  { 
    id: "jessica", 
    name: "Jessica", 
    gender: "female", 
    description: "Playful, bright, and warm. Great for friendly interactions.", 
    tags: ["Playful", "Warm", "Friendly"],
    sampleText: "Hello there! I'm Jessica, and I'm here to help you with anything you need today.",
    pitch: 1.2,
    rate: 1.1
  },
  { 
    id: "olivia", 
    name: "Olivia", 
    gender: "female", 
    description: "Clear and professional. Great for tech companies.", 
    tags: ["Clear", "Professional", "Tech"],
    sampleText: "Good morning! This is Olivia. I'd be happy to assist you with your inquiry.",
    pitch: 1.05,
    rate: 1.0
  },
  { 
    id: "charlotte", 
    name: "Charlotte", 
    gender: "female", 
    description: "Friendly, approachable, and confident. Perfect for retail.", 
    tags: ["Friendly", "Approachable", "Retail"],
    sampleText: "Welcome! I'm Charlotte. Let me know how I can make your experience better today.",
    pitch: 1.15,
    rate: 1.05
  },
  { 
    id: "laura", 
    name: "Laura", 
    gender: "female", 
    description: "Enthusiastic with quirky attitude. Perfect for startups.", 
    tags: ["Enthusiastic", "Quirky", "Startup"],
    sampleText: "Hey! Laura here. Super excited to help you out. What can I do for you?",
    pitch: 1.25,
    rate: 1.15
  },
  { 
    id: "claire", 
    name: "Claire", 
    gender: "female", 
    description: "Middle-aged, fresh, and very realistic. Great for consulting.", 
    tags: ["Realistic", "Fresh", "Consulting"],
    sampleText: "Hello, this is Claire. I'm here to provide you with the information you need.",
    pitch: 0.95,
    rate: 0.9
  },
  { 
    id: "madison", 
    name: "Madison", 
    gender: "female", 
    description: "Snappy and energetic. Ideal for fast-paced businesses.", 
    tags: ["Snappy", "Energetic", "Fast-paced"],
    sampleText: "Hi there! Madison speaking. Let's get you sorted out quickly!",
    pitch: 1.3,
    rate: 1.2
  },
  { 
    id: "glinda", 
    name: "Glinda", 
    gender: "female", 
    description: "Warm and welcoming. Perfect for hospitality.", 
    tags: ["Warm", "Welcoming", "Hospitality"],
    sampleText: "Welcome! I'm Glinda, and it's my pleasure to assist you today.",
    pitch: 1.1,
    rate: 0.95
  },
  { 
    id: "serena", 
    name: "Serena", 
    gender: "female", 
    description: "Calm and soothing. Excellent for healthcare.", 
    tags: ["Calm", "Soothing", "Healthcare"],
    sampleText: "Hello, this is Serena. I'm here to help you with your appointment or questions.",
    pitch: 0.9,
    rate: 0.85
  },
  { 
    id: "kim", 
    name: "Kim", 
    gender: "female", 
    description: "Professional and articulate. Great for legal services.", 
    tags: ["Professional", "Articulate", "Legal"],
    sampleText: "Good day. This is Kim. How may I direct your call today?",
    pitch: 1.0,
    rate: 0.9
  },
  { 
    id: "ava", 
    name: "Ava", 
    gender: "female", 
    description: "Deep and mature. Perfect for executive services.", 
    tags: ["Deep", "Mature", "Executive"],
    sampleText: "Hello, Ava speaking. I'm ready to assist you with your business needs.",
    pitch: 0.85,
    rate: 0.9
  },
  { 
    id: "domi", 
    name: "Domi", 
    gender: "female", 
    description: "Youthful and dynamic. Great for modern brands.", 
    tags: ["Youthful", "Dynamic", "Modern"],
    sampleText: "Hey! This is Domi. What can I help you with today?",
    pitch: 1.35,
    rate: 1.1
  },
  { 
    id: "brianna", 
    name: "Brianna", 
    gender: "female", 
    description: "Excited and friendly. Perfect for customer engagement.", 
    tags: ["Excited", "Friendly", "Engaging"],
    sampleText: "Hi! I'm Brianna, and I'm so happy to help you today!",
    pitch: 1.4,
    rate: 1.15
  },
  { 
    id: "catherine", 
    name: "Catherine Rose", 
    gender: "female", 
    description: "Elegant and refined. Ideal for luxury services.", 
    tags: ["Elegant", "Refined", "Luxury"],
    sampleText: "Good afternoon. This is Catherine Rose. How may I be of service?",
    pitch: 0.95,
    rate: 0.85
  },
  { 
    id: "chelsea", 
    name: "Chelsea", 
    gender: "female", 
    description: "Friendly, approachable, confident. Great for general business.", 
    tags: ["Friendly", "Approachable", "Confident"],
    sampleText: "Hello! Chelsea here. I'm ready to help you with whatever you need.",
    pitch: 1.1,
    rate: 1.0
  },
  // Male Voices - American Accent (varied pitch and rate for differentiation)
  { 
    id: "brian", 
    name: "Brian", 
    gender: "male", 
    description: "Deep, resonant, and comforting. Ideal for business communications.", 
    tags: ["Deep", "Comforting", "Business"],
    sampleText: "Hello, this is Brian. Thank you for calling. How can I assist you today?",
    pitch: 0.7,
    rate: 0.9
  },
  { 
    id: "chris", 
    name: "Chris", 
    gender: "male", 
    description: "Charming and down-to-earth. Perfect for casual services.", 
    tags: ["Charming", "Down-to-earth", "Casual"],
    sampleText: "Hey there! Chris here. What can I do for you today?",
    pitch: 0.9,
    rate: 1.05
  },
  { 
    id: "eric", 
    name: "Eric", 
    gender: "male", 
    description: "Smooth and trustworthy. Excellent for legal services.", 
    tags: ["Smooth", "Trustworthy", "Legal"],
    sampleText: "Good morning. This is Eric. I'm here to help with your inquiry.",
    pitch: 0.8,
    rate: 0.9
  },
  { 
    id: "sam", 
    name: "Sam", 
    gender: "male", 
    description: "Friendly and approachable. Great for general business.", 
    tags: ["Friendly", "Approachable", "General"],
    sampleText: "Hi! Sam speaking. How can I help you out today?",
    pitch: 0.95,
    rate: 1.0
  },
  { 
    id: "christopher", 
    name: "Christopher", 
    gender: "male", 
    description: "Professional and clear. Perfect for corporate services.", 
    tags: ["Professional", "Clear", "Corporate"],
    sampleText: "Hello, Christopher speaking. How may I direct your call?",
    pitch: 0.75,
    rate: 0.85
  },
  { 
    id: "dylan", 
    name: "Dylan", 
    gender: "male", 
    description: "Confident and energetic. Great for sales.", 
    tags: ["Confident", "Energetic", "Sales"],
    sampleText: "Hey! Dylan here. Excited to help you find what you're looking for!",
    pitch: 1.0,
    rate: 1.15
  },
  { 
    id: "cole", 
    name: "Cole", 
    gender: "male", 
    description: "Gritty, rough, and strong. Perfect for trades and construction.", 
    tags: ["Gritty", "Strong", "Trades"],
    sampleText: "Hey, Cole here. What project can I help you with today?",
    pitch: 0.65,
    rate: 0.95
  },
  { 
    id: "clyde", 
    name: "Clyde", 
    gender: "male", 
    description: "Warm and personable. Great for home services.", 
    tags: ["Warm", "Personable", "Home Services"],
    sampleText: "Hello! This is Clyde. I'm here to help with your home service needs.",
    pitch: 0.85,
    rate: 0.95
  },
  { 
    id: "jessie", 
    name: "Jessie", 
    gender: "male", 
    description: "Casual and relatable. Perfect for local businesses.", 
    tags: ["Casual", "Relatable", "Local"],
    sampleText: "Hey there! Jessie here. What can I do for you?",
    pitch: 0.9,
    rate: 1.0
  },
  { 
    id: "benji", 
    name: "Benji", 
    gender: "male", 
    description: "Young and enthusiastic. Great for tech startups.", 
    tags: ["Young", "Enthusiastic", "Tech"],
    sampleText: "Hi! Benji here. Ready to help you with anything you need!",
    pitch: 1.1,
    rate: 1.2
  },
  { 
    id: "benjamin", 
    name: "Benjamin", 
    gender: "male", 
    description: "Deep, warm, and calming. Ideal for professional services.", 
    tags: ["Deep", "Warm", "Calming"],
    sampleText: "Good day. This is Benjamin. How may I assist you?",
    pitch: 0.7,
    rate: 0.85
  },
  { 
    id: "mark", 
    name: "Mark", 
    gender: "male", 
    description: "Conversational AI optimized. Perfect for virtual assistants.", 
    tags: ["Conversational", "AI-optimized", "Assistant"],
    sampleText: "Hello! Mark here. I'm your AI assistant. How can I help?",
    pitch: 0.85,
    rate: 1.0
  },
  { 
    id: "paxton", 
    name: "Paxton", 
    gender: "male", 
    description: "Bold and confident. Great for marketing.", 
    tags: ["Bold", "Confident", "Marketing"],
    sampleText: "Hey! Paxton Ballard here. Let's make something great happen!",
    pitch: 0.8,
    rate: 1.1
  },
  { 
    id: "jerry", 
    name: "Jerry", 
    gender: "male", 
    description: "Energetic and upbeat. Perfect for entertainment.", 
    tags: ["Energetic", "Upbeat", "Entertainment"],
    sampleText: "Hey hey! Jerry here! What exciting thing can I help you with?",
    pitch: 1.05,
    rate: 1.25
  },
  { 
    id: "faisal", 
    name: "Faisal", 
    gender: "male", 
    description: "Clear and professional. Great for international business.", 
    tags: ["Clear", "Professional", "International"],
    sampleText: "Hello, this is Faisal. I'm here to assist you with your needs.",
    pitch: 0.9,
    rate: 0.95
  },
];

export default function Voices() {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "male" | "female">("all");
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const systemVoices = window.speechSynthesis.getVoices();
      setAvailableVoices(systemVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const filteredVoices = voices.filter((voice) => {
    if (filter === "all") return true;
    return voice.gender === filter;
  });

  // Get a specific voice based on index to ensure variety
  const getVoiceForCharacter = (voice: Voice, index: number): SpeechSynthesisVoice | null => {
    const englishVoices = availableVoices.filter(v => v.lang.startsWith('en'));
    
    if (englishVoices.length === 0) return null;
    
    // Separate by gender-sounding names
    const femaleVoiceNames = ['samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona', 'veena', 'zira', 'hazel', 'susan', 'linda', 'catherine', 'allison'];
    const maleVoiceNames = ['daniel', 'alex', 'fred', 'thomas', 'oliver', 'david', 'mark', 'james', 'richard', 'george'];
    
    const femaleVoices = englishVoices.filter(v => {
      const name = v.name.toLowerCase();
      return femaleVoiceNames.some(fn => name.includes(fn)) || 
             (name.includes('female') || (!maleVoiceNames.some(mn => name.includes(mn)) && !name.includes('male')));
    });
    
    const maleVoices = englishVoices.filter(v => {
      const name = v.name.toLowerCase();
      return maleVoiceNames.some(mn => name.includes(mn)) || name.includes('male');
    });
    
    // Select voice based on gender and use index for variety
    if (voice.gender === 'female' && femaleVoices.length > 0) {
      return femaleVoices[index % femaleVoices.length];
    } else if (voice.gender === 'male' && maleVoices.length > 0) {
      return maleVoices[index % maleVoices.length];
    }
    
    // Fallback: use any English voice with index rotation
    return englishVoices[index % englishVoices.length];
  };

  const handlePlaySample = (voice: Voice, index: number) => {
    // If already playing this voice, stop it
    if (playingVoice === voice.id) {
      window.speechSynthesis.cancel();
      setPlayingVoice(null);
      return;
    }

    // Stop any current playback
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(voice.sampleText);
    speechRef.current = utterance;

    // Get voice for this character
    const selectedVoice = getVoiceForCharacter(voice, index);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Apply unique pitch and rate for each voice
    utterance.pitch = voice.pitch;
    utterance.rate = voice.rate;

    utterance.onend = () => {
      setPlayingVoice(null);
    };

    utterance.onerror = () => {
      setPlayingVoice(null);
    };

    setPlayingVoice(voice.id);
    window.speechSynthesis.speak(utterance);
  };

  const stopPlayback = () => {
    window.speechSynthesis.cancel();
    setPlayingVoice(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 gradient-bg-subtle">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Voice Library
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Choose from our collection of natural, professional AI voices powered by ElevenLabs. 
              All voices feature authentic American accents optimized for business communications.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              <strong>Note:</strong> Voice previews use your browser's text-to-speech with varied pitch and speed. 
              Actual AI agent voices are powered by premium ElevenLabs technology with superior quality.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All Voices ({voices.length})
              </Button>
              <Button
                variant={filter === "female" ? "default" : "outline"}
                onClick={() => setFilter("female")}
              >
                Female ({voices.filter(v => v.gender === "female").length})
              </Button>
              <Button
                variant={filter === "male" ? "default" : "outline"}
                onClick={() => setFilter("male")}
              >
                Male ({voices.filter(v => v.gender === "male").length})
              </Button>
            </div>
          </div>
        </section>

        {/* Currently Playing Banner */}
        {playingVoice && (
          <div className="sticky top-16 z-40 bg-primary text-primary-foreground py-3">
            <div className="container flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span className="font-medium">
                  Now playing: {voices.find(v => v.id === playingVoice)?.name}
                </span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={stopPlayback}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </div>
          </div>
        )}

        {/* Voice Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVoices.map((voice, index) => (
                <Card 
                  key={voice.id} 
                  className={`group hover:shadow-lg transition-all ${
                    playingVoice === voice.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                        playingVoice === voice.id 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-gradient-to-br from-primary/20 to-accent/20"
                      }`}>
                        {playingVoice === voice.id ? (
                          <Volume2 className="w-6 h-6 animate-pulse" />
                        ) : (
                          voice.gender === "female" ? "👩" : "👨"
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        American
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{voice.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {voice.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {voice.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant={playingVoice === voice.id ? "default" : "outline"}
                      className="w-full gap-2"
                      onClick={() => handlePlaySample(voice, index)}
                    >
                      {playingVoice === voice.id ? (
                        <>
                          <Square className="w-4 h-4" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play Sample
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Give Your Business a Voice?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your free trial and discover how our AI receptionist can transform your customer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" className="gradient-bg text-white">
                  Get a Demo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  See Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
