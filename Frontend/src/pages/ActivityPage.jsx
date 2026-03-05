import { MOCK_ACTIVITIES, formatRelativeTime, formatCurrency } from '../utils/helpers';
import { Receipt, ArrowRightLeft, Users } from 'lucide-react';

const iconMap = {
  expense: Receipt,
  settlement: ArrowRightLeft,
  group: Users,
};

const colorMap = {
  expense: 'bg-primary/10 text-primary',
  settlement: 'bg-accent/10 text-accent',
  group: 'bg-info/10 text-info',
};

const ActivityPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity</h1>
        <p className="text-muted-foreground">Everything that's happened across your groups</p>
      </div>

      <div className="bg-card rounded-xl shadow-card border border-border">
        {MOCK_ACTIVITIES.map((act, i) => {
          const Icon = iconMap[act.type] || Receipt;
          return (
            <div key={act.id} className={`flex items-start gap-4 p-4 ${i < MOCK_ACTIVITIES.length - 1 ? 'border-b border-border' : ''}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[act.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{act.message}</p>
                {act.amount && <p className="text-xs font-medium text-primary mt-0.5">{formatCurrency(act.amount)}</p>}
                <p className="text-xs text-muted-foreground mt-1">{formatRelativeTime(act.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityPage;
