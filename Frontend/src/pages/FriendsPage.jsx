import { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';
import { MOCK_FRIENDS, formatCurrency, getInitials, getAvatarColor } from '../utils/helpers';
import AddFriendModal from '../components/AddFriendModal';

const FriendsPage = () => {
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Friends</h1>
          <p className="text-muted-foreground">{friends.length} friends</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <UserPlus className="w-4 h-4" /> Add Friend
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border divide-y divide-border">
        {friends.map((f) => (
          <div key={f.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground ${getAvatarColor(f.name)}`}>
                {getInitials(f.name)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                {f.balance === 0 ? (
                  <span className="text-sm text-muted-foreground">Settled up</span>
                ) : f.balance > 0 ? (
                  <span className="text-sm font-semibold text-success">owes you {formatCurrency(f.balance)}</span>
                ) : (
                  <span className="text-sm font-semibold text-accent">you owe {formatCurrency(Math.abs(f.balance))}</span>
                )}
              </div>
              <button onClick={() => setFriends(friends.filter(fr => fr.id !== f.id))} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddFriendModal open={showAddModal} onClose={() => setShowAddModal(false)} onAdd={(friend) => {
        setFriends([...friends, { ...friend, id: String(Date.now()), balance: 0 }]);
        setShowAddModal(false);
      }} />
    </div>
  );
};

export default FriendsPage;
