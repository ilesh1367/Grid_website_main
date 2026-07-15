'use client'

import { motion } from 'framer-motion'
import { Check, ShieldCheck, Clock, Users, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { staggerContainer, fadeUp } from '@/animations/variants'
import { metrics } from '@/data/content'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'We build for the long run',
    description:
      'Our systems are engineered to stay reliable years after launch, not just to demo well on day one. You get software that scales with your business, not against it.',
  },
  {
    icon: Clock,
    title: 'We move at your speed',
    description:
      'No bloated processes or six-month discovery phases. We ship working software early and iterate with you, so you see progress every step of the way.',
  },
  {
    icon: Users,
    title: 'We become part of your team',
    description:
      'You get direct access to the engineers building your product — not a rotating cast of account managers. Clear communication, no translation layer.',
  },
  {
    icon: Sparkles,
    title: 'We bring AI where it matters',
    description:
      "We don't bolt on AI for the sake of it. Every model we build is tied to a measurable outcome — saved cost, saved time, or a decision made faster.",
  },
]

export function WhyGridSphere() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why GridSphere"
          title="Reasons clients choose to build with us"
          description="It's not just what we build — it's how we work, how fast we move, and how closely we stay tied to your outcomes."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-4 sm:grid-cols-2"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-jade-bright transition-colors group-hover:border-jade/50">
                <reason.icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-3xl border border-border bg-card/50 px-8 py-8"
        >
          {metrics.map((metric) => (
            <motion.div key={metric.label} variants={fadeUp} className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jade/20 text-jade-bright">
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-medium text-foreground">
                {metric.isText
                  ? metric.label
                  : `${metric.value}${metric.suffix ?? ''} ${metric.label}`}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}