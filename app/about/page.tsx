import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/sections/about-hero'
import { WhyGridSphere } from '@/sections/why-gridsphere'
import { WorkShowcase } from '@/sections/work-showcase'
import { FieldModel } from '@/sections/field-model'
import { FinalCTA } from '@/sections/final-cta'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background">
        <AboutHero />
        <WhyGridSphere />
        <WorkShowcase />
        <FieldModel />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}