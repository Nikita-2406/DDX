import { useState } from 'react';
import { Logo } from '../components/Logo';
import { USER_NAME } from '../mocks/data';
import { useApp } from '../state/AppState';

/** Первый вход: спрашиваем имя и фамилию, дальше они показываются в профиле. */
export default function OnboardingPage() {
  const { setUserName } = useApp();
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const valid = first.trim().length > 0 && last.trim().length > 0;

  const submit = () => {
    if (valid) setUserName(`${first.trim()} ${last.trim()}`);
  };

  return (
    <div className="min-h-full bg-white flex flex-col px-6 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),24px)]">
      <div className="flex justify-center mt-12">
        <Logo />
      </div>

      <h1 className="font-display text-[34px] leading-[1.05] uppercase text-heading text-center mt-12">
        Добро пожаловать
        <br />в DDX Fitness
      </h1>
      <p className="text-gray-400 text-[15px] text-center mt-3">
        Представься — так тебя увидят в профиле и клубе
      </p>

      <div className="mt-8 space-y-3">
        <input
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="Имя"
          autoComplete="given-name"
          className="w-full bg-surface rounded-2xl px-4 py-3.5 text-[15px] font-semibold outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-ink transition"
        />
        <input
          value={last}
          onChange={(e) => setLast(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Фамилия"
          autoComplete="family-name"
          className="w-full bg-surface rounded-2xl px-4 py-3.5 text-[15px] font-semibold outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-ink transition"
        />
      </div>

      <div className="mt-auto pt-10">
        <button
          onClick={submit}
          disabled={!valid}
          className="w-full bg-ink text-white rounded-full py-4 font-bold text-[16px] disabled:opacity-40 active:scale-[.98] transition"
        >
          Продолжить
        </button>
        <button
          onClick={() => setUserName(USER_NAME)}
          className="w-full text-gray-400 text-[14px] mt-4 py-2 active:opacity-60"
        >
          Пропустить — войти как демо-пользователь
        </button>
      </div>
    </div>
  );
}
