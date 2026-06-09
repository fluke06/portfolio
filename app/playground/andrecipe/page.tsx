import type { Metadata } from 'next';
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google';

const mincho = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ar-mincho',
  display: 'swap',
});

const gothic = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--ar-gothic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'おいしく食べよう。| and recipe アンドレシピ',
};

const BG      = '#ffffff';
const SURFACE = '#efefef';
const TEXT    = '#000000';
const GRAY    = '#c7c7c7';

const RICE_SVG = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">`,
  `<ellipse cx="14" cy="10" rx="2" ry="5" fill="#9e8a70" opacity="0.28"/>`,
  `<ellipse cx="42" cy="6"  rx="5" ry="2" fill="#9e8a70" opacity="0.22"/>`,
  `<ellipse cx="78" cy="18" rx="2" ry="5" fill="#9e8a70" opacity="0.2"/>`,
  `<ellipse cx="100" cy="8" rx="3" ry="2" fill="#9e8a70" opacity="0.25"/>`,
  `<ellipse cx="22" cy="38" rx="2" ry="5" fill="#9e8a70" opacity="0.22"/>`,
  `<ellipse cx="56" cy="32" rx="5" ry="2" fill="#9e8a70" opacity="0.18"/>`,
  `<ellipse cx="90" cy="44" rx="2" ry="4" fill="#9e8a70" opacity="0.25"/>`,
  `<ellipse cx="110" cy="35" rx="4" ry="2" fill="#9e8a70" opacity="0.2"/>`,
  `<ellipse cx="8"  cy="62" rx="2" ry="5" fill="#9e8a70" opacity="0.28"/>`,
  `<ellipse cx="38" cy="70" rx="5" ry="2" fill="#9e8a70" opacity="0.2"/>`,
  `<ellipse cx="68" cy="60" rx="2" ry="4" fill="#9e8a70" opacity="0.22"/>`,
  `<ellipse cx="98" cy="74" rx="3" ry="5" fill="#9e8a70" opacity="0.18"/>`,
  `<ellipse cx="116" cy="62" rx="2" ry="4" fill="#9e8a70" opacity="0.25"/>`,
  `<ellipse cx="18" cy="92" rx="4" ry="2" fill="#9e8a70" opacity="0.22"/>`,
  `<ellipse cx="50" cy="98" rx="2" ry="5" fill="#9e8a70" opacity="0.2"/>`,
  `<ellipse cx="80" cy="88" rx="5" ry="2" fill="#9e8a70" opacity="0.28"/>`,
  `<ellipse cx="108" cy="100" rx="2" ry="4" fill="#9e8a70" opacity="0.22"/>`,
  `</svg>`,
].join('');

const RICE_BG = `#f0e9d8 url("data:image/svg+xml,${encodeURIComponent(RICE_SVG)}") repeat`;

const INTRO_QA = [
  { name: '一同', text: '今日は三者三様のごはんの炊き比べをありがとうございました。どうでした、ほかの人の炊き方を見て？', align: 'right' as const },
  { name: 'ごはん同好会', text: 'ごはん同好会さんは、先生に教えていただいた、量が多いときはプロが優先すべきだと思います。一方で、お米ごとに炊き方を変えるというのも、おいしく食べよう炊き方のやり方として大事だと思いました。', align: 'left' as const },
  { name: 'バイヤー', text: 'そうですね、どれほど炊き方によっておいしさが違うものかと、つくづく実感しましたよ。しかも、今回の炊き方はすごくシンプルで。なのに、全部おいしかった。だから、ごはんのおいしさの秘訣はお米の質なんだなあと、改めて感じましたね。', align: 'right' as const },
  { name: '一同', text: '（笑）。', align: 'left' as const },
];

const SECTION2_QA = [
  { name: 'ごはん同好会', text: 'いや、そうじゃないんです。「ごはん同好会のみんながよく集まって食べる」ことも大事だと思っていて。and recipeのごはん同好会では、炊き方だけじゃなく、みんなで集まっておいしく食べようということを広めていきたいですよね。', align: 'right' as const },
  { name: 'バイヤー', text: 'そうですよね。今回のおいしいお米の選びかたとかも、それぞれがおすすめしてくれた炊き方とか。ごはんの炊き方にこだわっている人から話を聞けて、すごく良かったです。', align: 'left' as const },
  { name: 'ごはん同好会', text: 'あとね、今回は炊き方の違いがすごくよく分かったんですけど、炊く前のお米の扱いも大切なんだなと。お米を研ぐ回数だったり、水に浸ける時間だったり。そういうことが、炊き上がりのおいしさに影響してくるんですね。', align: 'right' as const },
  { name: '一同', text: 'そうですよね。炊飯器まかせじゃなくて、土鍋で炊くことで、ごはんとの向き合い方が変わる気がします。', align: 'left' as const },
];

