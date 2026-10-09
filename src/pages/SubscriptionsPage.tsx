import { useState } from 'react';
import { Check } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { PaySheet } from '../components/sheets/MoneySheets';
import { TARIFFS } from '../mocks/data';
import { useApp } from '../state/AppState';

export default function SubscriptionsPage() {
  const { subscription } = useApp();
  const [buying, setBuying] = useState(false);

  return (
    <div className="min-h-full bg-surface pb-8">
      <ScreenHeader title="Подписки" />
      <div className="px-4 space-y-3">
        <p className="text-gray-500 text-[14px] px-1">
          Текущая подписка: {subscription.name}
          {subscription.paid ? `, активна до ${subscription.paidUntil}` : ' — не оплачена'}
        </p>

        {TARIFFS.map((t) => (
          <div key={t.id} className="bg-white rounded-[24px] p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[24px] leading-none">{t.name}</h3>
              <span className="font-bold text-[17px]">{t.price} ₽</span>
            </div>
            <p className="text-gray-400 text-[14px] mt-1">{t.note}</p>
            <ul className="mt-3 space-y-1.5">
              {t.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[14px]">
                  <Check size={15} className="text-ok shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setBuying(true)}
              className="mt-4 w-full border-[1.5px] border-ink rounded-full py-2.5 font-bold text-[15px] active:bg-ink active:text-white transition"
            >
              Купить
            </button>
          </div>
        ))}
      </div>

      <PaySheet open={buying} onClose={() => setBuying(false)} />
    </div>
  );
}
