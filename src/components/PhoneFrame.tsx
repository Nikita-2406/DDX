import { createContext, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';

/** Хост внутри «телефона», куда портальятся модальные шиты (обрезаются его скруглением). */
export const ModalHostContext = createContext<HTMLDivElement | null>(null);

/**
 * Каркас приложения: на экранах ≥501px — рамка-«телефон» 390px по центру серого фона,
 * на мобильных — на весь экран. Контент скроллится, нижняя навигация приклеена к низу.
 */
export function Shell({ nav = false }: { nav?: boolean }) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <ModalHostContext.Provider value={host}>
      <div className="min-h-dvh w-full flex items-center justify-center bg-[#D8DCDE] phone:py-8">
        <div
          className="relative w-full h-[100dvh] flex flex-col overflow-hidden bg-white
                     phone:w-[390px] phone:h-[min(844px,calc(100dvh_-_4rem))] phone:rounded-[40px]
                     phone:shadow-[0_40px_90px_-25px_rgba(15,40,40,0.55)] phone:ring-[10px] phone:ring-[#1B1D1F]"
        >
          <main ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain no-scrollbar">
            <Outlet />
          </main>
          {nav && <BottomNav />}
          <div ref={setHost} className="absolute inset-0 z-40 pointer-events-none" />
        </div>
      </div>
    </ModalHostContext.Provider>
  );
}
