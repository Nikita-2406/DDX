import { useMemo, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { WeekStrip } from '../components/WeekStrip';
import { PlansArt } from '../components/artwork';
import { AddTrainingSheet } from '../components/sheets/PlannerSheets';
import { next7Days } from '../mocks/data';
import { useApp } from '../state/AppState';

export default function CalendarPage() {
  const { plans } = useApp();
  const days = useMemo(next7Days, []);
  const [dom, setDom] = useState(new Date().getDate());
  const [sheet, setSheet] = useState(false);

  const list = plans[dom] ?? [];

  return (
    <div className="min-h-full bg-white pb-8">
      <header className="px-4 pt-[max(env(safe-area-inset-top),18px)]">
        <h1 className="font-display text-[30px] uppercase text-heading">Календарь</h1>
      </header>

      <div className="px-4 mt-3">
        <WeekStrip days={days} selected={dom} onSelect={setDom} />
      </div>

      <div className="px-4 mt-5">
        {list.length === 0 ? (
          <div className="text-center py-10">
            <PlansArt className="w-20 h-20 mx-auto opacity-70" />
            <p className="font-bold text-[16px] mt-4">На этот день планов нет</p>
            <p className="text-gray-400 text-[14px] mt-1">Добавь групповую или самостоятельную тренировку</p>
            <button
              onClick={() => setSheet(true)}
              className="mt-5 inline-flex items-center gap-1.5 bg-ink text-white rounded-full px-6 py-3 font-bold text-[15px] active:scale-[.97] transition"
            >
              <Plus size={18} /> Добавить
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {list.map((p) => (
              <div key={p.id} className="bg-surface rounded-[22px] p-4 flex items-center gap-3.5">
                <span className="w-12 h-12 rounded-[16px] bg-white grid place-items-center font-bold text-[13px] shrink-0">
                  {p.time}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-[15px] leading-tight">{p.title}</span>
                  <span className="block text-gray-400 text-[13px] mt-0.5">
                    {p.kind === 'group' ? 'Групповая тренировка' : 'Самостоятельная тренировка'}
                  </span>
                </span>
                <Check size={18} className="text-ok shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddTrainingSheet open={sheet} dom={dom} onClose={() => setSheet(false)} />
    </div>
  );
}
