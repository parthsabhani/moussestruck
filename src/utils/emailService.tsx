import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from './emailConfig';

emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

export interface SendEmailParams {
  to_email: string;       // recipient
  reply_to?: string;      // reply-to address
  subject: string;        // email subject line
  html_content: string;   // full HTML body (from templates)
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Core send function — all email flows call this.
 * EmailJS template must have:
 *   To      : {{to_email}}
 *   Reply-To: {{reply_to}}
 *   Subject : {{subject}}
 *   Body    : {{{html_content}}}   ← triple braces for raw HTML
 */
export async function sendEmail(params: SendEmailParams): Promise<EmailResult> {
  try {
    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      {
        to_email:     params.to_email,
        reply_to:     params.reply_to || params.to_email,
        subject:      params.subject,
        html_content: params.html_content,
      },
    );
    return { success: true };
  } catch (err: any) {
    console.error('[EmailJS] send failed:', err);
    return {
      success: false,
      error: err?.text || err?.message || 'Failed to send email.',
    };
  }
}
