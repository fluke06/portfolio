'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StickyNav } from '@/components/sticky-nav';
import { FooterSection } from '@/components/footer-section';
import type { Cat, Food, MealPlan } from './types';
import {
  ageDisplay, ageInMonths, computeMealPlan, der, lifeStage, lifeStageLabel,
  proteinTargetG, scoreFoodForCat, waterTargetMl,
} from './calc';
import { load, save, reset, exportJson, importJson, type KuboStore } from './storage';

type Tab = 'overview' | 'cats' | 'foods' | 'plan' | 'recommend';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'cats',      label: 'Cats' },
  { id: 'plan',      label: 'Meal plan' },
  { id: 'foods',     label: 'Foods' },
  { id: 'recommend', label: 'Recommend' },
];

const COLORS = {
  bg:      '#100F0D',
  panel:   '#1B1917',
  panelHi: '#2A2724',
  border:  'rgba(237,232,224,0.08)',
  borderHi:'rgba(237,232,224,0.16)',
  text:    '#EDE8E0',
  muted:   '#888280',
  faint:   '#555250',
  cream:   '#E8B380',
  gold:    '#C4B89A',
  warn:    '#FF7B6B',
  good:    '#4CAF82',
};

const peso = (n: number) => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const n1 = (n: number) => n.toLocaleString('en-PH', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const n0 = (n: number) => Math.round(n).toLocaleString('en-PH');

async function resizeImageToDataUrl(file: File, maxDim: number): Promise<string | null> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(null);
      img.src = String(reader.result);
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

export function KuboClient() {
  const [store, setStore] = useState<KuboStore | null>(null);
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => { setStore(load()); }, []);
  useEffect(() => { if (store) save(store); }, [store]);

  if (!store) {
    return (
      <div style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.muted, display: 'grid', placeItems: 'center' }}>
        <StickyNav alwaysVisible />
        <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem' }}>Loading Kubo…</span>
      </div>
    );
  }

  const activeCat = store.cats.find(c => c.id === store.activeCatId) ?? store.cats[0];
  const activePlan: MealPlan = {
    ...(store.plans[activeCat.id] ?? { catId: activeCat.id, dryFoodId: null, wetFoodId: null, wetRatioKcal: 0.5, meals: 2, addedWaterMlPerMeal: 0 }),
    addedWaterMlPerMeal: store.plans[activeCat.id]?.addedWaterMlPerMeal ?? 0,
  };

  const updateCat = (patch: Partial<Cat>) => setStore(s => s && {
    ...s,
    cats: s.cats.map(c => c.id === activeCat.id ? { ...c, ...patch } : c),
  });
  const updatePlan = (patch: Partial<MealPlan>) => setStore(s => s && {
    ...s,
    plans: { ...s.plans, [activeCat.id]: { ...activePlan, ...patch } },
  });
  const addCat = (c: Cat) => setStore(s => s && { ...s, cats: [...s.cats, c], activeCatId: c.id, plans: { ...s.plans, [c.id]: { catId: c.id, dryFoodId: null, wetFoodId: null, wetRatioKcal: 0.5, meals: 2, addedWaterMlPerMeal: 0 } } });
  const removeCat = (id: string) => setStore(s => {
    if (!s || s.cats.length <= 1) return s;
    const nextCats = s.cats.filter(c => c.id !== id);
    const nextPlans = { ...s.plans }; delete nextPlans[id];
    return { ...s, cats: nextCats, plans: nextPlans, activeCatId: s.activeCatId === id ? nextCats[0].id : s.activeCatId };
  });
  const setActiveCat = (id: string) => setStore(s => s && { ...s, activeCatId: id });

  const upsertFood = (f: Food) => setStore(s => s && {
    ...s,
    foods: s.foods.some(x => x.id === f.id) ? s.foods.map(x => x.id === f.id ? f : x) : [...s.foods, f],
  });
  const removeFood = (id: string) => setStore(s => s && { ...s, foods: s.foods.filter(f => f.id !== id) });
  const doReset = () => { const d = reset(); setStore(d); setTab('overview'); };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text }}>
      <StickyNav alwaysVisible />

      <div style={{ padding: '80px 24px 0', maxWidth: 1080, margin: '0 auto' }}>
        <Link href="/playground" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, color: COLORS.muted, textDecoration: 'none',
          fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', letterSpacing: '0.04em',
        }} className="kubo-back">← Playground</Link>
      </div>

      <Hero cat={activeCat} />

      <TabBar tab={tab} setTab={setTab} />

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(20px,4vw,32px) 24px 60px' }}>
        {tab === 'overview'  && <OverviewTab cat={activeCat} plan={activePlan} foods={store.foods} />}
        {tab === 'cats'      && <CatsTab store={store} setActiveCat={setActiveCat} updateCat={updateCat} addCat={addCat} removeCat={removeCat} />}
        {tab === 'plan'      && <PlanTab cat={activeCat} plan={activePlan} foods={store.foods} updatePlan={updatePlan} />}
        {tab === 'foods'     && <FoodsTab foods={store.foods} upsertFood={upsertFood} removeFood={removeFood} />}
        {tab === 'recommend' && <RecommendTab cat={activeCat} foods={store.foods} />}
      </main>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 20px' }}>
        <SourcesCard />
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 60px' }}>
        <DataControls store={store} setStore={setStore} doReset={doReset} />
      </div>

      <style>{`
        .kubo-back:hover { color: ${COLORS.text} !important; }
        .kubo-input, .kubo-select { background: ${COLORS.panel}; border: 1px solid ${COLORS.border}; border-radius: 8px; padding: 10px 12px; color: ${COLORS.text}; font-family: var(--font-inter), sans-serif; font-size: 0.85rem; outline: none; transition: border-color 0.2s ease; width: 100%; }
        .kubo-input:focus, .kubo-select:focus { border-color: ${COLORS.gold}; }
        .kubo-btn { background: ${COLORS.panel}; border: 1px solid ${COLORS.border}; border-radius: 8px; padding: 8px 14px; color: ${COLORS.text}; font-family: var(--font-inter), sans-serif; font-size: 0.8rem; cursor: pointer; transition: all 0.15s ease; }
        .kubo-btn:hover { border-color: ${COLORS.borderHi}; background: ${COLORS.panelHi}; }
        .kubo-btn-primary { background: ${COLORS.gold}; color: ${COLORS.bg}; border-color: ${COLORS.gold}; font-weight: 600; }
        .kubo-btn-primary:hover { background: ${COLORS.cream}; border-color: ${COLORS.cream}; }
        .kubo-btn-danger { color: ${COLORS.warn}; }
        .kubo-btn-danger:hover { border-color: ${COLORS.warn}; }
        .kubo-tab { cursor: pointer; }
      `}</style>

      <FooterSection />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────────────────────────────────

