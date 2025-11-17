import { MessageSquare, Sprout, Globe, FileText, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Real-time Rural Assistance",
    description: "Get instant answers to your questions about local services, schemes, and community resources 24/7.",
  },
  {
    icon: FileText,
    title: "Government Scheme Guidance",
    description: "Navigate complex government programs with step-by-step guidance on eligibility and application processes.",
  },
  {
    icon: Sprout,
    title: "Agriculture Support Info",
    description: "Access farming techniques, crop management tips, weather updates, and market price information.",
  },
  {
    icon: Users,
    title: "Complaint Submission",
    description: "Report issues and submit complaints to local authorities with guided assistance for proper documentation.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Communicate in your preferred language from 15+ regional languages for seamless understanding.",
  },
  {
    icon: Zap,
    title: "Smart & Fast",
    description: "Powered by advanced AI to provide accurate, contextual responses instantly without any wait time.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Everything You Need in One Place
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive support designed specifically for rural communities with features that matter most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
