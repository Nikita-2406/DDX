import { useEffect, useState } from 'react';
import { Check, CircleCheck } from 'lucide-react';
import { Sheet } from './Sheet';
import { NOTIFICATIONS, type Equipment, type Promo } from '../../mocks/data';
import { PROMO_ICONS } from '../promoIcons';

// ——— Выбор дня недели (график загруженности) ———

const DAY_OPTIONS: [string, number][] = [
  ['Понедельник', 1],
  ['Вторник', 2],
  ['Среда', 3],
  ['Четверг', 4],
  ['Пятница', 5],
  ['Суббота', 6],
  ['Воскресенье', 0],
];

export function DaySheet({
  open,
  selected,
  onSelect,
  onClose,
}: {
  open: boolean;
  selected: number;
  onSelect: (day: number) => void;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title="День недели">
      <div className="space-y-1.5 pb-1">
        {DAY_OPTIONS.map(([label, val]) => (
          <button
            key={label}
            onClick={() => onSelect(val)}
            className={`w-full flex items-center justify-between rounded-[16px] px-4 py-3 text-[15px] font-semibold transition ${
              selected === val ? 'bg-ink text-white' : 'bg-surface'
            }`}
          >
            {label}
            {selected === val && <Check size={18} />}
          </button>
        ))}
      </div>
    </Sheet>
  );
}

// ——— Выбор месяца (история посещений) ———

const MONTH_OPTIONS: [string, number][] = [
  ['Март', 0],
  ['Апрель', 1],
  ['Май', 2],
  ['Июнь', 3],
  ['Июль', 4],
  ['Август', 5],
  ['Сентябрь', 6],
  ['Октябрь', 7],
];

export function MonthSheet({
  open,
  selected,
  onSelect,
  onClose,
}: {
  open: boolean;
  selected: number;
  onSelect: (m: number) => void;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title="Месяц">
      <div className="space-y-1.5 pb-1">
        {MONTH_OPTIONS.map(([label, val]) => (
          <button
            key={val}
            onClick={() => onSelect(val)}
            className={`w-full flex items-center justify-between rounded-[16px] px-4 py-3 text-[15px] font-semibold transition ${
              selected === val ? 'bg-ink text-white' : 'bg-surface'
            }`}
          >
            {label}
            {selected === val && <Check size={18} />}
          </button>
        ))}
      </div>
    </Sheet>
  );
}

// ——— Уведомления ———

export function NotificationsSheet({
  open,
  onSeen,
  onClose,
}: {
  open: boolean;
  onSeen: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) onSeen();
  }, [open, onSeen]);

  return (
    <Sheet open={open} onClose={onClose} title="Уведомления">
      <div className="space-y-2.5 pb-1">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className="bg-surface rounded-[18px] p-3.5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-[15px] leading-snug">{n.title}</p>
              <span className="w-2 h-2 rounded-full bg-brand-orange mt-1.5 shrink-0" />
            </div>
            <p className="text-gray-500 text-[14px] mt-1">{n.text}</p>
            <p className="text-gray-400 text-[12px] mt-1.5">{n.time}</p>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

// ——— Промо-карточка ———

export function PromoSheet({ open, promo, onClose }: { open: boolean; promo: Promo; onClose: () => void }) {
  const Icon = PROMO_ICONS[promo.icon];
  return (
    <Sheet open={open} onClose={onClose}>
      <div className={`rounded-[22px] border-[3px] border-brand-cyan bg-gradient-to-br ${promo.grad} p-5 flex flex-col gap-6`}>
        <Icon size={40} strokeWidth={1.6} className="text-ink/70" />
        <p className="text-[15px] font-extrabold uppercase leading-tight">{promo.caption}</p>
      </div>
      <p className="text-gray-500 text-[15px] leading-relaxed mt-4">{promo.text}</p>
      <button onClick={onClose} className="mt-5 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98]">
        Понятно
      </button>
    </Sheet>
  );
}

// ——— Запись (тренер / Action) ———

const SLOTS = ['09:00', '12:00', '17:30', '19:00'];

export function BookingSheet({
  open,
  title,
  subtitle,
  onClose,
}: {
  open: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setSlot(null);
      setDone(false);
    }
  }, [open]);

  return (
    <Sheet open={open} onClose={onClose} title={title} subtitle={subtitle || 'Выбери время'}>
      <div className="grid grid-cols-2 gap-2.5">
        {SLOTS.map((s) => (
          <button
            key={s}
            onClick={() => setSlot(s)}
            className={`rounded-[16px] py-3 font-bold border-[1.5px] transition ${
              slot === s ? 'border-ink bg-ink text-white' : 'border-gray-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {done ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-ok font-bold py-3">
          <CircleCheck size={20} /> Ты записан{slot ? ` на ${slot}` : ''}
        </p>
      ) : (
        <button
          disabled={!slot}
          onClick={() => {
            setDone(true);
            window.setTimeout(onClose, 1000);
          }}
          className="mt-4 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] disabled:opacity-40 active:scale-[.98]"
        >
          Записаться
        </button>
      )}
    </Sheet>
  );
}

// ——— Инструкция к оборудованию ———

export function EquipmentSheet({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: Equipment | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title={item?.name ?? ''} subtitle="Как пользоваться">
      <ol className="space-y-2.5 pb-1">
        {(item?.steps ?? []).map((s, i) => (
          <li key={i} className="flex gap-3 bg-surface rounded-[16px] p-3.5">
            <span className="w-7 h-7 rounded-full bg-ink text-white grid place-items-center text-[13px] font-bold shrink-0">
              {i + 1}
            </span>
            <span className="text-[14px] leading-snug">{s}</span>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}

// ——— Текстовая инфо-модалка ———

export function InfoSheet({
  open,
  title,
  text,
  onClose,
}: {
  open: boolean;
  title: string;
  text: string;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onClose={onClose} title={title}>
      <p className="text-gray-500 text-[15px] leading-relaxed">{text}</p>
      <button onClick={onClose} className="mt-5 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98]">
        Понятно
      </button>
    </Sheet>
  );
}
