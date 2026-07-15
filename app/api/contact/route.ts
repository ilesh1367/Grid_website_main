import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
    name: string;
    company?: string;
    email: string;
    phone?: string;
    service?: string;
    budget?: string;
    timeline?: string;
    description: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SERVICES = [
    "AI Solutions",
    "ERP Systems",
    "Enterprise Software",
    "Tracking Solutions",
    "Custom Development",
    "Other",
];

function validatePayload(body: Partial<ContactPayload>) {
    const errors: Record<string, string> = {};

    if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
        errors.name = "Full name is required (min 2 characters).";
    }

    if (!body.email || typeof body.email !== "string" || !EMAIL_REGEX.test(body.email.trim())) {
        errors.email = "A valid email address is required.";
    }

    if (!body.description || typeof body.description !== "string" || body.description.trim().length < 10) {
        errors.description = "Project description must be at least 10 characters.";
    }

    if (body.service && !VALID_SERVICES.includes(body.service)) {
        errors.service = "Invalid service selection.";
    }

    if (body.phone && typeof body.phone === "string" && body.phone.trim().length > 0) {
        const phoneDigits = body.phone.replace(/[^\d]/g, "");
        if (phoneDigits.length < 7) {
            errors.phone = "Phone number appears to be invalid.";
        }
    }

    return errors;
}

export async function POST(request: NextRequest) {
    let body: Partial<ContactPayload>;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid JSON payload." },
            { status: 400 }
        );
    }

    const errors = validatePayload(body);

    if (Object.keys(errors).length > 0) {
        return NextResponse.json(
            { success: false, message: "Validation failed.", errors },
            { status: 400 }
        );
    }

    const submission = {
        name: body.name!.trim(),
        company: body.company?.trim() || null,
        email: body.email!.trim(),
        phone: body.phone?.trim() || null,
        service: body.service?.trim() || null,
        budget: body.budget?.trim() || null,
        timeline: body.timeline?.trim() || null,
        description: body.description!.trim(),
        submittedAt: new Date().toISOString(),
    };

    // TODO: integrate email provider / CRM here in the future.
    console.log("[contact] New inquiry received:", submission);

    return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
    });
}