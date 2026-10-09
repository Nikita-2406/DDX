import { useEffect, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Sheet } from './Sheet';
import { AI_PROGRAM, CLASSES } from '../../mocks/data';
import { useApp } from '../../state/AppState';

export function AddTrainingSheet({ open, dom, onClose }: { open: boolean; dom: number; onClose: () => void }) {
  const { addPlan, plans } = useApp();
  const [added, setAdded] = useState<string[]>([]);
  useEffect(() => {
    if (open) setAdded([]);
  }, [open]);

  const planned = plans[dom] ?? [];

  const addGroup = (id: string, title: string, time: string) => {
    addPlan(dom, { title, time, kind: 'group' });
    setAdded((a) => [...a, id]);
  };
  const addSelf = () => {
    addPlan(dom, { title: 'Самостоятельная тренировка', time: '—', kind: 'self' });
    setAdded((a) => [...a, 'self']);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Добавь тренировку" subtitle={`На ${dom}-е число`}>
      <div className="space-y-2 pb-1">
        {CLASSES.map((c) => {
          const isAdded = added.includes(c.id) || planned.some((p) => p.title === c.title);
          return (
            <div key={c.id} className="flex items-center gap-3 bg-surface rounded-[18px] p-3.5">
              <span className="w-11 h-11 rounded-[14px] bg-white grid place-items-center text-[13px] font-extrabold shrink-0">
                {c.time}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-[15px] leading-tight">{c.title}</span>
                <span className="block text-gray-400 text-[13px] mt-0.5">{c.place}</span>
              </span>
              <button
                onClick={() => !isAdded && addGroup(c.id, c.title, c.time)}
                disabled={isAdded}
                aria-label="Добавить"
                className={`w-10 h-10 rounded-full grid place-items-center shrink-0 transition ${
                  isAdded ? 'bg-ok/15 text-ok' : 'bg-ink text-white active:scale-90'
                }`}
              >
                {isAdded ? <Check size={18} /> : <Plus size={18} />}
              </button>
            </div>
          );
        })}
        <button
          onClick={addSelf}
          className="w-full flex items-center gap-3 border-[1.5px] border-dashed border-gray-300 rounded-[18px] p-3.5 text-left active:bg-gray-50"
        >
          <span className="w-11 h-11 rounded-[14px] bg-surface grid place-items-center font-extrabold text-[13px] shrink-0">
            —
          </span>
          <span className="flex-1 font-bold text-[15px]">Самостоятельная тренировка</span>
          {added.includes('self') ? <Check size={18} className="text-ok" /> : <Plus size={18} className="text-gray-400" />}
        </button>
      </div>
    </Sheet>
  );
}

const AI_TIMES = ['19:00', '19:00', '18:30'];

export function AiProgramSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addPlan } = useApp();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (open) setAdded(false);
  }, [open]);

  const addToCalendar = () => {
    const now = new Date();
    AI_PROGRAM.forEach((d, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() + i * 2);
      addPlan(date.getDate(), { title: d.title, time: AI_TIMES[i] ?? '19:00', kind: 'self' });
    });
    setAdded(true);
    window.setTimeout(onClose, 900);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Программа от ИИ-тренера" subtitle="Собрана по твоей цели: тонус и выносливость">
      <div className="space-y-2">
        {AI_PROGRAM.map((d) => (
          <div key={d.day} className="bg-surface rounded-[18px] px-4 py-3">
            <p className="text-gray-400 text-[13px] font-semibold">{d.day}</p>
            <p className="font-bold text-[15px] mt-0.5">{d.title}</p>
          </div>
        ))}
      </div>
      {added ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-ok font-bold py-3">
          <Check size={20} /> Добавлено в календарь
        </p>
      ) : (
        <button
          onClick={addToCalendar}
          className="mt-4 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98]"
        >
          Добавить в календарь
        </button>
      )}
      <p className="text-center text-gray-400 text-[12px] mt-3">Программа пересобирается каждую неделю</p>
    </Sheet>
  );
}
