import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const Index = () => {
  const chatbotRef = useRef<HTMLDivElement>(null);

  const scrollToChatbot = () => {
    chatbotRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticlesBackground className="fixed inset-0 z-0 pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <UseCases />
        <Testimonials />
        <FAQ />

        {/* 🔹 Chatbot Section (NORMAL PAGE FLOW) */}
        <div ref={chatbotRef}>
          <Chatbot />
        </div>

        <Footer />

        {/* 🔹 Floating Chatbot Button */}
        <ChatbotTrigger onClick={scrollToChatbot} />
      </div>
    </div>
  );
};

export default Index;
