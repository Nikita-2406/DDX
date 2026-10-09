import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Store, TrendingDown, TrendingUp } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { VisitsChart } from '../components/charts/VisitsChart';
import { MonthSheet } from '../components/sheets/MiscSheets';
import { VISIT_TABS, VISITS_MONTHS } from '../mocks/data';

type Tab = 'visits' | 'workouts';
type MonthKey = 'oct' | 'sep' | 'aug';

/** Хронологический порядок для стрелок-переключателей: старые месяцы слева. */
const MONTH_ORDER: MonthKey[] = ['aug', 'sep', 'oct'];

const MONTH_META: Record<MonthKey, { title: string; compare: string; chartIndex: number }> = {
  oct: { title: 'За октябрь', compare: 'сентябрем', chartIndex: 7 },
  sep: { title: 'За сентябрь', compare: 'августом', chartIndex: 6 },
  aug: { title: 'За август', compare: 'июлем', chartIndex: 5 },
};

export default function VisitsPage() {
  const [tab, setTab] = useState<Tab>('visits');
  const [month, setMonth] = useState<MonthKey>('oct');
  const [monthSheet, setMonthSheet] = useState(false);

  const data = VISIT_TABS[tab][month];
  const meta = MONTH_META[month];
  const monthIdx = MONTH_ORDER.indexOf(month);
  const older = monthIdx > 0 ? MONTH_ORDER[monthIdx - 1] : null;
  const newer = monthIdx < MONTH_ORDER.length - 1 ? MONTH_ORDER[monthIdx + 1] : null;

  return (
    <div className="min-h-full bg-white pb-10">
      <ScreenHeader
        title="История посещений"
        action={
          <button
            onClick={() => setMonthSheet(true)}
            aria-label="Выбрать месяц"
            className="w-11 h-11 grid place-items-center rounded-full active:bg-gray-100"
          >
            <CalendarDays size={22} />
          </button>
        }
      />

      {/* Табы */}
      <div className="grid grid-cols-2 px-4 border-b border-gray-100">
        {(
          [
            ['visits', 'Визиты в клуб'],
            ['workouts', 'Тренировки'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`relative pb-3 pt-1 text-[16px] transition-colors ${
              tab === key ? 'text-heading font-bold' : 'text-gray-300 font-medium'
            }`}
          >
            {label}
            {tab === key && <span className="absolute inset-x-0 -bottom-[1px] h-[2.5px] bg-ink rounded-full" />}
          </button>
        ))}
      </div>

      {/* Сводка */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between -mx-1">
          <button
            onClick={() => older && setMonth(older)}
            disabled={!older}
            aria-label="Предыдущий месяц"
            className={`w-9 h-9 grid place-items-center rounded-full ${older ? 'active:bg-gray-100' : 'opacity-20'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <p className="text-gray-500 text-[15px]">{meta.title}</p>
          <button
            onClick={() => newer && setMonth(newer)}
            disabled={!newer}
            aria-label="Следующий месяц"
            className={`w-9 h-9 grid place-items-center rounded-full ${newer ? 'active:bg-gray-100' : 'opacity-20'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <h2 className="font-display text-[32px] leading-[1.05] uppercase mt-0.5 text-heading">{data.title}</h2>
        {data.diff !== 0 && (
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[14px] font-bold ${
                data.diff < 0 ? 'bg-[#FDE7E6] text-danger' : 'bg-[#E3F6EC] text-ok'
              }`}
            >
              {data.diff < 0 ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
              {Math.abs(data.diff)}
            </span>
            <span className="text-gray-600 text-[15px]">По сравнению с {meta.compare}</span>
          </div>
        )}

        <div className="mt-6">
          <VisitsChart labels={VISITS_MONTHS} values={data.values} currentIndex={meta.chartIndex} />
        </div>

        <div className="mt-5">
          <span className="inline-flex items-center gap-2 border border-gray-200 rounded-full pl-2 pr-4 py-1.5 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-surface grid place-items-center">
              <Clock size={16} />
            </span>
            <span className="font-bold text-[14px]">{data.total}</span>
          </span>
        </div>
      </div>

      {/* Список */}
      <div className="mx-3 mt-6 bg-surface rounded-[24px] p-4 space-y-4">
        {data.list.map((v) => (
          <div key={v.label}>
            <p className="text-gray-500 font-semibold text-[14px]">{v.label}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-11 h-11 rounded-[14px] bg-[#EAF2F1] grid place-items-center shrink-0">
                <Store size={20} className="text-ink" />
              </span>
              <span className="flex-1 font-bold text-[16px] leading-tight min-w-0">{v.club}</span>
              <span className="text-gray-400 font-semibold text-[15px] shrink-0">{v.dur}</span>
            </div>
          </div>
        ))}
      </div>

      <MonthSheet
        open={monthSheet}
        selected={month}
        onSelect={(m) => {
          setMonth(m);
          setMonthSheet(false);
        }}
        onClose={() => setMonthSheet(false)}
      />
    </div>
  );
}
