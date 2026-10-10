import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Ellipsis,
  Eye,
  EyeOff,
  LayoutDashboard,
  Lightbulb,
  ListFilter,
  Plus,
  Search,
  Settings,
  Sparkles,
  Tag,
  Trash2,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";

type View = "overview" | "subscriptions" | "calendar" | "insights";
type Category = "Entertainment" | "Work" | "Lifestyle" | "Finance";

type Subscription = {
  id: number;
  name: string;
  category: Category;
  price: number;
  cycle: "Monthly" | "Yearly";
  nextBill: string;
  day: number;
  color: string;
  logo: string;
  status: "active" | "trial";
};

const initialSubscriptions: Subscription[] = [
  { id: 1, name: "Netflix", category: "Entertainment", price: 19.99, cycle: "Monthly", nextBill: "Apr 14", day: 14, color: "#e5484d", logo: "N", status: "active" },
  { id: 2, name: "Notion", category: "Work", price: 10, cycle: "Monthly", nextBill: "Apr 16", day: 16, color: "#f1f0eb", logo: "N", status: "active" },
  { id: 3, name: "Spotify", category: "Entertainment", price: 11.99, cycle: "Monthly", nextBill: "Apr 18", day: 18, color: "#30c974", logo: "S", status: "active" },
  { id: 4, name: "Figma", category: "Work", price: 15, cycle: "Monthly", nextBill: "Apr 21", day: 21, color: "#a682ff", logo: "F", status: "active" },
  { id: 5, name: "Headspace", category: "Lifestyle", price: 69.99, cycle: "Yearly", nextBill: "Apr 25", day: 25, color: "#ef9b73", logo: "H", status: "trial" },
  { id: 6, name: "Dropbox", category: "Work", price: 11.99, cycle: "Monthly", nextBill: "May 02", day: 2, color: "#4f8cff", logo: "D", status: "active" },
];

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "subscriptions", label: "Subscriptions", icon: WalletCards },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "insights", label: "Insights", icon: TrendingUp },
];

function LogoMark() {
  return (
    <div className="logo-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function Money({ value, compact = false }: { value: number; compact?: boolean }) {
  return (
    <span>
      <span className="currency">$</span>
      {value.toLocaleString("en-US", {
        minimumFractionDigits: compact ? 0 : 2,
        maximumFractionDigits: compact ? 0 : 2,
      })}
    </span>
  );
}

function ServiceLogo({ subscription, small = false }: { subscription: Subscription; small?: boolean }) {
  return (
    <div
      className={`service-logo ${small ? "service-logo--small" : ""}`}
      style={{ "--logo-color": subscription.color } as React.CSSProperties}
    >
      {subscription.logo}
    </div>
  );
}

function MiniTrend({ up = true }: { up?: boolean }) {
  return (
    <span className={`trend ${up ? "trend--up" : "trend--down"}`}>
      {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
      {up ? "4.6%" : "8.2%"}
    </span>
  );
}

function Header({
  title,
  onAdd,
  onSearch,
}: {
  title: string;
  onAdd: () => void;
  onSearch: (value: string) => void;
}) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">APRIL 2025 · PERSONAL</p>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <label className="searchbox">
          <Search size={17} />
          <input aria-label="Search subscriptions" placeholder="Search anything" onChange={(event) => onSearch(event.target.value)} />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification" aria-label="Notifications">
          <Bell size={18} />
          <span />
        </button>
        <button className="primary-button" onClick={onAdd}>
          <Plus size={17} />
          Add subscription
        </button>
      </div>
    </header>
  );
}

