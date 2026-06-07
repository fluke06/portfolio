'use client';

import { useState, useRef, useEffect } from 'react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700', '900'] });

const C = {
  brand:     '#FF1F8E',  // PIXL Pink — single signature color
  brandDark: '#B8005A',
  bg:        '#080012',
  neon:      '#FF00CC',
  winGray:   '#DDD0E8',
  winBorder: '#B890C4',
  inkDark:   '#1A0028',
  inkMuted:  '#8868A0',
  winBlue:   '#0044AA',
};

const STARS = [
  { top: '6%',  left: '10%', size: 3, delay: '0s',   shape: '✦' },
  { top: '13%', left: '26%', size: 2, delay: '0.4s',  shape: '·' },
  { top: '4%',  left: '53%', size: 4, delay: '0.8s',  shape: '✦' },
  { top: '19%', left: '70%', size: 2, delay: '0.2s',  shape: '·' },
  { top: '28%', left: '86%', size: 3, delay: '1.1s',  shape: '✦' },
  { top: '11%', left: '43%', size: 2, delay: '0.6s',  shape: '·' },
  { top: '36%', left: '16%', size: 2, delay: '1.4s',  shape: '·' },
  { top: '23%', left: '63%', size: 3, delay: '0.3s',  shape: '✦' },
  { top: '40%', left: '38%', size: 2, delay: '0.9s',  shape: '·' },
  { top: '17%', left: '80%', size: 4, delay: '0.7s',  shape: '✦' },
  { top: '33%', left: '90%', size: 2, delay: '1.6s',  shape: '·' },
  { top: '8%',  left: '33%', size: 3, delay: '1.2s',  shape: '✦' },
  { top: '26%', left: '4%',  size: 2, delay: '0.5s',  shape: '·' },
  { top: '43%', left: '56%', size: 2, delay: '1.8s',  shape: '·' },
  { top: '21%', left: '48%', size: 3, delay: '1.0s',  shape: '✦' },
  { top: '9%',  left: '77%', size: 2, delay: '2.1s',  shape: '·' },
  { top: '31%', left: '60%', size: 2, delay: '0.7s',  shape: '·' },
  { top: '16%', left: '20%', size: 3, delay: '1.5s',  shape: '✦' },
];

const PRODUCTS = [
  { img: '/playground/pixl/products/necklace.png',    name: 'PiXL Drop',     sub: 'Logo Ball Chain',      price: '$28', size: '22 KB', type: 'Necklace', badge: 'NEW', desc: 'Holographic PIXL pendant on silver ball chain with heart + star charms' },
  { img: '/playground/pixl/products/phone-charm.png', name: 'Dial Thirst',   sub: 'Phone Charm Strap',    price: '$22', size: '16 KB', type: 'Charm',    badge: 'HOT', desc: 'PIXL logo strap + pixel heart, GameBoy & orb charms' },
  { img: '/playground/pixl/products/ring-pixl.png',   name: 'Signed In',     sub: 'PIXL Signet Ring',     price: '$26', size: '18 KB', type: 'Ring',     badge: null,  desc: 'Holographic signet ring, PIXL inset logo + floppy & GameBoy art' },
  { img: '/playground/pixl/products/ring-heart.png',  name: '8-Bit Babe',    sub: 'Pixel Heart Ring',     price: '$24', size: '14 KB', type: 'Ring',     badge: null,  desc: 'Holographic signet ring, pixel heart + floppy & GameBoy inset' },
  { img: '/playground/pixl/products/bracelet.png',    name: 'Ctrl+Alt+Cute', sub: 'Y2K Charm Bracelet',   price: '$32', size: '28 KB', type: 'Bracelet', badge: 'LOW', desc: 'Silver bracelet — robot, music note, pixel heart, floppy, flip phone charms' },
  { img: '/playground/pixl/products/lighter.png',     name: 'Fire.exe',      sub: 'Holographic Lighter',  price: '$38', size: '34 KB', type: 'Collab',   badge: 'NEW', desc: 'Chrome holographic Zippo — PIXL logo + Y2K sticker sheet included' },
];

const BADGE: Record<string, { bg: string }> = {
  NEW: { bg: '#FF1F8E' },
  HOT: { bg: '#CC0030' },
  LOW: { bg: '#CC6600' },
};

const TICKER = '✦ FRIDAY DROP: PiXL Drop Necklace — 4 LEFT ✦ NEW: Fire.exe Lighter just dropped ✦ Ctrl+Alt+Cute Bracelet LOW STOCK ✦ Free shipping $35+ ✦ PIXL — for people who peaked on AIM and aren\'t sorry ✦ No restocks. No repeats. ✦';

// ── Shared title-bar chrome ────────────────────────────────────────────────

const TB_GRAD = 'linear-gradient(90deg, #B8005A 0%, #FF1F8E 35%, #FF60AA 60%, #FF1F8E 80%, #B8005A 100%)';

const winBtnBase: React.CSSProperties = {
  width: 19, height: 19,
  border: '2px solid', borderColor: '#F0D8F8 #5A1070 #5A1070 #F0D8F8',
  background: 'linear-gradient(135deg, #E890D8 0%, #CC50B8 50%, #AA2090 100%)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', fontSize: 10, color: '#fff', fontWeight: 900, flexShrink: 0,
};

