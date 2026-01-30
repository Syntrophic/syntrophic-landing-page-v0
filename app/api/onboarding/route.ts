import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const timestamp = new Date().toISOString();
    
    // Format identity section based on account type
    const identityHtml = formData.accountType === 'individual'
      ? `
        <p><strong>Full Name:</strong> ${formData.identity.fullName}</p>
        <p><strong>Email:</strong> ${formData.identity.email}</p>
        <p><strong>LinkedIn:</strong> ${formData.identity.linkedinUrl || 'Not provided'}</p>
      `
      : `
        <p><strong>Organization:</strong> ${formData.identity.organizationName}</p>
        <p><strong>Work Email:</strong> ${formData.identity.workEmail}</p>
        <p><strong>Website:</strong> ${formData.identity.websiteUrl || 'Not provided'}</p>
      `;
    
    // Format profile section based on role
    let profileHtml = '';
    if (formData.role === 'founder') {
      profileHtml = `
        <p><strong>Value Proposition:</strong> ${formData.profile.uniqueValueProposition}</p>
        <p><strong>Current Traction:</strong> ${formData.profile.currentTraction}</p>
      `;
    } else if (formData.role === 'investor') {
      profileHtml = `
        <p><strong>Sectors & Geographies:</strong> ${formData.profile.sectorsAndGeographies}</p>
        <p><strong>Check Size & Stage:</strong> ${formData.profile.checkSizeAndStage}</p>
      `;
    } else {
      profileHtml = `
        <p><strong>Ideal Client:</strong> ${formData.profile.idealClient}</p>
        <p><strong>Services Offered:</strong> ${formData.profile.servicesOffered}</p>
      `;
    }

    // Send notification email
    await resend.emails.send({
      from: 'Syntrophic Notifications <info@flagshipgamestudio.com>',
      to: 'info@flagshipgamestudio.com',
      subject: `New Agent Onboarding Request - ${formData.accountType === 'individual' ? formData.identity.fullName : formData.identity.organizationName}`,
      html: `
        <h2>New Agent Deployment Request</h2>
        <p><strong>Submitted:</strong> ${timestamp}</p>
        
        <hr />
        
        <h3>Account Information</h3>
        <p><strong>Account Type:</strong> ${formData.accountType}</p>
        ${identityHtml}
        
        <hr />
        
        <h3>Role & Profile</h3>
        <p><strong>Role:</strong> ${formData.role}</p>
        ${profileHtml}
        
        <hr />
        
        <h3>Configuration</h3>
        <p><strong>Deployment:</strong> ${formData.deployment === 'cloud' ? 'Cloud Managed (AWS)' : 'Private Vault (Local)'}</p>
        <p><strong>Memory Tier:</strong> ${formData.memoryTier === 'standard' ? 'Standard' : 'Professional'}</p>
        <p><strong>Pricing Plan:</strong> ${formData.pricingPlan}</p>
        
        <hr />
        
        <p><em>This request has been queued for priority verification.</em></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Onboarding submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process onboarding request' },
      { status: 500 }
    );
  }
}
