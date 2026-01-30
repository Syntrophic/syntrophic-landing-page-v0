import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("[v0] Subscribe API called");
  console.log("[v0] RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  
  try {
    const { email } = await request.json();
    console.log("[v0] Email received:", email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      console.log("[v0] Email validation failed");
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    console.log("[v0] Attempting to send email via Resend...");

    // Send notification email
    const result = await resend.emails.send({
      from: 'Syntrophic Notifications <info@flagshipgamestudio.com>',
      to: 'info@flagshipgamestudio.com',
      subject: 'New Light Paper Request',
      html: `
        <h2>New Light Paper Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <hr />
        <p>This subscriber has requested access to the Syntrophic Light Paper and developer documentation updates.</p>
      `,
    });
    
    console.log("[v0] Resend result:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[v0] Error occurred:", error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
