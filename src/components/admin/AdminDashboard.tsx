import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  Clock,
  Filter,
  Download
} from "lucide-react";
import { fetchLeads, SubmissionData } from "../../services/sheets";
import { cn } from "../../lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const SIDEBAR_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "leads", label: "Patient Leads", icon: Users },
  { id: "chats", label: "Chat Logs", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Total Leads", value: leads.length, change: "+12.5%", trendingUp: true, icon: Users, color: "bg-blue-500" },
    { label: "Scheduled", value: Math.floor(leads.length * 0.7), change: "+8.2%", trendingUp: true, icon: Calendar, color: "bg-purple-500" },
    { label: "Conversion", value: "64%", change: "-2.1%", trendingUp: false, icon: BarChart3, color: "bg-emerald-500" },
    { label: "AI Interactions", value: "1,284", change: "+42%", trendingUp: true, icon: MessageSquare, color: "bg-orange-500" },
  ];

  const chartData = [
    { name: "Mon", leads: 4, appt: 2 },
    { name: "Tue", leads: 7, appt: 5 },
    { name: "Wed", leads: 5, appt: 4 },
    { name: "Thu", leads: 12, appt: 8 },
    { name: "Fri", leads: 9, appt: 7 },
    { name: "Sat", leads: 15, appt: 10 },
    { name: "Sun", leads: 10, appt: 6 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <BarChart3 size={18} />
          </div>
          <span className="font-black font-display text-lg tracking-tighter">MedivaAdmin</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-600 bg-slate-50 rounded-lg"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-[80] transition-transform duration-300 md:translate-x-0 md:static md:z-50",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 hidden md:flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <BarChart3 size={18} />
          </div>
          <span className="font-black font-display text-xl tracking-tighter">
            Mediva<span className="text-primary italic">Admin</span>
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4 md:mt-0">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                activeTab === item.id 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon size={20} className={cn("transition-colors", activeTab === item.id ? "text-primary" : "group-hover:text-primary")} />
              {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="activePill" className="ml-auto w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-950 p-4 rounded-2xl text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">System Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold">API Stable</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900">
              {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">Welcome back to your healthcare dashboard.</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
            <div className="relative min-w-[200px] sm:min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:border-primary transition-all w-full sm:w-64"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-primary transition-colors relative shrink-0">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-900 overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img src="https://i.pravatar.cc/100?u=admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-2xl text-white shadow-lg", stat.color)}>
                      <stat.icon size={20} />
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full",
                      stat.trendingUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {stat.trendingUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Analytics Chart */}
              <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-lg">Lead Generation Trend</h3>
                    <p className="text-xs text-slate-500">Visualizing patient acquisition per day</p>
                  </div>
                  <select className="bg-slate-50 border-none rounded-lg px-3 py-1.5 text-xs font-bold outline-none">
                    <option>Last 7 Days</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="leads" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Source Distribution */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                <h3 className="font-bold text-lg mb-8">Acquisition Source</h3>
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  {[
                    { label: "Direct Website", value: 45, color: "bg-blue-500" },
                    { label: "AI Assistant", value: 32, color: "bg-purple-500" },
                    { label: "WhatsApp Chat", value: 18, color: "bg-emerald-500" },
                    { label: "Referrals", value: 5, color: "bg-slate-300" },
                  ].map(source => (
                    <div key={source.label} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{source.label}</span>
                        <span>{source.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${source.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn("h-full rounded-full", source.color)} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Leads Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 flex items-center justify-between border-b border-slate-100">
                <h3 className="font-bold text-lg">Recent Patient Leads</h3>
                <div className="flex gap-2">
                  <button onClick={loadData} disabled={loading} className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                    <Download size={14} /> Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-8 py-4">Patient</th>
                      <th className="px-8 py-4">Phone</th>
                      <th className="px-8 py-4">Concern</th>
                      <th className="px-8 py-4">Schedule</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      [...Array(3)].map((_, i) => (
                        <tr key={i}>
                          <td colSpan={6} className="px-8 py-4 animate-pulse">
                            <div className="h-4 bg-slate-100 rounded w-full" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase())).map((lead, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-all">
                          <td className="px-8 py-6">
                            <div className="font-bold text-sm text-slate-900">{lead.name}</div>
                            <div className="text-[10px] text-slate-400">{new Date(lead.timestamp).toLocaleDateString()}</div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-600 font-medium">{lead.phone}</td>
                          <td className="px-8 py-6">
                            <div className="text-sm text-slate-600 max-w-[200px] truncate">{lead.problem}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                              <Calendar size={14} className="text-primary" />
                              {lead.appointmenttime}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              i % 3 === 0 ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                            )}>
                              {i % 3 === 0 ? "Pending" : "Contacted"}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="p-2 text-slate-400 hover:text-primary transition-all">
                              <ChevronRight size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs as placeholders */}
        {activeTab !== "overview" && (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold">Module Under Construction</h3>
            <p className="text-slate-500 max-w-xs">We're building this feature to perfection. Check back soon for deeper {activeTab} insights.</p>
          </div>
        )}
      </main>
    </div>
  );
}
