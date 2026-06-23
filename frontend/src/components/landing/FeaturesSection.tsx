import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaCode, FaColumns, FaLayerGroup, FaMobileAlt, FaServer, FaBolt } from "react-icons/fa"

export const FeaturesSection = () => {
  const features = [
    {
      title: "Drag & Drop Builder",
      description: "Visually build your layout with intuitive drag and drop controls.",
      icon: <FaColumns className="w-6 h-6 text-primary" />
    },
    {
      title: "Real Code Export",
      description: "Export clean, production-ready React, HTML, and CSS code.",
      icon: <FaCode className="w-6 h-6 text-primary" />
    },
    {
      title: "Responsive Design",
      description: "Design for any device. Your websites look perfect everywhere.",
      icon: <FaMobileAlt className="w-6 h-6 text-primary" />
    },
    {
      title: "Reusable Components",
      description: "Create component libraries and reuse them across your projects.",
      icon: <FaLayerGroup className="w-6 h-6 text-primary" />
    },
    {
      title: "Project Management",
      description: "Manage multiple projects, assets, and templates from one dashboard.",
      icon: <FaServer className="w-6 h-6 text-primary" />
    },
    {
      title: "Developer Friendly",
      description: "Use your own custom code blocks and manage your own data state.",
      icon: <FaBolt className="w-6 h-6 text-primary" />
    }
  ]

  return (
    <section id="features" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to build stunning websites without touching a line of code, unless you want to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card bg-card/40 border-border/50 hover:bg-card/60 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 border border-border/50">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
