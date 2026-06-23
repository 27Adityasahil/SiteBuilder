import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FaArrowRight, FaPlay, FaMagic } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-border/50 bg-background/50 text-sm font-medium text-muted-foreground backdrop-blur-md inline-block mb-6">
            <FaMagic className="inline-block mr-2 text-yellow-400" /> Introducing SiteBuilder 1.0
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
        >
          Design Visually. <br />
          <span className="text-gradient">Export Real Code.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Create production-ready websites using an advanced drag-and-drop builder with clean HTML, CSS, and React export.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200" onClick={() => navigate('/playground')}>
              Start Building Free <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border/50 hover:bg-background/50" onClick={() => navigate('/tutorial')}>
              <FaPlay className="mr-2 w-4 h-4" /> Tutorial
          </Button>
        </motion.div>

        {/* Hero Image / Animation Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="glass-card rounded-2xl p-2 border border-border/50 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-muted aspect-video relative flex items-center justify-center">
               {/* Decorative interface elements */}
               <div className="absolute inset-0 bg-muted/10" />
               <div className="z-10 text-center">
                 <p className="text-muted-foreground font-medium">Interactive Builder Preview</p>
                 <div className="mt-4 flex gap-2 justify-center">
                   <div className="w-12 h-12 rounded bg-blue-500/20 border border-blue-500/30 animate-pulse" />
                   <div className="w-12 h-12 rounded bg-emerald-500/20 border border-emerald-500/30 animate-pulse delay-75" />
                   <div className="w-12 h-12 rounded bg-purple-500/20 border border-purple-500/30 animate-pulse delay-150" />
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
