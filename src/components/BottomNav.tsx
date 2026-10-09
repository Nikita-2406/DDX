import { NavLink } from 'react-router-dom';
import { CalendarDays, CirclePlay, Dumbbell, Home, User } from 'lucide-react';

const TABS = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/calendar', label: 'Календарь', icon: CalendarDays },
  { to: '/trainers', label: 'Тренеры', icon: Dumbbell },
  { to: '/action', label: 'Action', icon: CirclePlay },
  { to: '/profile', label: 'Профиль', icon: User },
];

export function BottomNav() {
  return (
    <nav className="shrink-0 bg-white border-t border-black/5 px-1.5 pt-2 pb-[max(env(safe-area-inset-bottom),10px)] flex">
      {TABS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-1 transition-colors ${
              isActive ? 'text-ink' : 'text-gray-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={`text-[11px] leading-none ${isActive ? 'font-extrabold' : 'font-medium'}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
