import { useState } from 'react';
import { Check } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { GiftSheet } from '../components/sheets/MoneySheets';
import { GIFT_AMOUNTS } from '../mocks/data';

const CARD_GRADS: Record<number, string> = {
  1000: 'from-cyan-400 to-teal-500',
  3000: 'from-orange-400 to-rose-400',
  5000: 'from-violet-500 to-fuchsia-500',
};

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(GIFT_AMOUNTS[1]);
  const [sheet, setSheet] = useState(false);

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Подарочные карты" />
      <div className="px-4">
        <div className="space-y-3">
          {GIFT_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`w-full rounded-[22px] p-2 text-left transition border-[1.5px] ${
                amount === a ? 'border-ink' : 'border-transparent'
              }`}
            >
              <div className={`rounded-[16px] p-5 bg-gradient-to-r ${CARD_GRADS[a] ?? 'from-cyan-400 to-teal-500'}`}>
                <p className="font-display text-[30px] leading-none text-white italic">DDX</p>
                <p className="text-white font-extrabold text-[22px] mt-2">{a} ₽</p>
                <p className="text-white/80 text-[13px] mt-0.5">Подарочная карта клуба</p>
              </div>
              {amount === a && (
                <p className="flex items-center gap-1.5 text-[13px] font-bold mt-2 px-1">
                  <Check size={15} /> Выбрана
                </p>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSheet(true)}
          className="mt-2 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98] transition"
        >
          Подарить за {amount} ₽
        </button>
      </div>

      <GiftSheet open={sheet} amount={amount} onClose={() => setSheet(false)} />
    </div>
  );
}
