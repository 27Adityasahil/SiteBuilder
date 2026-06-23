import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-border/40 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">

          <Link to="/">
            <span className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">SiteBuilder</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/product" className="hover:text-foreground transition-colors">Product</Link>
          <Link to="/templates" className="hover:text-foreground transition-colors">Templates</Link>
          <Link to="/tutorial" className="hover:text-foreground transition-colors">Tutorial</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-white text-black hover:bg-neutral-200">Start Building</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
