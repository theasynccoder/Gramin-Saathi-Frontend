import { Card } from "@/components/ui/card";
import { Wheat, GraduationCap, Building2, Users2, Briefcase } from "lucide-react";

const useCases = [
  {
    icon: Wheat,
    title: "Farmers",
    description: "Access crop advisories, weather forecasts, market prices, and agricultural scheme information.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: GraduationCap,
    title: "Rural Students",
    description: "Get information on scholarships, educational programs, and career guidance opportunities.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Building2,
    title: "Village Officials",
    description: "Help constituents find information and navigate government services efficiently.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Users2,
    title: "SHG Groups",
    description: "Learn about microfinance, training programs, and women empowerment schemes.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Briefcase,
    title: "Rural Entrepreneurs",
    description: "Discover business support schemes, loan programs, and skill development initiatives.",
    color: "from-cyan-500 to-blue-600",
  },
];

export const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Use Cases
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Built for Everyone in Rural India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're farming, studying, or building a business, RuralConnect is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-card group overflow-hidden relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${useCase.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity -z-0`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