function Hero({ cat }: { cat: Cat }) {
  const stage = lifeStage(ageInMonths(cat.dob));
  return (
    <header style={{ maxWidth: 1080, margin: '0 auto', padding: 'clamp(24px,4vw,40px) 24px 24px' }}>
      <div style={{ display: 'inline-block', background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '4px 12px', marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.muted }}>Tool · Cat care</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'clamp(120px, 22vw, 200px) 1fr', gap: 'clamp(16px, 3vw, 28px)', alignItems: 'center' }} className="kubo-hero">
        {cat.photo && (
          <div style={{ aspectRatio: '1', borderRadius: 999, overflow: 'hidden', border: `1px solid ${COLORS.borderHi}`, background: COLORS.panel, position: 'relative' }}>
            <Image src={cat.photo} alt={cat.name} fill sizes="200px" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
          </div>
        )}
        <div>
          <h1 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.02em', color: COLORS.text, marginBottom: 8 }}>
            {cat.name}<em style={{ color: COLORS.cream }}>&apos;s</em>
            {' '}<em style={{ fontStyle: 'italic', color: COLORS.gold }}>feeding plan.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', color: COLORS.muted, lineHeight: 1.6, maxWidth: 560 }}>
            {cat.breed} · {ageDisplay(cat.dob)} old · {lifeStageLabel(stage)} · {cat.weightKg}kg
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 520px) { .kubo-hero { grid-template-columns: 100px 1fr !important; } }`}</style>
    </header>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Tab bar
// ────────────────────────────────────────────────────────────────────────────

function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', gap: 4, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 4, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className="kubo-tab" style={{
            background: tab === t.id ? COLORS.panelHi : 'transparent',
            border: `1px solid ${tab === t.id ? COLORS.borderHi : 'transparent'}`,
            borderRadius: 8, padding: '9px 16px',
            color: tab === t.id ? COLORS.text : COLORS.muted,
            fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
          }}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Shared UI
// ────────────────────────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, ...style }}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block', fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
      color: COLORS.muted, marginBottom: 6,
    }}>{children}</label>
  );
}

function StatRow({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '10px 0', borderBottom: `1px solid ${COLORS.border}` }}>
      <div>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: COLORS.text, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.05rem', fontWeight: 700, color: color ?? COLORS.text, whiteSpace: 'nowrap' }}>{value}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Overview tab
// ────────────────────────────────────────────────────────────────────────────

function OverviewTab({ cat, plan, foods }: { cat: Cat; plan: MealPlan; foods: Food[] }) {
  const b = useMemo(() => computeMealPlan(cat, plan, foods), [cat, plan, foods]);
  const stage = lifeStage(ageInMonths(cat.dob));
  const proteinPct = b.totals.proteinTargetG > 0 ? Math.min(1.5, b.totals.proteinG / b.totals.proteinTargetG) : 0;
  const waterPct   = b.totals.waterTargetMl  > 0 ? Math.min(1.5, b.totals.moistureMl / b.totals.waterTargetMl) : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="kubo-two">
      <Card>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 14 }}>Today&apos;s numbers</div>
        <StatRow label="Daily calories" value={`${n0(b.daily.der)} kcal`} sub={b.daily.label} color={COLORS.cream} />
        <StatRow label="RER (baseline)" value={`${n0(b.daily.rer)} kcal`} sub="70 × weight^0.75" />
        <StatRow label="Protein target" value={`${n1(b.totals.proteinTargetG)} g`} sub={stage === 'kitten' ? '~9 g/kg BW/day for kittens' : '~4.5 g/kg BW/day for adults'} />
        <StatRow label="Water target"   value={`${n0(b.totals.waterTargetMl)} ml`} sub="~60 ml/kg/day, most from food" />
        <StatRow label="Meals"          value={`${plan.meals}× / day`}   sub="Split evenly across the day" />
      </Card>

      <Card>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 14 }}>Today&apos;s food</div>
        {b.dry.food ? (
          <StatRow label={`Dry — ${b.dry.food.brand} ${b.dry.food.name}`} value={`${n0(b.dry.grams)} g`} sub={`${n0(b.dry.perMealG)} g per meal · ${n0(b.dry.kcal)} kcal`} />
        ) : (
          <StatRow label="Dry food" value="—" sub="Not set — pick one in Meal plan" color={COLORS.muted} />
        )}
        {b.wet.food ? (
          <StatRow label={`Wet — ${b.wet.food.brand} ${b.wet.food.name}`} value={`${n0(b.wet.grams)} g`} sub={`${n0(b.wet.perMealG)} g per meal · ${b.wet.cans.toFixed(2)} cans/day · ${n0(b.wet.kcal)} kcal`} />
        ) : (
          <StatRow label="Wet food" value="—" sub="Not set — pick one in Meal plan" color={COLORS.muted} />
        )}
        <StatRow label="Daily cost"  value={peso(b.totals.dailyCost)}  sub={`${peso(b.totals.weeklyCost)}/wk`} color={COLORS.gold} />
        <StatRow label="Monthly cost" value={peso(b.totals.monthlyCost)} sub="Based on daily × 30" color={COLORS.gold} />
      </Card>

      <Card style={{ gridColumn: '1 / -1' }}>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 14 }}>Nutrition delivered</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="kubo-two">
          <ProgressStat label="Protein" now={b.totals.proteinG} target={b.totals.proteinTargetG} unit="g" pct={proteinPct} good={proteinPct >= 1} />
          <ProgressStat label="Total water intake" now={b.totals.moistureMl} target={b.totals.waterTargetMl} unit="ml" pct={waterPct} good={waterPct >= 0.6} />
        </div>
        <div style={{ marginTop: 14, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', color: COLORS.muted, lineHeight: 1.6 }}>
          Water breakdown: <strong style={{ color: COLORS.text }}>{n0(b.totals.moistureFromFoodMl)} ml</strong> from food + <strong style={{ color: COLORS.text }}>{n0(b.addedWater.dailyMl)} ml</strong> added to bowl.
          Does not include free water from bowl / fountain — add that mentally.<br />
          Fat: <strong style={{ color: COLORS.text }}>{n1(b.totals.fatG)} g</strong> · Diet moisture: <strong style={{ color: COLORS.text }}>{(b.urinary.moisturePctOfDiet * 100).toFixed(0)}%</strong>
          {b.urinary.phosphorusAvg !== null && <> · Phosphorus avg: <strong style={{ color: COLORS.text }}>{b.urinary.phosphorusAvg.toFixed(2)}%</strong></>}
          {b.urinary.magnesiumAvg  !== null && <> · Magnesium avg: <strong style={{ color: COLORS.text }}>{b.urinary.magnesiumAvg.toFixed(3)}%</strong></>}
        </div>
      </Card>

      {b.urinary.flags.length > 0 && (
        <Card style={{ gridColumn: '1 / -1', borderColor: 'rgba(255,123,107,0.25)', background: 'rgba(255,123,107,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.warn, marginBottom: 10 }}>Watch-outs</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: COLORS.text, lineHeight: 1.7 }}>
            {b.urinary.flags.map((f, i) => <li key={i} style={{ marginBottom: 4 }}>{f}</li>)}
          </ul>
        </Card>
      )}

      <Card style={{ gridColumn: '1 / -1', borderColor: 'rgba(232,179,128,0.2)', background: 'rgba(232,179,128,0.04)' }}>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.cream, marginBottom: 8 }}>Reality check</div>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: COLORS.text, lineHeight: 1.65, margin: 0 }}>
          These numbers are a target, not a mandate. Kittens eat what they need to grow — {cat.name} won&apos;t always finish the bowl, and that&apos;s usually fine. What matters is the <strong>weekly weight trend</strong>: a healthy kitten gains roughly <strong>50–100g per week</strong> at this age. If he&apos;s trending up and playful, the diet is working. If he stalls or loses weight for two weeks running, that&apos;s the signal to check with the vet — not a single low-appetite day.
        </p>
      </Card>

      {cat.notes && (
        <Card style={{ gridColumn: '1 / -1' }}>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 8 }}>Notes</div>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: COLORS.text, lineHeight: 1.6, margin: 0 }}>{cat.notes}</p>
        </Card>
      )}

      <style>{`@media (max-width: 720px) { .kubo-two { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function ProgressStat({ label, now, target, unit, pct, good }: { label: string; now: number; target: number; unit: string; pct: number; good: boolean }) {
  const color = good ? COLORS.good : pct < 0.5 ? COLORS.warn : COLORS.gold;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: COLORS.text, fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '0.95rem', fontWeight: 700, color }}>
          {n1(now)} <span style={{ color: COLORS.muted, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', fontWeight: 400 }}>/ {n1(target)} {unit}</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: COLORS.bg, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(100, pct * 100)}%`, background: color, transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Cats tab
// ────────────────────────────────────────────────────────────────────────────

function CatsTab({ store, setActiveCat, updateCat, addCat, removeCat }: {
  store: KuboStore;
  setActiveCat: (id: string) => void;
  updateCat: (patch: Partial<Cat>) => void;
  addCat: (c: Cat) => void;
  removeCat: (id: string) => void;
}) {
  const active = store.cats.find(c => c.id === store.activeCatId) ?? store.cats[0];
  const [addingOpen, setAddingOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'clamp(220px, 30%, 300px) 1fr', gap: 20 }} className="kubo-two">
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted }}>Cats</div>
          <button className="kubo-btn" onClick={() => setAddingOpen(true)} title="Add cat">+</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {store.cats.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: c.id === active.id ? COLORS.panelHi : 'transparent',
              border: `1px solid ${c.id === active.id ? COLORS.borderHi : 'transparent'}`,
              borderRadius: 10, padding: 10, textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 999, background: COLORS.bg, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                {c.photo && <Image src={c.photo} alt={c.name} fill sizes="34px" style={{ objectFit: 'cover' }} />}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: COLORS.text, fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ageDisplay(c.dob)} · {c.weightKg}kg</div>
              </div>
            </button>
          ))}
        </div>
        {addingOpen && (
          <AddCatForm onCancel={() => setAddingOpen(false)} onAdd={c => { addCat(c); setAddingOpen(false); }} />
        )}
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted }}>{active.name}&apos;s profile</div>
          {store.cats.length > 1 && (
            <button className="kubo-btn kubo-btn-danger" onClick={() => { if (confirm(`Remove ${active.name}?`)) removeCat(active.id); }}>Remove</button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, padding: 14, background: COLORS.bg, borderRadius: 10 }}>
          <div style={{ width: 68, height: 68, borderRadius: 999, overflow: 'hidden', background: COLORS.panel, border: `1px solid ${COLORS.border}`, position: 'relative', flexShrink: 0 }}>
            {active.photo && <Image src={active.photo} alt={active.name} fill sizes="68px" style={{ objectFit: 'cover', objectPosition: 'center 30%' }} unoptimized />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 6 }}>Photo</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <label className="kubo-btn" style={{ cursor: 'pointer' }}>
                Upload…
                <input
                  type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const dataUrl = await resizeImageToDataUrl(file, 480);
                    if (dataUrl) updateCat({ photo: dataUrl });
                    e.target.value = '';
                  }}
                />
              </label>
              {active.photo && (
                <button className="kubo-btn kubo-btn-danger" onClick={() => { if (confirm(`Remove ${active.name}'s photo?`)) updateCat({ photo: undefined }); }}>Remove</button>
              )}
            </div>
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, margin: '6px 0 0', lineHeight: 1.5 }}>
              Photo is stored locally and resized to 480px. JPG/PNG/HEIC.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="kubo-two">
          <div>
            <Label>Name</Label>
            <input className="kubo-input" value={active.name} onChange={e => updateCat({ name: e.target.value })} />
          </div>
          <div>
            <Label>Breed</Label>
            <input className="kubo-input" value={active.breed} onChange={e => updateCat({ breed: e.target.value })} />
          </div>
          <div>
            <Label>Date of birth</Label>
            <input className="kubo-input" type="date" value={active.dob} onChange={e => updateCat({ dob: e.target.value })} />
          </div>
          <div>
            <Label>Weight (kg)</Label>
            <input className="kubo-input" type="number" step="0.01" value={active.weightKg} onChange={e => updateCat({ weightKg: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <Label>Sex</Label>
            <select className="kubo-select" value={active.sex} onChange={e => updateCat({ sex: e.target.value as Cat['sex'] })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <Label>Neutered / spayed</Label>
            <select className="kubo-select" value={active.neutered ? 'yes' : 'no'} onChange={e => updateCat({ neutered: e.target.value === 'yes' })}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div>
            <Label>Activity</Label>
            <select className="kubo-select" value={active.activity} onChange={e => updateCat({ activity: e.target.value as Cat['activity'] })}>
              <option value="indoor-low">Indoor — low</option>
              <option value="indoor-active">Indoor — active</option>
              <option value="outdoor">Indoor + outdoor</option>
            </select>
          </div>
          <div>
            <Label>Body condition (1–9)</Label>
            <input className="kubo-input" type="number" min={1} max={9} value={active.bcs} onChange={e => updateCat({ bcs: Math.max(1, Math.min(9, parseInt(e.target.value) || 5)) })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Notes</Label>
            <textarea className="kubo-input" rows={3} value={active.notes ?? ''} onChange={e => updateCat({ notes: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 14, padding: 12, background: COLORS.bg, borderRadius: 8, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: COLORS.muted, lineHeight: 1.6 }}>
          BCS reference — <strong style={{ color: COLORS.text }}>4–5/9</strong> is ideal (ribs palpable, waist visible from above). <strong style={{ color: COLORS.warn }}>7+</strong> = overweight, target weight loss. <strong style={{ color: COLORS.warn }}>≤3</strong> = underweight, target gain.
        </div>
      </Card>

      <style>{`@media (max-width: 720px) { .kubo-two { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function AddCatForm({ onAdd, onCancel }: { onAdd: (c: Cat) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState('4');
  return (
    <div style={{ marginTop: 14, padding: 12, background: COLORS.bg, borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
      <input className="kubo-input" placeholder="Cat name" value={name} onChange={e => setName(e.target.value)} style={{ marginBottom: 8 }} />
      <input className="kubo-input" type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ marginBottom: 8 }} />
      <input className="kubo-input" type="number" step="0.1" placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} style={{ marginBottom: 8 }} />
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="kubo-btn kubo-btn-primary" style={{ flex: 1 }} onClick={() => {
          if (!name.trim()) return;
          onAdd({
            id: `cat-${Date.now()}`,
            name: name.trim(), dob,
            weightKg: parseFloat(weight) || 4,
            sex: 'female', neutered: false,
            breed: '', bcs: 5, activity: 'indoor-active',
          });
        }}>Add</button>
        <button className="kubo-btn" style={{ flex: 1 }} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Plan tab (blend planner)
// ────────────────────────────────────────────────────────────────────────────

function PlanTab({ cat, plan, foods, updatePlan }: {
  cat: Cat; plan: MealPlan; foods: Food[]; updatePlan: (p: Partial<MealPlan>) => void;
}) {
  const dryOptions = foods.filter(f => f.type === 'dry');
  const wetOptions = foods.filter(f => f.type === 'wet');
  const b = useMemo(() => computeMealPlan(cat, plan, foods), [cat, plan, foods]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="kubo-two">
      <Card>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 14 }}>Blend</div>

        <div style={{ marginBottom: 14 }}>
          <Label>Dry food</Label>
          <select className="kubo-select" value={plan.dryFoodId ?? ''} onChange={e => updatePlan({ dryFoodId: e.target.value || null })}>
            <option value="">— none —</option>
            {dryOptions.map(f => <option key={f.id} value={f.id}>{f.brand} · {f.name}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <Label>Wet food</Label>
          <select className="kubo-select" value={plan.wetFoodId ?? ''} onChange={e => updatePlan({ wetFoodId: e.target.value || null })}>
            <option value="">— none —</option>
            {wetOptions.map(f => <option key={f.id} value={f.id}>{f.brand} · {f.name}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <Label>Dry ↔ Wet mix</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted, minWidth: 44 }}>Dry {100 - Math.round(plan.wetRatioKcal * 100)}%</span>
            <input type="range" min={0} max={100} value={Math.round(plan.wetRatioKcal * 100)}
              onChange={e => updatePlan({ wetRatioKcal: parseInt(e.target.value) / 100 })}
              style={{ flex: 1, accentColor: COLORS.cream }}
            />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.cream, minWidth: 60, textAlign: 'right' }}>Wet {Math.round(plan.wetRatioKcal * 100)}%</span>
          </div>
          <div style={{
            background: COLORS.bg, borderRadius: 8, padding: '10px 12px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: COLORS.muted,
          }}>
            <div>
              <div style={{ color: COLORS.faint, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.6rem', marginBottom: 2 }}>Dry / day</div>
              <div style={{ color: COLORS.text, fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700 }}>{n0(b.dry.grams)} g <span style={{ color: COLORS.muted, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 400 }}>({n0(b.dry.kcal)} kcal)</span></div>
            </div>
            <div>
              <div style={{ color: COLORS.faint, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.6rem', marginBottom: 2 }}>Wet / day</div>
              <div style={{ color: COLORS.text, fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700 }}>{n0(b.wet.grams)} g <span style={{ color: COLORS.muted, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', fontWeight: 400 }}>({n0(b.wet.kcal)} kcal)</span></div>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted, marginTop: 8, lineHeight: 1.6 }}>
            The slider splits daily <strong style={{ color: COLORS.text }}>calories</strong>. Wet food is mostly water, so 50% by calories = way more <strong style={{ color: COLORS.text }}>grams</strong> of wet than dry.<br />
            For male cats {cat.sex === 'male' ? '(like ' + cat.name + ')' : ''}, 50–70% wet is often recommended for urinary hydration.
          </p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <Label>Meals per day</Label>
          <div style={{ display: 'flex', gap: 4, background: COLORS.bg, borderRadius: 8, padding: 3 }}>
            {[2, 3, 4].map(m => (
              <button key={m} className="kubo-tab" onClick={() => updatePlan({ meals: m })} style={{
                flex: 1, background: plan.meals === m ? COLORS.panelHi : 'transparent',
                border: `1px solid ${plan.meals === m ? COLORS.borderHi : 'transparent'}`,
                borderRadius: 6, padding: '7px 4px',
                color: plan.meals === m ? COLORS.text : COLORS.muted,
                fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s ease',
              }}>{m}× / day</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <Label>Water added to bowl (per meal)</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="range" min={0} max={80} step={5} value={plan.addedWaterMlPerMeal ?? 0}
              onChange={e => updatePlan({ addedWaterMlPerMeal: parseInt(e.target.value) })}
              style={{ flex: 1, accentColor: COLORS.cream }}
            />
            <input
              type="number" min={0} step={1}
              value={plan.addedWaterMlPerMeal ?? 0}
              onChange={e => updatePlan({ addedWaterMlPerMeal: Math.max(0, parseInt(e.target.value) || 0) })}
              className="kubo-input"
              style={{ width: 80, padding: '6px 8px', textAlign: 'right', fontFamily: 'var(--font-fraunces), serif', fontSize: '0.95rem', fontWeight: 700 }}
            />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: COLORS.muted }}>ml</span>
          </div>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted, marginTop: 6, lineHeight: 1.6 }}>
            Extra water you pour into the food bowl. Adds <strong style={{ color: COLORS.text }}>{n0((plan.addedWaterMlPerMeal ?? 0) * plan.meals)} ml/day</strong> to total water intake.
            Weigh the bowl before and after pouring once — it becomes routine.
          </p>
        </div>
      </Card>

      <Card>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 14 }}>Result</div>

        {/* Kcal split visual */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', color: COLORS.muted }}>Daily calorie split</span>
            <span style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '0.95rem', fontWeight: 700, color: COLORS.cream }}>{n0(b.daily.der)} kcal</span>
          </div>
          <div style={{ height: 10, background: COLORS.bg, borderRadius: 99, overflow: 'hidden', display: 'flex' }}>
            <div style={{ height: '100%', background: COLORS.cream, width: `${(b.dry.kcal / b.daily.der) * 100 || 0}%`, transition: 'width 0.3s ease' }} />
            <div style={{ height: '100%', background: COLORS.gold, width: `${(b.wet.kcal / b.daily.der) * 100 || 0}%`, transition: 'width 0.3s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted }}>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, background: COLORS.cream, borderRadius: 2, marginRight: 6 }} />Dry {n0(b.dry.kcal)} kcal</span>
            <span><span style={{ display: 'inline-block', width: 8, height: 8, background: COLORS.gold, borderRadius: 2, marginRight: 6 }} />Wet {n0(b.wet.kcal)} kcal</span>
          </div>
        </div>

        {b.dry.food && <StatRow label={`Dry — ${b.dry.food.brand}`} value={`${n0(b.dry.grams)} g/day`} sub={`${n1(b.dry.perMealG)} g × ${plan.meals} meals`} />}
        {b.wet.food && <StatRow label={`Wet — ${b.wet.food.brand}`} value={`${n0(b.wet.grams)} g/day`} sub={`${n1(b.wet.perMealG)} g × ${plan.meals} meals · ${b.wet.cans.toFixed(2)} cans/day`} />}
        {b.addedWater.dailyMl > 0 && <StatRow label="Added water" value={`${n0(b.addedWater.dailyMl)} ml/day`} sub={`${n0(b.addedWater.perMealMl)} ml × ${plan.meals} meals`} color={COLORS.gold} />}
        <StatRow label="Protein" value={`${n1(b.totals.proteinG)} g`} sub={`target ${n1(b.totals.proteinTargetG)} g`} color={b.totals.proteinG >= b.totals.proteinTargetG ? COLORS.good : COLORS.warn} />
        <StatRow label="Total water intake" value={`${n0(b.totals.moistureMl)} ml`} sub={`${n0(b.totals.moistureFromFoodMl)} from food + ${n0(b.addedWater.dailyMl)} added · target ${n0(b.totals.waterTargetMl)}`} color={b.totals.moistureMl >= b.totals.waterTargetMl * 0.6 ? COLORS.good : COLORS.warn} />
        <StatRow label="Daily cost" value={peso(b.totals.dailyCost)} sub={`${peso(b.totals.weeklyCost)}/wk · ${peso(b.totals.monthlyCost)}/mo`} color={COLORS.gold} />
      </Card>

      <Card style={{ gridColumn: '1 / -1' }}>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 14 }}>
          Per-meal breakdown · {plan.meals}× per day
        </div>
        <PerMealTable cat={cat} plan={plan} breakdown={b} />
      </Card>

      {b.urinary.flags.length > 0 && (
        <Card style={{ gridColumn: '1 / -1', borderColor: 'rgba(255,123,107,0.25)', background: 'rgba(255,123,107,0.05)' }}>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.warn, marginBottom: 10 }}>Urinary & nutrition watch-outs</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: COLORS.text, lineHeight: 1.7 }}>
            {b.urinary.flags.map((f, i) => <li key={i} style={{ marginBottom: 4 }}>{f}</li>)}
          </ul>
        </Card>
      )}

      <style>{`@media (max-width: 720px) { .kubo-two { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function PerMealTable({ cat, plan, breakdown: b }: { cat: Cat; plan: MealPlan; breakdown: ReturnType<typeof computeMealPlan> }) {
  const mealLabels = plan.meals === 2 ? ['Morning', 'Evening']
                   : plan.meals === 3 ? ['Morning', 'Midday', 'Evening']
                   : ['Morning', 'Midday', 'Afternoon', 'Evening'];
  const perMealDryG = b.dry.grams / plan.meals;
  const perMealWetG = b.wet.grams / plan.meals;
  const perMealDryKcal = b.dry.kcal / plan.meals;
  const perMealWetKcal = b.wet.kcal / plan.meals;
  const perMealCans = b.wet.cans / plan.meals;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `1.2fr repeat(${plan.meals}, 1fr) 1fr`, gap: 8, fontFamily: 'var(--font-inter), sans-serif' }} className="kubo-per-meal">
        <div style={{ fontSize: '0.7rem', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}` }}>Food</div>
        {mealLabels.map(m => (
          <div key={m} style={{ fontSize: '0.7rem', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>{m}</div>
        ))}
        <div style={{ fontSize: '0.7rem', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: 8, borderBottom: `1px solid ${COLORS.border}`, textAlign: 'right' }}>Daily</div>

        {b.dry.food && (
          <>
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '0.85rem', color: COLORS.text, fontWeight: 500 }}>Dry</div>
              <div style={{ fontSize: '0.7rem', color: COLORS.muted }}>{b.dry.food.brand} · {b.dry.food.name}</div>
            </div>
            {Array.from({ length: plan.meals }).map((_, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.cream }}>{n1(perMealDryG)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>g</span></div>
                <div style={{ fontSize: '0.68rem', color: COLORS.muted }}>{n0(perMealDryKcal)} kcal</div>
              </div>
            ))}
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.text }}>{n0(b.dry.grams)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>g</span></div>
              <div style={{ fontSize: '0.68rem', color: COLORS.muted }}>{n0(b.dry.kcal)} kcal</div>
            </div>
          </>
        )}

        {b.wet.food && (
          <>
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '0.85rem', color: COLORS.text, fontWeight: 500 }}>Wet</div>
              <div style={{ fontSize: '0.7rem', color: COLORS.muted }}>{b.wet.food.brand} · {b.wet.food.name}</div>
            </div>
            {Array.from({ length: plan.meals }).map((_, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.gold }}>{n1(perMealWetG)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>g</span></div>
                <div style={{ fontSize: '0.68rem', color: COLORS.muted }}>{perMealCans.toFixed(2)} can · {n0(perMealWetKcal)} kcal</div>
              </div>
            ))}
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.text }}>{n0(b.wet.grams)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>g</span></div>
              <div style={{ fontSize: '0.68rem', color: COLORS.muted }}>{b.wet.cans.toFixed(2)} cans · {n0(b.wet.kcal)} kcal</div>
            </div>
          </>
        )}

        {b.addedWater.dailyMl > 0 && (
          <>
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: '0.85rem', color: COLORS.text, fontWeight: 500 }}>Water</div>
              <div style={{ fontSize: '0.7rem', color: COLORS.muted }}>Added to bowl</div>
            </div>
            {Array.from({ length: plan.meals }).map((_, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: '#6BB0FF' }}>{n0(b.addedWater.perMealMl)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>ml</span></div>
              </div>
            ))}
            <div style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}`, textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.text }}>{n0(b.addedWater.dailyMl)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>ml</span></div>
            </div>
          </>
        )}

        <div style={{ padding: '12px 0', fontSize: '0.75rem', color: COLORS.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Meal total</div>
        {Array.from({ length: plan.meals }).map((_, i) => (
          <div key={i} style={{ padding: '12px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.text }}>{n0(perMealDryG + perMealWetG + b.addedWater.perMealMl)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>g</span></div>
            <div style={{ fontSize: '0.68rem', color: COLORS.cream }}>{n0(perMealDryKcal + perMealWetKcal)} kcal</div>
          </div>
        ))}
        <div style={{ padding: '12px 0', textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.1rem', fontWeight: 700, color: COLORS.text }}>{n0(b.dry.grams + b.wet.grams + b.addedWater.dailyMl)}<span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: COLORS.muted, fontWeight: 400, marginLeft: 2 }}>g</span></div>
          <div style={{ fontSize: '0.68rem', color: COLORS.cream }}>{n0(b.daily.der)} kcal</div>
        </div>
      </div>
      <p style={{ marginTop: 12, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted, lineHeight: 1.6 }}>
        Tip: weigh with a kitchen scale for accuracy. Wet food&apos;s worth measuring at least once per can — the density varies enough that eyeballing under-feeds hydration.
      </p>
      <style>{`
        @media (max-width: 720px) {
          .kubo-per-meal { grid-template-columns: 1fr !important; gap: 4px !important; }
          .kubo-per-meal > div { text-align: left !important; border-bottom: none !important; padding: 4px 0 !important; }
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Foods tab
// ────────────────────────────────────────────────────────────────────────────

function FoodsTab({ foods, upsertFood, removeFood }: {
  foods: Food[]; upsertFood: (f: Food) => void; removeFood: (id: string) => void;
}) {
  const [editing, setEditing] = useState<Food | null>(null);
  const [creating, setCreating] = useState(false);
  const blank = (): Food => ({
    id: `food-${Date.now()}`, brand: '', name: '', type: 'dry',
    kcalPer100g: 380, protein: 30, fat: 12, moisture: 10,
    pricePhp: 500, priceUnit: 'per-kg', lifeStage: 'all',
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'clamp(300px, 45%, 460px) 1fr', gap: 20 }} className="kubo-two">
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted }}>Food library ({foods.length})</div>
          <button className="kubo-btn kubo-btn-primary" onClick={() => { setEditing(blank()); setCreating(true); }}>+ Add food</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 620, overflowY: 'auto' }}>
          {foods.map(f => (
            <button key={f.id} onClick={() => { setEditing(f); setCreating(false); }} style={{
              display: 'flex', flexDirection: 'column', gap: 2,
              background: editing?.id === f.id && !creating ? COLORS.panelHi : COLORS.bg,
              border: `1px solid ${editing?.id === f.id && !creating ? COLORS.borderHi : COLORS.border}`,
              borderRadius: 10, padding: 12, textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: COLORS.text, fontWeight: 500 }}>{f.brand} <span style={{ color: COLORS.muted }}>{f.name}</span></span>
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.68rem', color: f.type === 'dry' ? COLORS.cream : COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>{f.type}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted }}>
                {f.kcalPer100g} kcal/100g · {f.protein}% protein · {peso(f.pricePhp)} {f.priceUnit === 'per-kg' ? '/kg' : '/can'}
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        {editing ? (
          <FoodEditor food={editing} isNew={creating} onSave={f => { upsertFood(f); setEditing(f); setCreating(false); }} onDelete={() => { removeFood(editing.id); setEditing(null); }} onClose={() => setEditing(null)} />
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: COLORS.muted, lineHeight: 1.6 }}>
            Pick a food to edit, or add a new one.<br />
            <span style={{ fontSize: '0.75rem' }}>The seeded values are typical for each brand — update them with what&apos;s on your actual bag/can.</span>
          </div>
        )}
      </Card>

      <style>{`@media (max-width: 720px) { .kubo-two { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function FoodEditor({ food, isNew, onSave, onDelete, onClose }: {
  food: Food; isNew: boolean; onSave: (f: Food) => void; onDelete: () => void; onClose: () => void;
}) {
  const [f, setF] = useState<Food>(food);
  useEffect(() => setF(food), [food.id]);
  const patch = (p: Partial<Food>) => setF(cur => ({ ...cur, ...p }));
  const num = (v: string) => { const n = parseFloat(v); return isFinite(n) ? n : 0; };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted }}>{isNew ? 'Add food' : 'Edit food'}</div>
        <button className="kubo-btn" onClick={onClose}>Close</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="kubo-two">
        <div><Label>Brand</Label><input className="kubo-input" value={f.brand} onChange={e => patch({ brand: e.target.value })} /></div>
        <div><Label>Name / variant</Label><input className="kubo-input" value={f.name} onChange={e => patch({ name: e.target.value })} /></div>
        <div><Label>Type</Label>
          <select className="kubo-select" value={f.type} onChange={e => patch({ type: e.target.value as Food['type'] })}>
            <option value="dry">Dry</option>
            <option value="wet">Wet</option>
          </select>
        </div>
        <div><Label>Life stage</Label>
          <select className="kubo-select" value={f.lifeStage} onChange={e => patch({ lifeStage: e.target.value as Food['lifeStage'] })}>
            <option value="kitten">Kitten</option>
            <option value="adult">Adult</option>
            <option value="all">All life stages</option>
          </select>
        </div>
        <div><Label>kcal per 100g</Label><input className="kubo-input" type="number" step="1" value={f.kcalPer100g} onChange={e => patch({ kcalPer100g: num(e.target.value) })} /></div>
        {f.type === 'wet' && <div><Label>Can / pouch size (g)</Label><input className="kubo-input" type="number" step="1" value={f.canSizeG ?? ''} onChange={e => patch({ canSizeG: num(e.target.value) })} /></div>}
        <div><Label>Protein (%)</Label><input className="kubo-input" type="number" step="0.1" value={f.protein} onChange={e => patch({ protein: num(e.target.value) })} /></div>
        <div><Label>Fat (%)</Label><input className="kubo-input" type="number" step="0.1" value={f.fat} onChange={e => patch({ fat: num(e.target.value) })} /></div>
        <div><Label>Moisture (%)</Label><input className="kubo-input" type="number" step="0.1" value={f.moisture} onChange={e => patch({ moisture: num(e.target.value) })} /></div>
        <div><Label>Ash (%) — optional</Label><input className="kubo-input" type="number" step="0.1" value={f.ash ?? ''} onChange={e => patch({ ash: e.target.value ? num(e.target.value) : undefined })} /></div>
        <div><Label>Phosphorus (% DM) — optional</Label><input className="kubo-input" type="number" step="0.01" value={f.phosphorus ?? ''} onChange={e => patch({ phosphorus: e.target.value ? num(e.target.value) : undefined })} /></div>
        <div><Label>Magnesium (% DM) — optional</Label><input className="kubo-input" type="number" step="0.001" value={f.magnesium ?? ''} onChange={e => patch({ magnesium: e.target.value ? num(e.target.value) : undefined })} /></div>
        <div><Label>Price (PHP)</Label><input className="kubo-input" type="number" step="1" value={f.pricePhp} onChange={e => patch({ pricePhp: num(e.target.value) })} /></div>
        <div><Label>Price unit</Label>
          <select className="kubo-select" value={f.priceUnit} onChange={e => patch({ priceUnit: e.target.value as Food['priceUnit'] })}>
            <option value="per-kg">per kg</option>
            <option value="per-can">per can/pouch</option>
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}><Label>Notes</Label><textarea className="kubo-input" rows={2} value={f.notes ?? ''} onChange={e => patch({ notes: e.target.value })} /></div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button className="kubo-btn kubo-btn-primary" style={{ flex: 1 }} onClick={() => onSave(f)}>Save</button>
        {!isNew && <button className="kubo-btn kubo-btn-danger" onClick={onDelete}>Delete</button>}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Recommend tab
// ────────────────────────────────────────────────────────────────────────────

function RecommendTab({ cat, foods }: { cat: Cat; foods: Food[] }) {
  const [filter, setFilter] = useState<'all' | 'dry' | 'wet'>('all');
  const ranked = useMemo(() => {
    return foods
      .filter(f => filter === 'all' || f.type === filter)
      .map(f => ({ food: f, ...scoreFoodForCat(cat, f) }))
      .sort((a, b) => b.score - a.score);
  }, [cat, foods, filter]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted }}>Ranked for {cat.name}</div>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: COLORS.muted, marginTop: 4, maxWidth: 560, lineHeight: 1.6 }}>
            Score reflects life-stage fit, protein, urinary risk factors (phosphorus, magnesium), and kcal-per-peso value. Not medical advice — always cross-check with your vet.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 4, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 3 }}>
          {(['all', 'dry', 'wet'] as const).map(k => (
            <button key={k} className="kubo-tab" onClick={() => setFilter(k)} style={{
              background: filter === k ? COLORS.panelHi : 'transparent',
              border: `1px solid ${filter === k ? COLORS.borderHi : 'transparent'}`,
              borderRadius: 6, padding: '6px 12px',
              color: filter === k ? COLORS.text : COLORS.muted,
              fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem',
              cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize',
            }}>{k}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ranked.map(({ food, score, reasons }, i) => (
          <div key={food.id} style={{
            background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12,
            padding: 18, display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 16, alignItems: 'center',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: COLORS.bg, display: 'grid', placeItems: 'center', border: `2px solid ${score >= 80 ? COLORS.good : score >= 60 ? COLORS.gold : score >= 40 ? COLORS.cream : COLORS.warn}` }}>
              <span style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.15rem', fontWeight: 700, color: COLORS.text }}>{score}</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', color: COLORS.text, fontWeight: 500, marginBottom: 2 }}>
                <span style={{ color: COLORS.muted, marginRight: 8 }}>#{i + 1}</span>{food.brand} · {food.name}
                <span style={{ marginLeft: 10, fontSize: '0.68rem', color: food.type === 'dry' ? COLORS.cream : COLORS.gold, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{food.type}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: COLORS.muted, marginBottom: 6 }}>
                {food.kcalPer100g} kcal/100g · {food.protein}% protein · {food.moisture}% moisture · {peso(food.pricePhp)}{food.priceUnit === 'per-kg' ? '/kg' : '/can'}
              </div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: COLORS.text, lineHeight: 1.6 }}>
                {reasons.slice(0, 4).map((r, j) => (
                  <span key={j} style={{ marginRight: 10, color: r.match(/High|Low|risk|Not/i) ? COLORS.warn : COLORS.muted }}>· {r}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sources card — cites the veterinary nutrition references behind the math
// ────────────────────────────────────────────────────────────────────────────

function SourcesCard() {
  const [open, setOpen] = useState(false);
  const linkStyle: React.CSSProperties = { color: COLORS.gold, textDecoration: 'none', borderBottom: `1px dotted ${COLORS.gold}` };
  return (
    <Card>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 4 }}>How the math works</div>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: COLORS.text, margin: 0, lineHeight: 1.5 }}>
            Every number here traces to a published veterinary nutrition reference. {open ? 'Collapse to hide' : 'Tap to expand'} the citations.
          </p>
        </div>
        <span style={{ color: COLORS.muted, fontFamily: 'var(--font-fraunces), serif', fontSize: '1.4rem', flexShrink: 0, marginLeft: 12 }}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 18, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', color: COLORS.text, lineHeight: 1.7 }}>

          <div>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700, color: COLORS.cream, marginBottom: 4 }}>Resting energy requirement (RER)</div>
            <div style={{ color: COLORS.muted, marginBottom: 6 }}>
              Formula: <strong style={{ color: COLORS.text }}>RER (kcal/day) = 70 × BW(kg)<sup>0.75</sup></strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted }}>
              <li>National Research Council. <em>Nutrient Requirements of Dogs and Cats.</em> Washington, DC: National Academies Press, 2006. <a style={linkStyle} href="https://nap.nationalacademies.org/catalog/10668/nutrient-requirements-of-dogs-and-cats" target="_blank" rel="noreferrer">nap.nationalacademies.org →</a></li>
              <li>WSAVA Global Nutrition Committee. <em>Global Nutritional Assessment Guidelines &amp; Toolkit.</em> 2011, updated 2020. <a style={linkStyle} href="https://wsava.org/global-guidelines/global-nutrition-guidelines/" target="_blank" rel="noreferrer">wsava.org →</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700, color: COLORS.cream, marginBottom: 4 }}>Daily energy requirement (DER) factors</div>
            <div style={{ color: COLORS.muted, marginBottom: 6 }}>DER = RER × life-stage/activity factor. Ranges used here:</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted }}>
              <li>Growing kitten &lt;4 mo: <strong style={{ color: COLORS.text }}>3.0×</strong> — Hand, Thatcher, Remillard et al. <em>Small Animal Clinical Nutrition, 5th ed.</em> Mark Morris Institute, 2010 (chap. 20).</li>
              <li>Kitten 4–6 mo: <strong style={{ color: COLORS.text }}>2.5×</strong> · Kitten 6–12 mo: <strong style={{ color: COLORS.text }}>2.0×</strong></li>
              <li>Neutered adult: <strong style={{ color: COLORS.text }}>1.2×</strong> · Intact adult: <strong style={{ color: COLORS.text }}>1.4×</strong> · Outdoor active: <strong style={{ color: COLORS.text }}>1.6×</strong> — same reference.</li>
              <li>Body-condition adjustment: BCS ≥7 uses 0.8× (weight-loss target); BCS ≤3 uses 1.2× (weight-gain target). Per WSAVA BCS 9-point system.</li>
              <li>Bermingham, EN, Thomas, DG, Morris, PJ, et al. Energy requirements of adult cats. <em>British Journal of Nutrition</em> 2010; 103(8):1083–93. <a style={linkStyle} href="https://doi.org/10.1017/S0007114509992789" target="_blank" rel="noreferrer">doi.org/10.1017/S0007114509992789 →</a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700, color: COLORS.cream, marginBottom: 4 }}>Protein target</div>
            <div style={{ color: COLORS.muted, marginBottom: 6 }}>
              Kittens: <strong style={{ color: COLORS.text }}>~9 g crude protein / kg BW / day.</strong>
              Adults: <strong style={{ color: COLORS.text }}>~4.5 g / kg BW / day</strong> (higher than dogs — cats are obligate carnivores).
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted }}>
              <li>NRC 2006 (above), Table 15-4. Minimum recommended allowance: 5.2 g/kg<sup>0.67</sup> for growing kittens.</li>
              <li>AAFCO Cat Food Nutrient Profiles 2024. Growth &amp; reproduction: 30% min crude protein DM; maintenance: 26% min. <a style={linkStyle} href="https://www.aafco.org" target="_blank" rel="noreferrer">aafco.org →</a></li>
              <li>Laflamme, DP. Cats and carbohydrates: implications for health and disease. <em>Compendium</em> 2010.</li>
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700, color: COLORS.cream, marginBottom: 4 }}>Water target</div>
            <div style={{ color: COLORS.muted, marginBottom: 6 }}>
              Baseline: <strong style={{ color: COLORS.text }}>~60 ml / kg BW / day</strong> total water intake (food moisture + free water).
              Cats have a low thirst drive; wet food is the primary hydration route.
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted }}>
              <li>Zoran, DL. The carnivore connection to nutrition in cats. <em>JAVMA</em> 2002; 221(11):1559–67. <a style={linkStyle} href="https://doi.org/10.2460/javma.2002.221.1559" target="_blank" rel="noreferrer">doi.org/10.2460/javma.2002.221.1559 →</a></li>
              <li>Buffington, CAT. Idiopathic feline lower urinary tract disease. <em>Vet Clin North Am Small Anim Pract</em> 2011; 41(4):723–35.</li>
              <li>NRC 2006, chapter on water.</li>
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700, color: COLORS.cream, marginBottom: 4 }}>Urinary-health thresholds (male cats)</div>
            <div style={{ color: COLORS.muted, marginBottom: 6 }}>
              Flags used here — <strong style={{ color: COLORS.text }}>phosphorus &gt; 1.2% DM</strong>, <strong style={{ color: COLORS.text }}>magnesium &gt; 0.12% DM</strong>, <strong style={{ color: COLORS.text }}>diet moisture &lt; 50%</strong>.
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted }}>
              <li>FEDIAF (European Pet Food Industry Federation). <em>Nutritional Guidelines for Complete and Complementary Pet Food for Cats and Dogs.</em> 2021. Recommended max phosphorus for adult cats: 1.6% DM. <a style={linkStyle} href="https://europeanpetfood.org/self-regulation/nutritional-guidelines/" target="_blank" rel="noreferrer">europeanpetfood.org →</a></li>
              <li>Buffington, CAT; Chew, DJ. Diet therapy in cats with lower urinary tract disorders. <em>Vet Med</em> 1998.</li>
              <li>Markwell, PJ, Buffington, CAT, Chew, DJ, et al. Clinical evaluation of commercially available urinary acidification diets. <em>JAVMA</em> 1999; 214(3):361–5.</li>
              <li>Lulich, JP, Berent, AC, Adams, LG, et al. ACVIM small animal consensus recommendations on the treatment and prevention of uroliths in dogs and cats. <em>J Vet Intern Med</em> 2016; 30:1564–74. <a style={linkStyle} href="https://doi.org/10.1111/jvim.14559" target="_blank" rel="noreferrer">doi.org/10.1111/jvim.14559 →</a></li>
              <li>Wet-diet recommendation for FLUTD/idiopathic cystitis: Forrester, SD; Kruger, JM. Cost/benefit and safety considerations. <em>Vet Clin Small Anim</em> 2015.</li>
            </ul>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1rem', fontWeight: 700, color: COLORS.cream, marginBottom: 4 }}>Body condition scoring (BCS)</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: COLORS.muted }}>
              <li>Laflamme, DP. Development and validation of a body condition score system for cats: a clinical tool. <em>Feline Practice</em> 1997; 25(5–6):13–18.</li>
              <li>WSAVA Body Condition Score — 9-point chart. <a style={linkStyle} href="https://wsava.org/wp-content/uploads/2020/01/Body-Condition-Score-Cat-updated-August-2020.pdf" target="_blank" rel="noreferrer">wsava.org PDF →</a></li>
            </ul>
          </div>

          <div style={{ padding: 12, background: COLORS.bg, borderRadius: 8, borderLeft: `3px solid ${COLORS.warn}` }}>
            <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', color: COLORS.text, fontWeight: 500, marginBottom: 4 }}>Important caveat</div>
            <p style={{ margin: 0, fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', color: COLORS.muted, lineHeight: 1.6 }}>
              These formulas approximate energy needs for a <em>healthy</em> cat. Individual variation is ±20% even in the studies. Kittens with rapid growth, cats with medical conditions (CKD, diabetes, IBD, urinary crystals), and pregnant/lactating queens have distinct requirements not covered here. Always cross-check with your veterinarian, especially before switching diets. This tool is a planning aid — not medical advice.
            </p>
          </div>

        </div>
      )}
    </Card>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Data controls (export / import / reset)
// ────────────────────────────────────────────────────────────────────────────

function DataControls({ store, setStore, doReset }: {
  store: KuboStore; setStore: (s: KuboStore) => void; doReset: () => void;
}) {
  const download = () => {
    const blob = new Blob([exportJson(store)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `kubo-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(url);
  };
  const upload = (file: File) => {
    const r = new FileReader();
    r.onload = () => {
      const parsed = importJson(String(r.result));
      if (parsed) setStore(parsed);
      else alert('Could not read that file.');
    };
    r.readAsText(file);
  };
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: 4 }}>Your data</div>
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: COLORS.muted, margin: 0, lineHeight: 1.6, maxWidth: 560 }}>
            All data is stored locally in your browser. Export to move it between devices. Reset restores the default Kubo profile and seeded food catalog.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="kubo-btn" onClick={download}>Export JSON</button>
          <label className="kubo-btn" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
            Import JSON
            <input type="file" accept="application/json" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }} />
          </label>
          <button className="kubo-btn kubo-btn-danger" onClick={() => { if (confirm('Reset to defaults? This will remove any cats or foods you\'ve added.')) doReset(); }}>Reset</button>
        </div>
      </div>
    </Card>
  );
}
