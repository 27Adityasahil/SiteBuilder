import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { TemplatesSection } from "@/components/landing/TemplatesSection"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <TemplatesSection />
      </main>
      <Footer />
    </div>
  )
}
