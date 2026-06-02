import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message, kind } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Log to console (works in Vercel logs for now)
  // To enable email: set RESEND_API_KEY in .env.local and uncomment below
  console.log('[Contact form]', { name, email, kind, message: message.slice(0, 100) });

  /*
  // Uncomment to enable email via Resend:
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Portfolio <contact@yourdomain.com>',
    to: 'cdizon1048@gmail.com',
    subject: `[${kind}] from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  */

  return NextResponse.json({ ok: true });
}
