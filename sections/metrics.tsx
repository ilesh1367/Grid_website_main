'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { metrics } from '@/data/content'
import { AnimatedCounter } from '@/components/animated-counter'
import { staggerContainer, fadeUp } from '@/animations/variants'

export function Metrics() {
  return (
    <section className="relative border-y border-border bg-card/30 py-20 sm:py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 lg:grid-cols-3 lg:px-8"
      >
        {metrics.map((metric) => (
          <motion.div key={metric.label} variants={fadeUp} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-jade/20 text-jade-bright">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              {metric.isText ? (
                <span className="font-display text-2xl font-semibold text-gradient-jade sm:text-3xl">
                  {metric.label}
                </span>
              ) : (
                <span className="font-display text-5xl font-semibold text-gradient-jade sm:text-6xl">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </span>
              )}
            </div>
            {!metric.isText && (
              <span className="pl-9 text-sm text-muted-foreground">{metric.label}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}