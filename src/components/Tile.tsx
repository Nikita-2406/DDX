import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  label: string;
  to: string;
  className?: string;
  children: ReactNode;
}

export function Tile({ label, to, className, children }: Props) {
  return (
    <Link
      to={to}
      className={`bg-white rounded-[24px] p-4 min-h-[122px] flex flex-col justify-between active:scale-[.98] transition ${
        className ?? ''
      }`}
    >
      <span className="h-[52px] flex items-center">{children}</span>
      <span className="font-bold text-[15px] leading-[1.2]">{label}</span>
    </Link>
  );
}
