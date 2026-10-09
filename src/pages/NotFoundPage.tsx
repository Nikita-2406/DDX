import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-full bg-white grid place-items-center p-8 text-center">
      <div>
        <p className="font-display text-[64px] leading-none">404</p>
        <p className="text-gray-500 mt-3">Такой страницы нет</p>
        <Link to="/" className="inline-block mt-5 bg-ink text-white rounded-full px-6 py-3 font-bold active:scale-[.97] transition">
          На главную
        </Link>
      </div>
    </div>
  );
}
