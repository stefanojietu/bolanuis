import { OFFICE_CONTACT } from '../data/ecosystemData';

export interface EnquiryPayload {
  subject: string;
  name: string;
  email: string;
  fields: Record<string, string>;
}

export interface SendEnquiryResult {
  ok: boolean;
  error?: string;
}

export async function sendEnquiryToEmail(payload: EnquiryPayload): Promise<SendEnquiryResult> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${OFFICE_CONTACT.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _replyto: payload.email,
        _subject: payload.subject,
        _template: 'table',
        _captcha: 'false',
        ...payload.fields,
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean | string;
      message?: string;
    } | null;

    if (!response.ok || data?.success === false || data?.success === 'false') {
      return {
        ok: false,
        error:
          data?.message ||
          'Unable to send directly right now. Please use the email app button below or WhatsApp.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        'Network error while sending enquiry. Please use the email app button below or WhatsApp.',
    };
  }
}

export function buildMailtoHref(subject: string, fields: Record<string, string>): string {
  const bodyLines = Object.entries(fields)
    .filter(([, value]) => Boolean(value && value.trim()))
    .map(([key, value]) => `${key}: ${value}`);

  return `mailto:${OFFICE_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join('\n')
  )}`;
}
