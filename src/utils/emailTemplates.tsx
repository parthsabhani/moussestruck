import { siteInfo } from '../data/siteData';
import { CartItem } from '../contexts/CartContext';

// ─────────────────────────────────────────────────────────────────
//  EMAIL-SAFE RULES:
//  1. No display:flex or display:grid — email clients ignore them
//  2. No emoji inside fixed-size boxes — they blow up
//  3. Use tables for ALL layout
//  4. Use inline styles only
//  5. Emoji ONLY as standalone text, never inside sized divs
// ─────────────────────────────────────────────────────────────────

// ─── Shared wrapper ───────────────────────────────────────────────
const wrap = (content: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Moussestruck</title>
</head>
<body style="margin:0;padding:0;background:#fdf2f8;font-family:Arial,sans-serif;color:#1f2937;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#fdf2f8" style="padding:28px 12px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">

<!-- HEADER -->
<tr>
  <td bgcolor="#ec4899" style="background:linear-gradient(135deg,#ec4899,#a855f7);padding:36px 28px;text-align:center;">
    <p style="margin:0 0 8px;font-size:40px;line-height:1;">&#127822;</p>
    <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;">Moussestruck</h1>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Handcrafted Artisanal Mousse Desserts</p>
  </td>
</tr>

${content}

<!-- FOOTER -->
<tr>
  <td bgcolor="#1f2937" style="padding:24px 28px;text-align:center;">
    <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:12px;">Made with love by the Moussestruck team</p>
    <p style="margin:0;color:rgba(255,255,255,0.3);font-size:11px;">${siteInfo.address} &nbsp;&middot;&nbsp; ${siteInfo.phone}</p>
    <p style="margin:10px 0 0;"><a href="https://www.instagram.com/moussestruck/" style="color:rgba(255,255,255,0.45);font-size:12px;text-decoration:none;">Follow us @moussestruck on Instagram</a></p>
  </td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>`;

// ─── Section heading ──────────────────────────────────────────────
const heading = (text: string) =>
  `<p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#be185d;text-transform:uppercase;letter-spacing:1px;">${text}</p>`;

// ─── Info table row ───────────────────────────────────────────────
const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:6px 0;font-size:13px;color:#9ca3af;width:110px;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:500;">${value}</td>
  </tr>`;

// ─── Colored bullet icon (email-safe, no emoji, no flex) ──────────
// Uses a simple colored circle with a bold letter — renders everywhere
const bullet = (letter: string, bg: string, color: string) =>
  `<td style="width:38px;vertical-align:top;padding-top:2px;">
    <table cellpadding="0" cellspacing="0"><tr><td
      width="32" height="32" align="center" valign="middle"
      style="width:32px;height:32px;background:${bg};border-radius:8px;font-size:14px;font-weight:700;color:${color};line-height:32px;text-align:center;">
      ${letter}
    </td></tr></table>
  </td>`;


// ══════════════════════════════════════════════════════════════════
//  1. ORDER CONFIRMATION
// ══════════════════════════════════════════════════════════════════
export interface OrderEmailParams {
  orderNumber: number;
  orderDateTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  cart: CartItem[];
  cartTotal: number;
  notes?: string;
}

export function buildOrderEmail(p: OrderEmailParams): string {
  const items = p.cart.map(item => `
  <tr style="border-bottom:1px solid #fce7f3;">
    <td style="padding:10px 12px;">
      <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">${item.name}</p>
      <p style="margin:3px 0 0;font-size:12px;color:#9ca3af;">Qty: ${item.quantity} &times; ${item.price}</p>
    </td>
    <td style="padding:10px 12px;text-align:right;font-size:14px;font-weight:700;color:#ec4899;white-space:nowrap;">
      &#8377;${(item.priceValue * item.quantity).toFixed(0)}
    </td>
  </tr>`).join('');

  const notesBlock = p.notes ? `
  <tr><td style="padding:0 28px 16px;">
    ${heading('Special Instructions')}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:#fffbeb;border-left:3px solid #f59e0b;padding:12px 14px;font-size:13px;color:#78350f;line-height:1.6;">
        ${p.notes}
      </td></tr>
    </table>
  </td></tr>` : '';

  const content = `
<!-- ORDER BADGE -->
<tr>
  <td style="background:#fdf2f8;padding:20px 28px;text-align:center;border-bottom:2px dashed #fce7f3;">
    <table cellpadding="0" cellspacing="0" align="center"><tr>
      <td style="border:2px solid #ec4899;border-radius:30px;padding:8px 22px;">
        <span style="font-size:13px;font-weight:700;color:#ec4899;letter-spacing:1px;">ORDER #${p.orderNumber}</span>
      </td>
    </tr></table>
    <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">${p.orderDateTime} IST</p>
    <table cellpadding="0" cellspacing="0" align="center" style="margin-top:8px;"><tr>
      <td style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:20px;padding:5px 14px;font-size:12px;color:#059669;font-weight:600;">
        Confirmed &mdash; Awaiting Pickup
      </td>
    </tr></table>
  </td>
</tr>

<!-- CUSTOMER DETAILS -->
<tr><td style="padding:24px 28px 0;">
  ${heading('Customer Details')}
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf9ff;border-radius:10px;padding:12px 14px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('Name', p.customerName)}
        ${row('Email', p.customerEmail)}
        ${row('Phone', p.customerPhone)}
        ${row('Address', p.customerAddress)}
      </table>
    </td></tr>
  </table>
