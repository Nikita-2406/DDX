import { useEffect, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { Sheet } from '../components/sheets/Sheet';
import { DIARY, EXERCISES } from '../mocks/data';

export default function DiaryPage() {
  const [entries, setEntries] = useState(DIARY);
  const [sheet, setSheet] = useState(false);
  const [addedNames, setAddedNames] = useState<string[]>([]);

  useEffect(() => {
    if (sheet) setAddedNames([]);
  }, [sheet]);

  const addExercise = (name: string) => {
    setEntries((es) => {
      const [head, ...rest] = es;
      if (!head) return es;
      const updated = { ...head, items: [...head.items, [name, '3×10'] as [string, string]] };
      return [updated, ...rest];
    });
    setAddedNames((a) => [...a, name]);
  };

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Дневник тренировок" />
      <div className="px-4 mt-1 space-y-3">
        {entries.map((e) => (
          <div key={e.id} className="bg-surface rounded-[22px] p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-bold text-[16px]">{e.title}</h3>
              <span className="text-gray-400 text-[13px] font-semibold shrink-0">{e.date}</span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              {e.items.map(([name, sets], i) => (
                <div key={i} className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink/80">{name}</span>
                  <span className="text-gray-400 font-semibold">{sets}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setSheet(true)}
          className="w-full flex items-center justify-center gap-1.5 border-[1.5px] border-dashed border-gray-300 rounded-[20px] py-3.5 font-bold text-[15px] text-ink/70 active:bg-gray-50"
        >
          <Plus size={18} /> Добавить упражнение
        </button>
      </div>

      <Sheet open={sheet} onClose={() => setSheet(false)} title="Упражнение">
        <div className="space-y-2 pb-1">
          {EXERCISES.map((name) => (
            <button
              key={name}
              onClick={() => addExercise(name)}
              className="w-full flex items-center justify-between bg-surface rounded-[16px] px-4 py-3 text-[15px] font-semibold"
            >
              {name}
              {addedNames.includes(name) ? <Check size={18} className="text-ok" /> : <Plus size={18} className="text-gray-400" />}
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
