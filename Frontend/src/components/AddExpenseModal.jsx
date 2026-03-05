import { useState } from 'react';
import { X } from 'lucide-react';
import { MOCK_GROUPS } from '../utils/helpers';

const AddExpenseModal = ({ open, onClose, groupId }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('Alex Johnson');
  const [splitMethod, setSplitMethod] = useState('equal');
  const [selectedGroup, setSelectedGroup] = useState(groupId || '1');

  if (!open) return null;

  const group = MOCK_GROUPS.find(g => g.id === selectedGroup);
  const members = group?.members || [];
  const splitAmount = amount ? (parseFloat(amount) / members.length).toFixed(2) : '0.00';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    onClose();
    setDescription('');
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-modal w-full max-w-md p-6 animate-scale-in border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Add Expense</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!groupId && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Group</label>
              <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                {MOCK_GROUPS.map(g => <option key={g.id} value={g.id}>{g.emoji} {g.name}</option>)}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. Dinner, Groceries" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Amount</label>
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="0.00" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Paid by</label>
            <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              {members.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Split method</label>
            <div className="flex gap-2">
              {['equal', 'exact', 'percentage'].map(m => (
                <button key={m} type="button" onClick={() => setSplitMethod(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${splitMethod === m ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {amount && (
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">Split Preview</p>
              {members.map(m => (
                <div key={m} className="flex justify-between text-sm py-1">
                  <span className="text-muted-foreground">{m}</span>
                  <span className="text-foreground font-medium">${splitAmount}</span>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
