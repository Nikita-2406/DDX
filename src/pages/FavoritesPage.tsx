import { Heart } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { useApp } from '../state/AppState';

const CATALOG = [
  { id: 'func', title: 'Функциональный тренинг', note: 'Action-зона · пн/ср/пт 19:00' },
  { id: 'yoga', title: 'Йога', note: 'Зал 2 · вт/чт 10:00' },
  { id: 'pilates', title: 'Пилатес', note: 'Зал 1 · пн/чт 18:00' },
  { id: 'cycle', title: 'Cycle', note: 'Cycle-студия · ср/пт 20:00' },
];

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useApp();

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Избранное" />
      {favorites.length === 0 ? (
        <div className="text-center py-16 px-8">
          <Heart size={56} className="mx-auto text-gray-200" />
          <p className="font-bold text-[16px] mt-4">Пока пусто</p>
          <p className="text-gray-400 text-[14px] mt-1">Нажимай ♥ на тренировках, чтобы сохранить их здесь</p>
        </div>
      ) : (
        <div className="px-4 mt-1 space-y-2.5">
          {CATALOG.filter((c) => favorites.includes(c.id)).map((c) => (
            <div key={c.id} className="bg-surface rounded-[20px] p-4 flex items-center gap-3.5">
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-[15px]">{c.title}</span>
                <span className="block text-gray-400 text-[13px] mt-0.5">{c.note}</span>
              </span>
              <button onClick={() => toggleFavorite(c.id)} aria-label="Убрать из избранного" className="active:scale-90 transition">
                <Heart size={22} className="text-pink-500" fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
