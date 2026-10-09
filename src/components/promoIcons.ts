import { CalendarCheck, Gift, Shirt, Ticket, Users } from 'lucide-react';

export const PROMO_ICONS = {
  users: Users,
  ticket: Ticket,
  plan: CalendarCheck,
  shirt: Shirt,
  gift: Gift,
} as const;

export type PromoIconKey = keyof typeof PROMO_ICONS;
