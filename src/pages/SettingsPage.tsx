import { Bell, Mail, ShieldCheck } from 'lucide-react';
import { ScreenHeader } from '../components/ScreenHeader';
import { useApp } from '../state/AppState';

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={`w-[52px] h-8 rounded-full p-1 transition-colors shrink-0 ${on ? 'bg-ink' : 'bg-gray-300'}`}
    >
      <span className={`block w-6 h-6 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { settings, setSetting } = useApp();

  const rows = [
    { key: 'push' as const, icon: Bell, title: 'Push-уведомления', note: 'О записях и акциях' },
    { key: 'email' as const, icon: Mail, title: 'E-mail рассылки', note: 'Новости клуба раз в неделю' },
    { key: 'bio' as const, icon: ShieldCheck, title: 'Вход по биометрии', note: 'Face ID при запуске' },
  ];

  return (
    <div className="min-h-full bg-white pb-8">
      <ScreenHeader title="Настройки" />
      <div className="px-4 mt-2 space-y-2.5">
        {rows.map(({ key, icon: Icon, title, note }) => (
          <div key={key} className="bg-surface rounded-[20px] p-4 flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-[14px] bg-white grid place-items-center shrink-0">
              <Icon size={20} className="text-ink" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block font-bold text-[15px]">{title}</span>
              <span className="block text-gray-400 text-[13px] mt-0.5">{note}</span>
            </span>
            <Switch on={settings[key]} onChange={(v) => setSetting(key, v)} />
          </div>
        ))}
      </div>
      <p className="text-center text-gray-400 text-[12px] mt-6">Версия 1.0.0 · демо-сборка</p>
    </div>
  );
}
