import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { UseCases } from "@/components/UseCases";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ChatbotTrigger } from "@/components/ChatbotTrigger";

const Index = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onChatOpen={() => setIsChatbotOpen(true)} />
      <Hero onChatOpen={() => setIsChatbotOpen(true)} />
      <Features />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <FAQ />
      <Footer />
      
      {!isChatbotOpen && (
        <ChatbotTrigger onClick={() => setIsChatbotOpen(true)} />
      )}
      
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default Index;
