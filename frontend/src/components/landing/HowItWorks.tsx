export const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Choose Components", desc: "Select from a rich library of pre-built UI components." },
    { number: "02", title: "Customize Design", desc: "Tweak colors, spacing, and typography visually." },
    { number: "03", title: "Generate Code", desc: "Export your design to clean React/Tailwind code." },
    { number: "04", title: "Deploy Anywhere", desc: "Take your code and deploy it to your favorite host." },
  ]

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From idea to production code in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-6 rounded-2xl glass-card border border-border/50">
              <div className="text-4xl font-black text-muted-foreground/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
