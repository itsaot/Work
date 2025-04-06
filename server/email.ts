import { MailService } from '@sendgrid/mail';

const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@mkhontonationalunion.com";

// Configure SendGrid
if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable is not set!");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY || '');

type EmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

type EmailResult = {
  success: boolean;
  error?: string;
};

export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  try {
    // If we're in development and don't have SendGrid API Key, log instead of trying to send
    if (!process.env.SENDGRID_API_KEY) {
      console.log("================ EMAIL WOULD BE SENT ================");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`HTML Content: ${options.html}`);
      console.log(`Text Content: ${options.text}`);
      console.log("====================================================");
      
      return { success: true };
    }

    const msg = {
      to: options.to,
      from: EMAIL_FROM,
      subject: options.subject,
      text: options.text || '',
      html: options.html || '',
    };

    await mailService.send(msg);
    console.log("Email sent successfully!");
    return { success: true };
  } catch (error) {
    console.error("SendGrid email sending error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}
