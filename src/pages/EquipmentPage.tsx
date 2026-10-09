import { useState } from 'react';
import { ChevronRight, Dumbbell } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { EquipmentSheet } from '../components/sheets/MiscSheets';
import { EQUIPMENT, type Equipment } from '../mocks/data';

export default function EquipmentPage() {
  const [item, setItem] = useState<Equipment | null>(null);

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Инструкции" />
      <div className="px-4 mt-1 space-y-2.5">
        {EQUIPMENT.map((e) => (
          <button
            key={e.id}
            onClick={() => setItem(e)}
            className="w-full bg-surface rounded-[20px] p-4 flex items-center gap-3.5 text-left active:bg-gray-100"
          >
            <span className="w-11 h-11 rounded-[14px] bg-white grid place-items-center shrink-0">
              <Dumbbell size={20} className="text-ink" />
            </span>
            <span className="flex-1 font-bold text-[15px]">{e.name}</span>
            <ChevronRight size={20} className="text-gray-300" />
          </button>
        ))}
      </div>
      <EquipmentSheet open={!!item} item={item} onClose={() => setItem(null)} />
    </div>
  );
}
