'use client'

import { motion } from 'framer-motion'
import { Thermometer, Droplets, Bug, Droplet, TrendingUp } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { staggerContainer, fadeUp } from '@/animations/variants'

const capabilities = [
  {
    icon: Thermometer,
    title: 'Live Weather Telemetry',
    description: 'Real-time temperature tracking from field-deployed sensors.',
  },
  {
    icon: Droplets,
    title: 'Humidity Monitoring',
    description: 'Continuous humidity readings to catch microclimate shifts early.',
  },
  {
    icon: Bug,
    title: 'Disease Prediction',
    description: 'ML models flag disease risk before symptoms are visible in the field.',
  },
  {
    icon: Droplet,
    title: 'Water Savings',
    description: 'Irrigation guidance that cuts water use without risking yield.',
  },
  {
    icon: TrendingUp,
    title: 'Yield Maximization',
    description: 'Actionable alerts that turn field data into higher output per acre.',
  },
]

export function FieldModel() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Field Intelligence"
          title="A field model that thinks ahead"
          description="GridSphere's predictive field model turns raw sensor data into decisions that protect yield and cut waste."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background text-jade-bright">
                <cap.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{cap.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}