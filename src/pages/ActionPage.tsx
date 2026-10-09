import { useState } from 'react';
import { BannerRings } from '../components/artwork';
import { BookingSheet } from '../components/sheets/MiscSheets';

const SCHEDULE = [
  { day: 'Пн, 12', title: 'Функциональный тренинг', time: '19:00' },
  { day: 'Ср, 14', title: 'Cycle', time: '20:00' },
  { day: 'Пт, 16', title: 'Кроссфит', time: '19:30' },
  { day: 'Вс, 18', title: 'Смесь единоборств', time: '11:00' },
];

export default function ActionPage() {
  const [booking, setBooking] = useState(false);

  return (
    <div className="min-h-full bg-white pb-8">
      <header className="px-4 pt-[max(env(safe-area-inset-top),36px)]">
        <h1 className="font-display text-[30px] uppercase text-heading">Action</h1>
      </header>

      <div className="px-4 mt-3">
        <div className="rounded-[28px] p-6 relative overflow-hidden bg-gradient-to-br from-[#0D3F3B] via-[#12504A] to-[#1C6B60] text-white">
          <BannerRings />
          <h2 className="relative font-display text-[30px] leading-[1.05] uppercase max-w-[80%]">
            Зона функционального тренинга
          </h2>
          <p className="relative text-white/85 text-[14px] leading-snug mt-2 max-w-[85%]">
            Цикл, кроссфит, единоборства и интервальные программы. Подходит для тарифов Action и Infinity Plus.
          </p>
          <button
            onClick={() => setBooking(true)}
            className="relative mt-5 bg-white text-ink rounded-full px-6 py-3 font-bold text-[15px] active:scale-[.97] transition"
          >
            Записаться
          </button>
        </div>

        <h3 className="font-display text-[24px] uppercase mt-6 text-heading">Расписание на неделю</h3>
        <div className="mt-3 space-y-2.5">
          {SCHEDULE.map((s) => (
            <div key={s.day} className="bg-surface rounded-[20px] p-4 flex items-center gap-3.5">
              <span className="w-14 h-14 rounded-[16px] bg-white grid place-items-center text-[12px] font-bold text-center leading-tight px-1 shrink-0">
                {s.day}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-[15px] leading-tight">{s.title}</span>
                <span className="block text-gray-400 text-[14px] mt-0.5">{s.time}</span>
              </span>
              <button
                onClick={() => setBooking(true)}
                className="border-[1.5px] border-ink rounded-full px-4 py-2 text-[13px] font-bold active:bg-ink active:text-white transition shrink-0"
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>

      <BookingSheet open={booking} title="Запись в Action" subtitle="Выбери удобное время" onClose={() => setBooking(false)} />
    </div>
  );
}
