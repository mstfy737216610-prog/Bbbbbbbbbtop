import React, { useState, useEffect } from 'react';
import PlusTelegramSimulator from './components/PlusTelegramSimulator';
import SettingsTab from './components/SettingsTab';
import { 
  Bot, 
  Server, 
  Globe, 
  CreditCard, 
  Key, 
  Radio, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Copy, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  Sliders, 
  Layers, 
  Smartphone, 
  Send, 
  PhoneCall, 
  ExternalLink, 
  Check, 
  X,
  FileCode,
  Zap,
  ShoppingBag,
  Sparkles,
  MessageSquare,
  Lock,
  Unlock,
  Users,
  Clock,
  ArrowRight,
  Share2,
  TrendingUp,
  Cpu,
  Database,
  Search,
  CheckCheck
} from 'lucide-react';

interface CustomServer {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  apiType: '5sim' | 'stubs' | 'sms-man' | 'vak' | 'custom-json';
  profitMargin: number;
  currency: string;
  isActive: boolean;
  notes?: string;
  liveBalance?: number | null;
  lastChecked?: string;
}

interface TelegramChannel {
  id: string;
  title: string;
  username: string;
  url: string;
  description: string;
  isMandatory: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  arabicName: string;
  accountNumber: string;
  accountHolder: string;
  instructions: string;
  icon: string;
  isActive: boolean;
}

interface RechargeCard {
  id: string;
  code: string;
  amount: number;
  createdBy: string;
  isUsed: boolean;
  createdAt: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'simulator' | 'texts-cms' | 'payments' | 'servers' | 'prices' | 'cards' | 'channels' | 'bot-code' | 'dashboard'
  >('simulator');

  // Servers State
  const [servers, setServers] = useState<CustomServer[]>([]);
  const [loadingServers, setLoadingServers] = useState(false);
  const [serverTestingId, setServerTestingId] = useState<string | null>(null);

  // New Server Modal
  const [isAddingServer, setIsAddingServer] = useState(false);
  const [serverForm, setServerForm] = useState({
    name: '',
    url: '',
    apiKey: '',
    apiType: 'stubs' as CustomServer['apiType'],
    profitMargin: 1.5,
    notes: ''
  });

  // Channels State
  const [channels, setChannels] = useState<TelegramChannel[]>([]);
  const [channelDesc, setChannelDesc] = useState('');
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [channelForm, setChannelForm] = useState({ title: '', username: '', description: '', isMandatory: true });

