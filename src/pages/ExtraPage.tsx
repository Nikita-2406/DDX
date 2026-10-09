import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { EXTRA_ITEMS } from '../mocks/data';

export default function ExtraPage() {
  const [openId, setOpenId] = useState<string | null>(EXTRA_ITEMS[0]?.id ?? null);

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Дополнительно" />
      <div className="px-4 space-y-2.5">
        {EXTRA_ITEMS.map((item) => {
          const open = openId === item.id;
          return (
            <div key={item.id} className="bg-surface rounded-[20px] overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : item.id)}
                className="w-full flex items-center justify-between gap-2 p-4 text-left"
              >
                <span className="font-bold text-[15px]">{item.title}</span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && <p className="px-4 pb-4 text-gray-500 text-[14px] leading-relaxed">{item.text}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
