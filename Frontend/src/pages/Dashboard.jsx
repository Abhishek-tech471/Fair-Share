import { TrendingUp, TrendingDown, Wallet, Plus, Users, ArrowRightLeft, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, MOCK_EXPENSES, MOCK_ACTIVITIES, MOCK_MONTHLY_SPENDING, MOCK_GROUP_SPENDING, formatRelativeTime } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import AddExpenseModal from '../components/AddExpenseModal';
import CreateGroupModal from '../components/CreateGroupModal';
import SettlementModal from '../components/SettlementModal';

const Dashboard = () => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);

  const totalOwed = 2237.50;
  const totalOwe = 60.75;
  const netBalance = totalOwed - totalOwe;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview at a glance</p>
      </div>

      {/* Balance Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total Balance</span>
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(netBalance)}</p>
          <p className="text-xs text-primary mt-1">Net positive</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">You are owed</span>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <p className="text-2xl font-bold text-success">{formatCurrency(totalOwed)}</p>
          <p className="text-xs text-muted-foreground mt-1">From 4 people</p>
        </div>
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">You owe</span>
            <TrendingDown className="w-5 h-5 text-accent" />
          </div>
          <p className="text-2xl font-bold text-accent">{formatCurrency(totalOwe)}</p>
          <p className="text-xs text-muted-foreground mt-1">To 3 people</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setShowExpenseModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Expense
        </button>
        <button onClick={() => setShowGroupModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
          <Users className="w-4 h-4" /> Create Group
        </button>
        <button onClick={() => setShowSettleModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
          <ArrowRightLeft className="w-4 h-4" /> Settle Up
        </button>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_MONTHLY_SPENDING}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(160, 10%, 45%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(160, 10%, 45%)' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(140, 15%, 90%)', fontSize: '13px' }} />
              <Bar dataKey="amount" fill="hsl(160, 84%, 28%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Spending by Group</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={MOCK_GROUP_SPENDING} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={4}>
                {MOCK_GROUP_SPENDING.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(140, 15%, 90%)', fontSize: '13px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {MOCK_GROUP_SPENDING.map((g, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: g.fill }} />
                {g.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Expenses & Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Expenses</h3>
            <Link to="/groups" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {MOCK_EXPENSES.slice(0, 4).map((exp) => (
              <div key={exp.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{exp.description}</p>
                    <p className="text-xs text-muted-foreground">{exp.groupName}</p>
                  </div>
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
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <Link to="/activity" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {MOCK_ACTIVITIES.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${act.type === 'expense' ? 'bg-primary' : act.type === 'settlement' ? 'bg-accent' : 'bg-info'}`} />
                <div>
                  <p className="text-sm text-foreground">{act.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatRelativeTime(act.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddExpenseModal open={showExpenseModal} onClose={() => setShowExpenseModal(false)} />
      <CreateGroupModal open={showGroupModal} onClose={() => setShowGroupModal(false)} />
      <SettlementModal open={showSettleModal} onClose={() => setShowSettleModal(false)} />
    </div>
  );
};

export default Dashboard;
