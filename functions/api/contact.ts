export const onRequestPost = async (context: {
  request: Request;
  env: { RESEND_API_KEY?: string };
}) => {
  const body = await context.request.json() as {
    name?: string;
    email?: string;
    message?: string;
    kind?: string;
  };
  const { name, email, message, kind } = body;

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (context.env.RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <contact@christiandizon.dev>',
        to: 'chris@slogin.io',
        subject: `[${kind}] from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });
  }

  return Response.json({ ok: true });
};
