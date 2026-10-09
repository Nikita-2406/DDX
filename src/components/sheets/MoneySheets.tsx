import { useEffect, useState } from 'react';
import { Check, CircleCheck, CreditCard, Wallet } from 'lucide-react';
import { Sheet } from './Sheet';
import { useApp } from '../../state/AppState';

// ——— Пополнение баланса ———

const AMOUNTS = [500, 1000, 2000, 5000];

export function TopUpSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { topUp } = useApp();
  const [sum, setSum] = useState(1000);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setSum(1000);
      setDone(false);
    }
  }, [open]);

  const confirm = () => {
    topUp(sum);
    setDone(true);
    window.setTimeout(onClose, 900);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Пополнить баланс">
      <div className="grid grid-cols-2 gap-2.5">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            onClick={() => setSum(a)}
            className={`rounded-[18px] py-3.5 font-bold text-[16px] border-[1.5px] transition ${
              sum === a ? 'border-ink bg-ink text-white' : 'border-gray-200 bg-white'
            }`}
          >
            {a} ₽
          </button>
        ))}
      </div>
      {done ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-ok font-bold py-3">
          <CircleCheck size={20} /> Баланс пополнен
        </p>
      ) : (
        <button
          onClick={confirm}
          className="mt-4 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98]"
        >
          Пополнить на {sum} ₽
        </button>
      )}
      <p className="text-center text-gray-400 text-[12px] mt-3">Демо: реальные списаний не происходит</p>
    </Sheet>
  );
}

// ——— Оплата подписки ———

function MethodRow({
  selected,
  onClick,
  icon,
  title,
  note,
  disabled,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  note: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 rounded-[18px] p-3.5 border-[1.5px] text-left transition disabled:opacity-50 ${
        selected ? 'border-ink bg-[#F0F5F4]' : 'border-gray-200'
      }`}
    >
      <span
        className={`w-11 h-11 rounded-[14px] grid place-items-center shrink-0 ${
          selected ? 'bg-ink text-white' : 'bg-surface text-ink'
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold text-[15px]">{title}</span>
        <span className="block text-gray-400 text-[13px] mt-0.5">{note}</span>
      </span>
      <span
        className={`w-5 h-5 rounded-full border-[1.5px] grid place-items-center shrink-0 ${
          selected ? 'border-ink bg-ink' : 'border-gray-300'
        }`}
      >
        {selected && <Check size={12} className="text-white" strokeWidth={3} />}
      </span>
    </button>
  );
}

export function PaySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { subscription, paySubscription, balance } = useApp();
  const [method, setMethod] = useState<'balance' | 'card'>('card');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setMethod('card');
      setDone(false);
    }
  }, [open]);

  const insufficient = method === 'balance' && balance < subscription.price;

  const pay = () => {
    if (paySubscription(method) === 'ok') {
      setDone(true);
      window.setTimeout(onClose, 1100);
    }
  };

  return (
    <Sheet open={open} onClose={onClose} title="Оплата подписки">
      <div className="rounded-[20px] bg-surface p-4 flex items-center justify-between">
        <span className="font-display text-[22px] leading-none">{subscription.name}</span>
        <span className="font-bold text-[17px]">{subscription.price} ₽</span>
      </div>
      <p className="text-gray-400 text-[13px] font-semibold uppercase mt-4 mb-2">Способ оплаты</p>
      <div className="space-y-2">
        <MethodRow
          selected={method === 'card'}
          onClick={() => setMethod('card')}
          icon={<CreditCard size={20} />}
          title="Картой"
          note="Visa · Mastercard · МИР"
        />
        <MethodRow
          selected={method === 'balance'}
          onClick={() => setMethod('balance')}
          icon={<Wallet size={20} />}
          title={`С баланса · ${balance} ₽`}
          note={balance < subscription.price ? 'Недостаточно средств' : 'Спишем всю сумму'}
        />
      </div>
      {insufficient && (
        <p className="text-danger text-[13px] font-semibold mt-3">
          На балансе недостаточно средств — пополни его или заплати картой
        </p>
      )}
      {done ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-ok font-bold py-3">
          <CircleCheck size={20} /> Подписка активирована
        </p>
      ) : (
        <button
          onClick={pay}
          disabled={insufficient}
          className="mt-4 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] disabled:opacity-40 active:scale-[.98]"
        >
          Оплатить {subscription.price} ₽
        </button>
      )}
      <p className="text-center text-gray-400 text-[12px] mt-3">Демо: платёж имитируется</p>
    </Sheet>
  );
}

// ——— Подарочная карта ———

export function GiftSheet({ open, amount, onClose }: { open: boolean; amount: number; onClose: () => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (open) setDone(false);
  }, [open]);

  return (
    <Sheet open={open} onClose={onClose} title="Подарочная карта">
      <p className="text-gray-500 text-[14px] leading-relaxed">
        Карта на {amount} ₽ — отправим получателю код на телефон или e-mail. Действует год во всех клубах сети.
      </p>
      {done ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-ok font-bold py-3">
          <CircleCheck size={20} /> Карта оформлена
        </p>
      ) : (
        <button
          onClick={() => {
            setDone(true);
            window.setTimeout(onClose, 900);
          }}
          className="mt-4 w-full bg-ink text-white rounded-full py-3.5 font-bold text-[16px] active:scale-[.98]"
        >
          Оформить за {amount} ₽
        </button>
      )}
      <p className="text-center text-gray-400 text-[12px] mt-3">Демо: оплата имитируется</p>
    </Sheet>
  );
}
