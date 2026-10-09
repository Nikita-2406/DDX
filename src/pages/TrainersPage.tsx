import { useState } from 'react';
import { BookingSheet } from '../components/sheets/MiscSheets';
import { CLUB, TRAINERS, type Trainer } from '../mocks/data';

export default function TrainersPage() {
  const [booking, setBooking] = useState<Trainer | null>(null);

  return (
    <div className="min-h-full bg-white pb-8">
      <header className="px-4 pt-[max(env(safe-area-inset-top),36px)]">
        <h1 className="font-display text-[30px] uppercase text-heading">Тренеры</h1>
        <p className="text-gray-500 text-[15px] mt-0.5">{CLUB}</p>
      </header>

      <div className="grid grid-cols-2 gap-3 px-4 mt-4">
        {TRAINERS.map((t) => (
          <div key={t.id} className="bg-surface rounded-[24px] p-4 flex flex-col">
            <span
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.grad} grid place-items-center text-white font-extrabold text-[20px]`}
            >
              {t.initials}
            </span>
            <h3 className="font-bold text-[16px] mt-3 leading-tight">{t.name}</h3>
            <p className="text-gray-500 text-[13px] mt-0.5 flex-1">{t.role}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {t.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-semibold bg-white rounded-full px-2 py-0.5 text-ink/70">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setBooking(t)}
              className="mt-3 border-[1.5px] border-ink rounded-full py-2 text-[14px] font-bold active:bg-ink active:text-white transition"
            >
              Записаться
            </button>
          </div>
        ))}
      </div>

      <BookingSheet
        open={!!booking}
        title={booking?.name ?? ''}
        subtitle={booking ? `${booking.role} · персональная тренировка` : ''}
        onClose={() => setBooking(null)}
      />
    </div>
  );
}
