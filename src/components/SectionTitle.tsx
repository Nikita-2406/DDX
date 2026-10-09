import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  to?: string;
  onClick?: () => void;
}

export function SectionTitle({ title, to, onClick }: Props) {
  const inner = (
    <>
      <span className="font-display text-[30px] leading-none uppercase text-heading">{title}</span>
      <ChevronRight size={22} className="text-ink" />
    </>
  );
  const cls = 'w-full flex items-center justify-between py-2';
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
