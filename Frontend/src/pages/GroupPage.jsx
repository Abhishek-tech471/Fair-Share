import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Receipt } from 'lucide-react';
import { useState } from 'react';
import { useGroup } from '../hooks/useGroups';
import { useExpenses } from '../hooks/useExpenses';
import { formatCurrency, getInitials, getAvatarColor, MOCK_FRIENDS } from '../utils/helpers';
import AddExpenseModal from '../components/AddExpenseModal';
import { MOCK_GROUPS } from '../utils/helpers';

const GroupPage = () => {
  const { groupId } = useParams();
  const { data: group, isLoading } = useGroup(groupId);
  const { data: expenses = [] } = useExpenses(groupId);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showList, setShowList] = useState(false);

  // Groups list view
  if (!groupId) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Groups</h1>
            <p className="text-muted-foreground">Manage your shared expense groups</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_GROUPS.map((g) => (
            <Link key={g.id} to={`/groups/${g.id}`} className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow">
              <div className="text-3xl mb-3">{g.emoji}</div>
              <h3 className="font-semibold text-foreground mb-1">{g.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{g.members.length} members</p>
              <p className="text-sm font-medium text-primary">{formatCurrency(g.totalExpenses)} total</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-muted rounded-xl animate-pulse-soft" />
        ))}
      </div>
    );
  }

  if (!group) return <div className="text-center py-20 text-muted-foreground">Group not found</div>;

  // Fake balances
  const balances = group.members.filter(m => m !== 'Alex Johnson').map((m, i) => ({
    name: m,
    amount: [40, -28.50, 1125, -16.25][i] || 0,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Link to="/groups" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> All Groups
      </Link>

      <div className="bg-card rounded-xl p-6 shadow-card border border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{group.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{group.name}</h1>
              <p className="text-muted-foreground">{group.members.length} members · {formatCurrency(group.totalExpenses)} total</p>
            </div>
          </div>
          <button onClick={() => setShowExpenseModal(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Members */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Members</h3>
          <div className="space-y-3">
            {group.members.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground ${getAvatarColor(m)}`}>
                  {getInitials(m)}
                </div>
                <span className="text-sm text-foreground">{m}{m === 'Alex Johnson' ? ' (You)' : ''}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Balances */}
        <div className="lg:col-span-2 bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Group Balances</h3>
          <div className="space-y-3">
            {balances.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground ${getAvatarColor(b.name)}`}>
                    {getInitials(b.name)}
                  </div>
                  <span className="text-sm text-foreground">{b.name}</span>
                </div>
                <span className={`text-sm font-semibold ${b.amount > 0 ? 'text-success' : 'text-accent'}`}>
                  {b.amount > 0 ? `owes you ${formatCurrency(b.amount)}` : `you owe ${formatCurrency(Math.abs(b.amount))}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-card rounded-xl p-5 shadow-card border border-border">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Receipt className="w-4 h-4" /> Expenses</h3>
        {expenses.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No expenses yet. Add one to get started!</p>
        ) : (
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{exp.description}</p>
                  <p className="text-xs text-muted-foreground">{exp.paidBy} paid · {new Date(exp.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatCurrency(exp.amount)}</p>
                  <p className={`text-xs ${exp.youPaid ? 'text-success' : 'text-accent'}`}>
                    {exp.youPaid ? `You lent ${formatCurrency(exp.amount - exp.yourShare)}` : `You owe ${formatCurrency(exp.yourShare)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddExpenseModal open={showExpenseModal} onClose={() => setShowExpenseModal(false)} groupId={groupId} />
    </div>
  );
};

export default GroupPage;
