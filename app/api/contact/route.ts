import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, queryType } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content for the company
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Solar Inquiry from ${name} - ${queryType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #22c55e 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">New Solar Inquiry</h1>
            <p style="color: white; margin: 5px 0 0 0;">Suntech Systems</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Customer Details</h2>
              <table style="width: 100%; margin-top: 15px;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #4b5563;">Name:</td>
                  <td style="padding: 10px; color: #1f2937;">${name}</td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="padding: 10px; font-weight: bold; color: #4b5563;">Email:</td>
                  <td style="padding: 10px; color: #1f2937;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #4b5563;">Phone:</td>
                  <td style="padding: 10px; color: #1f2937;"><a href="tel:${phone}" style="color: #3b82f6;">${phone}</a></td>
                </tr>
                <tr style="background: #f3f4f6;">
                  <td style="padding: 10px; font-weight: bold; color: #4b5563;">Interest:</td>
                  <td style="padding: 10px; color: #1f2937;">${queryType.replace(/([A-Z])/g, ' $1').trim()}</td>
                </tr>
              </table>
            </div>
            
            ${message ? `
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1f2937; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">Message</h3>
              <p style="color: #4b5563; line-height: 1.6; margin-top: 15px;">${message}</p>
            </div>
            ` : ''}
          </div>
          
          <div style="background: #1f2937; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; color: #9ca3af;">
            <p style="margin: 0;">Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">This is an automated notification from Suntech Systems website</p>
          </div>
        </div>
      `,
    };

    // Auto-reply email to the customer
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your interest in Solar Energy - Suntech Systems',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #22c55e 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Suntech Systems</h1>
            <p style="color: white; margin: 5px 0 0 0;">Solar Energy Solutions</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #1f2937;">Dear ${name},</h2>
            <p style="color: #4b5563; line-height: 1.6;">Thank you for your interest in solar energy solutions!</p>
            <p style="color: #4b5563; line-height: 1.6;">We have received your inquiry and our expert team will contact you within 24 hours to discuss your solar requirements.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
              <h3 style="color: #1f2937; margin-top: 0;">Your Inquiry Details:</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li><strong>Interest:</strong> ${queryType.replace(/([A-Z])/g, ' $1').trim()}</li>
                ${message ? `<li><strong>Message:</strong> ${message}</li>` : ''}
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 20px; border-radius: 8px; color: white; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">Need Immediate Assistance?</h3>
              <p style="margin: 0; font-size: 18px;"><strong>Call us:</strong> <a href="tel:9771045001" style="color: white; text-decoration: none;">+91 9771045001</a></p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">Available: Mon-Sat, 9 AM - 7 PM</p>
            </div>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e;"><strong>💡 Did you know?</strong> Solar panel owners save an average of ₹50,000 - ₹5 Lakhs over 25 years!</p>
            </div>
          </div>
          
          <div style="background: #1f2937; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; color: #9ca3af;">
            <p style="margin: 0;">Suntech Systems - Empowering India with Clean Solar Energy</p>
            <p style="margin: 5px 0;"><a href="mailto:ssystems952@gmail.com" style="color: #60a5fa;">ssystems952@gmail.com</a> | <a href="tel:9771045001" style="color: #60a5fa;">9771045001</a></p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Serving All of India 🇮🇳</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
