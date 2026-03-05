import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Globe, Bell, Moon, Sun, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currency, setCurrency] = useState('USD');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><User className="w-4 h-4" /> Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <button onClick={handleSave} className="px-5 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      {/* Currency */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><Globe className="w-4 h-4" /> Currency</h3>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}
          className="w-full max-w-xs px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>

      {/* Preferences */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><Bell className="w-4 h-4" /> Preferences</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">Get notified about new expenses and settlements</p>
          </div>
          <button onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${notifications ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
          </div>
          <button onClick={toggleDarkMode}
            className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${darkMode ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Logout */}
      <button onClick={() => { logout(); navigate('/'); }}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-destructive text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors">
        <LogOut className="w-4 h-4" /> Log Out
      </button>
    </div>
  );
};

export default SettingsPage;
