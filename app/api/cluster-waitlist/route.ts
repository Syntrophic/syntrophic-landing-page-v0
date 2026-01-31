import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, agentDid } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // Send notification email
    const result = await resend.emails.send({
      from: 'Syntrophic Notifications <info@flagshipgamestudio.com>',
      to: 'info@flagshipgamestudio.com',
      subject: 'New Cluster Waitlist Signup',
      html: `
        <h2>New Cluster Waitlist Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${agentDid ? `<p><strong>Agent DID:</strong> ${agentDid}</p>` : '<p><strong>Agent DID:</strong> Not provided</p>'}
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <hr />
        <p>This user has requested early access to curated networks for founders, investors, and service providers.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cluster waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
