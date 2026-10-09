interface Props {
  hours: number[];
  values: number[];
  /** Час, подсвеченный тёмным («сейчас»), или null */
  activeHour: number | null;
}

/** График загруженности клуба по часам: столбцы на div. */
export function LoadChart({ hours, values, activeHour }: Props) {
  return (
    <div>
      <div className="flex items-end gap-[6px] h-28">
        {values.map((v, i) => (
          <div key={i} className="flex-1 h-full flex items-end">
            <div
              className={`w-full rounded-[14px] transition-all ${
                hours[i] === activeHour ? 'bg-ink' : 'bg-brand-cyanbar'
              }`}
              style={{ height: `${Math.max(v, 8)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-[6px] mt-2">
        {hours.map((h) => (
          <span key={h} className="flex-1 text-center text-[12px] text-ink/70">
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
