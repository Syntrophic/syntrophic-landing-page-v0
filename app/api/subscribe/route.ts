import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

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
    await resend.emails.send({
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