const closeBtnStyle = { ...winBtnBase, background: 'linear-gradient(135deg, #FF6060 0%, #DD2020 100%)' };

function PixlLogo({ height = 44 }: { height?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/pixl-logo.png" alt="PIXL" style={{ height, flexShrink: 0 }} />
  );
}

function PixlMark({ size = 16, color = '#FF1F8E' }: { size?: number; color?: string }) {
  // pixel X — ties to the X in PIXL
  const px = [
    [0,0],[4,0],[1,1],[3,1],[2,2],[1,3],[3,3],[0,4],[4,4],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 5 5" shapeRendering="crispEdges" style={{ flexShrink: 0 }}>
      {px.map(([x, y], i) => <rect key={i} x={x} y={y} width={1} height={1} fill={color} />)}
    </svg>
  );
}

function TitleBar({ title, icon, onTitleMouseDown, onClose }: {
  title: string; icon?: string;
  onTitleMouseDown?: (e: React.MouseEvent) => void;
  onClose?: () => void;
}) {
  return (
    <div style={{
      background: TB_GRAD, padding: '3px 4px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      userSelect: 'none' as const, flexShrink: 0,
      cursor: onTitleMouseDown ? 'move' : 'default',
    }} onMouseDown={onTitleMouseDown}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
          {title}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        <div style={winBtnBase}>─</div>
        <div style={winBtnBase}>□</div>
        <div style={closeBtnStyle} onClick={onClose}>✕</div>
      </div>
    </div>
  );
}

function MenuBar({ items }: { items: string[] }) {
  return (
    <div style={{
      background: C.winGray, borderBottom: `1px solid ${C.winBorder}`,
      display: 'flex', padding: '2px 4px', flexShrink: 0,
    }}>
      {items.map(item => (
        <span key={item} style={{ fontSize: 12, padding: '2px 8px', cursor: 'default', color: C.inkDark }}>
          {item}
        </span>
      ))}
    </div>
  );
}

function WinBtn({ children, primary, onClick }: {
  children: React.ReactNode; primary?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick} style={{
      border: '2px solid',
      borderColor: primary ? `#F8C0FF #4A0066 #4A0066 #F8C0FF` : `#F0E4F0 #8060A0 #8060A0 #F0E4F0`,
      background: primary
        ? `linear-gradient(180deg, #FF80D0 0%, ${C.brand} 50%, #8800BB 100%)`
        : 'linear-gradient(180deg, #EEE0F4 0%, #CCC0DC 100%)',
      color: primary ? '#fff' : C.inkDark,
      fontWeight: 700, fontSize: 12, padding: '4px 18px', cursor: 'pointer',
      fontFamily: 'inherit', textShadow: primary ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
    }}>
      {children}
    </button>
  );
}

function StatusBar({ text }: { text: string }) {
  return (
    <div style={{
      background: C.winGray, borderTop: `1px solid ${C.winBorder}`,
      padding: '2px 8px', fontSize: 11, color: C.inkMuted, flexShrink: 0,
    }}>
      {text}
    </div>
  );
}

