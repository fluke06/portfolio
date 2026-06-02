'use client';
import { useState } from 'react';
import { StickyNav } from '@/components/sticky-nav';
import { FadeIn } from '@/components/fade-in';
import { FooterSection } from '@/components/footer-section';

type Kind = 'project' | 'collab' | 'job' | 'hello';

const KIND_LABELS: Record<Kind, string> = {
  project: 'A project',
  collab:  'Collab',
  job:     'A role',
  hello:   'Just saying hi',
};

const CONTACT_META = [
  { label: 'Email',    href: 'mailto:chris@slogin.io',                                   text: 'chris@slogin.io' },
  { label: 'GitHub',  href: 'https://github.com/fluke06',        target: '_blank',       text: 'github.com/fluke06' },
  { label: 'LinkedIn',href: 'https://www.linkedin.com/in/christian-dizon-7a1151267', target: '_blank', text: 'christian-dizon' },
  { label: 'Location',href: undefined,                                                    text: 'Quezon City, PH' },
];

const INPUT =
  'w-full bg-transparent border-b border-[rgba(237,232,224,0.15)] text-[#EDE8E0] placeholder-[#7A7570] font-inter font-light py-3 outline-none focus:border-[#EDE8E0] transition-colors duration-200';

export default function ContactPage() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ name: '', email: '', message: '', kind: 'project' as Kind });

  const update = (k: keyof typeof form, v: string) =>
    setForm(f => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#100F0D]">
      <StickyNav alwaysVisible />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 px-5 sm:px-8 md:px-10 pb-14 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.05} y={32}>
            <h1
              className="font-fraunces font-black tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 0.92 }}
            >
              <span className="text-[#EDE8E0] block">Send a</span>
              <em className="italic text-[#EDE8E0] block">note.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} y={20}>
            <p
              className="font-inter font-light text-[#7A7570] mt-5 max-w-md leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
            >
              I read everything. I reply within a day, usually less.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main */}
      <div
        className="px-5 sm:px-8 md:px-10 pb-24 sm:pb-32"
        style={{ borderTop: '1px solid rgba(237,232,224,0.08)' }}
      >
        <div className="max-w-7xl mx-auto pt-12 sm:pt-16">
          {sent ? (
            /* Sent state */
            <FadeIn y={20}>
              <div className="max-w-lg">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-8"
                  style={{ background: 'rgba(184,122,60,0.15)', border: '1px solid rgba(184,122,60,0.35)' }}
                >
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="#EDE8E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10 L8 14 L16 6" />
                  </svg>
                </div>
                <h2
                  className="font-fraunces font-black text-[#EDE8E0] mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}
                >
                  Got it.
                </h2>
                <p className="font-inter font-light text-[#7A7570] leading-relaxed mb-8"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}
                >
                  Thanks for writing in, {form.name || 'friend'}. I'll get back to you within a day, usually less.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '', kind: 'project' }); }}
                  className="font-inter font-medium text-[#7A7570] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
                >
                  Send another note
                </button>
              </div>
            </FadeIn>
          ) : (
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 xl:gap-32">

              {/* Aside */}
              <FadeIn delay={0.05} y={20} className="lg:w-64 xl:w-72 flex-shrink-0">
                <div className="flex flex-col gap-10">
                  {/* Contact meta */}
                  <div className="flex flex-col gap-5">
                    {CONTACT_META.map(({ label, href, target, text }) => (
                      <div key={label}>
                        <p
                          className="font-inter font-medium text-[#7A7570] uppercase mb-1"
                          style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                        >
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={target}
                            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="font-inter font-light text-[#EDE8E0] hover:text-[#EDE8E0] transition-colors duration-200"
                            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}
                          >
                            {text}
                          </a>
                        ) : (
                          <p className="font-inter font-light text-[#EDE8E0]"
                            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1rem)' }}
                          >
                            {text}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Availability */}
                  <div
                    className="p-5 rounded-2xl"
                    style={{ background: 'rgba(184,122,60,0.06)', border: '1px solid rgba(184,122,60,0.18)' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: '#EDE8E0' }}
                      />
                      <span
                        className="font-inter font-medium text-[#EDE8E0] uppercase"
                        style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                      >
                        Status
                      </span>
                    </div>
                    <p
                      className="font-inter font-medium text-[#EDE8E0] mb-2"
                      style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)' }}
                    >
                      Employed · open to interesting work
                    </p>
                    <p
                      className="font-inter font-light text-[#7A7570] leading-relaxed"
                      style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.875rem)' }}
                    >
                      Full-time at Straight Login Inc. Not actively looking, but happy to talk about ambitious side work or a strong role.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Form */}
              <FadeIn delay={0.12} y={20} className="flex-1 max-w-xl">
                <form onSubmit={onSubmit} className="flex flex-col gap-8">

                  {/* Kind selector */}
                  <div>
                    <p
                      className="font-inter font-medium text-[#7A7570] uppercase mb-3"
                      style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      What is this about?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(KIND_LABELS) as Kind[]).map(k => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => update('kind', k)}
                          className="font-inter font-medium text-sm rounded-full px-4 py-2 transition-all duration-200"
                          style={{
                            background: form.kind === k ? '#EDE8E0' : 'transparent',
                            color:      form.kind === k ? '#100F0D' : '#7A7570',
                            border:     form.kind === k
                              ? '1px solid #EDE8E0'
                              : '1px solid rgba(184,122,60,0.25)',
                          }}
                        >
                          {KIND_LABELS[k]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="font-inter font-medium text-[#7A7570] uppercase block mb-3"
                      style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      className={INPUT}
                      style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
                      value={form.name}
                      required
                      placeholder="Maria Reyes"
                      onChange={e => update('name', e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="font-inter font-medium text-[#7A7570] uppercase block mb-3"
                      style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={INPUT}
                      style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
                      value={form.email}
                      required
                      placeholder="you@example.com"
                      onChange={e => update('email', e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="font-inter font-medium text-[#7A7570] uppercase block mb-3"
                      style={{ fontSize: '10px', letterSpacing: '0.1em' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className={INPUT + ' resize-none'}
                      style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)' }}
                      value={form.message}
                      required
                      rows={5}
                      placeholder="Tell me what you're working on and what you'd like help with."
                      onChange={e => update('message', e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-5 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 font-inter font-medium text-sm px-7 py-3 rounded-full transition-opacity duration-200 hover:opacity-85 disabled:opacity-50"
                      style={{ background: '#EDE8E0', color: '#100F0D', minHeight: 44 }}
                    >
                      {loading ? 'Sending…' : 'Send the note'}
                      {!loading && (
                        <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 13 L13 3 M7 3 H13 V9" />
                        </svg>
                      )}
                    </button>
                    <p className="font-inter font-light text-[#7A7570]" style={{ fontSize: '12px' }}>
                      Not a form bot. Pinky promise.
                    </p>
                  </div>

                </form>
              </FadeIn>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
