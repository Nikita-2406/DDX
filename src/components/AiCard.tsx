import { ChevronRight } from 'lucide-react';

export function SparkleGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2.5c.7 5.2 2.6 7.1 7.5 7.5-4.9.4-6.8 2.3-7.5 7.5-.7-5.2-2.6-7.1-7.5-7.5 4.9-.4 6.8-2.3 7.5-7.5Z" />
      <path d="M19 14.5c.3 2.4 1.2 3.3 3.5 3.5-2.3.2-3.2 1.1-3.5 3.5-.3-2.4-1.2-3.3-3.5-3.5 2.3-.2 3.2-1.1 3.5-3.5Z" />
    </svg>
  );
}

interface AiCardProps {
  title: string;
  subtitle?: string;
  cta?: string;
  onClick: () => void;
}

/** Карточка с градиентной рамкой (ИИ-программа тренировок). */
export function AiCard({ title, subtitle, cta, onClick }: AiCardProps) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left rounded-[26px] p-[2px] bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 active:opacity-90"
    >
      <span className="flex items-center gap-3 rounded-[24px] bg-white px-4 py-3.5">
        <span className="w-[52px] h-[52px] shrink-0 rounded-[18px] bg-fuchsia-50 grid place-items-center text-fuchsia-500">
          <SparkleGlyph className="w-7 h-7" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-bold text-[16px] leading-tight">{title}</span>
          {subtitle && <span className="block text-[14px] text-gray-400 mt-0.5">{subtitle}</span>}
          {cta && (
            <span className="inline-flex items-center mt-2 px-4 py-1.5 rounded-full border-[1.5px] border-cyan-300 text-cyan-600 text-[14px] font-semibold">
              {cta}
            </span>
          )}
        </span>
        {!cta && <ChevronRight className="text-fuchsia-500 shrink-0" size={22} />}
      </span>
    </button>
  );
}