</td></tr>

<!-- ORDER ITEMS -->
<tr><td style="padding:20px 28px 0;">
  ${heading('Order Items')}
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #fce7f3;border-radius:10px;overflow:hidden;">
    <tr style="background:#fdf2f8;">
      <td style="padding:9px 12px;font-size:11px;font-weight:700;color:#be185d;text-transform:uppercase;letter-spacing:0.5px;">Item</td>
      <td style="padding:9px 12px;font-size:11px;font-weight:700;color:#be185d;text-transform:uppercase;letter-spacing:0.5px;text-align:right;">Amount</td>
    </tr>
    ${items}
  </table>
</td></tr>

${notesBlock}

<!-- TOTAL -->
<tr><td style="padding:20px 28px 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td bgcolor="#ec4899" style="background:linear-gradient(135deg,#ec4899,#a855f7);border-radius:12px;padding:20px;text-align:center;">
        <p style="margin:0 0 4px;color:rgba(255,255,255,0.8);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Total Amount Due at Pickup</p>
        <p style="margin:0;color:#ffffff;font-size:32px;font-weight:800;">&#8377;${p.cartTotal.toFixed(0)}</p>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:11px;">Cash / UPI accepted &nbsp;&middot;&nbsp; No advance payment needed</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- PICKUP NOTICE -->
<tr><td style="padding:16px 28px 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="background:#ecfdf5;border-left:3px solid #10b981;padding:14px 16px;font-size:13px;color:#065f46;line-height:1.6;">
      <strong>Pickup Reminder:</strong> Our team will call <strong>${p.customerPhone}</strong> to arrange your collection time. This is a <strong>takeaway order</strong> &mdash; no delivery at this time.
    </td></tr>
  </table>
</td></tr>

<!-- SUPPORT -->
<tr><td style="padding:16px 28px 24px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="background:#fdf2f8;border-radius:10px;padding:16px;text-align:center;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#be185d;">Need help? We are just a call away</p>
      <p style="margin:0;font-size:12px;color:#9ca3af;">${siteInfo.phone} &nbsp;&middot;&nbsp; ${siteInfo.hours.note}</p>
    </td></tr>
  </table>
</td></tr>`;

  return wrap(content);
}


// ══════════════════════════════════════════════════════════════════
//  2. CONTACT FORM → to client, reply-to customer
// ══════════════════════════════════════════════════════════════════
export interface ContactEmailParams {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const subjectConfig: Record<string, { letter: string; bg: string; color: string; note: string }> = {
  'General Inquiry':    { letter: '?',  bg: '#ede9fe', color: '#7c3aed', note: 'Someone has a general question for you.' },
  'Custom Order':       { letter: 'CO', bg: '#fce7f3', color: '#be185d', note: 'Someone wants to place a custom dessert order!' },
  'Bulk / Event Order': { letter: 'EV', bg: '#fef3c7', color: '#92400e', note: 'Big order! Someone needs mousse for an event.' },
  'Feedback':           { letter: 'FB', bg: '#ecfdf5', color: '#065f46', note: 'A customer has left you some feedback.' },
  'Other':              { letter: 'Hi', bg: '#ede9fe', color: '#7c3aed', note: 'A new message has arrived via the website.' },
};

export function buildContactEmail(p: ContactEmailParams): string {
  const cfg = subjectConfig[p.subject] || subjectConfig['Other'];

  const content = `
