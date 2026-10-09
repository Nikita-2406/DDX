import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Sheet } from './Sheet';

interface Msg {
  who: 'bot' | 'me';
  text: string;
}

const INITIAL: Msg[] = [
  { who: 'bot', text: 'Привет! Я помощник DDX. Спроси про расписание, баланс или подписку 👋' },
];

export function AssistantSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [text, setText] = useState('');

  useEffect(() => {
    if (open) {
      setMsgs(INITIAL);
      setText('');
    }
  }, [open]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { who: 'me', text: t }]);
    setText('');
    window.setTimeout(() => {
      setMsgs((m) => [
        ...m,
        { who: 'bot', text: 'Принял! Менеджер клуба ответит в течение пары минут. Ближайшее свободное окно сегодня — в 21:00 😉' },
      ]);
    }, 700);
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Помощник DDX"
      footer={
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Сообщение"
            className="flex-1 bg-surface rounded-full px-4 py-2.5 text-[14px] outline-none placeholder:text-gray-400"
          />
          <button
            onClick={send}
            aria-label="Отправить"
            className="w-11 h-11 rounded-full bg-ink text-white grid place-items-center shrink-0 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      }
    >
      <div className="space-y-2 pb-2">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.who === 'me' ? 'justify-end' : 'justify-start'}`}>
            <span
              className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug ${
                m.who === 'me' ? 'bg-ink text-white rounded-br-md' : 'bg-surface rounded-bl-md'
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
