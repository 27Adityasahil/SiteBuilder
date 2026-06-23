import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { FaPlay, FaLayerGroup, FaPaintBrush, FaCode, FaRocket } from "react-icons/fa"

export default function TutorialPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Master SiteBuilder</h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive guide to building, styling, and exporting production-ready websites without writing a single line of code.
            </p>
          </div>

          <div className="space-y-16">
            {/* Step 1 */}
            <section className="glass-card rounded-2xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <FaPlay className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">1. Getting Started</h2>
              </div>
              <div className="space-y-4 text-muted-foreground relative z-10 text-lg leading-relaxed">
                <p>
                  To begin your journey, navigate to your <strong>Dashboard</strong>. Here you'll see all your existing projects. Click the <strong>"Create New Project"</strong> button, give your project a name, and dive right into the visual editor.
                </p>
                <p>
                  Alternatively, you can access the <a href="/playground" className="text-blue-400 hover:underline">Playground</a> directly from the homepage if you just want to test things out without saving!
                </p>
              </div>
            </section>

            {/* Step 2 */}
            <section className="glass-card rounded-2xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <FaLayerGroup className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">2. Building the Structure</h2>
              </div>
              <div className="space-y-4 text-muted-foreground relative z-10 text-lg leading-relaxed">
                <p>
                  The <strong>Left Sidebar</strong> is your structural control center. It has two main tabs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Pages:</strong> Create entirely new pages (like Home, About, Contact). Switching pages updates your canvas instantly.</li>
                  <li><strong>Build:</strong> Here you can add components to your canvas. Select a container on your screen (or the whole page), then click components like <em>Navbar, Section, Heading, Paragraph, Button, or Image</em> to inject them.</li>
                </ul>
                <p>
                  Below the components list is the <strong>Layers panel</strong>. This visualizes your entire DOM tree, allowing you to easily select nested elements.
                </p>
              </div>
            </section>

            {/* Step 3 */}
            <section className="glass-card rounded-2xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
                  <FaPaintBrush className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">3. Styling & Properties</h2>
              </div>
              <div className="space-y-4 text-muted-foreground relative z-10 text-lg leading-relaxed">
                <p>
                  Once an element is on the canvas, click it to open its configuration in the <strong>Right Sidebar</strong>.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Style Tab:</strong> Adjust dimensions (Width/Height), typography (Colors/Sizes), and appearance (Backgrounds, Borders, Padding).</li>
                  <li><strong>Props Tab:</strong> Depending on the element selected, you can modify its inner workings. Change text content, set Heading levels (H1-H6), insert URLs for Links/Buttons, or upload Images directly from your device!</li>
                </ul>
                <div className="bg-muted/30 p-4 rounded-lg mt-4 border border-border/40">
                  <strong className="text-foreground">Pro Tip:</strong> Click the "Upload Image" button in the Props tab to securely upload an image to SiteBuilder's cloud storage. It will instantly appear on your canvas!
                </div>
              </div>
            </section>

            {/* Step 4 */}
            <section className="glass-card rounded-2xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                  <FaCode className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">4. Preview & Export Code</h2>
              </div>
              <div className="space-y-4 text-muted-foreground relative z-10 text-lg leading-relaxed">
                <p>
                  Look up at the <strong>Top Bar</strong>. You can change the canvas size to test responsiveness (Desktop, Tablet, Mobile) and use Undo/Redo arrows to fix mistakes.
                </p>
                <p>
                  Click the <strong>Preview</strong> button to open a live, full-screen interactive preview of your site inside an isolated iframe.
                </p>
                <p>
                  When you're ready to deploy, click the <strong>Code</strong> button. The Code Export engine will instantly generate beautiful, production-ready React JSX, HTML, and CSS for <em>all of the pages</em> you've built. Simply hit "Copy Code" and paste it into your local IDE.
                </p>
              </div>
            </section>

            {/* Step 5 */}
            <section className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-500/20">
                <FaRocket className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">You're Ready to Build!</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Now that you know the ropes, it's time to build something amazing.
              </p>
              <a href="/playground" className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 transition-colors">
                Open the Playground
              </a>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
