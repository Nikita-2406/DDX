import { useContext, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalHostContext } from '../PhoneFrame';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  /** Прибитая к низу область (например, поле ввода чата) */
  footer?: ReactNode;
}

/** Веб-аналог bottom-sheet: выезжающая снизу модалка внутри рамки-«телефона». */
export function Sheet({ open, onClose, title, subtitle, children, footer }: SheetProps) {
  const host = useContext(ModalHostContext);
  if (!host || !open) return null;

  return createPortal(
    <div className="absolute inset-0 pointer-events-auto">
      <div className="absolute inset-0 bg-black/45 animate-fade" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 flex flex-col max-h-[86%] bg-white rounded-t-[28px] animate-sheet pb-[max(env(safe-area-inset-bottom),16px)]">
        <div className="shrink-0 pt-3 pb-1 grid justify-items-center cursor-pointer" onClick={onClose}>
          <span className="w-10 h-1.5 rounded-full bg-gray-200" />
        </div>
        {(title || subtitle) && (
          <div className="shrink-0 px-5 pt-1 pb-2">
            {title && <h2 className="font-display text-[26px] leading-none uppercase">{title}</h2>}
            {subtitle && <p className="text-[14px] text-gray-400 mt-1.5">{subtitle}</p>}
          </div>
        )}
        <div className="overflow-y-auto no-scrollbar px-5 pt-2">{children}</div>
        {footer && <div className="shrink-0 px-5 pt-3">{footer}</div>}
      </div>
    </div>,
    host,
  );
}
