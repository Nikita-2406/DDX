// Все данные приложения — моки. Никаких запросов к серверу.

export const CLUB = 'DDX Преображенское Янтарь';
export const USER_NAME = 'Пётр Цапиков';

export const WEEKDAYS_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
export const WEEK_FULL = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];
export const MONTHS_GEN = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function next7Days(): { dom: number; dow: string; isToday: boolean }[] {
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    return { dom: d.getDate(), dow: WEEKDAYS_SHORT[d.getDay()], isToday: i === 0 };
  });
}

export function formatDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS_GEN[d.getMonth()]} ${d.getFullYear()}`;
}

/** Русская плюрализация: plural(3, 'план', 'плана', 'планов') */
export function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

// ——— Главная ———

export interface Promo {
  id: string;
  caption: string;
  badge?: string;
  text: string;
  grad: string;
  icon: 'users' | 'ticket' | 'plan' | 'shirt' | 'gift';
}

export const PROMOS: Promo[] = [
  {
    id: 'parents',
    caption: 'Приводи родителей',
    text: 'Два гостевых визита бесплатно по выходным — родители тренируются вместе с тобой.',
    grad: 'from-orange-100 via-amber-50 to-rose-100',
    icon: 'users',
  },
  {
    id: 'raffle',
    caption: 'Розыгрыш подписок',
    text: 'Каждый месяц разыгрываем 5 подписок Infinity среди участников челленджа.',
    grad: 'from-cyan-100 via-sky-50 to-cyan-100',
    icon: 'ticket',
  },
  {
    id: 'plan',
    caption: 'Планировать тренировки легко',
    badge: 'Всё в одном месте',
    text: 'Собери план на неделю: групповые и самостоятельные тренировки в одном календаре.',
    grad: 'from-sky-100 via-indigo-50 to-violet-100',
    icon: 'plan',
  },
  {
    id: 'autumn',
    caption: 'Осенняя коллекция',
    text: 'Мерч и аксессуары DDX — от бутылочек до худи. Оформи заказ в приложении.',
    grad: 'from-amber-100 via-orange-50 to-amber-100',
    icon: 'shirt',
  },
  {
    id: 'free',
    caption: 'Занимай бесплатно',
    text: 'Первая тренировка с персональным тренером — бесплатно по промокоду.',
    grad: 'from-rose-100 via-pink-50 to-fuchsia-100',
    icon: 'gift',
  },
];

export interface Banner {
  id: string;
  title: string;
  text: string;
  grad: string;
}

export const BANNERS: Banner[] = [
  {
    id: 'infinity-plus',
    title: 'Новый тариф Infinity Plus',
    text: 'Все возможности Infinity + Action + InBody + самостоятельные тренировки',
    grad: 'from-[#221C4E] via-[#31277A] to-[#4B2E83]',
  },
  {
    id: 'action',
    title: 'Зона Action',
    text: 'Функциональный тренинг, цикл и единоборства в каждом клубе',
    grad: 'from-[#0D3F3B] via-[#12504A] to-[#1C6B60]',
  },
];

export const LOAD_HOURS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

/** Индекс — день недели из getDay(): 0 — воскресенье. Значения — % загрузки. */
export const LOAD_BY_DAY: Record<number, number[]> = {
  0: [36, 54, 70, 82, 90, 84, 74, 60, 40, 24],
  1: [22, 34, 44, 56, 68, 80, 92, 78, 54, 30],
  2: [20, 30, 42, 54, 66, 84, 96, 80, 52, 30],
  3: [24, 36, 48, 58, 70, 82, 94, 76, 50, 28],
  4: [16, 26, 38, 50, 62, 86, 100, 74, 48, 28],
  5: [40, 58, 72, 84, 92, 88, 80, 66, 44, 26],
  6: [30, 46, 62, 76, 86, 90, 82, 64, 42, 24],
};

export const levelOf = (v: number): string =>
  v >= 75 ? 'Высокая загрузка' : v >= 45 ? 'Умеренная загрузка' : 'Низкая загрузка';

// ——— История посещений ———

export const VISITS_MONTHS = ['мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт'];

export interface VisitRecord {
  label: string;
  club: string;
  dur: string;
}

/** Сводка одного месяца внутри таба. */
export interface MonthVisits {
  count: number;
  total: string;
  list: VisitRecord[];
}

export interface TabHistory {
  /** Значения столбцов графика, мар..окт */
  values: number[];
  /** Сводка по каждому месяцу, индекс = столбцу графика */
  months: MonthVisits[];
}

const CLUBS = ['Коньково', 'Медведково', 'Преображенское Янтарь'];
const MONTHS_NOM_SHORT = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const WORKOUT_NAMES = [
  'Самостоятельная тренировка',
  'Групповая · Функциональный тренинг',
  'Групповая · Cycle',
  'Групповая · Йога',
];

/** Детерминированный ГПСЧ — моки одинаковы при каждой сборке. */
function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fmtDur(min: number): string {
  const h = Math.floor(min / 60);
  return h === 0 ? `${min}м` : `${h}ч ${String(min % 60).padStart(2, '0')}м`;
}

function fmtTotal(min: number): string {
  return `${Math.floor(min / 60)} ч ${String(min % 60).padStart(2, '0')} мин`;
}

function visitLabel(year: number, month0: number, day: number): string {
  const wd = WEEKDAYS_SHORT[new Date(year, month0, day).getDay()];
  return `${String(day).padStart(2, '0')} ${MONTHS_NOM_SHORT[month0]} ${year}, ${wd}`;
}

function generateVisits(year: number, month0: number, count: number): MonthVisits {
  const rand = mulberry32(year * 100 + month0);
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  const days = new Set<number>();
  while (days.size < Math.min(count, daysInMonth)) days.add(1 + Math.floor(rand() * daysInMonth));
  let totalMin = 0;
  const list = [...days]
    .sort((a, b) => a - b)
    .map((d) => {
      const min = 45 + Math.floor(rand() * 70);
      totalMin += min;
      return {
        label: visitLabel(year, month0, d),
        club: CLUBS[Math.floor(rand() * CLUBS.length)],
        dur: fmtDur(min),
      };
    });
  return { count: list.length, total: fmtTotal(totalMin), list };
}

function generateWorkouts(year: number, month0: number, count: number): MonthVisits {
  if (count === 0) return { count: 0, total: '0 мин', list: [] };
  const rand = mulberry32(7777 + year * 100 + month0);
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  const days = new Set<number>();
  while (days.size < Math.min(count, daysInMonth)) days.add(1 + Math.floor(rand() * daysInMonth));
  let totalMin = 0;
  const list = [...days]
    .sort((a, b) => a - b)
    .map((d) => {
      const min = 40 + Math.floor(rand() * 26);
      totalMin += min;
      return {
        label: visitLabel(year, month0, d),
        club: WORKOUT_NAMES[Math.floor(rand() * WORKOUT_NAMES.length)],
        dur: fmtDur(min),
      };
    });
  return { count: list.length, total: fmtTotal(totalMin), list };
}

// Активность стабильная: 12–15 визитов в клуб каждый месяц.
// Октябрь–август курируются вручную, март–июль генерируются детерминированно.

const AUG_VISITS: MonthVisits = {
  count: 12,
  total: '13 ч 55 мин',
  list: [
    { label: '01 авг 2026, сб', club: 'Коньково', dur: '1ч 10м' },
    { label: '03 авг 2026, пн', club: 'Медведково', dur: '55м' },
    { label: '05 авг 2026, ср', club: 'Коньково', dur: '1ч 30м' },
    { label: '08 авг 2026, сб', club: 'Преображенское Янтарь', dur: '1ч 05м' },
    { label: '10 авг 2026, пн', club: 'Коньково', dur: '1ч 15м' },
    { label: '12 авг 2026, ср', club: 'Медведково', dur: '50м' },
    { label: '14 авг 2026, пт', club: 'Коньково', dur: '1ч 20м' },
    { label: '17 авг 2026, пн', club: 'Коньково', dur: '45м' },
    { label: '19 авг 2026, ср', club: 'Преображенское Янтарь', dur: '1ч 25м' },
    { label: '22 авг 2026, сб', club: 'Коньково', dur: '1ч 10м' },
    { label: '26 авг 2026, ср', club: 'Медведково', dur: '1ч' },
    { label: '29 авг 2026, сб', club: 'Коньково', dur: '1ч 30м' },
  ],
};

const SEP_VISITS: MonthVisits = {
  count: 14,
  total: '16 ч 40 мин',
  list: [
    { label: '01 сен 2026, вт', club: 'Коньково', dur: '1ч 15м' },
    { label: '03 сен 2026, чт', club: 'Медведково', dur: '50м' },
    { label: '05 сен 2026, сб', club: 'Коньково', dur: '1ч 40м' },
    { label: '08 сен 2026, вт', club: 'Преображенское Янтарь', dur: '1ч 05м' },
    { label: '10 сен 2026, чт', club: 'Коньково', dur: '1ч 20м' },
    { label: '12 сен 2026, сб', club: 'Медведково', dur: '55м' },
    { label: '15 сен 2026, вт', club: 'Коньково', dur: '1ч 30м' },
    { label: '17 сен 2026, чт', club: 'Коньково', dur: '45м' },
    { label: '19 сен 2026, сб', club: 'Преображенское Янтарь', dur: '1ч 25м' },
    { label: '22 сен 2026, вт', club: 'Коньково', dur: '1ч 10м' },
    { label: '24 сен 2026, чт', club: 'Медведково', dur: '1ч' },
    { label: '26 сен 2026, сб', club: 'Коньково', dur: '1ч 35м' },
    { label: '28 сен 2026, пн', club: 'Коньково', dur: '50м' },
    { label: '30 сен 2026, ср', club: 'Коньково', dur: '1ч 20м' },
  ],
};

const OCT_VISITS: MonthVisits = {
  count: 15,
  total: '18 ч 59 мин',
  list: [
    { label: '01 окт 2026, чт', club: 'Коньково', dur: '1ч 25м' },
    { label: '02 окт 2026, пт', club: 'Коньково', dur: '1ч 39м' },
    { label: '03 окт 2026, сб', club: 'Медведково', dur: '55м' },
    { label: '05 окт 2026, пн', club: 'Преображенское Янтарь', dur: '1ч 10м' },
    { label: '06 окт 2026, вт', club: 'Коньково', dur: '45м' },
    { label: '08 окт 2026, чт', club: 'Медведково', dur: '1ч 05м' },
    { label: '09 окт 2026, пт', club: 'Коньково', dur: '1ч 30м' },
    { label: '12 окт 2026, пн', club: 'Коньково', dur: '1ч 15м' },
    { label: '13 окт 2026, вт', club: 'Преображенское Янтарь', dur: '50м' },
    { label: '15 окт 2026, чт', club: 'Коньково', dur: '1ч 45м' },
    { label: '17 окт 2026, сб', club: 'Медведково', dur: '1ч 20м' },
    { label: '20 окт 2026, пн', club: 'Коньково', dur: '1ч' },
    { label: '22 окт 2026, чт', club: 'Коньково', dur: '1ч 35м' },
    { label: '24 окт 2026, сб', club: 'Преображенское Янтарь', dur: '55м' },
    { label: '27 окт 2026, вт', club: 'Коньково', dur: '1ч 50м' },
  ],
};

const AUG_WORKOUTS: MonthVisits = {
  count: 2,
  total: '1 ч 55 мин',
  list: [
    { label: '17 авг 2026, пн', club: 'Групповая · Cycle', dur: '50м' },
    { label: '05 авг 2026, ср', club: 'Самостоятельная тренировка', dur: '1ч 05м' },
  ],
};

const SEP_WORKOUTS: MonthVisits = {
  count: 1,
  total: '52 мин',
  list: [{ label: '21 сен 2026, пн', club: 'Самостоятельная тренировка', dur: '52м' }],
};

const OCT_WORKOUTS: MonthVisits = {
  count: 2,
  total: '1 ч 42 мин',
  list: [
    { label: '06 окт 2026, пн', club: 'Групповая · Функциональный тренинг', dur: '55м' },
    { label: '01 окт 2026, чт', club: 'Самостоятельная тренировка', dur: '47м' },
  ],
};

export const VISIT_TABS: Record<'visits' | 'workouts', TabHistory> = {
  visits: {
    values: [12, 14, 13, 15, 13, 12, 14, 15],
    months: [
      generateVisits(2026, 2, 12), // март
      generateVisits(2026, 3, 14), // апрель
      generateVisits(2026, 4, 13), // май
      generateVisits(2026, 5, 15), // июнь
      generateVisits(2026, 6, 13), // июль
      AUG_VISITS,
      SEP_VISITS,
      OCT_VISITS,
    ],
  },
  workouts: {
    values: [1, 2, 2, 0, 3, 2, 1, 2],
    months: [
      generateWorkouts(2026, 2, 1),
      generateWorkouts(2026, 3, 2),
      generateWorkouts(2026, 4, 2),
      generateWorkouts(2026, 5, 0),
      generateWorkouts(2026, 6, 3),
      AUG_WORKOUTS,
      SEP_WORKOUTS,
      OCT_WORKOUTS,
    ],
  },
};

// ——— Тренеры и расписание ———

export interface Trainer {
  id: string;
  name: string;
  role: string;
  tags: string[];
  initials: string;
  grad: string;
}

export const TRAINERS: Trainer[] = [
  {
    id: 'anna',
    name: 'Анна Соколова',
    role: 'Йога и стретчинг',
    tags: ['Йога', 'Стретчинг'],
    initials: 'АС',
    grad: 'from-rose-300 to-pink-400',
  },
  {
    id: 'maksim',
    name: 'Максим Орлов',
    role: 'Функциональный тренинг',
    tags: ['Action', 'Кроссфит'],
    initials: 'МО',
    grad: 'from-cyan-300 to-sky-500',
  },
  {
    id: 'elena',
    name: 'Елена Громова',
    role: 'Пилатес',
    tags: ['Пилатес', 'Спина'],
    initials: 'ЕГ',
    grad: 'from-violet-300 to-purple-400',
  },
  {
    id: 'dmitry',
    name: 'Дмитрий Волков',
    role: 'Тренажёрный зал',
    tags: ['Сила', 'Масса'],
    initials: 'ДВ',
    grad: 'from-amber-300 to-orange-400',
  },
  {
    id: 'polina',
    name: 'Полина Лебедева',
    role: 'Групповые программы',
    tags: ['Cycle', 'ТВТ'],
    initials: 'ПЛ',
    grad: 'from-teal-300 to-emerald-400',
  },
  {
    id: 'igor',
    name: 'Игорь Степанов',
    role: 'Единоборства',
    tags: ['ММА', 'Бокс'],
    initials: 'ИС',
    grad: 'from-slate-300 to-slate-500',
  },
];

export interface GymClass {
  id: string;
  title: string;
  time: string;
  place: string;
}

export const CLASSES: GymClass[] = [
  { id: 'func', title: 'Функциональный тренинг', time: '19:00', place: 'Action-зона' },
  { id: 'yoga', title: 'Йога', time: '10:00', place: 'Зал 2' },
  { id: 'pilates', title: 'Пилатес', time: '18:00', place: 'Зал 1' },
  { id: 'cycle', title: 'Cycle', time: '20:00', place: 'Cycle-студия' },
];

// ——— Уведомления и платежи ———

export const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Подписка скоро закроется',
    text: 'Оплати Infinity 1 мес до 16 октября, чтобы сохранить цену',
    time: '2 ч назад',
  },
  {
    id: 'n2',
    title: 'Ты записан на тренировку',
    text: 'Функциональный тренинг, сегодня в 19:00, Action-зона',
    time: '5 ч назад',
  },
  {
    id: 'n3',
    title: 'Кэшбэк начислен',
    text: '300 бонусов за визит в клуб «Коньково»',
    time: 'вчера',
  },
];

export interface Payment {
  id: string;
  date: string;
  title: string;
  amount: number;
  status: 'ok' | 'fail';
}

export const PAYMENTS: Payment[] = [
  { id: 'p1', date: '15 сен 2026', title: 'Списание по подписке Infinity 1 мес', amount: -4990, status: 'fail' },
  { id: 'p2', date: '12 сен 2026', title: 'Пополнение баланса', amount: 2000, status: 'ok' },
  { id: 'p3', date: '15 авг 2026', title: 'Списание по подписке Infinity 1 мес', amount: -4990, status: 'ok' },
  { id: 'p4', date: '15 авг 2026', title: 'Пополнение баланса', amount: 5000, status: 'ok' },
  { id: 'p5', date: '02 авг 2026', title: 'Персональная тренировка', amount: -2500, status: 'ok' },
];

// ——— Анализ состава тела ———

export const BODY_METRICS = [
  { label: 'Вес', value: '78,4', unit: 'кг', pct: 64 },
  { label: 'ИМТ', value: '24,1', unit: '', pct: 58 },
  { label: 'Мышечная масса', value: '55,2', unit: 'кг', pct: 72 },
  { label: 'Жир', value: '18,3', unit: '%', pct: 38 },
];

export const WEIGHT_TREND = [82.1, 81.2, 80.3, 79.4, 78.9, 78.4];

// ——— Дневник ———

export interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  items: [string, string][];
}

export const DIARY: DiaryEntry[] = [
  {
    id: 'd1',
    date: '06 окт, пн',
    title: 'Верх тела',
    items: [
      ['Жим лёжа', '4×10'],
      ['Тяга верхнего блока', '3×12'],
      ['Подъём штанги на бицепс', '3×12'],
    ],
  },
  {
    id: 'd2',
    date: '03 окт, пт',
    title: 'Низ тела',
    items: [
      ['Приседания в Смите', '4×12'],
      ['Жим ногами', '4×10'],
      ['Икры стоя', '3×15'],
    ],
  },
];

export const EXERCISES = [
  'Жим лёжа',
  'Приседания',
  'Становая тяга',
  'Подтягивания',
  'Отжимания на брусьях',
  'Планка',
];

// ——— Оборудование ———

export interface Equipment {
  id: string;
  name: string;
  steps: string[];
}

export const EQUIPMENT: Equipment[] = [
  {
    id: 'tread',
    name: 'Беговая дорожка',
    steps: [
      'Встань на боковые полосы и нажми Quick Start',
      'Держись за поручни первые 30 секунд',
      'Скорость и наклон регулируются кнопками ± на консоли',
    ],
  },
  {
    id: 'ellipt',
    name: 'Эллипсоид',
    steps: [
      'Поставь ноги на платформы по меткам',
      'Выбери программу на сенсорном экране',
      'Держи спину прямо, не переноси вес на носки',
    ],
  },
  {
    id: 'rack',
    name: 'Силовая рама',
    steps: [
      'Установи страховочные упоры на уровень плеч',
      'Проверь фиксацию замков на грифе',
      'Работай только с безопасным весом',
    ],
  },
  {
    id: 'press',
    name: 'Жим ногами',
    steps: [
      'Отрегулируй спинку под длину ног',
      'Стопы на платформе — на ширине плеч',
      'Не выпрямляй колени до конца в верхней точке',
    ],
  },
  {
    id: 'crossover',
    name: 'Кроссовер',
    steps: [
      'Выстави одинаковый вес на обоих блоках',
      'Проверь крепление ручек карабином',
      'Верни плитки плавно, не бросай вес',
    ],
  },
];

// ——— Подарочные карты, тарифы, ИИ-программа ———

export const GIFT_AMOUNTS = [1000, 3000, 5000];

export interface Tariff {
  id: string;
  name: string;
  price: number;
  note: string;
  perks: string[];
}

export const TARIFFS: Tariff[] = [
  {
    id: 'inf1',
    name: 'INFINITY 1МЕС',
    price: 4990,
    note: 'Безлимит на месяц',
    perks: ['Все клубы сети', 'Групповые программы', 'Гостевые визиты'],
  },
  {
    id: 'infplus',
    name: 'INFINITY PLUS',
    price: 6990,
    note: 'Всё из Infinity + Action',
    perks: ['Зона Action', 'Анализы InBody', 'Самостоятельные тренировки'],
  },
  {
    id: 'action',
    name: 'ACTION',
    price: 3990,
    note: 'Функциональный тренинг',
    perks: ['Action-зона', 'Цикл и единоборства', 'Чек-ин по браслету'],
  },
];

export const AI_PROGRAM = [
  { day: 'Понедельник', title: 'Верх тела · 45 мин' },
  { day: 'Среда', title: 'Низ тела · 50 мин' },
  { day: 'Пятница', title: 'Кардио + кор · 40 мин' },
];

// ——— Дополнительно ———

export const EXTRA_ITEMS = [
  {
    id: 'about',
    title: 'О приложении',
    text: 'DDX Fitness — сеть фитнес-клубов. Это демонстрационная веб-версия мобильного приложения: данные в ней — моки, ничего не отправляется на сервер.',
  },
  {
    id: 'clubs',
    title: 'Клубы',
    text: 'Коньково, Медведково, Преображенское Янтарь, Хорошё, Парк Победы и ещё 30+ клубов в Москве и регионах.',
  },
  {
    id: 'faq',
    title: 'Частые вопросы',
    text: 'Как заморозить подписку? Как привести гостя? Где посмотреть чек? Ответы на эти и другие вопросы — в разделе помощи или у Помощника DDX.',
  },
  {
    id: 'contacts',
    title: 'Контакты',
    text: '8 800 000-00-00 — звонок бесплатный. support@ddxfitness.example — ответим в течение дня.',
  },
  {
    id: 'policy',
    title: 'Политика конфиденциальности',
    text: 'Демо-приложение не собирает и не передаёт персональные данные. Все данные хранятся только в памяти открытой вкладки.',
  },
];
