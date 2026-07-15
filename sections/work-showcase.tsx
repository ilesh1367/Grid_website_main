'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard, GraduationCap, Smartphone, Users, AppWindow } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { staggerContainer, fadeUp } from '@/animations/variants'

const work = [
  { title: 'ERP Dashboard', icon: LayoutDashboard },
  { title: 'Student Portal', icon: GraduationCap },
  { title: 'Parent App', icon: Smartphone },
  { title: 'CRM', icon: Users },
  { title: 'Mobile App', icon: AppWindow },
]

export function WorkShowcase() {
  return (
    <section className="relative border-y border-border bg-card/30 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="A glimpse into what we've shipped"
          description="Real products, running in production, across ERP, education, CRM and mobile."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {work.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-muted">
                <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
                <div className="relative flex flex-col items-center gap-3">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/80 text-jade-bright backdrop-blur-sm">
                    <item.icon className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Screenshot coming soon
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}