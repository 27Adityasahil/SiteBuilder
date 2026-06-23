import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">

            <span className="font-bold tracking-tight">SiteBuilder</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The visual website builder for modern developers. Design visually, export real code.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-sm">Product</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/product" className="hover:text-foreground">Features</Link></li>
            <li><Link to="/templates" className="hover:text-foreground">Templates</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/product" className="hover:text-foreground">Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Resources</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/tutorial" className="hover:text-foreground">Tutorials</Link></li>
            <li><Link to="/tutorial" className="hover:text-foreground">Documentation</Link></li>
            <li><Link to="/tutorial" className="hover:text-foreground">Community</Link></li>
            <li><Link to="/tutorial" className="hover:text-foreground">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
            <li><a href="#" className="hover:text-foreground">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Copyright {new Date().getFullYear()} SiteBuilder Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          {/* <a href="#" className="hover:text-foreground text-sm">Twitter</a> */}
          <a href="https://github.com/27Adityasahil/SiteBuilder" className="hover:text-foreground text-sm">GitHub</a>
          {/* <a href="#" className="hover:text-foreground text-sm">Discord</a> */}
        </div>
      </div>
    </footer>
  )
}
