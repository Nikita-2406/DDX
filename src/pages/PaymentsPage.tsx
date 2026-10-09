import { ArrowDownLeft, ArrowUpLeft } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { PAYMENTS } from '../mocks/data';

export default function PaymentsPage() {
  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="История платежей" />
      <div className="px-4 mt-1 space-y-2.5">
        {PAYMENTS.map((p) => (
          <div key={p.id} className="bg-surface rounded-[20px] p-4 flex items-center gap-3.5">
            <span
              className={`w-11 h-11 rounded-full grid place-items-center shrink-0 ${
                p.amount > 0 ? 'bg-[#E3F6EC] text-ok' : 'bg-[#FDE7E6] text-danger'
              }`}
            >
              {p.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpLeft size={20} />}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold text-[15px] leading-tight">{p.title}</span>
              <span className="block text-gray-400 text-[13px] mt-1">
                {p.date}
                {p.status === 'fail' && ' · не прошло'}
              </span>
            </span>
            <span className={`font-bold text-[15px] shrink-0 ${p.amount > 0 ? 'text-ok' : 'text-ink'}`}>
              {p.amount > 0 ? '+' : '−'}
              {Math.abs(p.amount)} ₽
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
