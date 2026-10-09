interface Props {
  labels: string[];
  values: number[];
  /** Индекс текущего месяца — тёмный столбец с бейджем-значением */
  currentIndex: number;
  /** Индексы месяцев, доступные для переключения кликом по подписи */
  selectable?: number[];
  onSelectMonth?: (index: number) => void;
}

/** График посещений по месяцам: столбцы на div, бейдж над текущим. */
export function VisitsChart({ labels, values, currentIndex, selectable, onSelectMonth }: Props) {
  const max = Math.max(...values, 1);
  return (
    <div>
      <div className="flex items-end gap-2 h-40">
        {values.map((v, i) => {
          const active = i === currentIndex;
          return (
            <div key={i} className="flex-1 h-full flex flex-col justify-end items-center">
              {active && (
                <span className="mb-1.5 text-[11px] font-extrabold bg-surface px-2 py-0.5 rounded-full">
                  {v}
                </span>
              )}
              <div
                className={`w-full rounded-[12px] transition-all ${active ? 'bg-ink' : 'bg-[#F0F0F1]'}`}
                style={{ height: `${Math.max((v / max) * 100, 10)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-2">
        {labels.map((l, i) => {
          const clickable = selectable?.includes(i) && !!onSelectMonth;
          const active = i === currentIndex;
          if (!clickable) {
            return (
              <span key={l} className="flex-1 text-center text-[13px] text-heading/35">
                {l}
              </span>
            );
          }
          return (
            <button
              key={l}
              onClick={() => onSelectMonth?.(i)}
              className={`flex-1 text-center text-[13px] transition-opacity ${
                active ? 'text-heading font-extrabold' : 'text-heading/45 font-bold active:opacity-100'
              }`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
