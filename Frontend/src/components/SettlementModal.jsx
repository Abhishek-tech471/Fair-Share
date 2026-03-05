import { useState } from 'react';
import { X } from 'lucide-react';
import { MOCK_FRIENDS, formatCurrency } from '../utils/helpers';

const SettlementModal = ({ open, onClose }) => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('cash');

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    setSelectedFriend('');
    setAmount('');
  };

  const friendsYouOwe = MOCK_FRIENDS.filter(f => f.balance < 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-modal w-full max-w-md p-6 animate-scale-in border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Settle Up</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Pay to</label>
            <select value={selectedFriend} onChange={(e) => {
              setSelectedFriend(e.target.value);
              const f = MOCK_FRIENDS.find(fr => fr.name === e.target.value);
              if (f) setAmount(String(Math.abs(f.balance)));
            }}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select a friend</option>
              {friendsYouOwe.map(f => (
                <option key={f.id} value={f.name}>{f.name} — you owe {formatCurrency(Math.abs(f.balance))}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Amount</label>
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="0.00" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Payment method</label>
            <div className="flex gap-2">
              {['cash', 'bank', 'upi'].map(m => (
                <button key={m} type="button" onClick={() => setMethod(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${method === m ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}>
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={!selectedFriend} className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50">
            Record Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettlementModal;
