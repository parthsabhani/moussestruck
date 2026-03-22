// ─────────────────────────────────────────────────────────────────
//  EmailJS Configuration
//  Setup steps:
//  1. Go to https://emailjs.com and create a free account
//  2. Add Email Service → connect your Gmail (thatsit120802@gmail.com)
//     → copy the Service ID below
//  3. Create ONE Email Template with these settings:
//       Subject  : {{subject}}
//       To email : {{to_email}}
//       Reply-To : {{reply_to}}
//       Body     : paste this exactly → {{{html_content}}}
//       (triple braces = raw HTML rendering)
//     → copy the Template ID below
//  4. Go to Account → copy your Public Key below
//  5. Run: npm install @emailjs/browser
// ─────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  SERVICE_ID:  'service_mco17pu',   // e.g. 'service_abc123'
  TEMPLATE_ID: 'template_pqnx4wf', // e.g. 'template_xyz789'
  PUBLIC_KEY:  'ERn0Vf4BUU8GqdpQ_',  // e.g. 'user_AbCdEfGhIjKl'
  CLIENT_EMAIL: 'thatsit120802@gmail.com',
};
