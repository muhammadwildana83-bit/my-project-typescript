import { Zap, Shield, Smartphone, Users, Globe, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience blazing fast performance with our optimized infrastructure"
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security to keep your data safe and protected"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect experience across all devices and screen sizes"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with powerful collaboration tools"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with our distributed infrastructure"
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Make data-driven decisions with comprehensive analytics"
  }
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you build, scale, and succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}