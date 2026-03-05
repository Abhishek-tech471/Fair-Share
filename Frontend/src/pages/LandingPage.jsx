import { Link } from 'react-router-dom';
import { ArrowRight, Users, Receipt, PieChart, CheckCircle, Zap, Shield, Smartphone } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

const LandingPage = () => {
  const steps = [
    { icon: Users, title: 'Create a group', desc: 'Add your friends, roommates, or travel buddies' },
    { icon: Receipt, title: 'Add shared expenses', desc: 'Log bills as they happen — dinner, rent, tickets' },
    { icon: PieChart, title: 'Split bills automatically', desc: 'Equal, percentage, or exact amounts — your call' },
    { icon: CheckCircle, title: 'Settle up easily', desc: 'See simplified debts and pay with one tap' },
  ];

  const features = [
    { icon: Zap, title: 'Instant Splitting', desc: 'Split any expense in seconds with smart calculations' },
    { icon: Shield, title: 'Debt Simplification', desc: 'Minimize transactions with our smart algorithm' },
    { icon: PieChart, title: 'Spending Analytics', desc: 'Track where your money goes with beautiful charts' },
    { icon: Smartphone, title: 'Works Everywhere', desc: 'Fully responsive — use on any device, anywhere' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-foreground">FairShare</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="px-5 py-2.5 text-sm font-semibold rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" /> Smart expense splitting
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Split expenses with friends{' '}
              <span className="gradient-text">without the awkward math.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Track shared expenses, simplify debts, and settle up — all in one beautiful app. No more spreadsheets or awkward Venmo requests.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-elevated">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors">
                Log In
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Free forever</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> No credit card</span>
            </div>
          </div>
          <div className="animate-scale-in">
            <img src={heroImage} alt="Friends splitting expenses on their phones" className="rounded-2xl shadow-elevated w-full" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground">Four simple steps to fair expense splitting</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-card text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-3">Why FairShare?</h2>
          <p className="text-muted-foreground">Everything you need for hassle-free expense sharing</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 p-6 rounded-xl border border-border hover:shadow-elevated transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center gradient-primary rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to split fairly?</h2>
          <p className="text-primary-foreground/80 mb-8">Join thousands who've said goodbye to awkward money conversations.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-card text-foreground font-semibold hover:bg-card/90 transition-colors shadow-elevated">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">F</span>
            </div>
            <span className="font-semibold text-foreground">FairShare</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 FairShare. Split fairly, stay friends.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
