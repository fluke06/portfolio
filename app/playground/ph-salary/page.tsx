'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { StickyNav } from '@/components/sticky-nav';
import { FooterSection } from '@/components/footer-section';

// ── Types ─────────────────────────────────────────────────────────────────────

type EmpType = 'private' | 'government';
type Period  = 'daily' | 'semi-monthly' | 'monthly' | 'annual';

const PERIOD_LABEL: Record<Period, string> = {
  'daily':        'Daily',
  'semi-monthly': 'Semi-Monthly',
  'monthly':      'Monthly',
  'annual':       'Annual',
};

// How many of these periods fit into one month
const TO_MONTHLY: Record<Period, number> = {
  'daily':        26,
  'semi-monthly': 2,
  'monthly':      1,
  'annual':       1 / 12,
};

// ── Deduction calculators (always receive monthly amounts) ────────────────────

function sss(basicM: number): number {
  // SSS 2024+: 5% employee share, MSC ₱4k–₱35k, ₱500 brackets
  const msc = Math.min(Math.max(Math.round(basicM / 500) * 500, 4000), 35000);
  return Math.round(msc * 0.05 * 100) / 100;
}

function gsis(basicM: number): number {
  // GSIS (RA 8291): 9% employee share of basic monthly salary, no MSC table
  return Math.round(basicM * 0.09 * 100) / 100;
}

function philhealth(basicM: number): number {
  // 5% total; 2.5% employee. Floor ₱250 (₱10k), cap ₱2,500 (₱100k)
  return Math.min(Math.max(basicM * 0.025, 250), 2500);
}

function pagibig(basicM: number): number {
  // ≤₱1,500 → 1%; >₱1,500 → 2%, max ₱200/mo (2024+)
  return basicM <= 1500 ? basicM * 0.01 : Math.min(basicM * 0.02, 200);
}

