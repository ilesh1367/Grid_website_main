'use client'

import { motion } from 'framer-motion'
import { industries } from '@/data/content'
import { SectionHeading } from '@/components/section-heading'
import { staggerContainer, fadeUp } from '@/animations/variants'

export function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden py-28 sm:py-36">
      {/* rotating gradient orb backdrop */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/10 blur-[120px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* faint network-grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle,theme(colors.jade)_1px,transparent_1px)] [background-size:28px_28px]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Deep expertise across sectors"
          description="We speak the language of the domains we serve, shipping solutions tuned to real operational needs."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <motion.article
              key={industry.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-jade/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between">
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background text-jade-bright transition-colors group-hover:border-jade/50">
                  {/* icon glow ring on hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-jade/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <industry.icon className="relative h-7 w-7" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="relative mt-6 text-xl font-semibold">{industry.name}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">
                {industry.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
