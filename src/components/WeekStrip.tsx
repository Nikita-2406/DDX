interface DayInfo {
  dom: number;
  dow: string;
  isToday: boolean;
}

interface Props {
  days: DayInfo[];
  selected: number;
  onSelect: (dom: number) => void;
}

export function WeekStrip({ days, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar mt-1">
      {days.map((d) => {
        const active = d.dom === selected;
        return (
          <button
            key={`${d.dow}-${d.dom}`}
            onClick={() => onSelect(d.dom)}
            className={`shrink-0 w-[50px] h-[66px] rounded-[25px] flex flex-col items-center justify-center gap-1 transition ${
              active ? 'bg-ink text-white' : 'bg-white text-ink border border-gray-200'
            }`}
          >
            <span className={`text-[11px] ${active ? 'text-white/70' : 'text-gray-400'}`}>{d.dow}</span>
            <span className="text-[17px] font-bold leading-none">{d.dom}</span>
          </button>
        );
      })}
    </div>
  );
}
