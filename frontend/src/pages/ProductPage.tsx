import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { FaLayerGroup, FaCode, FaCloudUploadAlt, FaBolt, FaMobileAlt, FaServer } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function ProductPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Visual Drag & Drop",
      description: "Build your layout naturally. Select elements, drag them to reorganize, and drop new components precisely where you want them.",
      icon: <FaLayerGroup className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Clean Code Export",
      description: "SiteBuilder doesn't generate spaghetti code. You get clean, semantic HTML, CSS, and modern React JSX ready for production.",
      icon: <FaCode className="w-6 h-6 text-emerald-500" />
    },
    {
      title: "Asset Management",
      description: "Upload images securely to SiteBuilder's cloud storage. We optimize them on the fly and serve them blazing fast via CDN.",
      icon: <FaCloudUploadAlt className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Real-time Preview",
      description: "Instantly see exactly what your users will see. Our isolated preview engine renders your generated code in real-time.",
      icon: <FaBolt className="w-6 h-6 text-yellow-500" />
    },
    {
      title: "Responsive by Default",
      description: "Toggle between desktop, tablet, and mobile breakpoints to ensure your application looks perfect on every screen size.",
      icon: <FaMobileAlt className="w-6 h-6 text-pink-500" />
    },
    {
      title: "Cloud Sync",
      description: "All your projects and templates are continuously synced to your account database so you can work from anywhere.",
      icon: <FaServer className="w-6 h-6 text-cyan-500" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            The Complete <br />
            <span className="text-blue-600">
              Visual Development
            </span> Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            SiteBuilder bridges the gap between design and engineering. Visually build complex web applications, then instantly export production-ready React code.
          </p>
          <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200" onClick={() => navigate('/register')}>
            Start Building Free
          </Button>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">Powerful features wrapped in an intuitive interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl border border-border/50 hover:bg-card/60 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 border border-border/50 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5" />
          <h2 className="text-4xl font-bold mb-6 relative z-10">Stop writing boilerplate.</h2>
          <p className="text-xl text-muted-foreground mb-10 relative z-10">
            Join thousands of developers who are building faster with SiteBuilder.
          </p>
          <Button size="lg" className="relative z-10 h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/templates')}>
            Explore Templates
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
