import { createContext, useContext, useState, type ReactNode } from 'react';
import { formatDate } from '../mocks/data';

export interface PlanItem {
  id: string;
  title: string;
  time: string;
  kind: 'group' | 'self';
}

interface Subscription {
  name: string;
  price: number;
  paid: boolean;
  paidUntil: string | null;
}

interface Settings {
  push: boolean;
  email: boolean;
  bio: boolean;
}

interface AppContext {
  /** «Имя Фамилия» — заполняется на онбординге при первом входе */
  userName: string;
  setUserName: (name: string) => void;
  balance: number;
  topUp: (sum: number) => void;
  subscription: Subscription;
  paySubscription: (method: 'balance' | 'card') => 'ok' | 'insufficient';
  /** Планы тренировок по дню месяца (dom) */
  plans: Record<number, PlanItem[]>;
  addPlan: (dom: number, item: Omit<PlanItem, 'id'>) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  settings: Settings;
  setSetting: (key: keyof Settings, value: boolean) => void;
}

const Ctx = createContext<AppContext | null>(null);
let seq = 0;

const NAME_STORAGE_KEY = 'ddx-user-name';

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [userName, setUserNameState] = useState<string>(() => {
    try {
      return localStorage.getItem(NAME_STORAGE_KEY) ?? '';
    } catch {
      return '';
    }
  });
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState<Subscription>({
    name: 'INFINITY 1МЕС',
    price: 4990,
    paid: false,
    paidUntil: null,
  });
  const [plans, setPlans] = useState<Record<number, PlanItem[]>>({});
  const [favorites, setFavorites] = useState<string[]>(['func', 'yoga']);
  const [settings, setSettings] = useState<Settings>({ push: true, email: false, bio: true });

  const value: AppContext = {
    userName,
    setUserName: (name) => {
      setUserNameState(name);
      try {
        localStorage.setItem(NAME_STORAGE_KEY, name);
      } catch {
        /* приватный режим — имя проживёт до перезагрузки */
      }
    },
    balance,
    topUp: (sum) => setBalance((b) => b + sum),
    subscription,
    paySubscription: (method) => {
      if (subscription.paid) return 'ok';
      if (method === 'balance' && balance < subscription.price) return 'insufficient';
      if (method === 'balance') setBalance((b) => b - subscription.price);
      const until = new Date();
      until.setDate(until.getDate() + 30);
      setSubscription({ ...subscription, paid: true, paidUntil: formatDate(until) });
      return 'ok';
    },
    plans,
    addPlan: (dom, item) =>
      setPlans((p) => ({
        ...p,
        [dom]: [...(p[dom] ?? []), { ...item, id: `plan-${++seq}` }],
      })),
    favorites,
    toggleFavorite: (id) =>
      setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    settings,
    setSetting: (key, v) => setSettings((s) => ({ ...s, [key]: v })),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppContext {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used within AppStateProvider');
  return v;
}