function DesktopIcon({ icon, label, badge }: { icon: string; label: string; badge?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 72, padding: '4px 2px', position: 'relative' }}>
      <span style={{ fontSize: 34, lineHeight: 1 }}>{icon}</span>
      {badge && (
        <span style={{
          position: 'absolute', top: 0, right: 6,
          background: C.brand, color: '#fff', fontSize: 8, fontWeight: 900,
          borderRadius: '50%', width: 14, height: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid #fff',
        }}>{badge}</span>
      )}
      <span style={{
        color: '#fff', fontSize: 11, textAlign: 'center',
        textShadow: '1px 1px 3px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.9)',
        lineHeight: 1.3, wordBreak: 'break-word' as const,
      }}>{label}</span>
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState('4:58 PM');
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = d.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m} ${d.getHours() >= 12 ? 'PM' : 'AM'}`);
    };
    fmt();
    const id = setInterval(fmt, 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

// ── Draggable window base ─────────────────────────────────────────────────

interface DWProps {
  id: string;
  title: string;
  icon?: string;
  menuItems?: string[];
  children: React.ReactNode;
  style?: React.CSSProperties;
  initXFrac: number;
  initY: number;
  zIdx: number;
  onFocus: () => void;
  onClose?: () => void;
  msnTitleBar?: boolean;
  centerX?: boolean;
}

function DWin({
  title, icon, menuItems, children, style,
  initXFrac, initY, zIdx, onFocus, onClose, msnTitleBar, centerX,
}: DWProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPos({ x: Math.round(window.innerWidth * initXFrac), y: initY });
    if (centerX) {
      requestAnimationFrame(() => {
        if (elRef.current) {
          const w = elRef.current.offsetWidth;
          setPos({ x: Math.max(0, Math.round((window.innerWidth - w) / 2)), y: initY });
        }
      });
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!pos) return null;

  const onTitleDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const tbStyle: React.CSSProperties = msnTitleBar
    ? { background: 'linear-gradient(90deg, #1144CC 0%, #2266EE 50%, #1144CC 100%)', padding: '3px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' as const, cursor: 'move', flexShrink: 0 }
    : { background: TB_GRAD, padding: '3px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' as const, cursor: 'move', flexShrink: 0 };

  return (
    <div
      ref={elRef}
      onMouseDown={onFocus}
      style={{
        position: 'absolute', left: pos.x, top: pos.y, zIndex: zIdx,
        border: '2px solid', borderColor: `#F4D8FF #4A0066 #4A0066 #F4D8FF`,
        boxShadow: `4px 4px 0 ${C.inkDark}, 0 12px 40px rgba(0,0,0,0.75)`,
        background: C.winGray, display: 'flex', flexDirection: 'column',
        overflow: 'hidden', animation: 'winEntrance 0.22s ease-out',
        ...style,
      }}
    >
      <div style={tbStyle} onMouseDown={onTitleDown}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {icon && <span style={{ fontSize: 13 }}>{icon}</span>}
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 11, textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
            {title}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ ...winBtnBase, width: 16, height: 16, fontSize: 8, ...(msnTitleBar ? { background: 'linear-gradient(135deg,#4488FF,#1155DD)' } : {}) }}>─</div>
          <div style={{ ...winBtnBase, width: 16, height: 16, fontSize: 8, background: 'linear-gradient(135deg,#FF6060,#DD2020)' }} onClick={onClose}>✕</div>
        </div>
      </div>
      {menuItems && <MenuBar items={menuItems} />}
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function PixlClient() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(800);
  const [winOrder, setWinOrder] = useState(['warn', 'cd', 'msn', 'run', 'hero', 'shop', 'about', 'newsletter']);
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [cartCount, setCartCount] = useState(0);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  const [emailVal, setEmailVal] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const front = (id: string) => setWinOrder(prev => [...prev.filter(w => w !== id), id]);
  const close = (id: string) => setClosed(prev => new Set([...prev, id]));
  const zOf = (id: string) => 100 + winOrder.indexOf(id) * 5;

  const addCart = (name: string) => {
    setCartCount(c => c + 1);
    setAddedProduct(name);
    setTimeout(() => setAddedProduct(null), 2400);
  };

  // Scroll thresholds — windows appear sequentially
  const showShop = scrollY > vh * 0.75 && !closed.has('shop');
  const showAbout = scrollY > vh * 2.1 && !closed.has('about');
  const showNewsletter = scrollY > vh * 3.6 && !closed.has('newsletter');
  const scrollFrac = Math.min(1, scrollY / (vh * 5));

  // Auto-front each window the moment it first appears
  useEffect(() => { if (showShop) front('shop'); }, [showShop]);       // eslint-disable-line
  useEffect(() => { if (showAbout) front('about'); }, [showAbout]);     // eslint-disable-line
  useEffect(() => { if (showNewsletter) front('newsletter'); }, [showNewsletter]); // eslint-disable-line

  const taskBtns = [
    { id: 'hero', icon: '💾', label: 'PIXL', show: !closed.has('hero') },
    { id: 'shop', icon: '📁', label: 'Friday Drop', show: showShop },
    { id: 'about', icon: '📝', label: 'about.txt', show: showAbout },
    { id: 'newsletter', icon: '📬', label: 'Subscribe', show: showNewsletter },
  ].filter(b => b.show);

  return (
    <div className={nunito.className}>
      <style>{`
        @keyframes twinkleStar {
          0%, 100% { opacity: 0.9; }
          45% { opacity: 0.08; }
          60% { opacity: 1; filter: brightness(1.6); }
        }
        @keyframes gridScroll {
          from { background-position: 0 0; }
          to   { background-position: 0 48px; }
        }
        @keyframes horizonPulse {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 1; filter: brightness(1.5); }
        }
        @keyframes marquee {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-100%); }
        }
        @keyframes winEntrance {
          from { opacity: 0; transform: scale(0.93) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollHint {
          0%,100%{opacity:0.6;transform:translateX(-50%) translateY(0)}
          50%{opacity:1;transform:translateX(-50%) translateY(6px)}
        }
        @keyframes scrollBounce {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(6px)}
        }
        @keyframes balloonIn {
          from{opacity:0;transform:translateX(-50%) scale(0.85) translateY(8px)}
          to{opacity:1;transform:translateX(-50%) scale(1) translateY(0)}
        }
        .d-icon { border:1px solid transparent; border-radius:2px; transition:all 0.1s; }
        .d-icon:hover { background:rgba(255,100,200,0.32); border-color:rgba(255,200,255,0.55); cursor:pointer; }
        .tb-btn { transition:background 0.1s; }
        .tb-btn:hover { background:linear-gradient(180deg,#BB00DD 0%,#880099 100%) !important; }
        .win-link { color:${C.winBlue}; text-decoration:underline; cursor:pointer; font-size:11px; }
        .win-link:hover { color:${C.brand} !important; }
        .p-card { transition:border-color 0.15s,box-shadow 0.15s,background 0.15s; cursor:pointer; }
        .p-card:hover { border-color:${C.neon} !important; box-shadow:0 0 16px rgba(255,0,204,0.5) !important; background:#ECD8F4 !important; }
        .p-card.sel { border-color:#0055A4 !important; background:#D0E8FF !important; }
        input:focus { outline:2px solid ${C.neon}; outline-offset:0; }
        .back-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .back-btn:hover { transform: translate(-2px, -2px) !important; box-shadow: 6px 6px 0 ${C.brand} !important; }
      `}</style>

      {/* Page height — gives the body scroll room */}
      <div style={{ height: '600vh' }} aria-hidden="true" />

      {/* Fixed desktop — never moves */}
      <div style={{
        position: 'fixed', inset: 0, height: '100dvh',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        zIndex: 10,
      }}>

          {/* ════════════════════════════════════════
              DESKTOP AREA
          ════════════════════════════════════════ */}
          <div style={{
            flex: 1, position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(180deg,#040010 0%,#120030 10%,#2E0060 22%,#5A0080 35%,#880060 48%,#AA0050 60%,#CC1060 72%,#E83070 82%,#F87090 91%,#FFB0C8 97%)',
          }}>
            {/* Stars */}
            {STARS.map((s, i) => (
              <div key={i} style={{
                position: 'absolute', top: s.top, left: s.left, zIndex: 1,
                fontSize: s.size * 4, lineHeight: 1, color: '#fff',
                animation: `twinkleStar ${2 + i * 0.13}s ${s.delay} infinite ease-in-out`,
                textShadow: '0 0 6px rgba(255,220,255,0.8)',
                pointerEvents: 'none',
              }}>{s.shape}</div>
            ))}

            {/* Scanlines */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)',
            }} />

            {/* Neon grid */}
            <div style={{ position: 'absolute', bottom: 70, left: 0, right: 0, height: '42%', overflow: 'hidden', zIndex: 1 }}>
              <div style={{
                position: 'absolute', bottom: 0, left: '-50%', right: '-50%', height: '100%',
                backgroundImage: 'repeating-linear-gradient(90deg,rgba(255,0,204,0.55) 0px,rgba(255,0,204,0.55) 1px,transparent 1px,transparent 7%)',
                transform: 'perspective(220px) rotateX(60deg)', transformOrigin: 'center top',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: '-50%', right: '-50%', height: '100%',
                backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,0,204,0.5) 0px,rgba(255,0,204,0.5) 1px,transparent 1px,transparent 48px)',
                transform: 'perspective(220px) rotateX(60deg)', transformOrigin: 'center top',
                animation: 'gridScroll 1.6s linear infinite',
              }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: C.neon,
                boxShadow: `0 0 12px ${C.neon},0 0 30px rgba(255,0,204,0.6)`,
                animation: 'horizonPulse 2s ease-in-out infinite',
              }} />
            </div>

            {/* Marquee ticker */}
            <div style={{
              position: 'absolute', bottom: 48, left: 0, right: 0, height: 22, zIndex: 12,
              background: 'rgba(40,0,70,0.9)',
              borderTop: '1px solid rgba(255,0,204,0.4)',
              overflow: 'hidden', display: 'flex', alignItems: 'center',
            }}>
              <span style={{
                color: C.neon, fontSize: 11, whiteSpace: 'nowrap' as const,
                fontFamily: '"Courier New",monospace', letterSpacing: 0.5,
                animation: 'marquee 22s linear infinite',
                textShadow: `0 0 8px ${C.neon}`,
              }}>{TICKER}</span>
            </div>

            {/* Desktop icons */}
            <div style={{ position: 'absolute', top: 6, left: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { icon: '💻', label: 'My Computer' },
                { icon: '💜', label: 'PIXL Shop', badge: '3' },
                { icon: '💿', label: 'Friday Drop' },
                { icon: '✨', label: 'About PIXL' },
                { icon: '🗑️', label: 'Recycle Bin' },
              ].map(d => (
                <div key={d.label} className="d-icon">
                  <DesktopIcon icon={d.icon} label={d.label} badge={d.badge} />
                </div>
              ))}
            </div>

            {/* ── SCROLL HINT — Windows XP notification balloon ── */}
            {scrollY < 280 && (
              <div style={{
                position: 'absolute', bottom: 76, left: '50%',
                zIndex: 35, pointerEvents: 'none',
                animation: scrollY < 5 ? 'balloonIn 0.3s ease-out forwards' : undefined,
              }}>
                {/* balloon body */}
                <div style={{
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(180deg,#ffffff 0%,#EEF4FF 100%)',
                  border: '2px solid #334',
                  padding: '8px 18px 8px 12px',
                  whiteSpace: 'nowrap' as const,
                  boxShadow: '2px 3px 8px rgba(0,0,0,0.55)',
                  display: 'flex', alignItems: 'center', gap: 8,
                  animation: 'scrollBounce 1.6s ease-in-out infinite',
                  position: 'relative',
                }}>
                  {/* close X */}
                  <span style={{ position: 'absolute', top: 2, right: 5, fontSize: 9, color: '#888', cursor: 'default' }}>✕</span>
                  <span style={{ fontSize: 18 }}>💾</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#111', lineHeight: 1.4 }}>Windows found new content!</div>
                    <div style={{ fontSize: 10, color: '#444' }}>Scroll down ↓ to open windows</div>
                  </div>
                  {/* balloon tail (pointing down) */}
                  <div style={{ position: 'absolute', bottom: -9, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '9px solid #334' }} />
                  <div style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '8px solid #EEF4FF' }} />
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════
                HERO WINDOW (always open)
            ══════════════════════════════════════ */}
            {!closed.has('hero') && (
              <DWin
                id="hero" title="PIXL — Y2K Tech Accessories" icon="💾"
                menuItems={['File', 'Edit', 'View', 'Favorites', 'Help']}
                initXFrac={0.25} initY={20}
                centerX
                zIdx={zOf('hero')} onFocus={() => front('hero')}
                onClose={() => close('hero')}
                style={{ width: 680, maxWidth: 'calc(100vw - 40px)' }}
              >
                {/* toolbar */}
                <div style={{ background: C.winGray, borderBottom: `1px solid ${C.winBorder}`, padding: '3px 6px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {['← Back', '→ Fwd', '↑ Up'].map(b => (
                    <button key={b} style={{ border: '2px solid', borderColor: `#F0E4F0 #8060A0 #8060A0 #F0E4F0`, background: 'linear-gradient(180deg,#EEE0F4,#CCC0DC)', fontSize: 11, padding: '1px 8px', cursor: 'pointer', color: C.inkDark, fontFamily: 'inherit' }}>{b}</button>
                  ))}
                  <div style={{ flex: 1, border: '2px solid', borderColor: `${C.inkDark} #D0B8E0 #D0B8E0 ${C.inkDark}`, background: '#fff', padding: '1px 6px', fontSize: 11, color: C.inkMuted, marginLeft: 8 }}>
                    C:\PIXL\Homepage
                  </div>
                </div>
                {/* hero content */}
                <div style={{ background: 'linear-gradient(160deg,#0C001E 0%,#220040 30%,#4A006A 55%,#880060 78%,#B8004A 100%)', padding: '28px 36px 24px', textAlign: 'center', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/pixl-logo.png" alt="PIXL" style={{ display: 'block', width: '80%', maxWidth: 500, height: 'auto', margin: '0 auto 8px' }} />
                  <p style={{ color: '#FFE4F0', fontSize: 18, fontWeight: 900, margin: '0 0 8px', letterSpacing: 1 }}>
                    MAKE YOUR PHONE JEALOUS.
                  </p>
                  <p style={{ color: 'rgba(220,160,200,0.85)', fontSize: 11, margin: '0 0 22px', lineHeight: 1.8 }}>
                    Limited-run jewelry for people who peaked<br />on AIM and aren&apos;t sorry about it.
                  </p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <WinBtn primary onClick={() => { window.scrollTo({ top: vh * 0.9, behavior: 'smooth' }); }}>✦ Shop the Drop</WinBtn>
                    <WinBtn onClick={() => { window.scrollTo({ top: vh * 3.8, behavior: 'smooth' }); }}>📬 Join the List</WinBtn>
                  </div>
                </div>
                <StatusBar text="6 items in Friday Drop 06.07  •  no restocks  •  no repeats" />
              </DWin>
            )}

            {/* ══════════════════════════════════════
                SHOP WINDOW — opens on scroll
            ══════════════════════════════════════ */}
            {showShop && (
              <DWin
                id="shop" title="C:\PIXL\FridayDrop — Windows Explorer" icon="📁"
                menuItems={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']}
                initXFrac={0.3} initY={22}
                zIdx={zOf('shop')} onFocus={() => front('shop')}
                onClose={() => close('shop')}
                style={{ width: 'min(820px, calc(100vw - 20px))' }}
              >
                <div style={{ background: C.winGray, borderBottom: `1px solid ${C.winBorder}`, padding: '3px 6px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {['← Back', '↑ Up', '🔍 Search', '📁 Folders'].map(b => (
                    <button key={b} style={{ border: '2px solid', borderColor: `#F0E4F0 #8060A0 #8060A0 #F0E4F0`, background: 'linear-gradient(180deg,#EEE0F4,#CCC0DC)', fontSize: 11, padding: '1px 8px', cursor: 'pointer', color: C.inkDark, fontFamily: 'inherit' }}>{b}</button>
                  ))}
                  <div style={{ flex: 1, border: '2px solid', borderColor: `${C.inkDark} #D0B8E0 #D0B8E0 ${C.inkDark}`, background: '#fff', padding: '1px 6px', fontSize: 11, color: C.inkMuted, marginLeft: 8 }}>
                    C:\PIXL\FridayDrop
                  </div>
                </div>
                <div style={{ display: 'flex', maxHeight: 360, overflow: 'hidden' }}>
                  {/* sidebar */}
                  <div style={{ width: 156, background: '#EEE0F8', borderRight: `1px solid ${C.winBorder}`, padding: '12px 10px', flexShrink: 0, overflowY: 'auto' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, margin: '0 0 6px', background: `linear-gradient(90deg,${C.brand},#FF50C0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>File and Folder Tasks</p>
                    {['✦ Add to cart', '🔖 Save wishlist', '🛒 View cart', '💌 Share'].map(l => (
                      <p key={l} className="win-link" style={{ margin: '5px 0' }}>{l}</p>
                    ))}
                    <div style={{ borderTop: `1px solid ${C.winBorder}`, margin: '12px 0 8px' }} />
                    <p style={{ fontSize: 11, fontWeight: 700, margin: '0 0 6px', background: `linear-gradient(90deg,${C.brand},#FF50C0)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Details</p>
                    {selectedProduct ? (
                      <div>
                        <p style={{ fontSize: 11, color: C.inkDark, margin: '0 0 6px', fontWeight: 700 }}>{selectedProduct}</p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <div style={{ width: '100%', aspectRatio: '1', background: '#0C0020', marginBottom: 6, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={PRODUCTS.find(p => p.name === selectedProduct)?.img} alt={selectedProduct ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <p style={{ fontSize: 10, color: C.inkMuted, margin: 0 }}>{PRODUCTS.find(p => p.name === selectedProduct)?.desc}</p>
                      </div>
                    ) : (
                      <p style={{ fontSize: 10, color: C.inkMuted, margin: 0 }}>Select an item</p>
                    )}
                  </div>
                  {/* grid */}
                  <div style={{ flex: 1, padding: 16, background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 10, overflowY: 'auto', alignContent: 'start' }}>
                    {PRODUCTS.map(p => (
                      <div
                        key={p.name}
                        className={`p-card${selectedProduct === p.name ? ' sel' : ''}`}
                        style={{ border: `2px solid ${C.winBorder}`, background: C.winGray, padding: 12, position: 'relative' }}
                        onClick={() => setSelectedProduct(p.name === selectedProduct ? null : p.name)}
                      >
                        {p.badge && (
                          <span style={{ position: 'absolute', top: 6, right: 6, background: BADGE[p.badge].bg, color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 5px' }}>{p.badge}</span>
                        )}
                        <div style={{ width: '100%', aspectRatio: '1', background: '#0C0020', marginBottom: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <p style={{ margin: '0 0 0', fontWeight: 900, fontSize: 13, color: C.inkDark }}>{p.name}</p>
                        <p style={{ margin: '0 0 3px', fontSize: 10, color: C.inkMuted, fontStyle: 'italic' }}>{p.sub}</p>
                        <p style={{ margin: '0 0 8px', fontSize: 10, color: C.inkMuted }}>{p.size}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 900, color: C.brand, fontSize: 14 }}>{p.price}</span>
                          <WinBtn primary onClick={() => addCart(p.name)}>+ Cart</WinBtn>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <StatusBar text={`${PRODUCTS.length} items  •  Friday Drop 06.07  •  Sort: Date Modified`} />
              </DWin>
            )}

            {/* ══════════════════════════════════════
                ABOUT WINDOW — opens on scroll
            ══════════════════════════════════════ */}
            {showAbout && (
              <DWin
                id="about" title="about.txt — Notepad" icon="📝"
                menuItems={['File', 'Edit', 'Format', 'View', 'Help']}
                initXFrac={0.03} initY={50}
                zIdx={zOf('about')} onFocus={() => front('about')}
                onClose={() => close('about')}
                style={{ width: 'min(720px, calc(100vw - 20px))' }}
              >
                <div style={{ display: 'flex', maxHeight: 320, overflow: 'hidden' }}>
                  <div style={{
                    flex: 1, padding: 24, overflowY: 'auto',
                    backgroundImage: 'repeating-linear-gradient(transparent,transparent 22px,rgba(180,130,220,0.25) 22px,rgba(180,130,220,0.25) 23px)',
                    backgroundSize: '100% 23px', backgroundPosition: '0 4px',
                  }}>
                    <div style={{ fontFamily: '"Courier New",monospace', fontSize: 13, color: C.inkDark, lineHeight: '23px' }}>
                      <p style={{ margin: 0, color: '#B8005A', fontWeight: 700 }}>// pixl.exe — about</p>
                      <p style={{ margin: 0 }}>&nbsp;</p>
                      <p style={{ margin: 0 }}>PIXL started in a dorm room with a</p>
                      <p style={{ margin: 0 }}>hot glue gun and too many CDs.</p>
                      <p style={{ margin: 0 }}>&nbsp;</p>
                      <p style={{ margin: 0 }}>We make limited-run Y2K jewelry</p>
                      <p style={{ margin: 0 }}>for people who remember dial-up,</p>
                      <p style={{ margin: 0 }}>peak AIM away messages, and</p>
                      <p style={{ margin: 0 }}>mall photo booths.</p>
                      <p style={{ margin: 0 }}>&nbsp;</p>
                      <p style={{ margin: 0 }}>Everything is handpicked.</p>
                      <p style={{ margin: 0 }}>Every drop is small.</p>
                      <p style={{ margin: 0 }}>Once it&apos;s gone, it&apos;s gone —</p>
                      <p style={{ margin: 0 }}>like your Neopets password.</p>
                      <p style={{ margin: 0 }}>&nbsp;</p>
                      <p style={{ margin: 0, color: C.inkMuted }}>✦ Drops every Friday.</p>
                      <p style={{ margin: 0, color: C.inkMuted }}>✦ No restocks. No repeats.</p>
                      <p style={{ margin: 0, color: C.inkMuted }}>✦ Ships from LA.</p>
                      <p style={{ margin: 0 }}><span style={{ animation: 'blink 1s step-end infinite' }}>█</span></p>
                    </div>
                  </div>
                  <div style={{ width: 180, background: C.winGray, borderLeft: `1px solid ${C.winBorder}`, padding: '16px 12px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { icon: '💾', stat: '12K+', label: 'Orders shipped' },
                      { icon: '⭐', stat: '4.9★', label: 'Average rating' },
                      { icon: '💿', stat: '3 yrs', label: 'Y2K obsessed' },
                      { icon: '📦', stat: '$35+', label: 'Free shipping' },
                    ].map(({ icon, stat, label }) => (
                      <div key={label} style={{ border: `2px solid ${C.winBorder}`, background: '#F0E4F8', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20 }}>{icon}</span>
                        <div>
                          <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: C.brand }}>{stat}</p>
                          <p style={{ margin: 0, fontSize: 10, color: C.inkMuted }}>{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <StatusBar text="about.txt  •  512 bytes  •  UTF-8" />
              </DWin>
            )}

            {/* ══════════════════════════════════════
                NEWSLETTER — opens on scroll
            ══════════════════════════════════════ */}
            {showNewsletter && (
              <DWin
                id="newsletter" title="get the drop — pixl weekly" icon="📬"
                initXFrac={0.33} initY={35}
                zIdx={zOf('newsletter')} onFocus={() => front('newsletter')}
                onClose={() => close('newsletter')}
                style={{ width: 'min(420px, calc(100vw - 20px))' }}
              >
                <div style={{ padding: 26, background: '#fff' }}>
                  <div style={{ float: 'right', marginLeft: 14, background: '#000', color: '#fff', padding: '4px 6px', width: 76, textAlign: 'center', fontSize: 8, fontWeight: 900, letterSpacing: 0.5, lineHeight: 1.3, border: '2px solid #000' }}>
                    PARENTAL<br /><span style={{ fontSize: 11, letterSpacing: 1 }}>ADVISORY</span><br /><span style={{ fontSize: 6 }}>Y2K CONTENT</span>
                  </div>
                  {subscribed ? (
                    <div style={{ textAlign: 'center', padding: '20px 0', clear: 'both' }}>
                      <p style={{ fontSize: 32, margin: '0 0 10px' }}>✅</p>
                      <p style={{ fontWeight: 700, color: C.brand, fontSize: 15, margin: '0 0 4px' }}>ur one of us now ✦</p>
                      <p style={{ fontSize: 12, color: C.inkMuted, margin: 0 }}>Friday drops hit your inbox before anyone else. welcome to the club.</p>
                    </div>
                  ) : (
                    <div style={{ clear: 'both' }}>
                      <p style={{ fontSize: 12, color: C.inkDark, margin: '0 0 16px', lineHeight: 1.6 }}>
                        Get notified before the normies. First access to Friday drops, restocks, and stuff we&apos;re probably not supposed to tell you about.
                      </p>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: C.inkDark, marginBottom: 4 }}>Email address:</label>
                      <input type="email" value={emailVal} onChange={e => setEmailVal(e.target.value)} placeholder="you@example.com" style={{ width: '100%', boxSizing: 'border-box' as const, marginBottom: 14, border: '2px solid', borderColor: `${C.inkDark} #D0B8E0 #D0B8E0 ${C.inkDark}`, padding: '6px 10px', fontSize: 12, fontFamily: 'inherit' }} />
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <WinBtn primary onClick={() => emailVal && setSubscribed(true)}>📬 Subscribe</WinBtn>
                        <WinBtn onClick={() => setEmailVal('')}>Cancel</WinBtn>
                      </div>
                    </div>
                  )}
                </div>
              </DWin>
            )}

            {/* ── Small floating dialogs ── */}

            {/* Warning */}
            {!closed.has('warn') && (
              <DWin id="warn" title="⚠ PIXL ALERT" icon="⚠️" initXFrac={0.72} initY={60} zIdx={zOf('warn')} onFocus={() => front('warn')} onClose={() => close('warn')} style={{ minWidth: 210 }}>
                <div style={{ padding: 14, fontSize: 12, color: C.inkDark, maxWidth: 230 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
                    <span style={{ fontSize: 28, lineHeight: 1 }}>⚠️</span>
                    <div>
                      <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#AA0000' }}>Friday Drop ALERT</p>
                      <p style={{ margin: 0, lineHeight: 1.5 }}>Only <strong>4</strong> PiXL Drop Necklaces left. these don&apos;t come back.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                    <WinBtn primary onClick={() => { window.scrollTo({ top: vh * 0.9, behavior: 'smooth' }); }}>Shop Now</WinBtn>
                    <WinBtn onClick={() => close('warn')}>Cancel</WinBtn>
                  </div>
                </div>
              </DWin>
            )}

            {/* CD Player */}
            {!closed.has('cd') && (
              <DWin id="cd" title="CD Player — Friday Vibes" icon="💿" initXFrac={0.02} initY={280} zIdx={zOf('cd')} onFocus={() => front('cd')} onClose={() => close('cd')} style={{ width: 230 }}>
                <div style={{ padding: '10px 14px', fontSize: 12, color: C.inkDark }}>
                  <div style={{ background: '#0A0018', color: C.neon, fontFamily: 'monospace', padding: '8px 10px', marginBottom: 10, fontSize: 11, letterSpacing: 1, border: `1px solid rgba(255,0,204,0.3)` }}>
                    <div style={{ color: '#FF80D0', marginBottom: 2 }}>🎵 Y2K MIX VOL.4</div>
                    <div>▶ Track 04 — Butterfly</div>
                    <div style={{ color: '#CC80FF' }}>02:47 / 03:58</div>
                  </div>
                  <div style={{ height: 5, background: '#8060A0', marginBottom: 8, border: '1px solid #5A3080' }}>
                    <div style={{ height: '100%', width: '70%', background: `linear-gradient(90deg,${C.brandDark},${C.brand})` }} />
                  </div>
                  <input type="range" min={0} max={100} defaultValue={70} style={{ width: '100%', accentColor: C.brand, marginBottom: 8 }} />
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                    {['⏮','⏪','⏸','⏩','⏭'].map(b => (
                      <button key={b} style={{ background: 'linear-gradient(180deg,#EEE0F4,#CCC0DC)', border: '2px solid', borderColor: `#F0E4F0 #8060A0 #8060A0 #F0E4F0`, width: 30, height: 26, cursor: 'pointer', fontSize: 13 }}>{b}</button>
                    ))}
                  </div>
                </div>
              </DWin>
            )}

            {/* MSN Messenger */}
            {!closed.has('msn') && (
              <DWin id="msn" title="MSN Messenger" icon="💬" initXFrac={0.02} initY={490} zIdx={zOf('msn')} onFocus={() => front('msn')} onClose={() => close('msn')} style={{ width: 210 }} msnTitleBar>
                <div>
                  <div style={{ background: 'linear-gradient(180deg,#EEF4FF,#D8E8FF)', padding: '8px 10px', borderBottom: `1px solid #AACCEE`, fontSize: 11, color: '#334' }}>
                    <span style={{ color: '#1144AA', fontWeight: 700 }}>pixl_official</span><span style={{ color: '#778' }}> says:</span>
                  </div>
                  <div style={{ background: '#fff', padding: '10px 12px', fontSize: 12, color: C.inkDark, lineHeight: 1.6 }}>
                    omg pixl drop necklace<br />just dropped 💿✨<br />
                    <span style={{ color: '#FF1F8E', fontWeight: 700 }}>gone in 24hrs last time 😭</span>
                  </div>
                  <div style={{ borderTop: `1px solid ${C.winBorder}`, padding: '6px 10px', display: 'flex', gap: 6, background: C.winGray }}>
                    <WinBtn primary onClick={() => { window.scrollTo({ top: vh * 0.9, behavior: 'smooth' }); }}>Reply</WinBtn>
                    <WinBtn onClick={() => close('msn')}>Block</WinBtn>
                  </div>
                </div>
              </DWin>
            )}

            {/* ── TASKBAR ── */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, zIndex: 40,
              background: 'linear-gradient(180deg,#620099 0%,#440066 40%,#280044 100%)',
              borderTop: '2px solid #9900CC',
              display: 'flex', alignItems: 'center', padding: '0 6px', gap: 5,
            }}>
              <button style={{ background: 'linear-gradient(180deg,#55DD44,#33BB22 45%,#116611 100%)', border: '2px solid', borderColor: '#99FF88 #003300 #003300 #99FF88', borderRadius: 12, padding: '4px 16px', color: '#fff', fontWeight: 900, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <span style={{ fontSize: 16 }}>🪟</span> start
              </button>
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.18)', margin: '0 2px' }} />
              {taskBtns.map(({ id, icon, label }) => (
                <button key={id} className="tb-btn" onClick={() => front(id)} style={{ background: 'linear-gradient(180deg,#6600AA,#440077)', border: '2px solid', borderColor: '#BB80DD #220033 #220033 #BB80DD', color: '#F0D0FF', fontSize: 11, fontWeight: 700, cursor: 'pointer', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit', maxWidth: 130 }}>
                  <span>{icon}</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{label}</span>
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button onClick={() => {}} style={{ background: 'rgba(255,45,138,0.15)', border: `1px solid ${C.brand}`, color: C.brand, fontSize: 11, fontWeight: 700, padding: '3px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>
                🛒 {cartCount}
              </button>
              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', padding: '2px 10px', display: 'flex', alignItems: 'center', gap: 8, color: '#E4CCFF', fontSize: 11 }}>
                <span>🔊</span><span>📶</span><span>💬</span>
                <span style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 8 }}><Clock /></span>
              </div>
            </div>
          </div>
        </div>

      {/* Back to playground */}
      <a href="/playground" aria-label="Back to playground" className="back-btn" style={{
        position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
        width: 52, height: 52, borderRadius: '50%',
        background: '#000', border: `3px solid ${C.brand}`,
        boxShadow: `4px 4px 0 ${C.brand}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none', color: C.brand,
        fontSize: '1.2rem', fontWeight: 900,
      }}>←</a>

      {/* Cart toast */}
      {addedProduct && (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 999, border: '2px solid', borderColor: `#F4D8FF #4A0066 #4A0066 #F4D8FF`, background: C.winGray, boxShadow: `3px 3px 0 ${C.inkDark}`, overflow: 'hidden', maxWidth: 260, animation: 'winEntrance 0.2s ease-out' }}>
          <TitleBar title="Item Added to Cart" icon="🛒" />
          <div style={{ padding: '10px 14px', fontSize: 12, color: C.inkDark }}>
            <strong>{addedProduct}</strong> was added to your cart!
          </div>
        </div>
      )}
    </div>
  );
}
