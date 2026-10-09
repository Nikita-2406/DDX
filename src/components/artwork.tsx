// SVG-иллюстрации-заглушки вместо фото и логотипов из оригинального приложения.

export function AvatarArt() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" fill="#AEB8B7" aria-hidden>
      <circle cx="24" cy="18" r="8" />
      <path d="M8 44c2-10 8-14 16-14s14 4 16 14Z" />
    </svg>
  );
}

export function DiaryArt() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" aria-hidden>
      <rect x="18" y="10" width="32" height="44" rx="5" fill="#FBFAF6" stroke="#0D3F3B" strokeWidth="2.5" />
      <path d="M26 22h16M26 30h16M26 38h10" stroke="#B9C4C3" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 20c-4 0-4-5 0-5M18 32c-4 0-4-5 0-5M18 44c-4 0-4-5 0-5" stroke="#0D3F3B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 46l8 8" stroke="#7C5CBF" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="52" cy="20" r="6" stroke="#3FB9C6" strokeWidth="2.5" />
    </svg>
  );
}

export function BodyScanArt() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none" aria-hidden>
      <path
        d="M6 18v-4a8 8 0 0 1 8-8h4M58 18v-4a8 8 0 0 0-8-8h-4M6 46v4a8 8 0 0 0 8 8h4M58 46v4a8 8 0 0 1-8 8h-4"
        stroke="#34C06B"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="27" r="6.5" fill="#7ED9A2" />
      <path d="M19 51c2.5-10 7.5-14 13-14s10.5 4 13 14Z" fill="#7ED9A2" />
    </svg>
  );
}

export function MachineArt() {
  return (
    <svg
      viewBox="0 0 84 60"
      className="w-20 h-14"
      fill="none"
      stroke="#A9B0AF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 52h68" />
      <circle cx="26" cy="44" r="8" />
      <circle cx="60" cy="44" r="8" />
      <path d="M26 36 40 12" />
      <path d="M60 36 48 14" />
      <path d="M40 12c4-4 10-4 14 0" />
      <path d="M40 12 34 24" />
      <path d="M54 12l8 14" />
    </svg>
  );
}

export function PlansArt({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="#9AA5A4"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="10" y="14" width="44" height="40" rx="9" fill="#F6F7F7" />
      <path d="M10 26h44" />
      <path d="M22 8v10M42 8v10" />
      <path d="M23 41l7 7 13-13" />
    </svg>
  );
}

export function ChatDoodle() {
  return (
    <svg
      viewBox="0 0 96 84"
      className="w-24 h-20"
      fill="none"
      stroke="#0D3F3B"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 10h52a12 12 0 0 1 12 12v20a12 12 0 0 1-12 12H48L30 70l4-16h-12a12 12 0 0 1-12-12V22A12 12 0 0 1 22 10Z" />
      <path d="M34 32c3.5-5 7-5 10.5 0s7 5 10.5 0 7-5 10.5 0" />
    </svg>
  );
}

export function BannerRings() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute -right-6 -bottom-10 w-40 h-40 text-white/15 pointer-events-none"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <circle cx="60" cy="60" r="56" strokeWidth="10" />
      <circle cx="60" cy="60" r="34" strokeWidth="10" />
    </svg>
  );
}

export function HeartArt() {
  return (
    <svg viewBox="0 0 24 24" className="w-11 h-11" fill="#F472B6" aria-hidden>
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.6 2.4 5 6 5c2.2 0 3.6 1.1 4.5 2.5L12 9l1.5-1.5C14.4 6.1 15.8 5 18 5c3.6 0 5.6 3.6 4 6.7C19.5 16.3 12 21 12 21Z" />
    </svg>
  );
}

export function ZapArt() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#8B5CF6" aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function SparklesArt() {
  return (
    <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FBBF24" aria-hidden>
      <path d="M10 3c.5 3.9 1.9 5.3 5.5 5.5-3.6.2-5 1.6-5.5 5.5-.5-3.9-1.9-5.3-5.5-5.5C8.1 8.3 9.5 6.9 10 3Z" />
      <path d="M18 12c.3 2.6 1.3 3.5 3.8 3.8-2.5.3-3.5 1.2-3.8 3.8-.3-2.6-1.3-3.5-3.8-3.8 2.5-.3 3.5-1.2 3.8-3.8Z" />
    </svg>
  );
}