function Sidebar({ view, onView }: { view: View; onView: (view: View) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <LogoMark />
        <span>subtracker</span>
      </div>
      <nav>
        <p className="nav-label">WORKSPACE</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${view === item.id ? "nav-item--active" : ""}`}
              onClick={() => onView(item.id)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
              {item.id === "subscriptions" && <em>12</em>}
            </button>
          );
        })}
        <p className="nav-label nav-label--second">MANAGE</p>
        <button className="nav-item">
          <CreditCard size={18} strokeWidth={1.8} />
          <span>Payment methods</span>
        </button>
        <button className="nav-item">
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </button>
      </nav>
      <div className="sidebar-bottom">
        <div className="budget-mini">
          <div className="budget-mini__top">
            <span>Monthly budget</span>
            <span>72%</span>
          </div>
          <div className="progress"><i /></div>
          <p><b>$358.40</b> of $500</p>
        </div>
        <button className="profile">
          <span className="avatar">AM</span>
          <span><b>Alex Morgan</b><small>alex@studio.co</small></span>
          <Ellipsis size={18} />
        </button>
      </div>
    </aside>
  );
}

function SpendingChart() {
  const bars = [34, 48, 43, 58, 66, 55, 78, 70, 84, 75, 92, 82];
  return (
    <div className="chart-wrap">
      <div className="chart-grid"><span>$400</span><span>$300</span><span>$200</span><span>$100</span></div>
      <div className="bars">
        {bars.map((height, index) => (
          <div className="bar-slot" key={index}>
            <i className={index === 11 ? "current" : ""} style={{ height: `${height}%` }} />
          </div>
        ))}
      </div>
      <div className="chart-months"><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span><span>Jan</span><span>Mar</span></div>
      <div className="chart-tip"><small>MAR 2025</small><b>$358.40</b><span>12 subscriptions</span></div>
    </div>
  );
}

function Overview({
  subscriptions,
  onViewAll,
  hidden,
  setHidden,
}: {
  subscriptions: Subscription[];
  onViewAll: () => void;
  hidden: boolean;
  setHidden: (value: boolean) => void;
}) {
  return (
    <div className="view-stack">
      <section className="metrics">
        <article className="metric metric--featured">
          <div className="metric-icon"><WalletCards size={19} /></div>
          <div className="metric-copy">
            <span>Monthly spend</span>
            <strong>{hidden ? "••••••" : <Money value={358.4} />}</strong>
            <p><MiniTrend /> <span>vs. last month</span></p>
          </div>
          <button className="reveal" onClick={() => setHidden(!hidden)} aria-label="Toggle balance visibility">
            {hidden ? <Eye size={17} /> : <EyeOff size={17} />}
          </button>
        </article>
        <article className="metric">
          <div className="metric-icon metric-icon--blue"><CalendarDays size={19} /></div>
          <div className="metric-copy">
            <span>Yearly projection</span>
            <strong>{hidden ? "••••••" : <Money value={4300.8} />}</strong>
            <p><MiniTrend /> <span>based on current plans</span></p>
          </div>
        </article>
        <article className="metric">
          <div className="metric-icon metric-icon--orange"><CreditCard size={19} /></div>
          <div className="metric-copy">
            <span>Active subscriptions</span>
            <strong>12</strong>
            <p><span className="neutral-trend">+2</span> <span>in the last 30 days</span></p>
          </div>
        </article>
      </section>

      <section className="overview-grid">
        <article className="panel spending-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">SPENDING PULSE</span><h2>Your year in motion</h2></div>
            <button className="period-button">Last 12 months <ChevronDown size={14} /></button>
          </div>
          <SpendingChart />
        </article>
        <article className="panel category-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">BREAKDOWN</span><h2>By category</h2></div>
            <button className="icon-button"><Ellipsis size={18} /></button>
          </div>
          <div className="donut-area">
            <div className="donut"><span><b>$358</b><small>per month</small></span></div>
          </div>
          <div className="legend">
            <div><i className="dot dot--green" /><span>Work</span><b>$144.00</b><small>40%</small></div>
            <div><i className="dot dot--purple" /><span>Entertainment</span><b>$107.50</b><small>30%</small></div>
            <div><i className="dot dot--blue" /><span>Lifestyle</span><b>$71.70</b><small>20%</small></div>
            <div><i className="dot dot--orange" /><span>Other</span><b>$35.20</b><small>10%</small></div>
          </div>
        </article>
      </section>

      <section className="panel bills-panel">
        <div className="panel-heading">
          <div><span className="section-kicker">UP NEXT</span><h2>Upcoming bills</h2></div>
          <button className="text-button" onClick={onViewAll}>View all <ArrowUpRight size={15} /></button>
        </div>
        <div className="bill-list">
          {subscriptions.slice(0, 4).map((sub) => (
            <div className="bill-row" key={sub.id}>
              <ServiceLogo subscription={sub} />
              <div className="bill-name"><b>{sub.name}</b><span>{sub.category}</span></div>
              <span className="bill-date">{sub.nextBill}</span>
              <span className="cycle">{sub.cycle}</span>
              <strong><Money value={sub.price} /></strong>
              <button className="icon-button"><Ellipsis size={17} /></button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SubscriptionsView({
  subscriptions,
  query,
  onDelete,
}: {
  subscriptions: Subscription[];
  query: string;
  onDelete: (id: number) => void;
}) {
  const [category, setCategory] = useState("All");
  const filtered = subscriptions.filter(
    (sub) =>
      (category === "All" || sub.category === category) &&
      sub.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="view-stack">
      <section className="library-summary">
        <div><span>12</span><p>active services</p></div>
        <div><span>$358.40</span><p>monthly total</p></div>
        <div><span>$52.00</span><p>potential savings</p></div>
        <div className="summary-note"><Sparkles size={18} /><p>3 plans have better annual pricing</p></div>
      </section>
      <section className="panel subscription-panel">
        <div className="filter-row">
          <div className="filter-tabs">
            {["All", "Work", "Entertainment", "Lifestyle"].map((item) => (
              <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <button className="period-button"><ListFilter size={15} /> Filters</button>
        </div>
        <div className="subscription-head">
          <span>SUBSCRIPTION</span><span>NEXT BILL</span><span>BILLING</span><span>AMOUNT</span><span />
        </div>
        <div className="subscription-list">
          {filtered.map((sub) => (
            <div className="subscription-row" key={sub.id}>
              <div className="subscription-name">
                <ServiceLogo subscription={sub} />
                <span><b>{sub.name}</b><small><i className={`status-dot ${sub.status}`} />{sub.status === "trial" ? "Trial ends soon" : sub.category}</small></span>
              </div>
              <div className="date-cell"><b>{sub.nextBill.split(" ")[1]}</b><span>{sub.nextBill.split(" ")[0]}</span></div>
              <span className="cycle">{sub.cycle}</span>
              <strong><Money value={sub.price} /><small> / {sub.cycle === "Monthly" ? "mo" : "yr"}</small></strong>
              <button className="delete-button" onClick={() => onDelete(sub.id)} aria-label={`Delete ${sub.name}`}><Trash2 size={16} /></button>
            </div>
          ))}
          {!filtered.length && <div className="empty-state">No subscriptions match your search.</div>}
        </div>
      </section>
    </div>
  );
}

function CalendarView({ subscriptions }: { subscriptions: Subscription[] }) {
  const [monthShift, setMonthShift] = useState(0);
  const months = ["April 2025", "May 2025"];
  const days = Array.from({ length: 35 }, (_, index) => index - 1);
  const total = subscriptions.reduce((sum, sub) => sum + (sub.day <= 28 ? sub.price : 0), 0);
  return (
    <div className="calendar-layout">
      <section className="panel calendar-panel">
        <div className="calendar-toolbar">
          <div><span className="section-kicker">BILLING SCHEDULE</span><h2>{months[monthShift]}</h2></div>
          <div className="month-controls">
            <button className="icon-button" onClick={() => setMonthShift(0)}><ChevronLeft size={18} /></button>
            <button className="today-button" onClick={() => setMonthShift(0)}>Today</button>
            <button className="icon-button" onClick={() => setMonthShift(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="weekdays">{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="calendar-grid">
          {days.map((day, index) => {
            const actualDay = monthShift ? day : day;
            const bills = monthShift === 0 ? subscriptions.filter((sub) => sub.day === actualDay) : subscriptions.filter((sub) => sub.name === "Dropbox" && actualDay === 2);
            return (
              <div key={index} className={`${day < 1 ? "muted-day" : ""} ${day === 11 && monthShift === 0 ? "today" : ""}`}>
                {day > 0 && <span>{day}</span>}
                {bills.map((sub) => <div className="calendar-bill" key={sub.id}><ServiceLogo subscription={sub} small /><b>{sub.name}</b><small>${sub.price}</small></div>)}
              </div>
            );
          })}
        </div>
      </section>
      <aside className="calendar-aside">
        <article className="panel due-card">
          <span className="section-kicker">THIS MONTH</span>
          <strong><Money value={monthShift ? 11.99 : total} /></strong>
          <p>{monthShift ? "1 payment" : "5 payments"} scheduled</p>
          <div className="due-progress"><i /></div>
          <small>$127.97 already paid</small>
        </article>
        <article className="panel next-card">
          <div className="panel-heading"><h3>Next payment</h3><span>IN 3 DAYS</span></div>
          <ServiceLogo subscription={subscriptions[0]} />
          <div><b>{subscriptions[0]?.name}</b><span>Monday, April 14</span></div>
          <strong><Money value={subscriptions[0]?.price || 0} /></strong>
        </article>
        <article className="tip-card">
          <div><Lightbulb size={18} /></div>
          <span><b>Cash flow tip</b><p>Most of your bills land in the second half of the month.</p></span>
        </article>
      </aside>
    </div>
  );
}

function InsightsView() {
  const [range, setRange] = useState("6M");
  return (
    <div className="view-stack">
      <section className="insight-hero">
        <div>
          <span className="section-kicker">SMART INSIGHT · APRIL</span>
          <h2>You could save <em>$624</em> this year.</h2>
          <p>We found three quick changes that lower your spend without changing the services you love.</p>
          <button className="light-button">See recommendations <ArrowUpRight size={16} /></button>
        </div>
        <div className="orbit" aria-hidden="true"><span>$52<small>/ mo</small></span><i /><i /><i /></div>
      </section>
      <section className="insights-grid">
        <article className="panel trends-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">TREND</span><h2>Spending velocity</h2></div>
            <div className="range-toggle">{["1M", "6M", "1Y"].map((item) => <button className={range === item ? "active" : ""} onClick={() => setRange(item)} key={item}>{item}</button>)}</div>
          </div>
          <div className="line-chart">
            <div className="line-labels"><span>$400</span><span>$300</span><span>$200</span></div>
            <svg viewBox="0 0 600 190" preserveAspectRatio="none">
              <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d8ff67" stopOpacity=".3" /><stop offset="100%" stopColor="#d8ff67" stopOpacity="0" /></linearGradient></defs>
              <path className="area" d="M0,145 C70,130 90,100 150,112 S240,55 300,80 S390,135 450,92 S530,30 600,42 L600,190 L0,190 Z" />
              <path className="line" d="M0,145 C70,130 90,100 150,112 S240,55 300,80 S390,135 450,92 S530,30 600,42" />
              <circle cx="600" cy="42" r="6" />
            </svg>
            <div className="line-months"><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span></div>
          </div>
        </article>
        <article className="panel health-card">
          <span className="section-kicker">SUBSCRIPTION HEALTH</span>
          <div className="health-score"><span>84</span><small>/ 100</small></div>
          <h3>Looking healthy</h3>
          <p>Your subscriptions are well balanced. Two small optimizations can make them excellent.</p>
          <div className="health-tags"><span><Check size={13} /> No duplicates</span><span><Check size={13} /> Within budget</span></div>
        </article>
      </section>
      <section className="recommendations">
        <div className="section-heading"><div><span className="section-kicker">OPPORTUNITIES</span><h2>Make your money work harder</h2></div><span>3 recommendations</span></div>
        <div className="recommendation-grid">
          <article className="recommendation"><span className="rec-index">01</span><div className="rec-icon"><CalendarDays size={20} /></div><h3>Switch to annual</h3><p>Save 20% on Figma by changing your billing cycle.</p><div><b>Save $36/year</b><button>Review <ArrowUpRight size={14} /></button></div></article>
          <article className="recommendation"><span className="rec-index">02</span><div className="rec-icon rec-icon--purple"><Tag size={20} /></div><h3>Bundle your music</h3><p>Your mobile plan includes a discounted Spotify bundle.</p><div><b>Save $72/year</b><button>Review <ArrowUpRight size={14} /></button></div></article>
          <article className="recommendation"><span className="rec-index">03</span><div className="rec-icon rec-icon--orange"><CircleHelp size={20} /></div><h3>Unused recently?</h3><p>You haven't opened Headspace in over 45 days.</p><div><b>Save $70/year</b><button>Review <ArrowUpRight size={14} /></button></div></article>
        </div>
      </section>
    </div>
  );
}

function AddModal({ onClose, onAdd }: { onClose: () => void; onAdd: (subscription: Subscription) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("Work");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name || !price) return;
    onAdd({
      id: Date.now(), name, category, price: Number(price), cycle: "Monthly",
      nextBill: "May 08", day: 8, color: "#d8ff67", logo: name[0].toUpperCase(), status: "active",
    });
  }
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form className="modal" onSubmit={submit} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div><span className="section-kicker">NEW RECURRING PAYMENT</span><h2>Add subscription</h2></div>
          <button type="button" className="icon-button" onClick={onClose}><X size={19} /></button>
        </div>
        <label>Service name<input autoFocus placeholder="e.g. Linear" value={name} onChange={(event) => setName(event.target.value)} /></label>
        <div className="form-row">
          <label>Monthly price<div className="input-money"><span>$</span><input type="number" min="0" step="0.01" placeholder="0.00" value={price} onChange={(event) => setPrice(event.target.value)} /></div></label>
          <label>Category<select value={category} onChange={(event) => setCategory(event.target.value as Category)}><option>Work</option><option>Entertainment</option><option>Lifestyle</option><option>Finance</option></select></label>
        </div>
        <div className="modal-preview"><div className="preview-logo">{name ? name[0].toUpperCase() : "?"}</div><span><b>{name || "Your service"}</b><small>Renews May 08</small></span><strong>${price || "0.00"}</strong></div>
        <button className="primary-button modal-submit" type="submit"><Plus size={17} /> Add to SubTracker</button>
      </form>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>("overview");
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [toast, setToast] = useState("");
  const title = useMemo(() => navItems.find((item) => item.id === view)?.label || "Overview", [view]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function addSubscription(subscription: Subscription) {
    setSubscriptions((current) => [subscription, ...current]);
    setModalOpen(false);
    setView("subscriptions");
    showToast(`${subscription.name} added to your subscriptions`);
  }

  function deleteSubscription(id: number) {
    const target = subscriptions.find((sub) => sub.id === id);
    setSubscriptions((current) => current.filter((sub) => sub.id !== id));
    showToast(`${target?.name || "Subscription"} removed`);
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <Sidebar view={view} onView={setView} />
      <main>
        <Header title={title} onAdd={() => setModalOpen(true)} onSearch={(value) => { setQuery(value); if (value) setView("subscriptions"); }} />
        <div className="content">
          {view === "overview" && <Overview subscriptions={subscriptions} onViewAll={() => setView("subscriptions")} hidden={hidden} setHidden={setHidden} />}
          {view === "subscriptions" && <SubscriptionsView subscriptions={subscriptions} query={query} onDelete={deleteSubscription} />}
          {view === "calendar" && <CalendarView subscriptions={subscriptions} />}
          {view === "insights" && <InsightsView />}
        </div>
      </main>
      <button className="mobile-add" onClick={() => setModalOpen(true)}><Plus size={22} /></button>
      {modalOpen && <AddModal onClose={() => setModalOpen(false)} onAdd={addSubscription} />}
      {toast && <div className="toast"><span><Check size={15} /></span>{toast}</div>}
    </div>
  );
}
