import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface Props {
  title: string;
  backTo?: string;
  action?: ReactNode;
}

export function ScreenHeader({ title, backTo = '/profile', action }: Props) {
  const navigate = useNavigate();
  return (
    <header className="grid grid-cols-[44px_1fr_44px] items-center px-3 pt-[max(env(safe-area-inset-top),14px)] pb-2">
      <button
        onClick={() => navigate(backTo)}
        aria-label="Назад"
        className="w-11 h-11 grid place-items-center rounded-full active:bg-gray-100"
      >
        <ChevronLeft size={26} />
      </button>
      <h1 className="font-display text-[27px] text-center leading-none uppercase text-heading">{title}</h1>
      <div className="justify-self-end">{action ?? <span className="w-11" />}</div>
    </header>
  );
}
