import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CircleHelp, MessageCircle, RussianRuble, Settings } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { Tile } from '../components/Tile';
import { AiCard } from '../components/AiCard';
import { AvatarArt, BodyScanArt, DiaryArt, HeartArt, MachineArt, SparklesArt, ZapArt } from '../components/artwork';
import { AiProgramSheet } from '../components/sheets/PlannerSheets';
import { AssistantSheet } from '../components/sheets/AssistantSheet';
import { PaySheet, TopUpSheet } from '../components/sheets/MoneySheets';
import { useApp } from '../state/AppState';

type SheetKind = null | 'ai' | 'chat' | 'pay' | 'topup';

export default function ProfilePage() {
  const { balance, subscription, userName } = useApp();
  const [sheet, setSheet] = useState<SheetKind>(null);

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

  return (
    <div className="min-h-full bg-surface pb-8">
      {/* Шапка профиля */}
      <header className="flex items-center gap-3.5 px-4 pt-[max(env(safe-area-inset-top),44px)]">
        <span className="w-[58px] h-[58px] rounded-full bg-gradient-to-br from-ink to-[#1C6B60] text-white grid place-items-center font-extrabold text-[20px] shrink-0 select-none">
          {initials || <AvatarArt />}
        </span>
        <h1 className="flex-1 text-[24px] font-extrabold tracking-tight min-w-0">{userName}</h1>
        <Link
          to="/settings"
          aria-label="Настройки"
          className="w-12 h-12 rounded-2xl bg-[#E3E7E7] grid place-items-center active:bg-gray-300"
        >
          <Settings size={22} />
        </Link>
      </header>

      <div className="px-4 mt-5 space-y-3">
        <SectionTitle title="Подписки" to="/subscriptions" />

        {/* Подписка */}
        {subscription.paid ? (
          <div className="rounded-[24px] bg-ink text-white p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[26px] leading-none uppercase">{subscription.name}</h3>
              <span className="bg-ok text-white text-[13px] font-bold rounded-full px-3 py-1">Активна</span>
            </div>
            <p className="text-white/80 text-[14px] mt-2.5">Действует до {subscription.paidUntil}</p>
            <button onClick={() => setSheet('pay')} className="mt-5 flex items-center gap-1.5 font-bold text-[15px]">
              Продлить <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="rounded-[24px] bg-[#AEB5B5] text-white p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[26px] leading-none uppercase">{subscription.name}</h3>
              <span className="bg-danger text-white text-[13px] font-bold rounded-full px-3 py-1">Не оплачен</span>
            </div>
            <p className="text-white/85 text-[14px] mt-2.5">Подписка закроется через 7 дней</p>
            <button onClick={() => setSheet('pay')} className="mt-5 flex items-center gap-1.5 font-bold text-[15px]">
              Оплатить <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Баланс */}
        <div className="rounded-[24px] bg-white p-5 flex items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-gray-400 text-[15px]">
              Баланс <CircleHelp size={15} />
            </p>
            <p className="font-display text-[34px] leading-none mt-1.5">{balance} ₽</p>
          </div>
          <button
            onClick={() => setSheet('topup')}
            className="bg-ink text-white rounded-full px-6 py-3 font-bold text-[15px] active:scale-[.97] transition"
          >
            Пополнить
          </button>
        </div>

        {/* ИИ-программа */}
        <AiCard title="ИИ Программа тренировок" subtitle="Составленная под тебя" onClick={() => setSheet('ai')} />

        {/* Помощник */}
        <button
          onClick={() => setSheet('chat')}
          className="w-full rounded-[24px] bg-white p-4 flex items-center gap-3.5 text-left active:scale-[.99] transition"
        >
          <span className="w-[52px] h-[52px] rounded-[18px] bg-ink grid place-items-center text-white shrink-0">
            <MessageCircle size={24} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-[17px]">Помощник DDX</span>
            <span className="block text-gray-400 text-[14px] mt-0.5">Моментальные ответы 24/7</span>
          </span>
        </button>

        {/* Плитки */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <Tile label="Дневник тренировок" to="/diary" className="col-span-2">
            <DiaryArt />
          </Tile>
          <Tile label="Анализ состава тела" to="/body-analysis">
            <BodyScanArt />
          </Tile>
          <Tile label="Избранное" to="/favorites">
            <HeartArt />
          </Tile>
          <Tile label="Инструкции к оборудованию" to="/equipment" className="col-span-2">
            <MachineArt />
          </Tile>
          <Tile label="Подарочные карты" to="/gift-cards" className="col-span-2">
            <SparklesArt />
          </Tile>
          <Tile label="Визиты в клуб" to="/visits">
            <ZapArt />
          </Tile>
        </div>

        {/* Списки */}
        <div className="rounded-[24px] bg-white divide-y divide-gray-100 overflow-hidden">
          <Link to="/payments" className="flex items-center gap-3.5 px-4 py-4 active:bg-gray-50">
            <span className="w-11 h-11 rounded-[14px] border-[1.5px] border-ink grid place-items-center shrink-0">
              <RussianRuble size={20} />
            </span>
            <span className="flex-1 font-bold text-[16px]">История платежей</span>
            <ChevronRight size={20} className="text-gray-300" />
          </Link>
          <Link to="/extra" className="flex items-center gap-3.5 px-4 py-4 active:bg-gray-50">
            <span className="w-11 h-11 rounded-[14px] border-[1.5px] border-ink grid place-items-center shrink-0">
              <CircleHelp size={20} />
            </span>
            <span className="flex-1 font-bold text-[16px]">Дополнительно</span>
            <ChevronRight size={20} className="text-gray-300" />
          </Link>
        </div>
      </div>

      {/* Модальные шиты */}
      <PaySheet open={sheet === 'pay'} onClose={() => setSheet(null)} />
      <TopUpSheet open={sheet === 'topup'} onClose={() => setSheet(null)} />
      <AiProgramSheet open={sheet === 'ai'} onClose={() => setSheet(null)} />
      <AssistantSheet open={sheet === 'chat'} onClose={() => setSheet(null)} />
    </div>
  );
}
