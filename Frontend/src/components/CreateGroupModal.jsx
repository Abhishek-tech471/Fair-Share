import { useState } from 'react';
import { X } from 'lucide-react';

const CreateGroupModal = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🏠');

  if (!open) return null;

  const emojis = ['🏠', '🏖️', '🍕', '✈️', '🎉', '💼', '🎮', '🚗'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-modal w-full max-w-md p-6 animate-scale-in border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Create Group</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Group icon</label>
            <div className="flex gap-2 flex-wrap">
              {emojis.map(e => (
                <button key={e} type="button" onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-colors ${emoji === e ? 'bg-primary/10 ring-2 ring-primary' : 'bg-secondary hover:bg-muted'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Group name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. Roommates, Trip to Goa" required />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90">
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
