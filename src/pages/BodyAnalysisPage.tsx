import { useState } from 'react';
import { ScreenHeader } from '../components/ScreenHeader';
import { InfoSheet } from '../components/sheets/MiscSheets';
import { BODY_METRICS, WEIGHT_TREND } from '../mocks/data';

export default function BodyAnalysisPage() {
  const [info, setInfo] = useState(false);

  const trend = WEIGHT_TREND;
  const min = Math.min(...trend);
  const max = Math.max(...trend);
  const pts = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 100},${36 - ((v - min) / (max - min || 1)) * 30}`)
    .join(' ');

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Анализ состава тела" />
      <div className="px-4">
        <p className="text-gray-500 text-[14px]">Последнее измерение — 28 сен 2026, клуб «Коньково»</p>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {BODY_METRICS.map((m) => (
            <div key={m.label} className="bg-surface rounded-[22px] p-4">
              <p className="text-gray-500 text-[13px]">{m.label}</p>
              <p className="font-display text-[30px] leading-none mt-1.5">
                {m.value}
                {m.unit && <span className="text-[16px] ml-1">{m.unit}</span>}
              </p>
              <div className="h-1.5 rounded-full bg-white mt-3 overflow-hidden">
                <div className="h-full rounded-full bg-brand-cyan" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-[22px] p-4 mt-3">
          <p className="font-bold text-[15px]">Динамика веса</p>
          <svg viewBox="0 0 100 40" className="w-full h-20 mt-2" preserveAspectRatio="none" aria-hidden>
            <polyline
              points={pts}
              fill="none"
              stroke="#35C2CF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="flex justify-between text-[12px] text-gray-400 mt-1">
            <span>май</span>
            <span>сен</span>
          </div>
        </div>

        <button
          onClick={() => setInfo(true)}
          className="mt-4 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98] transition"
        >
          Пройти анализ InBody
        </button>
      </div>

      <InfoSheet
        open={info}
        title="InBody-анализ"
        text="Бесплатно для тарифов Infinity Plus. Измерение занимает 2 минуты: встань на аппарат и держи электроды. Результат появится в приложении сразу."
        onClose={() => setInfo(false)}
      />
    </div>
  );
}
