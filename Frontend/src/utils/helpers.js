export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export const formatRelativeTime = (date) => {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getAvatarColor = (name) => {
  const colors = [
    'bg-primary', 'bg-accent', 'bg-info', 'bg-warning',
    'bg-success', 'bg-destructive',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Mock data
export const MOCK_GROUPS = [
  { id: '1', name: 'Roommates', emoji: '🏠', members: ['Alex Johnson', 'Sarah Chen', 'Mike Peters'], totalExpenses: 2450.00, createdAt: '2025-12-01' },
  { id: '2', name: 'Trip to Goa', emoji: '🏖️', members: ['Alex Johnson', 'Priya Sharma', 'Raj Kumar', 'Lisa Wong'], totalExpenses: 8200.00, createdAt: '2026-01-15' },
  { id: '3', name: 'Office Lunch', emoji: '🍕', members: ['Alex Johnson', 'Tom Davis', 'Emma Wilson'], totalExpenses: 890.50, createdAt: '2026-02-10' },
];

export const MOCK_EXPENSES = [
  { id: '1', description: 'Dinner at Italian Place', amount: 120.00, paidBy: 'Alex Johnson', groupId: '1', groupName: 'Roommates', date: '2026-03-04', participants: ['Alex Johnson', 'Sarah Chen', 'Mike Peters'], splitMethod: 'equal', yourShare: 40.00, youPaid: true },
  { id: '2', description: 'Groceries', amount: 85.50, paidBy: 'Sarah Chen', groupId: '1', groupName: 'Roommates', date: '2026-03-03', participants: ['Alex Johnson', 'Sarah Chen', 'Mike Peters'], splitMethod: 'equal', yourShare: 28.50, youPaid: false },
  { id: '3', description: 'Hotel Booking', amount: 4500.00, paidBy: 'Alex Johnson', groupId: '2', groupName: 'Trip to Goa', date: '2026-02-28', participants: ['Alex Johnson', 'Priya Sharma', 'Raj Kumar', 'Lisa Wong'], splitMethod: 'equal', yourShare: 1125.00, youPaid: true },
  { id: '4', description: 'Taxi to Airport', amount: 65.00, paidBy: 'Raj Kumar', groupId: '2', groupName: 'Trip to Goa', date: '2026-02-27', participants: ['Alex Johnson', 'Priya Sharma', 'Raj Kumar', 'Lisa Wong'], splitMethod: 'equal', yourShare: 16.25, youPaid: false },
  { id: '5', description: 'Pizza Order', amount: 48.00, paidBy: 'Tom Davis', groupId: '3', groupName: 'Office Lunch', date: '2026-03-01', participants: ['Alex Johnson', 'Tom Davis', 'Emma Wilson'], splitMethod: 'equal', yourShare: 16.00, youPaid: false },
  { id: '6', description: 'Coffee Run', amount: 22.50, paidBy: 'Alex Johnson', groupId: '3', groupName: 'Office Lunch', date: '2026-02-28', participants: ['Alex Johnson', 'Tom Davis', 'Emma Wilson'], splitMethod: 'equal', yourShare: 7.50, youPaid: true },
];

export const MOCK_FRIENDS = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', balance: -28.50 },
  { id: '2', name: 'Mike Peters', email: 'mike@example.com', balance: 40.00 },
  { id: '3', name: 'Priya Sharma', email: 'priya@example.com', balance: 1125.00 },
  { id: '4', name: 'Raj Kumar', email: 'raj@example.com', balance: -16.25 },
  { id: '5', name: 'Lisa Wong', email: 'lisa@example.com', balance: 1125.00 },
  { id: '6', name: 'Tom Davis', email: 'tom@example.com', balance: -16.00 },
  { id: '7', name: 'Emma Wilson', email: 'emma@example.com', balance: 7.50 },
];

export const MOCK_ACTIVITIES = [
  { id: '1', type: 'expense', message: 'Alex added "Dinner at Italian Place" in Roommates', amount: 120.00, date: '2026-03-04T18:30:00', user: 'Alex Johnson' },
  { id: '2', type: 'expense', message: 'Sarah added "Groceries" in Roommates', amount: 85.50, date: '2026-03-03T14:20:00', user: 'Sarah Chen' },
  { id: '3', type: 'settlement', message: 'Mike settled $40.00 with Alex', amount: 40.00, date: '2026-03-02T10:15:00', user: 'Mike Peters' },
  { id: '4', type: 'expense', message: 'Alex added "Hotel Booking" in Trip to Goa', amount: 4500.00, date: '2026-02-28T09:00:00', user: 'Alex Johnson' },
  { id: '5', type: 'group', message: 'Alex created group "Office Lunch"', date: '2026-02-10T11:00:00', user: 'Alex Johnson' },
  { id: '6', type: 'expense', message: 'Tom added "Pizza Order" in Office Lunch', amount: 48.00, date: '2026-03-01T12:30:00', user: 'Tom Davis' },
];

export const MOCK_MONTHLY_SPENDING = [
  { month: 'Oct', amount: 320 },
  { month: 'Nov', amount: 580 },
  { month: 'Dec', amount: 890 },
  { month: 'Jan', amount: 420 },
  { month: 'Feb', amount: 1650 },
  { month: 'Mar', amount: 240 },
];

export const MOCK_GROUP_SPENDING = [
  { name: 'Roommates', amount: 2450, fill: 'hsl(160, 84%, 28%)' },
  { name: 'Trip to Goa', amount: 8200, fill: 'hsl(25, 95%, 53%)' },
  { name: 'Office Lunch', amount: 890, fill: 'hsl(210, 92%, 45%)' },
];