  // Payment Methods State
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState<string | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    arabicName: '',
    accountNumber: '',
    accountHolder: '',
    instructions: '',
    icon: 'CreditCard'
  });

  // Cards State
  const [cards, setCards] = useState<RechargeCard[]>([]);
  const [cardAmount, setCardAmount] = useState('50');
  const [cardCount, setCardCount] = useState('1');

  // Customer Balance Adjustment
  const [targetUserId, setTargetUserId] = useState('');
  const [adjustAmount, setAdjustAmount] = useState('25');
  const [balanceNote, setBalanceNote] = useState('');

  // Dynamic Country Prices State
  const [customPrices, setCustomPrices] = useState<Record<string, Record<string, { name: string; priceRub: number; costUsd: number }>>>({
    whatsapp: {
      colombia: { name: 'كولومبيا 🇨🇴 (الأرخص)', priceRub: 15.0, costUsd: 0.15 },
      albania: { name: 'ألبانيا 🇦🇱 (ممتاز)', priceRub: 15.0, costUsd: 0.24 },
      angola: { name: 'أنغولا 🇦🇴', priceRub: 18.0, costUsd: 0.32 },
      egypt: { name: 'مصر 🇪🇬', priceRub: 20.0, costUsd: 0.20 },
      argentina: { name: 'الأرجنتين 🇦🇷', priceRub: 16.0, costUsd: 0.25 },
      ukraine: { name: 'أوكرانيا 🇺🇦', priceRub: 16.0, costUsd: 0.25 },
      indonesia: { name: 'إندونيسيا 🇮🇩', priceRub: 10.0, costUsd: 0.12 },
      russia: { name: 'روسيا 🇷🇺', priceRub: 45.0, costUsd: 0.60 }
    },
    telegram: {
      colombia: { name: 'كولومبيا 🇨🇴 ($0.10)', priceRub: 10.0, costUsd: 0.10 },
      egypt: { name: 'مصر 🇪🇬 (3M رقم)', priceRub: 15.0, costUsd: 0.20 },
      angola: { name: 'أنغولا 🇦🇴', priceRub: 12.0, costUsd: 0.22 },
      albania: { name: 'ألبانيا 🇦🇱', priceRub: 18.0, costUsd: 0.30 },
      argentina: { name: 'الأرجنتين 🇦🇷', priceRub: 22.0, costUsd: 0.50 },
      russia: { name: 'روسيا 🇷🇺', priceRub: 15.0, costUsd: 0.25 },
      ukraine: { name: 'أوكرانيا 🇺🇦', priceRub: 16.0, costUsd: 0.25 },
      indonesia: { name: 'إندونيسيا 🇮🇩', priceRub: 12.0, costUsd: 0.15 }
    }
  });

  const [priceForm, setPriceForm] = useState({
    service: 'whatsapp',
    countryCode: '',
    countryName: '',
    priceRub: '15'
  });

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch initial data from server
  const loadData = async () => {
    try {
      setLoadingServers(true);
      const [resServers, resChannels, resPayments, resCards, resPrices] = await Promise.all([
        fetch('/api/store/servers').then(r => r.json()).catch(() => []),
        fetch('/api/store/channels').then(r => r.json()).catch(() => ({ channels: [] })),
        fetch('/api/store/payment-methods').then(r => r.json()).catch(() => []),
        fetch('/api/store/cards').then(r => r.json()).catch(() => []),
        fetch('/api/store/custom-prices').then(r => r.json()).catch(() => null)
      ]);

      if (Array.isArray(resServers)) setServers(resServers);
      if (resChannels && resChannels.channels) {
        setChannels(resChannels.channels);
        setChannelDesc(resChannels.description || '');
      }
      if (Array.isArray(resPayments)) setPayments(resPayments);
      if (Array.isArray(resCards)) setCards(resCards);
      if (resPrices && (resPrices.whatsapp || resPrices.telegram)) {
        setCustomPrices(resPrices);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingServers(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save or update country price
  const handleSavePrice = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!priceForm.countryCode || !priceForm.priceRub) {
      showToast('يرجى إدخال كود الدولة والسعر', 'error');
      return;
    }
    try {
      const res = await fetch('/api/store/custom-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          service: priceForm.service, 
          country: priceForm.countryCode.toLowerCase().trim(), 
          priceRub: parseFloat(priceForm.priceRub) || 15,
          name: priceForm.countryName || priceForm.countryCode.toUpperCase()
        })
      });
      const data = await res.json();
      if (data.success && data.customPrices) {
        setCustomPrices(data.customPrices);
        setPriceForm({ service: 'whatsapp', countryCode: '', countryName: '', priceRub: '15' });
        showToast('✅ تم إضافة وتحديث سعر الدولة في القائمة فورياً!', 'success');
      }
    } catch (e: any) {
      showToast(`خطأ في حفظ السعر: ${e.message}`, 'error');
    }
  };

  // Test live connection to a provider
  const handleTestConnection = async (srv: CustomServer) => {
    setServerTestingId(srv.id);
    try {
      const res = await fetch('/api/providers/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: srv.url,
          apiKey: srv.apiKey,
          apiType: srv.apiType
        })
      });
      const data = await res.json();
      if (data.success) {
        setServers(prev => prev.map(s => s.id === srv.id ? { ...s, liveBalance: data.balance, lastChecked: new Date().toLocaleTimeString('ar-YE') } : s));
        showToast(`✅ تم الاتصال بنجاح! الرصيد الحي لدى المزود: ${data.balance} ${data.currency || '₽'}`, 'success');
      } else {
        showToast(`❌ فشل الاتصال: ${data.message}`, 'error');
      }
    } catch (err: any) {
      showToast(`❌ خطأ في الاتصال: ${err.message}`, 'error');
    } finally {
      setServerTestingId(null);
    }
  };

  // Save new custom server
  const handleAddServer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!serverForm.name || !serverForm.url) {
      showToast('يرجى ملء اسم السيرفر ورابطه', 'error');
      return;
    }
    try {
      const res = await fetch('/api/store/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serverForm)
      });
      const data = await res.json();
      if (data.success) {
        setServers(data.servers);
        setIsAddingServer(false);
        setServerForm({ name: '', url: '', apiKey: '', apiType: 'stubs', profitMargin: 1.5, notes: '' });
        showToast('✅ تم إضافة وربط موقع التوريد الجديد بنجاح!', 'success');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // Update server profit margin
  const handleUpdateMargin = async (id: string, delta: number) => {
    const srv = servers.find(s => s.id === id);
    if (!srv) return;
    const newMargin = Math.max(0, +(srv.profitMargin + delta).toFixed(1));
    const updated = { ...srv, profitMargin: newMargin };
    setServers(prev => prev.map(s => s.id === id ? updated : s));
    await fetch(`/api/store/servers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profitMargin: newMargin })
    });
    showToast(`تم ضبط نسبة الربح إلى ${newMargin} ₽`);
  };

  // Delete server
  const handleDeleteServer = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا السيرفر والموقع؟')) return;
    setServers(prev => prev.filter(s => s.id !== id));
    await fetch(`/api/store/servers/${id}`, { method: 'DELETE' });
    showToast('تم حذف السيرفر بنجاح');
  };

  // Channel Operations
  const handleAddChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelForm.username) return;
    try {
      const res = await fetch('/api/store/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channelForm)
      });
      const data = await res.json();
      if (data.success) {
        setChannels(data.channels);
        setIsAddingChannel(false);
        setChannelForm({ title: '', username: '', description: '', isMandatory: true });
        showToast('✅ تم إضافة القناة بنجاح!', 'success');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleClearAllChannels = async () => {
    if (!confirm('⚠️ تحذير: هل أنت متأكد من حذف كافة القنوات السابقة دفعة واحدة؟')) return;
    try {
      await fetch('/api/store/channels', { method: 'DELETE' });
      setChannels([]);
      showToast('🗑 تم حذف وتصفير جميع القنوات السابقة بنجاح.');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteChannel = async (id: string) => {
    setChannels(prev => prev.filter(c => c.id !== id));
    await fetch(`/api/store/channels/${id}`, { method: 'DELETE' });
    showToast('تم حذف القناة');
  };

  const handleSaveChannelDesc = async () => {
    await fetch('/api/store/channels/description', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: channelDesc })
    });
    showToast('✅ تم حفظ وصف ورسالة القنوات في البوت');
  };

  // Payment Methods Operations
  const handleSavePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.arabicName || !paymentForm.accountNumber) {
      showToast('يرجى إدخال اسم البنك ورقم الحساب', 'error');
      return;
    }
    try {
      const res = await fetch('/api/store/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentForm)
      });
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments);
        setIsAddingPayment(false);
        setEditingPaymentId(null);
        setPaymentForm({ name: '', arabicName: '', accountNumber: '', accountHolder: '', instructions: '', icon: 'CreditCard' });
        showToast('✅ تم حفظ طريقة الشحن والحساب البنكي بنجاح!', 'success');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeletePayment = async (id: string) => {
    if (!confirm('هل ترغب بحذف طريقة الدفع هذه؟')) return;
    setPayments(prev => prev.filter(p => p.id !== id));
    await fetch(`/api/store/payment-methods/${id}`, { method: 'DELETE' });
    showToast('تم حذف طريقة الدفع');
  };

  // Cards Generation
  const handleGenerateCards = async () => {
    const amt = parseFloat(cardAmount) || 50;
    const cnt = parseInt(cardCount) || 1;
    try {
      const res = await fetch('/api/store/cards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt, count: cnt })
      });
      const data = await res.json();
      if (data.success) {
        setCards(data.cards);
        showToast(`🎉 تم توليد ${cnt} كرت شحن بقيمة ${amt} روبل لكل كرت!`, 'success');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  // Adjust User Balance
  const handleAdjustBalance = async (isAdd: boolean) => {
    if (!targetUserId) {
      showToast('يرجى إدخال أيدي العضو', 'error');
      return;
    }
    const amt = parseFloat(adjustAmount) || 0;
    const delta = isAdd ? amt : -amt;
    try {
      const res = await fetch('/api/store/adjust-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: targetUserId, delta })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✅ تم ${isAdd ? 'شحن' : 'خصم'} ${amt} ₽ بنجاح! الرصيد الجديد: ${data.balance} ₽`, 'success');
      }
    } catch (e: any) {
      showToast(`خطأ: ${e.message}`, 'error');
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, label: string = 'النص') => {
    navigator.clipboard.writeText(text);
    showToast(`📋 تم نسخ ${label} بنجاح!`);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl shadow-2xl text-xs md:text-sm font-bold flex items-center gap-3 backdrop-blur-xl border animate-in slide-in-from-top-4 duration-200 ${
          toast.type === 'error' ? 'bg-red-950/90 text-red-200 border-red-800/80 shadow-red-950/50' :
          toast.type === 'info' ? 'bg-blue-950/90 text-blue-200 border-blue-800/80 shadow-blue-950/50' :
          'bg-emerald-950/90 text-emerald-200 border-emerald-800/80 shadow-emerald-950/50'
        }`}>
          {toast.type === 'error' ? <AlertCircle size={20} className="text-red-400" /> : <CheckCircle2 size={20} className="text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Cyber/Fintech Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-xl">
              <Zap size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-white">PLUS SMS HUB</h1>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  متصل حقيقي 5SIM V2.5
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                منظومة إدارة وتوريد الأرقام الافتراضية • التحكم الكامل في النصوص والسيرفرات وحسابات الإيداع
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Mustafa 5SIM Account Widget */}
            <div className="hidden lg:flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-2 text-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                5S
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">حساب مصطفى (#4437001)</span>
                <span className="font-black text-emerald-400 text-sm font-mono">$3.49 USD</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono">
              <ShieldCheck size={16} className="text-blue-400" />
              <span className="text-slate-400">المالك:</span>
              <span className="text-blue-300 font-bold">8338869162</span>
            </div>

            <button
              onClick={() => { loadData(); showToast('🔄 تم تحديث كافة البيانات والأرصدة بنجاح'); }}
              className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-800 cursor-pointer shadow"
              title="تحديث البيانات"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2 py-2.5">
          {[
            { id: 'simulator', label: '📱 محاكي واجهات البوت (1:1 Telegram)', icon: Smartphone },
            { id: 'texts-cms', label: '✍️ محرر النصوص والكتابات (CMS Studio)', icon: Edit3 },
            { id: 'payments', label: '💳 حسابات وطرق الإيداع والبنوك', icon: CreditCard, badge: payments.length },
            { id: 'servers', label: '🌐 سيرفرات ومواقع التوريد API', icon: Server, badge: servers.length },
            { id: 'prices', label: '🏷️ جدول أسعار الدول والسيرفرات', icon: DollarSign },
            { id: 'cards', label: '🎟 كروت الشحن ورصيد الأعضاء', icon: Key, badge: cards.length },
            { id: 'channels', label: '📢 قنوات الاشتراك الإجباري', icon: Radio, badge: channels.length },
            { id: 'bot-code', label: '💻 أكواد وملفات البوت (BJS)', icon: FileCode },
            { id: 'dashboard', label: '📊 التحليلات واللوحة الشاملة', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent hover:border-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono ${active ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        
        {/* TAB 1: INTERACTIVE TELEGRAM BOT SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <PlusTelegramSimulator 
              showToast={showToast} 
              onOpenSettings={() => setActiveTab('texts-cms')}
              onOpenPayments={() => setActiveTab('payments')}
              onOpenServers={() => setActiveTab('servers')}
            />
          </div>
        )}

        {/* TAB 2: TEXTS & CMS STUDIO */}
        {activeTab === 'texts-cms' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <SettingsTab showToast={showToast} />
          </div>
        )}

        {/* TAB 3: PAYMENT METHODS & BANK ACCOUNTS */}
        {activeTab === 'payments' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">إدارة حسابات وطرق الإيداع بالبوت (Banking & Payment Accounts)</h2>
                <p className="text-xs text-slate-400">
                  تعديل، إضافة، وإيقاف حسابات البنوك والمحافظ الإلكترونية (الكريمي، النجم، بايننس USDT، STC Pay، الراجحي، آسياسيل، زين كاش).
                </p>
              </div>
              <button
                onClick={() => {
                  setPaymentForm({ name: '', arabicName: '', accountNumber: '', accountHolder: '', instructions: '', icon: 'CreditCard' });
                  setEditingPaymentId(null);
                  setIsAddingPayment(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Plus size={16} />
                إضافة حساب أو طريقة دفع جديدة
              </button>
            </div>

            {/* Quick Balance Adjustment Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <DollarSign size={18} className="text-amber-400" />
                شحن أو خصم رصيد فوري لحساب عميل (addcoin / delcoin)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">أيدي العضو بالتيليجرام (Telegram ID)</label>
                  <input
                    type="text"
                    placeholder="مثال: 8338869162"
                    value={targetUserId}
                    onChange={e => setTargetUserId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono outline-none focus:border-blue-500"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">المبلغ بالروبل (₽)</label>
                  <input
                    type="number"
                    value={adjustAmount}
                    onChange={e => setAdjustAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-black text-emerald-400 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">ملاحظة العملية (اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: إيداع حوالة عبر الكريمي"
                    value={balanceNote}
                    onChange={e => setBalanceNote(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => handleAdjustBalance(true)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  + شحن الرصيد للعضو
                </button>
                <button
                  onClick={() => handleAdjustBalance(false)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black shadow-lg shadow-red-600/20 cursor-pointer"
                >
                  - خصم من رصيد العضو
                </button>
              </div>
            </div>

            {/* Modal for adding/editing payment */}
            {isAddingPayment && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white">إضافة أو تعديل طريقة شحن وحساب بنكي</h3>
                  <button onClick={() => setIsAddingPayment(false)} className="text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleSavePayment} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">اسم البنك / الطريقة بالعربي</label>
                    <input
                      type="text"
                      placeholder="مثال: بنك الكريمي (حساب / جوال)"
                      value={paymentForm.arabicName}
                      onChange={e => setPaymentForm({ ...paymentForm, arabicName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">رقم الحساب / المحفظة / Pay ID</label>
                    <input
                      type="text"
                      placeholder="مثال: 3049582109"
                      value={paymentForm.accountNumber}
                      onChange={e => setPaymentForm({ ...paymentForm, accountNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono outline-none focus:border-blue-500"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">اسم المستفيد أو صاحب الحساب</label>
                    <input
                      type="text"
                      placeholder="مثال: محمد علي سالم"
                      value={paymentForm.accountHolder}
                      onChange={e => setPaymentForm({ ...paymentForm, accountHolder: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">تعليمات التحويل للعميل</label>
                    <input
                      type="text"
                      placeholder="مثال: التحويل عبر تطبيق الكريمي ثم إرسال السند"
                      value={paymentForm.instructions}
                      onChange={e => setPaymentForm({ ...paymentForm, instructions: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-full flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingPayment(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                    >
                      حفظ وتطبيق الحساب
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Payment Accounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {payments.map(pay => (
                <div key={pay.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                          <CreditCard size={16} />
                        </div>
                        <h4 className="font-black text-white text-sm">{pay.arabicName}</h4>
                      </div>
                      <button
                        onClick={() => handleDeletePayment(pay.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="حذف الحساب"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between text-emerald-400 font-bold select-all">
                        <span dir="ltr">{pay.accountNumber}</span>
                        <button
                          onClick={() => copyToClipboard(pay.accountNumber, pay.arabicName)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          <Copy size={13} />
                        </button>
                      </div>
                      <div className="text-slate-400 text-[11px] font-sans">{pay.accountHolder}</div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">{pay.instructions}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(pay.accountNumber, 'رقم الحساب')}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy size={14} />
                      نسخ الحساب للعميل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SERVERS & API PROVIDERS */}
        {activeTab === 'servers' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">إدارة وتوصيل سيرفرات ومواقع التوريد (API & Providers)</h2>
                <p className="text-xs text-slate-400">
                  ربط وتخصيص سيرفر مصطفى (5SIM.NET الحقيقي) والسيرفرات البديلة (SMS-Activate, SMS-Man, Vak) وضبط هامش الربح بالروبل.
                </p>
              </div>
              <button
                onClick={() => setIsAddingServer(true)}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <Plus size={16} />
                إضافة موقع توريد جديد
              </button>
            </div>

            {/* Modal for adding server */}
            {isAddingServer && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white">إضافة موقع أو سيرفر جديد عبر الرابط و API</h3>
                  <button onClick={() => setIsAddingServer(false)} className="text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleAddServer} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">اسم الموقع / السيرفر</label>
                    <input
                      type="text"
                      placeholder="مثال: موقع التوريد السريع أو سيرفر محمد"
                      value={serverForm.name}
                      onChange={e => setServerForm({ ...serverForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">رابط الموقع (Base URL)</label>
                    <input
                      type="text"
                      placeholder="https://example-sms.com/stubs/handler_api.php"
                      value={serverForm.url}
                      onChange={e => setServerForm({ ...serverForm, url: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono outline-none focus:border-blue-500"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">مفتاح الـ API الخاص بالموقع</label>
                    <input
                      type="text"
                      placeholder="أدخل رمز الـ API..."
                      value={serverForm.apiKey}
                      onChange={e => setServerForm({ ...serverForm, apiKey: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono outline-none focus:border-blue-500"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">نوع البروتوكول</label>
                    <select
                      value={serverForm.apiType}
                      onChange={e => setServerForm({ ...serverForm, apiType: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    >
                      <option value="5sim">بروتوكول 5sim.net الحقيقي (JWT Bearer Token)</option>
                      <option value="stubs">بروتوكول Handler القياسي (SMS-Activate / Stubs)</option>
                      <option value="vak">بروتوكول Vak-SMS</option>
                      <option value="sms-man">بروتوكول SMS-Man</option>
                      <option value="custom-json">REST API مخصص (JSON)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">نسبة الربح المضافة (بالروبل ₽)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={serverForm.profitMargin}
                      onChange={e => setServerForm({ ...serverForm, profitMargin: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-bold outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">ملاحظات داخلية</label>
                    <input
                      type="text"
                      placeholder="مثال: أرقام واتساب وتيليجرام ممتازة"
                      value={serverForm.notes}
                      onChange={e => setServerForm({ ...serverForm, notes: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-full flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingServer(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      حفظ وربط السيرفر
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Servers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servers.map(srv => (
                <div
                  key={srv.id}
                  className={`bg-slate-900 border rounded-3xl p-6 space-y-4 transition-all flex flex-col justify-between ${
                    srv.id === 'mustafa-5sim' || srv.id === 'srv-1' ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs ${
                          srv.id === 'mustafa-5sim' || srv.id === 'srv-1' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          <Server size={18} />
                        </div>
                        <div>
                          <h3 className="font-black text-sm text-white">{srv.name}</h3>
                          <span className="text-[10px] text-slate-400 font-mono">{srv.apiType}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${srv.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-500'}`}>
                        {srv.isActive ? 'مفعل نشط' : 'معطل'}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5 font-mono text-[11px]">
                      <div className="truncate text-slate-400">
                        <span className="text-slate-500">URL: </span>
                        <span className="text-slate-300">{srv.url}</span>
                      </div>
                      <div className="truncate text-slate-400">
                        <span className="text-slate-500">API Key: </span>
                        <span className="text-emerald-400">{srv.apiKey ? `${srv.apiKey.slice(0, 12)}...` : 'لم يدخل مفتاح'}</span>
                      </div>
                      {srv.liveBalance !== undefined && srv.liveBalance !== null && (
                        <div className="text-blue-400 font-bold flex items-center justify-between pt-1 border-t border-slate-800">
                          <span>الرصيد الحي:</span>
                          <span>{srv.liveBalance} {srv.currency}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-bold">هامش الربح:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateMargin(srv.id, -0.5)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-black text-amber-400 px-2 font-mono">+{srv.profitMargin} ₽</span>
                        <button
                          onClick={() => handleUpdateMargin(srv.id, 0.5)}
                          className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTestConnection(srv)}
                        disabled={serverTestingId === srv.id}
                        className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                      >
                        <RefreshCw size={14} className={serverTestingId === srv.id ? 'animate-spin' : ''} />
                        <span>{serverTestingId === srv.id ? 'جاري الفحص...' : 'فحص الاتصال والرصيد'}</span>
                      </button>

                      {srv.id !== 'mustafa-5sim' && srv.id !== 'srv-1' && (
                        <button
                          onClick={() => handleDeleteServer(srv.id)}
                          className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                          title="حذف السيرفر"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PRICES & COUNTRIES CATALOG */}
        {activeTab === 'prices' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">إدارة وتعديل أسعار الدول والسيرفرات بالروبل</h2>
                <p className="text-xs text-slate-400">
                  تحديد أسعار الأرقام لكل دولة وتطبيق (واتساب، تيليجرام، تيك توك، جوجل، إنستقرام، وغيرها).
                </p>
              </div>
            </div>

            {/* Quick Add / Edit Price Form */}
            <form onSubmit={handleSavePrice} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Plus size={18} className="text-emerald-400" />
                إضافة أو تعديل سعر دولة فورياً (الأمر المباشر: /setprice)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">البرنامج / الخدمة:</label>
                  <select
                    value={priceForm.service}
                    onChange={e => setPriceForm({ ...priceForm, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                  >
                    <option value="whatsapp">واتساب (WhatsApp)</option>
                    <option value="telegram">تيليجرام (Telegram)</option>
                    <option value="tiktok">تيك توك (TikTok)</option>
                    <option value="instagram">إنستقرام (Instagram)</option>
                    <option value="facebook">فيسبوك (Facebook)</option>
                    <option value="google">جوجل (Google)</option>
                    <option value="twitter">تويتر X (Twitter)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">كود الدولة بالإنجليزي:</label>
                  <input
                    type="text"
                    placeholder="مثال: yemen, egypt, colombia"
                    value={priceForm.countryCode}
                    onChange={e => setPriceForm({ ...priceForm, countryCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono outline-none focus:border-blue-500"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">اسم الدولة بالعربي والعلم:</label>
                  <input
                    type="text"
                    placeholder="مثال: اليمن 🇾🇪"
                    value={priceForm.countryName}
                    onChange={e => setPriceForm({ ...priceForm, countryName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">السعر للعميل بالروبل (₽):</label>
                  <input
                    type="number"
                    value={priceForm.priceRub}
                    onChange={e => setPriceForm({ ...priceForm, priceRub: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-emerald-400 font-mono font-black outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  حفظ وتطبيق السعر فورياً
                </button>
              </div>
            </form>

            {/* Current Prices Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* WhatsApp Prices */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-black text-sm text-emerald-400 flex items-center gap-2">
                    <MessageSquare size={16} />
                    أسعار أرقام WhatsApp الحالية
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {Object.keys(customPrices.whatsapp || {}).length} دول
                  </span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-[360px] overflow-y-auto pr-1">
                  {Object.entries(customPrices.whatsapp || {}).map(([c, info]) => (
                    <div key={c} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{info.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{c}</span>
                      </div>
                      <span className="font-black font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        {info.priceRub} ₽
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telegram Prices */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-black text-sm text-blue-400 flex items-center gap-2">
                    <Radio size={16} />
                    أسعار أرقام Telegram الحالية
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {Object.keys(customPrices.telegram || {}).length} دول
                  </span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-[360px] overflow-y-auto pr-1">
                  {Object.entries(customPrices.telegram || {}).map(([c, info]) => (
                    <div key={c} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{info.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{c}</span>
                      </div>
                      <span className="font-black font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                        {info.priceRub} ₽
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CARDS & USER BALANCES */}
        {activeTab === 'cards' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">توليد كروت الشحن الرقمية (Recharge Cards Generator)</h2>
                <p className="text-xs text-slate-400">
                  صنع كروت شحن بأكواد فريدة وقيم بالروبل لمشاركتها مع العملاء عبر الأمر <code className="text-blue-400">/card</code> أو من هنا مباشرة.
                </p>
              </div>
            </div>

            {/* Generator Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <Key size={18} className="text-blue-400" />
                توليد كروت شحن روبل جديدة فورياً
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">قيمة الكرت (بالروبل ₽):</label>
                  <input
                    type="number"
                    value={cardAmount}
                    onChange={e => setCardAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-black text-lg text-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">عدد الكروت المطلوبة:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={cardCount}
                    onChange={e => setCardCount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleGenerateCards}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus size={16} />
                توليد كروت الشحن الآن
              </button>
            </div>

            {/* Generated Cards Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-black text-white">كروت الشحن المصنوعة في النظام ({cards.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3">كود الكرت الفريد</th>
                      <th className="pb-3">القيمة</th>
                      <th className="pb-3">الحالة</th>
                      <th className="pb-3">تاريخ الصنع</th>
                      <th className="pb-3 text-center">نسخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {cards.map(c => (
                      <tr key={c.id} className="hover:bg-slate-800/30">
                        <td className="py-3 text-blue-400 font-bold select-all" dir="ltr">{c.code}</td>
                        <td className="py-3 font-bold text-emerald-400">{c.amount} ₽</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.isUsed ? 'bg-slate-800 text-slate-500' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
                            {c.isUsed ? 'مستخدم' : 'جاهز للشحن'}
                          </span>
                        </td>
                        <td className="py-3 text-slate-500 text-[11px] font-sans">{new Date(c.createdAt).toLocaleDateString('ar-YE')}</td>
                        <td className="py-3 text-center">
                          <button
                            onClick={() => copyToClipboard(c.code, 'كود الكرت')}
                            className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                            title="نسخ"
                          >
                            <Copy size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: MANDATORY CHANNELS */}
        {activeTab === 'channels' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">قنوات الاشتراك الإجباري بالبوت والوصف</h2>
                <p className="text-xs text-slate-400">
                  إلزام العملاء بالانضمام للقنوات، تعديل وصف القنوات، أو حذف كافة القنوات السابقة بنقرة واحدة.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearAllChannels}
                  className="px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={14} />
                  حذف كافة القنوات السابقة
                </button>
                <button
                  onClick={() => setIsAddingChannel(true)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} />
                  إضافة قناة جديدة
                </button>
              </div>
            </div>

            {/* Edit Description Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Edit3 size={16} className="text-blue-400" />
                  وصف ورسالة القنوات الإجبارية المعروضة للزبائن بالبوت
                </h3>
                <button
                  onClick={handleSaveChannelDesc}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  حفظ الوصف
                </button>
              </div>
              <textarea
                rows={3}
                value={channelDesc}
                onChange={e => setChannelDesc(e.target.value)}
                placeholder="اكتب هنا الرسالة التوضيحية وشرح الاشتراك بالقنوات للمستخدمين..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Modal for adding channel */}
            {isAddingChannel && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-black text-white">إضافة قناة تليجرام جديدة</h3>
                  <button onClick={() => setIsAddingChannel(false)} className="text-slate-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleAddChannel} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">اسم أو عنوان القناة</label>
                    <input
                      type="text"
                      placeholder="مثال: قناة تفعيلات الأرقام الفورية"
                      value={channelForm.title}
                      onChange={e => setChannelForm({ ...channelForm, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">معرف القناة مع @</label>
                    <input
                      type="text"
                      placeholder="@MyChannel"
                      value={channelForm.username}
                      onChange={e => setChannelForm({ ...channelForm, username: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono outline-none focus:border-blue-500"
                      dir="ltr"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-slate-300 font-bold mb-1">وصف القناة</label>
                    <input
                      type="text"
                      placeholder="مثال: الإعلانات والعروض اليومية وتوزيع الأرقام المجانية"
                      value={channelForm.description}
                      onChange={e => setChannelForm({ ...channelForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-full flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingChannel(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
                    >
                      حفظ القناة
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Channels List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map(ch => (
                <div key={ch.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-black">
                      @
                    </div>
                    <div>
                      <h4 className="font-black text-white text-sm">{ch.title}</h4>
                      <p className="font-mono text-xs text-blue-400" dir="ltr">{ch.username}</p>
                      <p className="text-[11px] text-slate-400">{ch.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={ch.url || `https://t.me/${ch.username.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-400 hover:text-white"
                      title="فتح القناة"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <button
                      onClick={() => handleDeleteChannel(ch.id)}
                      className="p-2 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="حذف القناة"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {channels.length === 0 && (
                <div className="col-span-full text-center py-12 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 text-xs">
                  تم تفريغ كافة القنوات. البوت يعمل حالياً بدون إلزام بالقنوات.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: BOT CODE (BJS) */}
        {activeTab === 'bot-code' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-white">ملفات وأوامر منصة Bots.Business (BJS)</h2>
              <p className="text-xs text-slate-400">
                الأكواد المباشرة الجاهزة للنسخ والموجودة في مجلد <code className="text-blue-400 bg-slate-900 px-1 py-0.5 rounded font-mono">/commands</code>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { file: 'commands/_start.js', title: 'القائمة الرئيسية', desc: 'شاشة البداية وأزرار التصفح' },
                { file: 'commands/admin_panel.js', title: 'لوحة الأدمن', desc: 'أوامر وتحكم المالك' },
                { file: 'commands/mustafa_5sim.js', title: 'سيرفر مصطفى 5SIM', desc: 'إعدادات المزود والربط' },
                { file: 'commands/servers_menu.js', title: 'قائمة السيرفرات', desc: 'إضافة ومتابعة مواقع الـ API' },
                { file: 'commands/add_custom_site.js', title: 'إضافة موقع توريد', desc: 'ربط السيرفرات عبر الرابط والمفتاح' },
                { file: 'commands/prices_menu.js', title: 'جدول الأسعار', desc: 'لوحة إدارة وتعديل الأسعار' },
                { file: 'commands/setprice.js', title: 'أمر التسعير الديناميكي', desc: 'تحديث سعر أي دولة فورياً' },
                { file: 'commands/channels_menu.js', title: 'إدارة القنوات', desc: 'تعديل أو حذف القنوات الإجبارية' },
                { file: 'commands/payment_menu.js', title: 'طرق الشحن والدفع', desc: 'الكريمي والنجم وبايننس' },
                { file: 'commands/card.js', title: 'توليد كروت الشحن', desc: 'إنشاء أكواد كروت الروبل' },
                { file: 'commands/Card_redeem.js', title: 'شحن كرت الروبل', desc: 'استرداد كود الكرت بالمحفظة' },
                { file: 'commands/addcoin.js', title: 'شحن رصيد عضو', desc: 'إضافة رصيد لحساب أي عميل' },
                { file: 'commands/delcoin.js', title: 'خصم رصيد عضو', desc: 'سحب رصيد من حساب أي عميل' },
                { file: 'commands/Xi.js', title: 'شراء الرقم الفعلي', desc: 'إرسال طلب التفعيل لموقع 5SIM' }
              ].map(cmd => (
                <div key={cmd.file} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      BJS Command
                    </span>
                    <h4 className="font-bold text-sm text-white mt-1.5">{cmd.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono" dir="ltr">{cmd.file}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{cmd.desc}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`// Code file: ${cmd.file}`, cmd.file)}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                  >
                    <Copy size={12} />
                    نسخ مسار الكود
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: LIVE ANALYTICS & DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-white">إحصائيات وتشغيل المنظومة المباشرة (System Health & Analytics)</h2>
              <p className="text-xs text-slate-400">
                مؤشرات أداء السيرفر، رصيد مزود الخدمة، عدد الأرقام والمستخدمين، ونسبة وصول الأكواد.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 text-right">
                <span className="text-xs text-slate-400 font-bold">المستخدمين المسجلين</span>
                <p className="text-3xl font-black text-white">3,232</p>
                <p className="text-[10px] text-emerald-400 font-bold">نشط ومتصل بالبوت</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 text-right">
                <span className="text-xs text-slate-400 font-bold">سيرفرات التوريد المتصلة</span>
                <p className="text-3xl font-black text-blue-400">{servers.length}</p>
                <p className="text-[10px] text-blue-400 font-bold">5sim + SMS-Activate + Vak</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 text-right">
                <span className="text-xs text-slate-400 font-bold">طرق الشحن المفعلة</span>
                <p className="text-3xl font-black text-purple-400">{payments.length}</p>
                <p className="text-[10px] text-purple-400 font-bold">الكريمي، النجم، بايننس USDT</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 text-right">
                <span className="text-xs text-slate-400 font-bold">نسبة وصول أكواد التحقق (OTP)</span>
                <p className="text-3xl font-black text-emerald-400">99.8%</p>
                <p className="text-[10px] text-emerald-400 font-bold">عبر أرخص مشغلي 5sim</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