const SECTION3_QA = [
  { name: 'バイヤー', text: 'わかります。水の味がやっぱりお米の甘みを引き出してくれるんですかね。and recipeでも、ごはんと一緒に飲む水や、ごはんと相性のいいお味噌汁などを紹介していきたいと思っています。', align: 'right' as const },
  { name: 'ごはん同好会', text: 'うん、それはいい。お味噌汁との相性もすごく大事ですよね。今日はほんとうに勉強になりました。これだけたくさんのおいしいごはんを食べて、しあわせです。ありがとうございました。', align: 'left' as const },
  { name: '一同', text: '（笑）。', align: 'right' as const },
];

type Side = 'left' | 'right';

function QARow({ name, text, align }: { name: string; text: string; align: Side }) {
  const isRight = align === 'right';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isRight ? 'row' : 'row-reverse',
      alignItems: 'flex-start',
      gap: 15,
      padding: '10px 0',
    }}>
      <div style={{
        width: 44, height: 44,
        borderRadius: '50%',
        background: isRight ? '#ddd8d0' : '#d0d8dd',
        border: `1px solid ${GRAY}`,
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, color: '#666',
        fontFamily: 'var(--ar-gothic), sans-serif',
        fontWeight: 700,
        overflow: 'hidden',
      }}>
        {name.slice(0, 2)}
      </div>
      <div style={{ flex: 1, textAlign: isRight ? 'left' : 'right' }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: TEXT,
          fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
          marginBottom: 4,
        }}>
          {name}
        </div>
        <p style={{
          fontSize: 15, lineHeight: 1.9, color: TEXT,
          fontFamily: 'var(--ar-mincho), "Noto Serif JP", serif',
          margin: 0,
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}

function RiceBowlSVG() {
  return (
    <svg
      viewBox="0 0 340 280"
      style={{ width: 'clamp(240px, 40vw, 340px)', display: 'block', margin: '0 auto' }}
      aria-hidden="true"
    >
      <ellipse cx="170" cy="88" rx="112" ry="38" fill={TEXT} />
      <path d="M 50 108 Q 44 210 170 220 Q 296 210 290 108 Z" fill={TEXT} />
      <ellipse cx="170" cy="108" rx="120" ry="22" fill="#111111" />
      <rect x="114" y="218" width="112" height="14" rx="7" fill={TEXT} />
    </svg>
  );
}

function ChopsticksSVG() {
  return (
    <svg
      viewBox="0 0 460 28"
      style={{ width: 'clamp(240px, 55vw, 460px)', display: 'block', margin: '20px auto 0' }}
      aria-hidden="true"
    >
      <rect x="0" y="4"  width="460" height="8" rx="4" fill={TEXT} />
      <rect x="0" y="16" width="460" height="8" rx="4" fill={TEXT} />
    </svg>
  );
}

export default function AndRecipePage() {
  return (
    <>
      <div
        className={`${mincho.variable} ${gothic.variable}`}
        style={{ background: BG, color: TEXT, overflowX: 'hidden' }}
      >

        {/* ── Header ─────────────────────────────────────────────── */}
        <header style={{ background: BG, padding: '20px 35px 0', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

            <a href="/playground" style={{ textDecoration: 'none', lineHeight: 1 }}>
              <span style={{
                fontSize: 30,
                color: TEXT,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.03em',
              }}>
                and{' '}
              </span>
              <span style={{
                fontSize: 30,
                color: TEXT,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.04em',
              }}>
                rec<span style={{ position: 'relative', display: 'inline-block' }}>
                  i
                  <span style={{
                    position: 'absolute', top: 2, right: -1,
                    width: 5, height: 5, borderRadius: '50%',
                    background: TEXT, display: 'block',
                  }} />
                </span>pe
              </span>
            </a>

            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: 13, color: TEXT, margin: '0 0 15px',
                fontFamily: 'var(--ar-mincho), serif',
                letterSpacing: '0.02em',
              }}>
                ごはんと、旅は、人をつなぐ。
              </p>
              <nav style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'flex-end' }}>
                {['about', 'contact'].map(link => (
                  <a key={link} href="#" className="ar-link" style={{
                    fontSize: 13, color: TEXT,
                    textDecoration: 'none',
                    fontFamily: 'var(--ar-gothic), sans-serif',
                    transition: 'opacity 0.3s linear',
                  }}>
                    {link}
                  </a>
                ))}
                {['f', 'ig', 'n'].map(icon => (
                  <a key={icon} href="#" className="ar-link" aria-label={icon} style={{
                    width: 28, height: 28,
                    borderRadius: 4,
                    background: TEXT, color: BG,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                    textDecoration: 'none',
                    fontFamily: 'sans-serif',
                    transition: 'opacity 0.3s linear',
                  }}>
                    {icon}
                  </a>
                ))}
                <span style={{ display: 'block', width: 1, height: 16, background: TEXT }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--ar-gothic), sans-serif' }}>
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28, borderRadius: '50%',
                    fontSize: 11, fontWeight: 700,
                    background: TEXT, color: BG,
                  }}>
                    JP
                  </span>
                  <span style={{ fontSize: 11, color: TEXT }}>·</span>
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28, borderRadius: '50%',
                    fontSize: 11, fontWeight: 700,
                    border: `1.5px solid ${TEXT}`, color: TEXT,
                  }}>
                    EN
                  </span>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section style={{
          width: '100%',
          height: 'clamp(420px, 62vh, 580px)',
          background: 'linear-gradient(145deg, #e4ddd6 0%, #d5cec7 45%, #c8c0b8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <span style={{ color: '#b0a89e', fontSize: 12, letterSpacing: '0.12em', fontFamily: 'sans-serif' }}>
            [ editorial photo ]
          </span>
        </section>

        {/* ── Feature Intro (cream + rice texture) ───────────────── */}
        {/* The organic blob is positioned absolutely here, extending UP into the hero above */}
        <section style={{ background: RICE_BG, position: 'relative', overflow: 'visible' }}>

          {/* Organic blob — covers hero bottom-right + intro right column */}
          <div style={{
            position: 'absolute',
            top: 'clamp(-310px, -42vh, -230px)',
            right: 0,
            width: 'clamp(300px, 43vw, 560px)',
            height: 'clamp(500px, 68vh, 640px)',
            zIndex: 5,
            pointerEvents: 'none',
          }}>
            <svg
              viewBox="0 0 420 600"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              aria-hidden="true"
            >
              <path
                d="M 165,0 C 130,38 105,135 95,248 C 85,348 108,448 76,524 C 50,582 14,600 0,600 L 420,600 L 420,0 Z"
                fill={TEXT}
              />
            </svg>

            {/* 食。— white text on blob */}
            <div style={{
              position: 'absolute',
              top: '38%', left: '44%',
              transform: 'translate(-50%, -50%)',
              color: BG,
              fontSize: 'clamp(68px, 9.5vw, 126px)',
              fontWeight: 700,
              fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
            }}>
              食。
            </div>

            {/* SPECIAL FEATURE 2 vertical label */}
            <div style={{
              position: 'absolute',
              right: 10,
              top: '20%',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: 9,
              letterSpacing: '0.22em',
              color: BG,
              fontFamily: 'var(--ar-gothic), sans-serif',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}>
              SPECIAL FEATURE 2
            </div>
          </div>

          {/* Main two-column content */}
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: 'clamp(50px, 7vw, 90px) clamp(24px, 5vw, 60px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(20px, 5vw, 60px)',
            position: 'relative',
          }}>

            {/* Left column: intro copy */}
            <div>
              <p style={{
                fontStyle: 'italic',
                fontSize: 'clamp(20px, 2.8vw, 32px)',
                fontFamily: 'var(--ar-mincho), "Noto Serif JP", serif',
                color: TEXT,
                marginBottom: 20,
                lineHeight: 1.3,
              }}>
                Let's eat deliciously
              </p>
              <p style={{
                fontSize: 15,
                lineHeight: 2,
                color: TEXT,
                fontFamily: 'var(--ar-mincho), "Noto Serif JP", serif',
                marginBottom: 20,
              }}>
                ごはんの炊き比べをありがとうございました。そもそも、どんな食材と炊き方でも、おいしい炊き方があるんですね。そう、炊飯もプロの仕事なんだと、改めて感じました。お米ごとに最適な炊き方を選んで、美味しいごはんをつくるプロフェッショナルかもしれません。このごはん炊きのTOP 3を見習いながら食べて、ごはんをおいしく食べる方法を探したいと思っています。
              </p>
              <p style={{
                fontSize: 12,
                color: '#777',
                fontFamily: 'var(--ar-gothic), sans-serif',
                margin: 0,
              }}>
                撮影：田中ナツコ
              </p>
            </div>

            {/* Right column: おいしく食べよう。appears below the blob */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <p style={{
                fontSize: 'clamp(30px, 4.5vw, 56px)',
                fontWeight: 700,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: TEXT,
                margin: 0,
              }}>
                おいしく<br />食べよう。
              </p>
            </div>
          </div>

          {/* 第一話 chapter structure */}
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 60px) clamp(40px, 6vw, 70px)',
          }}>
            {/* 第 + horizontal rule */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                fontSize: 'clamp(80px, 12vw, 150px)',
                fontWeight: 700,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                lineHeight: 0.85,
                color: TEXT,
                flexShrink: 0,
              }}>
                第
              </div>
              <div style={{ flex: 1, height: 1, background: TEXT }} />
            </div>

            {/* 一話 + caption */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  fontSize: 'clamp(80px, 12vw, 150px)',
                  fontWeight: 700,
                  fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                  lineHeight: 0.85,
                  color: TEXT,
                }}>
                  一
                </div>
                <div style={{
                  fontSize: 'clamp(80px, 12vw, 150px)',
                  fontWeight: 700,
                  fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                  lineHeight: 0.85,
                  color: TEXT,
                }}>
                  話
                </div>
              </div>
              <div style={{
                paddingTop: 20,
                fontSize: 13,
                fontFamily: 'var(--ar-gothic), sans-serif',
                color: TEXT,
              }}>
                前菜的会話
              </div>
            </div>
          </div>
        </section>

        {/* ── Article Body ───────────────────────────────────────── */}
        <article style={{ background: RICE_BG, position: 'relative', paddingBottom: 'clamp(40px, 6vw, 80px)' }}>

          {/* Portrait circles floating in cream margins */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: 'calc(50% - 460px)',
            top: '22%',
            width: 64, height: 64, borderRadius: '50%',
            background: '#ddd8d0', border: `1px solid ${GRAY}`,
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: 'calc(50% + 396px)',
            top: '42%',
            width: 64, height: 64, borderRadius: '50%',
            background: '#d0d5dd', border: `1px solid ${GRAY}`,
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: 'calc(50% - 450px)',
            top: '63%',
            width: 56, height: 56, borderRadius: '50%',
            background: '#e0dbd5', border: `1px solid ${GRAY}`,
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute',
            left: 'calc(50% + 394px)',
            top: '80%',
            width: 56, height: 56, borderRadius: '50%',
            background: '#d8d5d0', border: `1px solid ${GRAY}`,
          }} />

          <div style={{
            maxWidth: 760,
            margin: '0 auto',
            background: BG,
            borderRadius: '50% 50% 0 0 / 60px 60px 0 0',
            padding: 'clamp(50px, 7vw, 90px) clamp(24px, 5vw, 48px)',
            position: 'relative',
          }}>

            {/* Section heading */}
            <div style={{ marginBottom: 40 }}>
              <div style={{
                fontSize: 12,
                color: TEXT,
                fontFamily: 'var(--ar-gothic), sans-serif',
                marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ display: 'block', width: 24, height: 1, background: TEXT }} />
                前菜的会話
              </div>
              <h2 style={{
                fontSize: 'clamp(20px, 3.2vw, 34px)',
                fontWeight: 700,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                lineHeight: 1.35,
                color: TEXT,
                margin: 0,
              }}>
                なぜに味噌汁？
              </h2>
            </div>

            {/* Q&A block 1 */}
            <div style={{ marginBottom: 50 }}>
              {INTRO_QA.map((row, i) => <QARow key={i} {...row} />)}
            </div>

            {/* Food photo: three rice bowls */}
            <div style={{
              background: SURFACE,
              borderRadius: 5,
              height: 240,
              marginBottom: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30,
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 100, height: 100,
                  background: '#c8c4be',
                  border: `1px solid ${GRAY}`,
                  borderRadius: '50% 50% 48% 48% / 58% 58% 42% 42%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }} aria-hidden="true">
                  🍚
                </div>
              ))}
            </div>

            {/* Callout */}
            <div style={{
              borderTop: `2px solid ${TEXT}`,
              borderBottom: `2px solid ${TEXT}`,
              padding: '20px 0',
              marginBottom: 50,
            }}>
              <h3 style={{
                fontSize: 'clamp(17px, 2.8vw, 28px)',
                fontWeight: 700,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                lineHeight: 1.45,
                color: TEXT,
                margin: 0,
              }}>
                このお味噌汁、猛烈においしい！
              </h3>
            </div>

            {/* Q&A block 2 */}
            <div style={{ marginBottom: 50 }}>
              {SECTION2_QA.map((row, i) => <QARow key={i} {...row} />)}
            </div>

            {/* Section header: 炊飯水 */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 30,
            }}>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20,
                border: `2px solid ${TEXT}`, borderRadius: '50%',
                flexShrink: 0,
              }}>
                <span style={{
                  width: 8, height: 8,
                  background: TEXT, borderRadius: '50%',
                  display: 'block',
                }} />
              </span>
              <h3 style={{
                fontSize: 'clamp(15px, 2.3vw, 22px)',
                fontWeight: 700,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                color: TEXT,
                margin: 0,
              }}>
                炊飯水で炊いたことがあります。
              </h3>
            </div>

            {/* Q&A block 3 */}
            <div style={{ marginBottom: 20 }}>
              {SECTION3_QA.map((row, i) => <QARow key={i} {...row} />)}
            </div>

            {/* Final line */}
            <div style={{
              fontSize: 15, color: TEXT,
              fontFamily: 'var(--ar-gothic), sans-serif',
              marginTop: 20, paddingTop: 20,
            }}>
              一同 &nbsp;&nbsp;（笑）。
            </div>

          </div>
        </article>

        {/* ── Next Page (cream texture) ──────────────────────────── */}
        <section style={{ background: RICE_BG, padding: 'clamp(50px, 7vw, 90px) 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>

            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
              <RiceBowlSVG />
              <div style={{
                position: 'absolute',
                top: '22%', left: '50%', transform: 'translateX(-50%)',
                color: BG,
                fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                fontWeight: 700,
                textAlign: 'center',
                lineHeight: 1.1,
                pointerEvents: 'none',
              }}>
                <div style={{ fontSize: 'clamp(22px, 3.5vw, 32px)' }}>次</div>
                <div style={{ fontSize: 'clamp(22px, 3.5vw, 32px)' }}>頁</div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '24%', left: '50%', transform: 'translateX(-50%)',
                color: BG,
                fontSize: 'clamp(11px, 1.5vw, 14px)',
                fontFamily: 'var(--ar-mincho), serif',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>
                第二話「ごはんは深い？」
              </div>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'center',
              gap: 'clamp(20px, 6vw, 80px)',
              marginTop: 20,
            }}>
              {[
                { ep: '第二話', title: 'ごはんは深い？' },
                { ep: '第三話', title: 'おいしく食べよう' },
              ].map(({ ep, title }) => (
                <a key={ep} href="#" className="ar-link" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  textDecoration: 'none', color: TEXT,
                  fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
                  fontSize: 'clamp(12px, 1.6vw, 15px)',
                  transition: 'opacity 0.3s linear',
                }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M4 6 Q4 18 12 18 Q20 18 20 6 Z" fill={TEXT} />
                    <rect x="8" y="17" width="8" height="3" rx="1.5" fill={TEXT} />
                  </svg>
                  <span style={{ fontWeight: 700 }}>{ep}</span>
                  <span>{title}</span>
                </a>
              ))}
            </div>

            <ChopsticksSVG />
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer style={{ background: BG }}>
          <div style={{
            padding: '40px 40px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div style={{
              fontSize: 22, fontWeight: 700, color: TEXT,
              fontFamily: 'var(--ar-gothic), "Yu Gothic", sans-serif',
              letterSpacing: '-0.03em',
            }}>
              and recipe
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontSize: 13, color: TEXT,
                fontFamily: 'var(--ar-gothic), sans-serif',
              }}>
                シェアする
              </span>
              <div style={{
                width: 34, height: 34,
                background: TEXT,
                borderRadius: 5,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: BG, fontWeight: 700, fontSize: 18, fontFamily: 'serif' }}>f</span>
              </div>
            </div>
          </div>
          <div style={{
            background: SURFACE,
            padding: '10px 24px',
            textAlign: 'right',
          }}>
            <span style={{ fontSize: 11, color: '#555', fontFamily: 'sans-serif' }}>
              ©and recipe,inc. All right reserved.
            </span>
          </div>
        </footer>

        <style>{`
          .ar-link:hover { opacity: 0.6 !important; }

          @media (prefers-reduced-motion: reduce) {
            * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          }

          @media (max-width: 640px) {
            .ar-intro-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

      </div>

      {/* Back button */}
      <a
        href="/playground"
        aria-label="Back to playground"
        className="ar-link"
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
          width: 44, height: 44, borderRadius: '50%',
          background: TEXT, color: BG,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none', fontSize: '1.1rem',
          transition: 'opacity 0.3s linear',
        }}
      >
        ←
      </a>
    </>
  );
}
