import { MessageCircleQuestion, Lightbulb, Link2 } from "lucide-react";

const steps = [
  {
    icon: MessageCircleQuestion,
    title: "Ask a Question",
    description: "Type or speak your question in your preferred language about any rural service, scheme, or support you need.",
  },
  {
    icon: Lightbulb,
    title: "Get Accurate Info",
    description: "Our AI instantly processes your query and provides detailed, contextual answers with step-by-step guidance.",
  },
  {
    icon: Link2,
    title: "Connect with Services",
    description: "Get connected to relevant local services, officials, or resources to take action on your needs immediately.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
            How It Works
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Simple, Fast, and Effective
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting help is just three steps away. No complicated forms or long wait times.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/50 -z-10" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm z-10">
                {index + 1}
              </div>

              <div className="p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