<!-- SUBJECT BANNER -->
<tr>
  <td style="background:#f5f3ff;padding:24px 28px 18px;text-align:center;border-bottom:2px dashed #fce7f3;">
    <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:10px;"><tr>
      <td width="52" height="52" align="center" valign="middle"
        style="width:52px;height:52px;background:${cfg.bg};border-radius:14px;font-size:18px;font-weight:800;color:${cfg.color};line-height:52px;text-align:center;">
        ${cfg.letter}
      </td>
    </tr></table>
    <h2 style="margin:0;font-size:18px;font-weight:700;color:#111827;">${p.subject}</h2>
    <p style="margin:6px 0 0;font-size:13px;color:#6b7280;">${cfg.note}</p>
  </td>
</tr>

<!-- SENDER DETAILS -->
<tr><td style="padding:24px 28px 0;">
  ${heading('Sender Details')}
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf9ff;border-radius:10px;padding:12px 14px;">
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('Name', p.name)}
        ${row('Email', `<a href="mailto:${p.email}" style="color:#ec4899;text-decoration:none;">${p.email}</a>`)}
        ${row('Phone', p.phone || '<span style="color:#9ca3af;font-style:italic;">Not provided</span>')}
        ${row('Subject', p.subject)}
      </table>
    </td></tr>
  </table>
</td></tr>

<!-- MESSAGE -->
<tr><td style="padding:20px 28px 0;">
  ${heading('Message')}
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="background:#f9fafb;border-left:3px solid ${cfg.color};padding:14px 16px;font-size:13px;color:#374151;line-height:1.8;white-space:pre-wrap;">
      ${p.message}
    </td></tr>
  </table>
</td></tr>

<!-- REPLY CTA -->
<tr><td style="padding:20px 28px 28px;text-align:center;">
  <table cellpadding="0" cellspacing="0" align="center"><tr>
    <td bgcolor="#ec4899" style="background:linear-gradient(135deg,#ec4899,#a855f7);border-radius:30px;">
      <a href="mailto:${p.email}?subject=Re: ${encodeURIComponent(p.subject)} - Moussestruck"
         style="display:block;color:#ffffff;font-size:14px;font-weight:700;padding:13px 30px;text-decoration:none;">
        Reply to ${p.name}
      </a>
    </td>
  </tr></table>
  <p style="margin:10px 0 0;font-size:12px;color:#9ca3af;">Or call: ${p.phone || 'no phone provided'}</p>
</td></tr>`;

  return wrap(content);
}


// ══════════════════════════════════════════════════════════════════
//  3. NEWSLETTER WELCOME → to subscriber
// ══════════════════════════════════════════════════════════════════
export function buildNewsletterEmail(subscriberEmail: string): string {

  // Perk rows — using colored letter badges instead of emoji
  const perks = [
    { letter: 'N', bg: '#fce7f3', color: '#be185d', title: 'New Flavours First',   desc: 'Be the first to know when we drop exciting new mousse creations.' },
    { letter: '%', bg: '#fef3c7', color: '#92400e', title: 'Exclusive Discounts',  desc: 'Subscriber-only deals and special offers just for you.' },
    { letter: 'S', bg: '#ecfdf5', color: '#065f46', title: 'Seasonal Specials',    desc: 'Limited-edition festive and seasonal collections.' },
    { letter: 'B', bg: '#ede9fe', color: '#7c3aed', title: 'Behind the Scenes',    desc: 'Sneak peeks into how your favourite mousses are made.' },
  ].map(p => `
  <tr>
    ${bullet(p.letter, p.bg, p.color)}
    <td style="padding:8px 0 8px 12px;vertical-align:top;border-bottom:1px solid #fce7f3;">
      <p style="margin:0;font-size:14px;font-weight:700;color:#111827;">${p.title}</p>
      <p style="margin:3px 0 0;font-size:13px;color:#6b7280;">${p.desc}</p>
    </td>
  </tr>`).join('');

  const name = subscriberEmail.split('@')[0];

  const content = `
