import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Pricing</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Start building for free. Upgrade as you grow.
        </p>
      </main>
      <Footer />
    </div>
  )
}
