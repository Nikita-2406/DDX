import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CalendarCheck, ChevronDown, ChevronRight, Dumbbell, Info, Users } from 'lucide-react';
import { Logo } from '../components/Logo';
import { WeekStrip } from '../components/WeekStrip';
import { SectionTitle } from '../components/SectionTitle';
import { AiCard } from '../components/AiCard';
import { BannerRings, ChatDoodle } from '../components/artwork';
import { LoadChart } from '../components/charts/LoadChart';
import { AddTrainingSheet, AiProgramSheet } from '../components/sheets/PlannerSheets';
import { AssistantSheet } from '../components/sheets/AssistantSheet';
import { DaySheet, InfoSheet, NotificationsSheet, PromoSheet } from '../components/sheets/MiscSheets';
import {
  BANNERS,
  CLUB,
  LOAD_BY_DAY,
  LOAD_HOURS,
  PROMOS,
  WEEK_FULL,
  levelOf,
  next7Days,
  plural,
  type Promo,
} from '../mocks/data';
import { useApp } from '../state/AppState';

type SheetKind = null | 'add' | 'ai' | 'promo' | 'notif' | 'day' | 'chat' | 'club';

export default function HomePage() {
  const navigate = useNavigate();
  const { plans } = useApp();
  const days = useMemo(next7Days, []);
  const now = new Date();

  const [dom, setDom] = useState(now.getDate());
  const [loadDay, setLoadDay] = useState(now.getDay());
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [promo, setPromo] = useState<Promo>(PROMOS[0]);
  const [notifSeen, setNotifSeen] = useState(false);

  const values = LOAD_BY_DAY[loadDay] ?? LOAD_BY_DAY[5];
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const activeHour =
    loadDay === now.getDay() && LOAD_HOURS.includes(now.getHours()) ? now.getHours() : null;
  const nowVal = activeHour != null ? values[LOAD_HOURS.indexOf(activeHour)] : avg;

  const dayPlans = plans[dom] ?? [];
  const totalPlans = Object.values(plans).reduce((a, list) => a + list.length, 0);

  return (
    <div className="min-h-full bg-white pb-8">
      {/* Шапка */}
      <header className="flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),16px)]">
        <Logo />
        <button
          onClick={() => setSheet('notif')}
          aria-label="Уведомления"
          className="relative w-12 h-12 rounded-2xl bg-surface grid place-items-center active:bg-gray-200"
        >
          <Bell size={22} />
          {!notifSeen && <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-orange" />}
        </button>
      </header>

      {/* Промо-карточки */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 mt-4">
        {PROMOS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPromo(p);
              setSheet('promo');
            }}
            className={`shrink-0 w-[108px] h-[108px] rounded-[22px] border-[3px] border-brand-cyan bg-gradient-to-br ${p.grad} p-2.5 flex flex-col justify-between text-left active:scale-[.97] transition`}
          >
            {p.badge && (
              <span className="self-start text-[8px] font-extrabold uppercase bg-brand-orange text-white rounded-full px-1.5 py-0.5">
                {p.badge}
              </span>
            )}
            <PromoGlyph id={p.icon} />
            <span className="text-[11px] font-extrabold uppercase leading-[1.15] tracking-tight">{p.caption}</span>
          </button>
        ))}
      </div>

      {/* Баннеры */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 mt-4">
        {BANNERS.map((b) => (
          <div
            key={b.id}
            className={`snap-start shrink-0 w-[calc(100%-28px)] h-[150px] rounded-[24px] relative overflow-hidden bg-gradient-to-br ${b.grad} p-5 flex flex-col justify-center`}
          >
            <BannerRings />
            <h2 className="relative font-display text-[27px] leading-[1.03] text-white uppercase max-w-[70%]">{b.title}</h2>
            <p className="relative text-white/85 text-[13px] leading-snug mt-1.5 max-w-[68%]">{b.text}</p>
          </div>
        ))}
      </div>

      {/* Мой календарь */}
      <section className="mx-3 mt-5 bg-surface rounded-[28px] p-4">
        <SectionTitle title="Мой календарь" to="/calendar" />
        <WeekStrip days={days} selected={dom} onSelect={setDom} />
        <p className="text-gray-400 text-[15px] mt-4">Добавь тренировку</p>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => setSheet('add')}
            className="relative bg-white rounded-[22px] p-4 h-[104px] text-left overflow-hidden active:scale-[.98] transition"
          >
            <span className="block font-semibold text-[15px] leading-tight max-w-[75%]">Групповые тренировки</span>
            <Users size={46} strokeWidth={1.4} className="absolute -right-1 bottom-2 text-gray-200" />
          </button>
          <button
            onClick={() => setSheet('add')}
            className="relative bg-white rounded-[22px] p-4 h-[104px] text-left overflow-hidden active:scale-[.98] transition"
          >
            <span className="block font-semibold text-[15px] leading-tight max-w-[80%]">Самостоятельные тренировки</span>
            <Dumbbell size={46} strokeWidth={1.4} className="absolute -right-1 bottom-2 text-gray-200" />
          </button>
        </div>

        {dayPlans.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {dayPlans.map((p) => (
              <span key={p.id} className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5 text-[13px] font-semibold">
                <span className="text-brand-cyan">{p.time}</span>
                {p.title}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3">
          <AiCard title="Программа от ИИ-тренера" cta="Смотреть" onClick={() => setSheet('ai')} />
        </div>

        <button
          onClick={() => navigate('/calendar')}
          className="mt-3 w-full bg-white rounded-[22px] p-4 flex items-center gap-3 text-left active:scale-[.99] transition"
        >
          <span className="w-12 h-12 rounded-2xl bg-surface grid place-items-center shrink-0">
            <CalendarCheck size={22} className="text-ink" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-[16px]">Активные планы</span>
            <span className="block text-gray-400 text-[14px] mt-0.5">
              {totalPlans > 0
                ? `${totalPlans} ${plural(totalPlans, 'активный план', 'активных плана', 'активных планов')}`
                : 'Планируй свои тренировки'}
            </span>
          </span>
          <ChevronRight size={20} className="text-gray-300" />
        </button>
      </section>

      {/* Загруженность клуба */}
      <section className="px-4 mt-7">
        <SectionTitle title="Загруженность клуба" onClick={() => setSheet('club')} />
        <p className="text-gray-500 text-[15px] -mt-1">{CLUB}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="flex items-center gap-2 text-[13px] text-gray-500">
              <span className="w-1 h-4 rounded-full bg-ink" />
              Сейчас
            </p>
            <p className="font-bold text-[15px] mt-1.5">{levelOf(nowVal)}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-[13px] text-gray-500">
              <span className="w-1 h-4 rounded-full bg-brand-cyanbar" />
              Обычно
            </p>
            <p className="font-bold text-[15px] mt-1.5">{levelOf(avg)}</p>
          </div>
        </div>
        <div className="mt-5">
          <LoadChart hours={LOAD_HOURS} values={values} activeHour={activeHour} />
        </div>
        <div className="flex items-end justify-between mt-4">
          <p className="flex items-start gap-2 text-[12px] text-gray-400 max-w-[170px]">
            <Info size={16} className="shrink-0 mt-0.5" />
            Актуальные данные на текущий момент
          </p>
          <button
            onClick={() => setSheet('day')}
            className="flex items-center gap-2 border border-gray-200 rounded-full pl-4 pr-3 py-2 text-[14px] font-semibold active:bg-gray-50"
          >
            {WEEK_FULL[(loadDay + 6) % 7]}
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* Помощник DDX */}
      <section className="mx-3 mt-6 bg-[#E9F1F0] rounded-[28px] p-5 relative overflow-hidden">
        <h2 className="font-display text-[26px] leading-none uppercase text-heading">Помощник DDX</h2>
        <p className="text-[15px] mt-1.5">Моментальные ответы 24/7</p>
        <button onClick={() => setSheet('chat')} className="mt-5 flex items-center gap-1 font-bold text-[15px] active:opacity-70">
          Написать <ChevronRight size={18} />
        </button>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ChatDoodle />
        </div>
      </section>

      {/* Модальные шиты */}
      <AddTrainingSheet open={sheet === 'add'} dom={dom} onClose={() => setSheet(null)} />
      <AiProgramSheet open={sheet === 'ai'} onClose={() => setSheet(null)} />
      <PromoSheet open={sheet === 'promo'} promo={promo} onClose={() => setSheet(null)} />
      <NotificationsSheet open={sheet === 'notif'} onSeen={() => setNotifSeen(true)} onClose={() => setSheet(null)} />
      <DaySheet
        open={sheet === 'day'}
        selected={loadDay}
        onSelect={(d) => {
          setLoadDay(d);
          setSheet(null);
        }}
        onClose={() => setSheet(null)}
      />
      <AssistantSheet open={sheet === 'chat'} onClose={() => setSheet(null)} />
      <InfoSheet
        open={sheet === 'club'}
        title={CLUB}
        text="График: пн–пт 7:00–23:00, сб–вс 9:00–22:00. В часы пик — с 18:00 до 21:00 — рекомендуем групповые программы в Action-зоне."
        onClose={() => setSheet(null)}
      />
    </div>
  );
}

function PromoGlyph({ id }: { id: Promo['icon'] }) {
  switch (id) {
    case 'users':
      return <Glyph d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm9 .5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM1.5 19c.6-4 3-6 6.5-6s5.9 2 6.5 6M15 13.5c2.8.2 4.6 2 5.1 5.5" />;
    case 'ticket':
      return <Glyph d="M3 9V6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5V9a3 3 0 0 0 0 6v2.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5V15a3 3 0 0 0 0-6Zm11-4v3m0 8v3" />;
    case 'plan':
      return <Glyph d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12ZM8 3v4m8-4v4M4 10h16m-11 5 2 2 4-4" />;
    case 'shirt':
      return <Glyph d="M9 4 4.8 6.1a1 1 0 0 0-.5 1.2L5.5 11l2-.8V20h9v-9.8l2 .8 1.2-3.7a1 1 0 0 0-.5-1.2L15 4a3 3 0 0 1-6 0Z" />;
    case 'gift':
      return <Glyph d="M4 11h16v9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V11Zm-1-4h18v4H3V4h4Zm9 0v14M12 7c-2.5 0-4.5-1-4.5-2.5S9 2.5 12 7Zm0 0c2.5 0 4.5-1 4.5-2.5S15 2.5 12 7Z" />;
  }
}

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 text-ink/60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
