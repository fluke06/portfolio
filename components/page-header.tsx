import { BilingualLabel } from './bilingual-label';
import { SlotText } from './slot-text';

interface PageHeaderProps {
  num?: string;
  en: string;
  title: string;
  accent?: string;
  accentBlock?: boolean;
  sub?: string;
}

export function PageHeader({ num, en, title, accent, accentBlock, sub }: PageHeaderProps) {
  return (
    <header className="page-header">
      <BilingualLabel num={num} en={en} />
      <h1 className={`page-title ${accentBlock ? 'page-title-stack' : ''}`}>
        <SlotText delay={700} baseDuration={900} perCharDuration={60}>{title}</SlotText>
        {accent && <em><SlotText delay={1000} baseDuration={900} perCharDuration={60}>{accent}</SlotText></em>}
      </h1>
      {sub && <p className="page-sub">{sub}</p>}
    </header>
  );
}
