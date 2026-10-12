import type { Metadata } from "next";
import ContactScreen from "@/components/sections/ContactScreen";

export const metadata: Metadata = {
  title: "Contact — Vereen Digital",
  description:
    "Send five buyer queries. We run them through ChatGPT, Gemini, Perplexity and Google AI Overviews and return the transcript within 48 hours.",
};

export default function ContactPage() {
  return <ContactScreen />;
}
