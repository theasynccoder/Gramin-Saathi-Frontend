import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

interface HeroProps {
  onChatOpen: () => void;
}

export const Hero = ({ onChatOpen }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              AI-Powered Rural Assistance
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Rural Communities Through{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Intelligent Conversation
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Connect with instant support for government schemes, agriculture guidance, 
              local services, and community resources. Get answers in your language, anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onChatOpen}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Open Chatbot
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold border-2 hover:bg-muted"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50k+</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Languages Supported</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img
              src={heroIllustration}
              alt="Rural AI Assistant"
              className="relative rounded-3xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
