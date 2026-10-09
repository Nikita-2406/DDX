interface Props {
  labels: string[];
  values: number[];
  /** Индекс текущего месяца — тёмный столбец с бейджем-значением */
  currentIndex: number;
  /** Клик по столбцу — выбрать месяц */
  onSelectMonth?: (index: number) => void;
}

/** График посещений по месяцам: столбцы кликабельны, над активным — бейдж со значением. */
export function VisitsChart({ labels, values, currentIndex, onSelectMonth }: Props) {
  const max = Math.max(...values, 1);
  return (
    <div>
      <div className="flex items-end gap-2 h-40">
        {values.map((v, i) => {
          const active = i === currentIndex;
          return (
            <div key={i} className="flex-1 h-full flex flex-col justify-end items-stretch">
              {active && (
                <span className="mb-1.5 text-[11px] font-extrabold bg-surface px-2 py-0.5 rounded-full self-center">
                  {v}
                </span>
              )}
              <button
                type="button"
                onClick={() => onSelectMonth?.(i)}
                aria-label={`Показать ${labels[i]}`}
                aria-pressed={active}
                className="flex-1 w-full flex items-end cursor-pointer"
              >
                <div
                  className={`w-full rounded-[12px] transition-all ${
                    active ? 'bg-ink' : 'bg-[#F0F0F1] active:bg-[#DEDEE0]'
                  }`}
                  style={{ height: `${Math.max((v / max) * 100, 10)}%` }}
                />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-2">
        {labels.map((l, i) => (
          <span
            key={l}
            className={`flex-1 text-center text-[13px] ${
              i === currentIndex ? 'text-heading font-extrabold' : 'text-heading/60 font-medium'
            }`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
