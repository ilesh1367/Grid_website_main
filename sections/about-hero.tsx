'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/animations/variants'

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-28">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-jade/10 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8"
      >
        <motion.span
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs tracking-wide text-muted-foreground backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-jade-bright" />
          About Our Company
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          Building the <span className="text-gradient-jade">Digital Backbone</span> of
          Modern Enterprises
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          GridSphere combines deep engineering expertise with AI-driven intelligence to
          build software that businesses actually run on — from ERP systems to
          field-level IoT platforms.
        </motion.p>
      </motion.div>
    </section>
  )
}