<!-- WELCOME HERO -->
<tr>
  <td style="background:#fdf2f8;padding:32px 28px 20px;text-align:center;border-bottom:2px dashed #fce7f3;">
    <h2 style="margin:0;font-size:22px;font-weight:800;color:#111827;">You're in the sweet club!</h2>
    <p style="margin:10px auto 0;font-size:14px;color:#6b7280;max-width:380px;line-height:1.6;">
      Welcome to the Moussestruck family, <strong>${name}</strong>! Get ready for some seriously delicious news.
    </p>
  </td>
</tr>

<!-- PERKS -->
<tr><td style="padding:24px 28px 0;">
  ${heading('What\'s Coming Your Way')}
  <table width="100%" cellpadding="0" cellspacing="0">
    ${perks}
  </table>
</td></tr>

<!-- CTA BOX -->
<tr><td style="padding:20px 28px 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td bgcolor="#ec4899" style="background:linear-gradient(135deg,#ec4899,#a855f7);border-radius:12px;padding:22px;text-align:center;">
        <p style="margin:0 0 4px;color:rgba(255,255,255,0.8);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Craving something sweet?</p>
        <p style="margin:0 0 14px;color:#ffffff;font-size:17px;font-weight:800;">Order your mousse today!</p>
        <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">${siteInfo.phone}</p>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.65);font-size:12px;">${siteInfo.hours.note} &nbsp;&middot;&nbsp; Takeaway only</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- INSTAGRAM -->
<tr><td style="padding:20px 28px;text-align:center;">
  <table cellpadding="0" cellspacing="0" align="center"><tr>
    <td style="background:#fce7f3;border-radius:24px;">
      <a href="https://www.instagram.com/moussestruck/"
         style="display:block;color:#be185d;font-size:13px;font-weight:700;padding:10px 24px;text-decoration:none;">
        @moussestruck on Instagram
      </a>
    </td>
  </tr></table>
  <p style="margin:14px 0 0;font-size:11px;color:#d1d5db;line-height:1.5;">
    You are receiving this because you subscribed at moussestruck.com.<br/>
    To unsubscribe reply to this email with "Unsubscribe".
  </p>
</td></tr>`;

  return wrap(content);
}


// ══════════════════════════════════════════════════════════════════
//  4. NEW SUBSCRIBER ALERT → to client
// ══════════════════════════════════════════════════════════════════
export function buildNewSubscriberEmail(subscriberEmail: string): string {

  const content = `
<!-- HERO -->
<tr>
  <td style="background:#ecfdf5;padding:32px 28px 20px;text-align:center;border-bottom:2px dashed #a7f3d0;">
    <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom:14px;"><tr>
      <td width="56" height="56" align="center" valign="middle"
        style="width:56px;height:56px;background:#d1fae5;border-radius:50%;font-size:22px;font-weight:800;color:#065f46;line-height:56px;text-align:center;">
        +1
      </td>
    </tr></table>
    <h2 style="margin:0;font-size:20px;font-weight:800;color:#111827;">New Newsletter Subscriber!</h2>
    <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">Someone just joined your sweet community.</p>
  </td>
</tr>

<!-- SUBSCRIBER DETAILS -->
<tr><td style="padding:24px 28px;">
  ${heading('Subscriber Details')}
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:18px;text-align:center;">
      <p style="margin:0;font-size:16px;font-weight:700;color:#065f46;">${subscriberEmail}</p>
      <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
        Subscribed on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </td></tr>
  </table>
  <p style="margin:14px 0 0;font-size:12px;color:#9ca3af;text-align:center;">
    A welcome email has been sent to this subscriber automatically.
  </p>
</td></tr>`;

  return wrap(content);
}
