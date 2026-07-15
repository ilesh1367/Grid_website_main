"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

interface FormState {
    name: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    budget: string;
    timeline: string;
    description: string;
}

const INITIAL_STATE: FormState = {
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    description: "",
};

const SERVICE_OPTIONS = [
    "AI Solutions",
    "ERP Systems",
    "Enterprise Software",
    "Tracking Solutions",
    "Custom Development",
    "Other",
];

const CONTACT_INFO = [
    {
        label: "Email",
        value: "info@gridsphere.in",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
        ),
    },
    {
        label: "Phone",
        value: "+91 8219765685",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.157-1.46l-4.078-1.01a1.5 1.5 0 00-1.462.39l-1.088 1.088a12.06 12.06 0 01-5.83-5.83l1.088-1.088a1.5 1.5 0 00.39-1.462l-1.01-4.078a1.5 1.5 0 00-1.46-1.157H4.5A2.25 2.25 0 002.25 6.75z"
            />
        ),
    },
    {
        label: "Location",
        value: "1609, The Iconic Corenthum, Noida 62",
        icon: (
            <>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
            </>
        ),
    },
    {
        label: "Avg. Response Time",
        value: "Under 24 hours",
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
        ),
    },
];

function FieldShell({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
                {required && <span className="ml-1 text-jade-bright">*</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}

const inputClasses =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-jade focus:ring-1 focus:ring-jade/50";

export default function Contact() {
    const [form, setForm] = useState<FormState>(INITIAL_STATE);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [serverMessage, setServerMessage] = useState<string>("");

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        }
    }

    function validate(): boolean {
        const next: Partial<Record<keyof FormState, string>> = {};

        if (form.name.trim().length < 2) {
            next.name = "Please enter your full name.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            next.email = "Please enter a valid email address.";
        }
        if (form.description.trim().length < 10) {
            next.description = "Please provide a few more details (min 10 characters).";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setStatus("loading");
        setServerMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setStatus("error");
                setServerMessage(data.message || "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            setServerMessage(data.message || "Inquiry received successfully.");
            setForm(INITIAL_STATE);
        } catch {
            setStatus("error");
            setServerMessage("Network error. Please check your connection and try again.");
        }
    }

    return (
        <section id="contact" className="relative overflow-hidden py-24">
            <div className="absolute inset-0 grid-lines opacity-40" />
            <div className="pointer-events-none absolute left-1/2 top-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-jade/10 blur-[130px]" />

            <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5 lg:px-8">
                {/* Left column - 40% */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-jade-bright" />
                        <span className="text-xs font-medium text-muted-foreground">Get In Touch</span>
                    </div>

                    <h2 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
                        Let&apos;s Build Something{" "}
                        <span className="text-gradient-jade">Intelligent</span> Together
                    </h2>

                    <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                        Whether you&apos;re modernizing enterprise systems, deploying AI-driven
                        automation, or building custom software from the ground up, GridSphere
                        partners with you end-to-end — from architecture to deployment and
                        beyond. Tell us about your project and our team will get back to you
                        with next steps.
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {CONTACT_INFO.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm transition-colors hover:border-jade/40"
                            >
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-jade/10 text-jade-bright">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                        {item.icon}
                                    </svg>
                                </div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                    {item.label}
                                </p>
                                <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right column - 60% */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="lg:col-span-3"
                >
                    <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-xl sm:p-8">
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-jade/15">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="h-8 w-8 text-jade-bright"
                                    >
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.15 }}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-display text-xl font-semibold">
                                    Inquiry received successfully
                                </h3>
                                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                    {serverMessage} Our team will reach out to you shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus("idle")}
                                    className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-jade/50"
                                >
                                    Send another inquiry
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <FieldShell label="Full Name" required error={errors.name}>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => update("name", e.target.value)}
                                            placeholder="Jane Doe"
                                            className={inputClasses}
                                            aria-invalid={!!errors.name}
                                        />
                                    </FieldShell>

                                    <FieldShell label="Company Name">
                                        <input
                                            type="text"
                                            value={form.company}
                                            onChange={(e) => update("company", e.target.value)}
                                            placeholder="Acme Corp"
                                            className={inputClasses}
                                        />
                                    </FieldShell>

                                    <FieldShell label="Email Address" required error={errors.email}>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) => update("email", e.target.value)}
                                            placeholder="jane@company.com"
                                            className={inputClasses}
                                            aria-invalid={!!errors.email}
                                        />
                                    </FieldShell>

                                    <FieldShell label="Phone Number">
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => update("phone", e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className={inputClasses}
                                        />
                                    </FieldShell>

                                    <FieldShell label="Service Interested In">
                                        <select
                                            value={form.service}
                                            onChange={(e) => update("service", e.target.value)}
                                            className={`${inputClasses} appearance-none`}
                                        >
                                            <option value="">Select a service</option>
                                            {SERVICE_OPTIONS.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </FieldShell>

                                    <FieldShell label="Estimated Budget">
                                        <input
                                            type="text"
                                            value={form.budget}
                                            onChange={(e) => update("budget", e.target.value)}
                                            placeholder="$10k - $50k"
                                            className={inputClasses}
                                        />
                                    </FieldShell>

                                    <FieldShell label="Project Timeline">
                                        <input
                                            type="text"
                                            value={form.timeline}
                                            onChange={(e) => update("timeline", e.target.value)}
                                            placeholder="e.g. 3-6 months"
                                            className={inputClasses}
                                        />
                                    </FieldShell>
                                </div>

                                <FieldShell
                                    label="Project Description"
                                    required
                                    error={errors.description}
                                >
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.description}
                                        onChange={(e) => update("description", e.target.value)}
                                        placeholder="Tell us about your goals, current systems, and what success looks like..."
                                        className={`${inputClasses} resize-none`}
                                        aria-invalid={!!errors.description}
                                    />
                                </FieldShell>

                                {status === "error" && (
                                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                        {serverMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-jade px-6 py-3 text-sm font-medium text-jade-foreground transition-colors hover:bg-jade-bright disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>
                                            Sending Inquiry...
                                        </>
                                    ) : (
                                        "Submit Inquiry"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}