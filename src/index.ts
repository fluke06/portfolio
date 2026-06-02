interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      const body = await request.json() as {
        name?: string;
        email?: string;
        message?: string;
        kind?: string;
      };
      const { name, email, message, kind } = body;

      if (!name || !email || !message) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 });
      }

      if (env.RESEND_API_KEY) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
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
    }

    return env.ASSETS.fetch(request);
  },
};
