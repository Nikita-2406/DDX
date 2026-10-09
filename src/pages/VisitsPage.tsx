import { useState } from 'react';
import { CalendarDays, Clock, Store, TrendingDown, TrendingUp } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { VisitsChart } from '../components/charts/VisitsChart';
import { MonthSheet } from '../components/sheets/MiscSheets';
import { plural, VISIT_TABS, VISITS_MONTHS } from '../mocks/data';

type Tab = 'visits' | 'workouts';

const MONTH_ACC = ['март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь'];
const MONTH_INSTR = ['мартом', 'апрелем', 'маем', 'июнем', 'июлем', 'августом', 'сентябрем', 'октябрем'];

export default function VisitsPage() {
  const [tab, setTab] = useState<Tab>('visits');
  const [monthIndex, setMonthIndex] = useState(7);
  const [monthSheet, setMonthSheet] = useState(false);

  const tabData = VISIT_TABS[tab];
  const data = tabData.months[monthIndex];
  const prevCount = monthIndex > 0 ? tabData.months[monthIndex - 1].count : null;
  const diff = prevCount === null ? 0 : data.count - prevCount;

  const statTitle =
    tab === 'visits'
      ? `${data.count} ${plural(data.count, 'визит', 'визита', 'визитов')} в клубы`
      : data.count === 0
        ? 'Нет тренировок'
        : `${data.count} ${plural(data.count, 'тренировка', 'тренировки', 'тренировок')}`;

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
        <p className="text-gray-500 text-[15px]">За {MONTH_ACC[monthIndex]}</p>
        <h2 className="font-display text-[32px] leading-[1.05] uppercase mt-0.5 text-heading">{statTitle}</h2>
        {diff !== 0 && prevCount !== null && (
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[14px] font-bold ${
                diff < 0 ? 'bg-[#FDE7E6] text-danger' : 'bg-[#E3F6EC] text-ok'
              }`}
            >
              {diff < 0 ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
              {Math.abs(diff)}
            </span>
            <span className="text-gray-600 text-[15px]">По сравнению с {MONTH_INSTR[monthIndex - 1]}</span>
          </div>
        )}

        <div className="mt-6">
          <VisitsChart
            labels={VISITS_MONTHS}
            values={tabData.values}
            currentIndex={monthIndex}
            onSelectMonth={setMonthIndex}
          />
        </div>

        <div className="mt-5">
          <span className="inline-flex items-center gap-2 border border-gray-200 rounded-full pl-2 pr-4 py-1.5 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-surface grid place-items-center">
              <Clock size={16} />
            </span>
            <span className="font-bold text-[14px]">
              {data.total} {tab === 'visits' ? 'в клубе' : 'тренировок'}
            </span>
          </span>
        </div>
      </div>

      {/* Список */}
      {data.list.length > 0 && (
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
      )}

      <MonthSheet
        open={monthSheet}
        selected={monthIndex}
        onSelect={(i) => {
          setMonthIndex(i);
          setMonthSheet(false);
        }}
        onClose={() => setMonthSheet(false)}
      />
    </div>
  );
}