function withholdingTax(taxable: number): number {
  // TRAIN Law 2023+ revised monthly brackets (RA 10963 amended)
  if (taxable <=  20_833)   return 0;
  if (taxable <=  33_333)   return (taxable - 20_833) * 0.15;
  if (taxable <=  66_667)   return 1_875    + (taxable - 33_333) * 0.20;
  if (taxable <= 166_667)   return 8_541.80 + (taxable - 66_667) * 0.25;
  if (taxable <= 666_667)   return 33_541.80 + (taxable - 166_667) * 0.30;
  return                           183_541.80 + (taxable - 666_667) * 0.35;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const peso = (n: number) =>
  '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function parseN(s: string) {
  const v = parseFloat(s.replace(/,/g, ''));
  return isFinite(v) && v >= 0 ? v : 0;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PHSalaryPage() {
  const [empType,   setEmpType]   = useState<EmpType>('private');
  const [inputPer,  setInputPer]  = useState<Period>('monthly');
  const [viewPer,   setViewPer]   = useState<Period>('monthly');

  const [rawBasic,      setRawBasic]      = useState('30000');
  const [rawNightDiff,  setRawNightDiff]  = useState('');
  const [rawOvertime,   setRawOvertime]   = useState('');
  const [rawTaxAllow,   setRawTaxAllow]   = useState('');
  const [rawNonTaxAllow,setRawNonTaxAllow]= useState('');

  const vals = useMemo(() => {
    const m = TO_MONTHLY[inputPer];

    const basicM      = parseN(rawBasic)       * m;
    const nightDiffM  = parseN(rawNightDiff)   * m;
    const overtimeM   = parseN(rawOvertime)    * m;
    const taxAllowM   = parseN(rawTaxAllow)    * m;
    const nonTaxAllowM= parseN(rawNonTaxAllow) * m;

    // Mandatory contributions based on basic salary only
    const c1 = empType === 'private' ? sss(basicM) : gsis(basicM);
    const c2 = philhealth(basicM);
    const c3 = pagibig(basicM);

    // Taxable income: basic + taxable extras − mandatory contributions
    const taxableM = Math.max(
      basicM + nightDiffM + overtimeM + taxAllowM - c1 - c2 - c3, 0
    );
    const taxM = withholdingTax(taxableM);

    const totalDeductionsM = c1 + c2 + c3 + taxM;
    const grossM = basicM + nightDiffM + overtimeM + taxAllowM + nonTaxAllowM;
    const netM   = grossM - totalDeductionsM;

    return {
      grossM, basicM, c1, c2, c3,
      taxableM, taxM,
      totalDeductionsM, netM,
    };
  }, [empType, inputPer, rawBasic, rawNightDiff, rawOvertime, rawTaxAllow, rawNonTaxAllow]);

  const vMult = 1 / TO_MONTHLY[viewPer];

  const pctOf = (n: number) =>
    vals.grossM > 0 ? ((n / vals.grossM) * 100).toFixed(1) + '%' : '—';

  const deductions = [
    {
      label: empType === 'private' ? 'SSS' : 'GSIS',
      full:  empType === 'private' ? 'Social Security System' : 'Gov\'t Service Insurance System',
      note:  empType === 'private'
        ? `5% of ₱${Math.min(Math.max(Math.round(vals.basicM / 500) * 500, 4000), 35000).toLocaleString()} MSC`
        : `9% of ₱${vals.basicM.toLocaleString('en-PH', { maximumFractionDigits: 0 })} basic`,
      monthlyAmt: vals.c1,
      color: '#6B89FF',
    },
    {
      label: 'PhilHealth',
      full:  'Philippine Health Insurance',
      note:  `2.5%${vals.basicM < 10000 ? ' (₱10k floor)' : vals.basicM > 100000 ? ' (₱100k cap)' : ' of basic'}`,
      monthlyAmt: vals.c2,
      color: '#4CAF82',
    },
    {
      label: 'Pag-IBIG',
      full:  'Home Development Mutual Fund',
      note:  vals.basicM <= 1500 ? '1% of basic' : vals.c3 >= 200 ? '2% of basic (₱200 cap)' : '2% of basic',
      monthlyAmt: vals.c3,
      color: '#E8B33E',
    },
    {
      label: 'Withholding Tax',
      full:  'BIR TRAIN Law 2023+',
      note:  `on ₱${vals.taxableM.toLocaleString('en-PH', { maximumFractionDigits: 0 })} taxable/mo`,
      monthlyAmt: vals.taxM,
      color: '#FF7B6B',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#100F0D', color: '#EDE8E0' }}>
      <StickyNav alwaysVisible />

      {/* Back */}
      <div style={{ padding: '80px 24px 0', maxWidth: 980, margin: '0 auto' }}>
        <Link href="/playground" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: '#888280', textDecoration: 'none',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.8rem', letterSpacing: '0.04em',
          transition: 'color 0.2s ease',
        }} className="ph-back">
          ← Playground
        </Link>
      </div>

      {/* Header */}
      <header style={{ padding: 'clamp(32px,5vw,60px) 24px 0', maxWidth: 980, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block', background: '#1B1917',
          border: '1px solid rgba(237,232,224,0.08)', borderRadius: 6,
          padding: '4px 12px', marginBottom: 20,
        }}>
          <span style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.7rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#888280',
          }}>Tool</span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-fraunces), serif',
          fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700,
          lineHeight: 1.05, letterSpacing: '-0.02em', color: '#EDE8E0', marginBottom: 12,
        }}>
          PH Salary<br />
          <em style={{ fontStyle: 'italic', color: '#C4B89A' }}>Deductions Calculator</em>
        </h1>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.9rem', color: '#888280', lineHeight: 1.6, maxWidth: 480,
        }}>
          Compute your take-home pay after mandatory contributions and BIR withholding tax.
        </p>
      </header>

      {/* Main */}
      <main style={{
        maxWidth: 980, margin: '0 auto',
        padding: 'clamp(32px,5vw,56px) 24px clamp(60px,8vw,100px)',
        display: 'grid',
        gridTemplateColumns: 'clamp(260px,40%,360px) 1fr',
        gap: 'clamp(20px,4vw,48px)',
        alignItems: 'start',
      }} className="ph-grid">

        {/* ── Left: inputs ─────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Employment type */}
          <div>
            <FieldLabel>Employment Type</FieldLabel>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              background: '#1B1917',
              border: '1px solid rgba(237,232,224,0.08)',
              borderRadius: 10, padding: 4, gap: 4,
            }}>
              {(['private', 'government'] as EmpType[]).map(t => (
                <button key={t} onClick={() => setEmpType(t)} style={{
                  background: empType === t ? '#2A2724' : 'transparent',
                  border: empType === t ? '1px solid rgba(237,232,224,0.12)' : '1px solid transparent',
                  borderRadius: 7, padding: '9px 8px',
                  color: empType === t ? '#EDE8E0' : '#888280',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.75rem', letterSpacing: '0.02em',
                  cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize',
                }}>
                  {t === 'private' ? 'Private' : 'Government'}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-inter),sans-serif', fontSize: '0.68rem', color: '#555250', marginTop: 6, lineHeight: 1.5 }}>
              {empType === 'private' ? 'SSS: 5% of MSC (up to ₱35k)' : 'GSIS: 9% of basic salary (RA 8291)'}
            </p>
          </div>

          {/* Pay period */}
          <div>
            <FieldLabel>Pay Period</FieldLabel>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              background: '#1B1917',
              border: '1px solid rgba(237,232,224,0.08)',
              borderRadius: 10, padding: 4, gap: 4,
            }}>
              {(['daily','semi-monthly','monthly','annual'] as Period[]).map(p => (
                <button key={p} onClick={() => setInputPer(p)} style={{
                  background: inputPer === p ? '#2A2724' : 'transparent',
                  border: inputPer === p ? '1px solid rgba(237,232,224,0.12)' : '1px solid transparent',
                  borderRadius: 7, padding: '8px 2px',
                  color: inputPer === p ? '#EDE8E0' : '#888280',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.01em',
                  cursor: 'pointer', transition: 'all 0.15s ease', lineHeight: 1.3,
                  textAlign: 'center',
                }}>
                  {PERIOD_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Basic salary */}
          <div>
            <FieldLabel>{PERIOD_LABEL[inputPer]} Basic Salary</FieldLabel>
            <div style={{
              display: 'flex', alignItems: 'center',
              background: '#1B1917',
              border: '1px solid rgba(237,232,224,0.12)',
              borderRadius: 10, padding: '16px 20px',
              transition: 'border-color 0.2s ease',
            }} className="ph-input-wrap">
              <span style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: 'clamp(1.4rem,3vw,2rem)',
                color: '#888280', marginRight: 6, lineHeight: 1, flexShrink: 0,
              }}>₱</span>
              <input
                type="text" inputMode="decimal" value={rawBasic}
                onChange={e => setRawBasic(e.target.value)}
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: '#EDE8E0', fontFamily: 'var(--font-fraunces), serif',
                  fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700,
                  width: '100%', lineHeight: 1,
                }}
                placeholder="0" aria-label="Basic salary"
              />
            </div>
          </div>

          {/* Extra income fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ExtraField label="Night Differential"    period={inputPer} value={rawNightDiff}   onChange={setRawNightDiff} />
            <ExtraField label="Overtime Pay"          period={inputPer} value={rawOvertime}    onChange={setRawOvertime} />
            <ExtraField label="Taxable Allowance"     period={inputPer} value={rawTaxAllow}    onChange={setRawTaxAllow} />
            <ExtraField label="Non-Taxable Allowance" period={inputPer} value={rawNonTaxAllow} onChange={setRawNonTaxAllow} />
          </div>

          {/* Summary card */}
          <div style={{
            background: '#1B1917', border: '1px solid rgba(237,232,224,0.08)',
            borderRadius: 10, padding: '20px',
          }}>
            <SummaryRow label="Gross pay (monthly)"  value={peso(vals.grossM)}          muted />
            <div style={{ height: 1, background: 'rgba(237,232,224,0.06)', margin: '12px 0' }} />
            <SummaryRow label="Total deductions"     value={`−${peso(vals.totalDeductionsM)}`} color="#FF7B6B" />
            <div style={{ height: 1, background: 'rgba(237,232,224,0.06)', margin: '12px 0' }} />
            <div>
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#888280',
              }}>Monthly net take-home</span>
              <div style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 700,
                color: '#C4B89A', lineHeight: 1.1, marginTop: 4, letterSpacing: '-0.02em',
              }}>
                {peso(vals.netM)}
              </div>
            </div>
          </div>

          {/* Visual bar */}
          {vals.grossM > 0 && (
            <div>
              <div style={{
                height: 8, borderRadius: 99, background: '#1B1917',
                overflow: 'hidden', display: 'flex',
              }}>
                {deductions.map(d => (
                  <div key={d.label} style={{
                    height: '100%', width: pctOf(d.monthlyAmt),
                    background: d.color, transition: 'width 0.3s ease', flexShrink: 0,
                  }} />
                ))}
                <div style={{ height: '100%', flex: 1, background: '#C4B89A', opacity: 0.35 }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 10 }}>
                {deductions.map(d => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0, display: 'block' }} />
                    <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.68rem', color: '#888280' }}>
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: breakdown ─────────────────────────────────── */}
        <div>

          {/* View period toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.72rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#888280',
            }}>Breakdown</span>
            <div style={{
              display: 'flex', gap: 3, background: '#1B1917',
              border: '1px solid rgba(237,232,224,0.08)',
              borderRadius: 8, padding: 3,
            }}>
              {(['semi-monthly','monthly','annual'] as Period[]).map(p => (
                <button key={p} onClick={() => setViewPer(p)} style={{
                  background: viewPer === p ? '#2A2724' : 'transparent',
                  border: viewPer === p ? '1px solid rgba(237,232,224,0.12)' : '1px solid transparent',
                  borderRadius: 5, padding: '5px 10px',
                  color: viewPer === p ? '#EDE8E0' : '#888280',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.65rem', letterSpacing: '0.02em',
                  cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                }}>
                  {PERIOD_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {deductions.map(d => (
              <div key={d.label} style={{
                background: '#1B1917',
                border: '1px solid rgba(237,232,224,0.07)',
                borderRadius: 10, padding: '18px 20px',
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: '2px 16px', alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.85rem', fontWeight: 600, color: '#EDE8E0', marginBottom: 2,
                  }}>{d.label}</div>
                  <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.72rem', color: '#888280' }}>
                    {d.full} · {d.note}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontSize: 'clamp(1rem,1.8vw,1.2rem)', fontWeight: 700,
                    color: '#EDE8E0', whiteSpace: 'nowrap',
                  }}>
                    {peso(d.monthlyAmt * vMult)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: '#888280', marginTop: 1 }}>
                    {pctOf(d.monthlyAmt)} of gross
                  </div>
                </div>
              </div>
            ))}

            {/* Taxable income note */}
            {vals.taxM > 0 && (
              <div style={{
                background: 'rgba(255,123,107,0.06)',
                border: '1px solid rgba(255,123,107,0.15)',
                borderRadius: 8, padding: '12px 16px',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.75rem', color: '#888280', lineHeight: 1.6,
              }}>
                <span style={{ color: '#FF7B6B', fontWeight: 500 }}>Monthly taxable income</span>
                {' '}= gross {peso(vals.grossM)} − contributions {peso(vals.c1 + vals.c2 + vals.c3)} = <strong style={{ color: '#EDE8E0' }}>{peso(vals.taxableM)}</strong>
              </div>
            )}

            {/* Total row */}
            <div style={{
              background: '#1B1917',
              border: '1px solid rgba(237,232,224,0.12)',
              borderRadius: 10, padding: '18px 20px',
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'center', marginTop: 4,
            }}>
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#888280' }}>
                Total Deductions
              </span>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontSize: 'clamp(1rem,1.8vw,1.2rem)', fontWeight: 700,
                  color: '#FF7B6B', whiteSpace: 'nowrap',
                }}>
                  −{peso(vals.totalDeductionsM * vMult)}
                </div>
                <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.7rem', color: '#888280', marginTop: 1 }}>
                  {pctOf(vals.totalDeductionsM)} of gross
                </div>
              </div>
            </div>

            {/* Period summary table */}
            <div style={{
              background: '#1B1917', border: '1px solid rgba(237,232,224,0.08)',
              borderRadius: 10, padding: '16px 20px', marginTop: 4,
            }}>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.72rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#888280',
                marginBottom: 14,
              }}>Summary by Period</p>
              {([
                { key: 'semi-monthly' as Period, mult: 0.5  },
                { key: 'monthly'      as Period, mult: 1    },
                { key: 'annual'       as Period, mult: 12   },
              ]).map((row, i, arr) => (
                <div key={row.key} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '4px 8px', padding: '10px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(237,232,224,0.05)' : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.75rem', color: '#888280' }}>
                    {PERIOD_LABEL[row.key]}
                  </span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', color: '#555250', marginBottom: 1 }}>gross</div>
                    <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '0.82rem', fontWeight: 600, color: '#888280' }}>
                      {peso(vals.grossM * row.mult)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.6rem', color: '#555250', marginBottom: 1 }}>net</div>
                    <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '0.95rem', fontWeight: 700, color: '#C4B89A' }}>
                      {peso(vals.netM * row.mult)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.7rem', color: '#888280',
            lineHeight: 1.7, marginTop: 20, padding: '0 4px',
          }}>
            Rates effective 2024–2025. Private: SSS 5% (MSC ₱4k–₱35k). Government: GSIS 9% of basic (RA 8291). PhilHealth 2.5% (₱250–₱2,500). Pag-IBIG 2% (max ₱200). TRAIN Law 2023+ tax brackets (RA 10963). Contributions based on basic salary. Daily assumes 26 working days/month. Night diff, OT, and taxable allowance are included in taxable income.
          </p>
        </div>
      </main>

      <style>{`
        .ph-back:hover { color: #EDE8E0 !important; }
        .ph-input-wrap:focus-within { border-color: rgba(196,184,154,0.4) !important; }
        .ph-extra:focus-within { border-color: rgba(196,184,154,0.25) !important; }
        @media (max-width: 640px) {
          .ph-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <FooterSection />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: 'block',
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '0.72rem', letterSpacing: '0.14em',
      textTransform: 'uppercase', color: '#888280',
      marginBottom: 8,
    }}>
      {children}
    </label>
  );
}

function ExtraField({ label, period, value, onChange }: {
  label: string; period: Period; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.68rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#888280',
        }}>{label}</label>
        <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.62rem', color: '#444240' }}>
          {PERIOD_LABEL[period].toLowerCase()}
        </span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#1B1917',
        border: '1px solid rgba(237,232,224,0.07)',
        borderRadius: 8, overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }} className="ph-extra">
        <span style={{
          padding: '10px 10px 10px 14px',
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.82rem', color: '#555250', flexShrink: 0,
        }}>₱</span>
        <input
          type="text" inputMode="decimal" value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: '#EDE8E0', fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.88rem', fontWeight: 500, width: '100%',
            padding: '10px 14px 10px 0',
          }}
          placeholder="0" aria-label={label}
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, muted, color }: {
  label: string; value: string; muted?: boolean; color?: string;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.78rem', color: '#888280' }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-fraunces), serif',
        fontSize: '0.95rem', fontWeight: 700,
        color: color ?? (muted ? '#888280' : '#EDE8E0'),
      }}>
        {value}
      </span>
    </div>
  );
}
