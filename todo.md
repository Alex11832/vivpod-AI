# ViVpod Project TODO

## Landing Page
- [x] Hero section with interactive call examples (like Smith.ai)
- [x] Call examples for: Handyman, Cleaning, Restaurant/Food, Pharmacy, Law Firm, Real Estate
- [x] "Test Your AI Agent" widget with Vapi integration
- [x] Social proof section with metrics
- [x] How it works section (3 steps)
- [x] Use cases section with industry cards
- [x] Features grid
- [x] Integrations section (Telegram, Email, Google Calendar, HubSpot, Salesforce, Zapier)
- [x] Pricing section (3 tiers + 30-min free trial)
- [x] FAQ section
- [x] Testimonials section
- [x] Security & Compliance section
- [x] Final CTA banner
- [x] Sticky mobile CTA bar

## Voice Samples Page
- [x] Voice library grid with audio playback
- [x] Voice categories and filtering
- [x] Voice preview with company name placeholder

## User Dashboard
- [x] User registration (name, surname, phone, company, email)
- [x] Voice selection after registration
- [x] AI assistant templates by industry (Handyman, Cleaning, etc.)
- [x] Sub-templates (e.g., Handyman → TV mounting, Furniture assembly, Wall hanging)
- [x] Editable prompt for each template
- [x] Call history with analytics
- [x] Agent configuration panel
- [x] Chat simulation for testing

## Integrations
- [x] Telegram integration (live)
- [x] Google Calendar integration (live)
- [x] HubSpot integration (live)
- [x] Email integration (placeholder)
- [x] Salesforce integration (placeholder)
- [x] Zapier integration (placeholder)

## Legal & Compliance
- [x] Cookie consent banner
- [x] Privacy Policy page
- [x] Terms of Service page
- [x] 404 page

## Mobile & UX
- [x] Mobile-responsive design
- [x] Sticky mobile CTA
- [x] Loading states and skeletons
- [x] Error handling

## Backend
- [x] Database schema for users, agents, call history
- [x] Vapi API integration
- [x] tRPC procedures for agent management
- [x] Unit tests for agents, settings, calls procedures


## Vapi Integration Fixes (New)
- [x] Explore Vapi Dashboard and understand available voices
- [x] Create demo assistant in Vapi with human-like voice (Sarah - 11labs)
- [x] Update Voices page with all real Vapi voices (16 voices)
- [x] Fix audio playback on Voices page (using Vapi SDK)
- [x] Fix live demo call widget with real Vapi assistant (ID: dd3b7620-43a7-46f2-bc0e-0690111f6848)
- [x] Create realistic call example transcripts for "See How It Works" (6 industries)
- [x] Test all audio/call features


## Bug Fixes (New)
- [x] Fix Vapi SDK initialization error - switched to npm package @vapi-ai/web
- [x] Check VAPI_PUBLIC_KEY environment variable - now using npm package
- [x] Fix VapiWidget component initialization - working with real assistant
- [x] Add audio to call examples using Web Speech API (two-person dialogue)
- [x] Test live demo call functionality - working!


## Voice Page & Demo Hints Fixes
- [x] Get all American 11labs voices from Vapi Dashboard
- [x] Remove current voices from Voices page
- [x] Add all American 11labs voices with working Play Sample button (30 voices)
- [x] Add conversation hints to Test AI Agent widget (6 example questions)
- [x] Test all features - Play Sample buttons work, conversation hints displayed


## New Industry Templates & Voice Fixes
- [x] Add Dental industry template with sub-services (5 services)
- [x] Add HVAC industry template with sub-services (5 services)
- [x] Add Auto Repair industry template with sub-services (6 services)
- [x] Add Plumbing industry template with sub-services (6 services)
- [x] Fix Voices page to use different browser voices for each card (unique pitch/rate)
- [x] Test all features - 12 tests pass, Voices page shows 30 voices
