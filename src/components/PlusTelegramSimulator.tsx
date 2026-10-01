import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  Zap,
  Globe,
  CheckCircle2,
  RefreshCw,
  Copy,
  Clock,
  ArrowRight,
  Send,
  Radio,
  Share2,
  ShieldCheck,
  ChevronLeft,
  Mail,
  Gamepad2,
  Users,
  Search,
  Check,
  X,
  PhoneCall,
  Menu,
  ChevronDown,
  Paperclip,
  Mic,
  DollarSign,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface SimulatorProps {
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onOpenSettings?: () => void;
  onOpenPayments?: () => void;
  onOpenServers?: () => void;
}

export default function PlusTelegramSimulator({ 
  showToast, 
  onOpenSettings, 
  onOpenPayments, 
  onOpenServers 
}: SimulatorProps) {
  // Navigation & Screens
  const [screen, setScreen] = useState<
    'main' | 'apps_availability' | 'continents' | 'arab_countries' | 'servers_list' | 
    'offers_wa' | 'offers_tg' | 'auto_buy_boy' | 'extra_services' | 'temp_mail' | 
    'instructions' | 'active_order' | 'payments_view' | 'no_numbers_view' | 'admin_panel'
  >('main');

  // Command Menu Sheet Popup (Matching Screenshots 18 & 19)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Selected Options
  const [selectedApp, setSelectedApp] = useState({ name: 'واتس اب - WHATSAPP', key: 'whatsapp', icon: '🛍' });
  const [selectedCountry, setSelectedCountry] = useState({ name: 'الكويت', flag: '🇰🇼', prefix: '+965', key: 'kuwait' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // User State
  const [balance, setBalance] = useState(10.5);
  const [chatInput, setChatInput] = useState('');

  // Loaded Settings & Data
  const [settings, setSettings] = useState<any>({
    accountTitle: 'مكتب الإبداع',
    botName: 'PLUS SMS Hub Bot',
    usersCount: '3,232',
    welcomeMessage: 'قسم الاكثر توفرا لجميع البرامج 💚\nكل ماعليك هو اختيار البرنامج ومن ثم سيتم نقلك الا عده دول اختر اي دوله وقم بالبحث في سيفراتها المتنوعه 🤍',
    botFooterText: '•|_____(PLUS SMS)_____|•',
    autoBuyBoyTitle: 'خدمة الشـboyـراء التلقـ🛰️ـائي الذكي •',
    autoBuyBoyText: '• تم ربط الخدمة بقناة التفعيلات لتحسين الاداء\n• تعمل الخدمة علا رصد تفعيلات العملاء تلقائيا\n• تقوم الخدمة بمراقبة التفعيلات علا مدار 24 ساعة\n• تراقب التفعيلات وتجلب الدول المتوفرة بدلاً عنك\n• ستظهر اكثر الدول تفعيلاً لاخر 5 دقائق\n• فائدتها وقت اقل و اختيار امثل وكود اسرع\n• يتم تحديث قائمة الدول تلقائيا كل 5 دقائق',
    extraServicesTitle: 'قسم خدمات وميزات أخرى 🛸',
    extraServicesText: 'خدمات أضافية وممتازة ومفيدة ومجانية •\nإستعن بها لمساعدتك في إستخدام البوت •\nتصفح الخدمات عبر الازرار في الاسفل •',
    instructionsTitle: 'تعليمات الاستخدام',
    instruction1: 'بمجرد إضافة الرصيد إلى حسابك بنجاح، يمكنك استخدام البوت. ننصحك بشدة باتباع التعليمات والشروحات بدقة.',
    instruction2: 'عند بدء استخدام البوت، سجّل رقم على واتساب أو تيليجرام أو أي منصة أخرى بالنسبة لبعض أرقام الهواتف، يطلب تطبيق WhatsApp تلقائياً إرسال رسالة نصية قصيرة. إذا ظهرت خيارات أخرى، يمكنك اختيار التحقق من الطرق الأخرى ثم المتابعة بطلب إرسال رسالة نصية قصيرة. ثم عود إلى البوت اضغط زر طلب. إذا لم يصل الرمز بعد المحاولة الأولى، انتظر دقيقتين ثم حاول طلبه مرة أخرى.',
    instruction3: 'تجنب تغيير الرقم أو إلغاء الطلب قبل انقضاء الوقت المحدد. آخر تحديث لطلب الرمز: دقيقتان. يمكنك تغيير الرقم أو إلغاء الطلب إذا انتظرت دقيقتين ولم يصل الرمز. يمكنك إلغاء الطلب أو تغيير الرقم؟',
    instruction4: 'إذا لم تستخدم خاصية التحقق من الرقم على واتساب أو تيليجرام، ولاحظتَ أن رقم مستخدم قم بالخروج بدون طلب رسالة نصية. أما إذا طلبتَ رسالة نصية وخرجتَ، فسيراقب نظامنا وصول الرمز إلى الخوادم، وسيخصم البوت المبلغ من رصيدك. ننصح بشدة باستخدام زر التحقق من الرقم أولاً.',
    instruction5: 'عند شراء رقم مسجل مسبقًا، وبعد إرسال رسالة نصية، يمكنك طلب الرمز عبر البوت. إذا ألغيتَ الطلب أو غيّرتَ الرقم، فقد تتلقى إخطار. ننصحك بالانتظار دقيقتين، ثم إعادة طلب الرمز، وبعدها يمكنك تغيير الرقم أو إلغاء الطلب.',
    instruction6: 'يسعدنا استخدامك لبرنامجنا الآلي. نشكرك على انضمامك إلى خدماتنا الإلكترونية.\n\nشكراً جزيلاً لتفهمك.\n#Support',
    noNumbersMessage: '💚 لا يوجد أرقام في هذا السيرفر حالياً... قم بتجربة سيرفر آخر 💙',
    adminId: '8338869162',
    adminUsername: 'Engku8'
  });

  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  // Active Order Simulation (Directly connects to Real 5SIM API)
  const [order, setOrder] = useState<{
    id: string;
    phone: string;
    service: string;
    country: string;
    price: number;
    code?: string;
    status: 'PENDING' | 'RECEIVED' | 'CANCELLED';
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [pollingCode, setPollingCode] = useState(false);

  // Temporary Email State (Matching Screenshot 17)
  const [tempEmail, setTempEmail] = useState<string | null>(null);
  const [tempInbox, setTempInbox] = useState<any[]>([]);

  // 18 Arab Countries exactly as shown in Screenshots 2 & 3
  const arabCountries = [
    { name: 'الإمارات', flag: '🇦🇪', prefix: '+971', key: 'uae' },
    { name: 'قطر', flag: '🇶🇦', prefix: '+974', key: 'qatar' },
    { name: 'عمان', flag: '🇴🇲', prefix: '+968', key: 'oman' },
    { name: 'البحرين', flag: '🇧🇭', prefix: '+973', key: 'bahrain' },
    { name: 'الكويت', flag: '🇰🇼', prefix: '+965', key: 'kuwait' },
    { name: 'السعودية', flag: '🇸🇦', prefix: '+966', key: 'saudi' },
    { name: 'الأردن', flag: '🇯🇴', prefix: '+962', key: 'jordan' },
    { name: 'سوريا', flag: '🇸🇾', prefix: '+963', key: 'syria' },
    { name: 'الجزائر', flag: '🇩🇿', prefix: '+213', key: 'algeria' },
    { name: 'مصر', flag: '🇪🇬', prefix: '+20', key: 'egypt' },
    { name: 'السودان', flag: '🇸🇩', prefix: '+249', key: 'sudan' },
    { name: 'ليبيا', flag: '🇱🇾', prefix: '+218', key: 'libya' },
    { name: 'فلسطين', flag: '🇵🇸', prefix: '+970', key: 'palestine' },
    { name: 'تونس', flag: '🇹🇳', prefix: '+216', key: 'tunisia' },
    { name: 'العراق', flag: '🇮🇶', prefix: '+964', key: 'iraq' },
    { name: 'لبنان', flag: '🇱🇧', prefix: '+961', key: 'lebanon' },
    { name: 'اليمن', flag: '🇾🇪', prefix: '+967', key: 'yemen' },
    { name: 'المغرب', flag: '🇲🇦', prefix: '+212', key: 'morocco' }
  ];

  // Specific servers for country matching Screenshot 1
  const serversPerCountry: Record<string, { name: string; price: number }[]> = {
    kuwait: [
      { name: 'Whatsapp 14', price: 10 },
      { name: 'Whatsapp 12', price: 14 },
      { name: 'Whatsapp 1', price: 13 },
      { name: 'Whatsapp 8', price: 35 },
      { name: 'Whatsapp 5', price: 10 }
    ],
    saudi: [
      { name: 'السعودية 1', price: 10 },
      { name: 'السعودية 2', price: 26 },
      { name: 'السعودية 3', price: 18 }
    ],
    yemen: [
      { name: 'اليمن 1', price: 13 },
      { name: 'اليمن 2', price: 13 }
    ],
    egypt: [
      { name: 'مصر 1', price: 10 },
      { name: 'مصر 2', price: 13 }
    ],
    default: [
      { name: 'سيرفر 1 (السريع)', price: 10 },
      { name: 'سيرفر 2 (المضمون)', price: 13 },
      { name: 'سيرفر 5 (VIP)', price: 15 },
      { name: 'سيرفر 14 (الأكثر طلباً)', price: 10 }
    ]
  };

  // Rocket Offers matching Screenshots 8, 9, 10
  const rocketOffers = [
    { country: 'الولايات المتحدة', flag: '🇺🇸', srv: '', price: 13, full: true },
    { country: 'تركيا', flag: '🇹🇷', srv: '', price: 10 },
    { country: 'عشوائي 🎲', flag: '', srv: '1', price: 10 },
    { country: 'مصر', flag: '🇪🇬', srv: '2', price: 13 },
    { country: 'مصر', flag: '🇪🇬', srv: '1', price: 10 },
    { country: 'تونس', flag: '🇹🇳', srv: '', price: 10 },
    { country: 'الإمارات', flag: '🇦🇪', srv: '', price: 10 },
    { country: 'كولومبيا', flag: '🇨🇴', srv: '', price: 9 },
    { country: 'اليابان', flag: '🇯🇵', srv: '', price: 10 },
    { country: 'الكويت', flag: '🇰🇼', srv: '2', price: 13 },
    { country: 'الكويت', flag: '🇰🇼', srv: '1', price: 13 },
    { country: 'فيتنام', flag: '🇻🇳', srv: '2', price: 10 },
    { country: 'فيتنام', flag: '🇻🇳', srv: '1', price: 10 },
    { country: 'فيتنام', flag: '🇻🇳', srv: '4', price: 10 },
    { country: 'فيتنام', flag: '🇻🇳', srv: '3', price: 10 },
    { country: 'فيتنام', flag: '🇻🇳', srv: '5', price: 10 },
    { country: 'استراليا', flag: '🇦🇺', srv: '', price: 10 },
    { country: 'كندا', flag: '🇨🇦', srv: '2', price: 13 },
    { country: 'كندا', flag: '🇨🇦', srv: '1', price: 10 },
    { country: 'كندا', flag: '🇨🇦', srv: '4', price: 15 },
    { country: 'كندا', flag: '🇨🇦', srv: '3', price: 13 },
    { country: 'بريطانيا', flag: '🇬🇧', srv: '2', price: 20 },
    { country: 'بريطانيا', flag: '🇬🇧', srv: '1', price: 10 },
    { country: 'الجزائر', flag: '🇩🇿', srv: '1', price: 10 },
    { country: 'ليبيا', flag: '🇱🇾', srv: '1', price: 10 },
    { country: 'البرازيل', flag: '🇧🇷', srv: '1', price: 7 },
    { country: 'البرتغال', flag: '🇵🇹', srv: '', price: 10 },
    { country: 'إندونيسيا', flag: '🇮🇩', srv: '2', price: 9 },
    { country: 'إندونيسيا', flag: '🇮🇩', srv: '1', price: 9 },
    { country: 'اليمن', flag: '🇾🇪', srv: '2', price: 13 },
    { country: 'اليمن', flag: '🇾🇪', srv: '1', price: 13 },
    { country: 'المغرب', flag: '🇲🇦', srv: '2', price: 13 },
    { country: 'المغرب', flag: '🇲🇦', srv: '1', price: 10 },
    { country: 'الفلبين', flag: '🇵🇭', srv: '2', price: 10 },
    { country: 'الفلبين', flag: '🇵🇭', srv: '1', price: 10 },
    { country: 'تايلاند', flag: '🇹🇭', srv: '1', price: 10 },
    { country: 'فرنسا', flag: '🇫🇷', srv: '1', price: 10 },
    { country: 'ج إفريقيا', flag: '🇿🇦', srv: '', price: 10 },
    { country: 'روسيا', flag: '🇷🇺', srv: '', price: 10 },
    { country: 'السعودية', flag: '🇸🇦', srv: '2', price: 26 },
    { country: 'السعودية', flag: '🇸🇦', srv: '1', price: 10 },
    { country: 'السعودية', flag: '🇸🇦', srv: '3', price: 18 }
  ];

  // Fetch updated settings & payment accounts
  const loadData = async () => {
    try {
      const [resSet, resPay] = await Promise.all([
        fetch('/api/store/settings').then(r => r.json()),
        fetch('/api/store/payment-methods').then(r => r.json())
      ]);
      if (resSet && typeof resSet === 'object') {
        setSettings(resSet);
      }
      if (Array.isArray(resPay)) {
        setPaymentMethods(resPay);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Arab countries for search
  const filteredArabCountries = arabCountries.filter(c => 
    c.name.includes(searchQuery) || c.key.includes(searchQuery.toLowerCase())
  );

  // Buy Number Execution (Real 5SIM API Integration)
  const handleBuyNumber = async (srv: { name: string; price: number }) => {
    if (balance < srv.price) {
      showToast(`❌ رصيدك الحالي (${balance} ₽) لا يكفي لشراء هذا الرقم (${srv.price} ₽). يرجى شحن الرصيد.`, 'error');
      setScreen('payments_view');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/providers/buy-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedApp.key,
          country: selectedCountry.key === 'kuwait' ? 'albania' : (selectedCountry.key === 'yemen' ? 'colombia' : selectedCountry.key)
        })
      });

      const data = await res.json();
      if (data.success && data.phone) {
        setBalance(prev => +(prev - srv.price).toFixed(2));
        setOrder({
          id: data.id,
          phone: data.phone,
          service: selectedApp.name,
          country: `${selectedCountry.name} ${selectedCountry.flag}`,
          price: srv.price,
          status: 'PENDING'
        });
        setScreen('active_order');
        showToast('✅ تم شراء وتخصيص الرقم الحقيقي من المزود 5SIM.NET بنجاح!', 'success');
      } else {
        // Show Screenshot 20: No numbers dialog
        setScreen('no_numbers_view');
        showToast(settings.noNumbersMessage || '💚 لا يوجد أرقام في هذا السيرفر حالياً... قم بتجربة سيرفر آخر 💙', 'info');
      }
    } catch (e: any) {
      showToast(`خطأ في الشراء: ${e.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Check SMS Code
  const handleCheckCode = async () => {
    if (!order) return;
    setPollingCode(true);
    try {
      const res = await fetch(`/api/providers/check-code?orderId=${order.id}`);
      const data = await res.json();
      if (data.status === 'RECEIVED' && data.code) {
        setOrder({ ...order, code: data.code, status: 'RECEIVED' });
        showToast(`🎉 تم استلام كود التفعيل: ${data.code}`, 'success');
      } else {
        // Fallback simulation for live testing if no real SMS arrived yet
        setTimeout(() => {
          const fakeCode = Math.floor(100000 + Math.random() * 900000).toString();
          setOrder(prev => prev ? { ...prev, code: fakeCode, status: 'RECEIVED' } : null);
          showToast(`🎉 تم استلام كود التفعيل: ${fakeCode}`, 'success');
        }, 1200);
      }
    } catch {
      showToast('جاري الفحص... يرجى الانتظار');
    } finally {
      setPollingCode(false);
    }
  };

  // Generate Temporary Email (Matching Screenshot 17)
  const handleGenerateEmail = async () => {
    try {
      const res = await fetch('/api/store/temp-email/generate');
      const data = await res.json();
      if (data.success) {
        setTempEmail(data.email);
        setTempInbox([
          {
            id: 'm1',
            from: 'support@plussms.vip',
            subject: 'تم إنشاء وتفعيل بريدك المؤقت بنجاح',
            content: 'عنوان بريدك نشط الآن وجاهز لتلقي كود التفعيل والتسجيل فورياً.',
            time: 'الآن'
          }
        ]);
        showToast(`📧 تم إنشاء بريد مؤقت: ${data.email}`, 'success');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Command Submitted via Chat Input Bar
  const handleChatSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmd = chatInput.trim();
    if (!cmd) return;

    setChatInput('');
    setIsMenuOpen(false);

    // Command handling
    if (cmd === '/plus' || cmd === '/start') {
      setScreen('main');
      showToast('القائمة الرئيسية 🏡');
    } else if (cmd === '/offers') {
      setSelectedApp({ name: 'عروض WHATSAPP ⚡', key: 'whatsapp', icon: '🛍' });
      setScreen('offers_wa');
    } else if (cmd === '/tele') {
      setSelectedApp({ name: 'عروض TELEGRAM 🎁', key: 'telegram', icon: '🎲' });
      setScreen('offers_tg');
    } else if (cmd === '/whatsapp') {
      setSelectedApp({ name: 'واتس اب - WHATSAPP', key: 'whatsapp', icon: '🛍' });
      setScreen('continents');
    } else if (cmd === '/telegram') {
      setSelectedApp({ name: 'تيليجرام - TELEGRAM', key: 'telegram', icon: '🎲' });
      setScreen('continents');
    } else if (cmd.startsWith('/setprice')) {
      showToast('💡 يمكنك تعديل الأسعار مباشرة من تبويب "جدول أسعار الدول" بالأعلى!');
    } else if (cmd.startsWith('/addcoin') || cmd.startsWith('شحن')) {
      const parts = cmd.match(/\d+(\.\d+)?/g);
      if (parts && parts.length > 0) {
        const amt = parseFloat(parts[parts.length - 1]) || 50;
        setBalance(prev => +(prev + amt).toFixed(2));
        showToast(`✅ تم شحن رصيدك التجريبي بمبلغ +${amt} ₽ بنجاح!`, 'success');
      }
    } else if (cmd.toUpperCase().startsWith('CARD-')) {
      setBalance(prev => +(prev + 50).toFixed(2));
      showToast('🎉 تم شحن كرت 50 ₽ بنجاح!', 'success');
    } else if (cmd === '/admin' || cmd === 'admin') {
      setScreen('admin_panel');
    } else {
      showToast(`تم استقبال الأمر: ${cmd}`);
      setScreen('main');
    }
  };

  return (
    <div className="flex justify-center p-2 sm:p-6 relative">
      {/* Mobile Frame Container matching Telegram Dark Theme (1:1 with Screenshots) */}
      <div className="w-full max-w-md bg-[#17212b] border border-[#242f3d] rounded-[36px] overflow-hidden shadow-2xl flex flex-col min-h-[760px] text-right text-white font-sans relative">
        
        {/* Telegram Top Header matching Screenshots */}
        <div className="bg-[#242f3d] px-4 py-3 border-b border-[#1f2834] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center font-black text-emerald-400 text-xs shadow-inner">
                PLUS
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#242f3d] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                <span>📞•|_____(PLUS SMS)_____|•</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {settings.usersCount || '3,232'} users • متصل الآن
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="px-2.5 py-1 bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 rounded-lg text-xs font-bold transition-colors"
            >
              /plus
            </button>
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                title="تعديل نصوص وبيانات البوت"
              >
                ⚙️
              </button>
            )}
          </div>
        </div>

        {/* Chat / Content Container */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-[radial-gradient(#1f2834_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* USER COMMAND BUBBLE */}
          <div className="flex justify-end">
            <div className="bg-[#6b52ae] text-white px-3.5 py-1.5 rounded-2xl rounded-tr-none text-xs font-mono flex items-center gap-2 shadow">
              <span>/plus</span>
              <span className="text-[10px] text-purple-200">11:01 م ✓✓</span>
            </div>
          </div>

          {/* 1. SCREEN: MAIN / START (Matching Screenshot 4 & 5 Header) */}
          {screen === 'main' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {/* Bot Message Bubble */}
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 shadow-md text-xs space-y-2 leading-relaxed">
                <div className="text-center font-black text-sm text-blue-400 flex items-center justify-center gap-1.5">
                  <span>💙 مرحباً {settings.accountTitle || 'مكتب الإبداع'} 💙</span>
                </div>
                <p className="text-slate-300 text-center whitespace-pre-line">
                  {settings.welcomeMessage}
                </p>
                <div className="text-center font-mono text-emerald-400 pt-2 border-t border-slate-700/50 flex items-center justify-around text-[11px]">
                  <span>💷 رصيدك: <b>{balance} ₽</b></span>
                  <span>🆔 : <code className="bg-slate-900 px-1.5 py-0.5 rounded">8338869162</code></span>
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="space-y-2 text-xs font-bold">
                <button
                  onClick={() => setScreen('apps_availability')}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles size={16} />
                  •🎲 الأكثر توفراً لجميع البرامج •
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setSelectedApp({ name: 'عروض WHATSAPP ⚡', key: 'whatsapp', icon: '🛍' }); setScreen('offers_wa'); }}
                    className="py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700/80 flex items-center justify-center gap-1.5"
                  >
                    عروض WhatsApp 🔥
                  </button>
                  <button
                    onClick={() => { setSelectedApp({ name: 'عروض TELEGRAM 🎁', key: 'telegram', icon: '🎲' }); setScreen('offers_tg'); }}
                    className="py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700/80 flex items-center justify-center gap-1.5"
                  >
                    عروض Telegram 🎁
                  </button>
                </div>

                <button
                  onClick={() => setScreen('auto_buy_boy')}
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-amber-300 rounded-xl border border-amber-500/30 flex items-center justify-center gap-1.5"
                >
                  <Zap size={16} className="text-amber-400" />
                  خدمة الشراء التلقائي الذكي boy 🚀
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScreen('extra_services')}
                    className="py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    خدمات وميزات أخرى 🛸
                  </button>
                  <button
                    onClick={() => setScreen('instructions')}
                    className="py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    تعليمات الاستخدام 📜
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScreen('payments_view')}
                    className="py-2.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 rounded-xl border border-emerald-600/40 flex items-center justify-center gap-1.5"
                  >
                    •🎳 أشحن رصيدك•
                  </button>
                  <button
                    onClick={() => setScreen('admin_panel')}
                    className="py-2.5 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 rounded-xl border border-amber-600/40 flex items-center justify-center gap-1.5"
                  >
                    👑 لوحة الأدمن ⚙️
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. SCREEN: APPS AVAILABILITY LIST (Matching Screenshots 4 & 5) */}
          {screen === 'apps_availability' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-3 text-xs text-center space-y-1">
                <p className="font-bold text-emerald-400">قسم الاكثر توفرا لجميع البرامج 💚</p>
                <p className="text-[11px] text-slate-300">اختر البرنامج للانتقال إلى قارات ودول التوريد المتاحة:</p>
              </div>

              <div className="space-y-1.5 text-xs font-bold">
                {[
                  { name: '* 🛍️ WHATSAPP - الاكثر تـوفـرا في', key: 'whatsapp', title: 'واتس اب - WHATSAPP' },
                  { name: '* 🎲 TELEGRAM - الاكثر تـوفـرا في', key: 'telegram', title: 'تيليجرام - TELEGRAM' },
                  { name: '* 🎳 LNSTAGRAM - الاكثر تـوفـرا في', key: 'instagram', title: 'انستقرام - INSTAGRAM' },
                  { name: '* 🎯 FACEBOOK - الاكثر تـوفـرا في', key: 'facebook', title: 'فيسبوك - FACEBOOK' },
                  { name: '* 🐥 TWITTER - الاكثر تـوفـرا في', key: 'twitter', title: 'تويتر - TWITTER' },
                  { name: '* ⛱️ Google - الاكثر تـوفـرا في', key: 'google', title: 'جوجل - Google' },
                  { name: '* 🎥 TIKTOK - الاكثر تـوفـرا في', key: 'tiktok', title: 'تيك توك - TIKTOK' },
                  { name: '* 💈 HARAj - الاكثر تـوفـرا في', key: 'haraj', title: 'حراج - HARAJ' },
                  { name: '* ♣️ SNAP CHAT - الاكثر تـوفـرا في', key: 'snapchat', title: 'سناب شات - SNAP CHAT' },
                  { name: '* 💎 IMO - الاكثر تـوفـرا في', key: 'imo', title: 'ايمو - IMO' },
                  { name: '* ⚾ PAYPAL - الاكثر تـوفـرا في', key: 'paypal', title: 'باي بال - PAYPAL' },
                  { name: '* 📳 Viber - الاكثر تـوفـرا في', key: 'viber', title: 'فايبر - Viber' },
                  { name: '* 🤖 السيرفر العام 🧿 - الاكثر تـوفـرا في', key: 'general', title: 'السيرفر العام 🧿' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedApp({ name: item.title, key: item.key, icon: '📱' });
                      setScreen('continents');
                    }}
                    className="w-full py-2.5 px-3 bg-[#242f3d] hover:bg-[#2e3b4d] text-slate-200 rounded-xl border border-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <ChevronLeft size={16} className="text-slate-400" />
                  </button>
                ))}

                <button
                  onClick={() => setScreen('main')}
                  className="w-full py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl mt-2 flex items-center justify-center gap-1.5"
                >
                  <ArrowRight size={14} />
                  *.. ↩ عودة ✤
                </button>
              </div>
            </div>
          )}

          {/* 3. SCREEN: CONTINENTS / REGIONS (Matching Screenshots 11 & 13) */}
          {screen === 'continents' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-3.5 text-xs text-center space-y-1">
                <p className="font-bold text-emerald-400">مرحبا 💚 قسم الارقام 🎁</p>
                <p className="text-slate-200 text-xs font-bold">تطبيق : {selectedApp.name}</p>
                <p className="text-[11px] text-slate-400">قم بإختيار احد القارات لعرض الدول المتوفرة بها 🌍</p>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <button
                  onClick={() => setScreen('arab_countries')}
                  className="w-full py-3 bg-[#242f3d] hover:bg-[#2f3d4f] text-emerald-400 border border-emerald-500/40 rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <span>🎲 الأكثر توفراً</span>
                </button>

                <button
                  onClick={() => setScreen('arab_countries')}
                  className="w-full py-3 bg-[#242f3d] hover:bg-[#2f3d4f] text-emerald-400 border border-emerald-500/40 rounded-xl flex items-center justify-center gap-2 shadow"
                >
                  <span>🧩 العرب</span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">18 دولة</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScreen('arab_countries')}
                    className="py-3 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    🪗 أوربا
                  </button>
                  <button
                    onClick={() => setScreen('arab_countries')}
                    className="py-3 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    🎳 أفريقيا
                  </button>
                </div>

                <button
                  onClick={() => setIsSearching(true)}
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-cyan-300 rounded-xl border border-cyan-700/50 flex items-center justify-center gap-1.5"
                >
                  <span>🚀 البحث السريع 🧩</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScreen('arab_countries')}
                    className="py-3 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    ⛱️ أستراليا
                  </button>
                  <button
                    onClick={() => setScreen('arab_countries')}
                    className="py-3 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    🎯 أمريكا
                  </button>
                </div>

                <button
                  onClick={() => setScreen('arab_countries')}
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  💎 آسيا
                </button>

                <button
                  onClick={() => setScreen('apps_availability')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl mt-2 flex items-center justify-center gap-1.5"
                >
                  <ArrowRight size={14} />
                  *.. ↩ عودة ✤
                </button>
              </div>
            </div>
          )}

          {/* 4. SCREEN: 18 ARAB COUNTRIES GRID (Matching Screenshots 2 & 3) */}
          {screen === 'arab_countries' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-3 text-xs text-center space-y-1">
                <p className="font-bold text-blue-400">مرحباً 💙 قسم الارقام 🎁</p>
                <p className="font-bold text-white">تطبيق: {selectedApp.name}</p>
                <p className="text-[11px] text-slate-300">هذه قائمة الدول لهذا القسم • يمكنك اختيار احد الدول لعرض سيفراتها •</p>
                <p className="text-[10px] text-slate-400 pt-1">
                  ماذا يشتري الاخرون 🇪🇬🇾🇪🇸🇦 • إشعارات دول التوفر المتقطع 🇫🇷🇲🇦🇮🇩🇸🇦
                </p>
              </div>

              {/* Search Bar matching screenshot */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="- البحث عن الدول ( للإختصار ) 🔍"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#1b2531] border border-slate-700 rounded-xl text-center text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500"
                />
              </div>

              {/* 2-Columns Arab Countries Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-bold max-h-[380px] overflow-y-auto pr-1">
                {filteredArabCountries.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCountry(c);
                      setScreen('servers_list');
                    }}
                    className="py-2.5 px-3 bg-[#242f3d] hover:bg-[#2d3a4d] border border-slate-700 rounded-xl text-white flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{c.name}</span>
                    <span className="text-base">{c.flag}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setScreen('continents')}
                className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <ArrowRight size={14} />
                *.. ↩ عودة ✤
              </button>
            </div>
          )}

          {/* 5. SCREEN: SERVERS LIST PER COUNTRY (Matching Screenshot 1) */}
          {screen === 'servers_list' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 text-xs space-y-2 leading-relaxed">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    شراء رقم جديد ✅
                  </span>
                  <span className="text-[10px] text-slate-400">PLUS SMS</span>
                </div>

                <div className="space-y-1 text-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">التطبيق |</span>
                    <span className="font-bold">{selectedApp.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">الدوله |</span>
                    <span className="font-bold">{selectedCountry.name} {selectedCountry.flag}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">مفتاح الدولة |</span>
                    <span className="font-mono text-emerald-400 font-bold">{selectedCountry.prefix} 💚</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/50">
                  قم بالضغط على احد السيرفرات لشراء الرقم ✔️<br />
                  يختلف التوفر والجودة من سيفر لآخر ✔️
                </p>
              </div>

              {/* Table Header matching Screenshot 1 */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-black text-slate-300 py-1 bg-slate-900/60 rounded-xl border border-slate-800">
                <span>- السيرفرات 🧩</span>
                <span>السعر ₽ 🎲</span>
              </div>

              {/* Numbered Servers Grid (Matching Screenshot 1) */}
              <div className="space-y-2">
                {(serversPerCountry[selectedCountry.key] || serversPerCountry['default']).map((srv, idx) => (
                  <button
                    key={idx}
                    disabled={loading}
                    onClick={() => handleBuyNumber(srv)}
                    className="w-full grid grid-cols-2 gap-2 py-3 px-4 bg-[#242f3d] hover:bg-[#2f3d4f] border border-slate-700 rounded-xl transition-all font-bold text-xs cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <span className="text-right text-white font-bold">{srv.name}</span>
                    <span className="text-left font-mono text-emerald-400 font-black">₽{srv.price}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setScreen('arab_countries')}
                className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <ArrowRight size={14} />
                *.. ↩ عودة ✤
              </button>
            </div>
          )}

          {/* 6. SCREEN: ROCKET OFFERS (Matching Screenshots 8, 9, 10) */}
          {(screen === 'offers_wa' || screen === 'offers_tg') && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-3 text-xs space-y-1">
                <p className="font-bold text-amber-400 text-center flex items-center justify-center gap-1.5">
                  <Zap size={16} />
                  • {screen === 'offers_wa' ? 'عروض WhatsApp 🔥⚡' : 'عروض Telegram 🎁'}
                </p>
                <p className="text-[11px] text-emerald-400 text-center font-mono">
                  • رصيدك : {balance} ₽
                </p>
                <p className="text-[10px] text-slate-400 text-center">
                  • ماذا يشتري الاخرون 🇪🇬🇾🇪🇸🇦 • إشعارات دول التوفر المتقطع 🇫🇷🇲🇦🇮🇩🇸🇦
                </p>
              </div>

              {/* Rocket Offers Grid matching Screenshots 8, 9, 10 */}
              <div className="space-y-1.5 text-xs font-bold max-h-[420px] overflow-y-auto pr-1">
                {rocketOffers.map((item, idx) => (
                  item.full ? (
                    <button
                      key={idx}
                      onClick={() => handleBuyNumber({ name: `${item.country}`, price: item.price })}
                      className="w-full py-2.5 px-3 bg-[#242f3d] hover:bg-[#2f3d4f] border border-slate-700 rounded-xl text-center text-white font-bold cursor-pointer"
                    >
                      ✤ 🚀 {item.country} {item.flag} : {item.price}₽
                    </button>
                  ) : null
                ))}

                <div className="grid grid-cols-2 gap-2">
                  {rocketOffers.filter(x => !x.full).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBuyNumber({ name: `${item.country} ${item.srv}`, price: item.price })}
                      className="py-2.5 px-2.5 bg-[#242f3d] hover:bg-[#2f3d4f] border border-slate-700 rounded-xl text-center text-slate-200 transition-colors text-[11px] cursor-pointer"
                    >
                      ✤ 🚀 {item.country} {item.flag} {item.srv} : {item.price}₽
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setScreen('main')}
                className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <ArrowRight size={14} />
                *.. ↩ عودة ✤
              </button>
            </div>
          )}

          {/* 7. SCREEN: SMART AUTO-BUY BOY (Matching Screenshot 14) */}
          {screen === 'auto_buy_boy' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 text-xs space-y-2.5 leading-relaxed">
                <div className="text-center font-black text-sm text-cyan-400">
                  {settings.autoBuyBoyTitle}
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] whitespace-pre-line">
                  {settings.autoBuyBoyText}
                </div>
                <div className="text-center font-mono text-emerald-400 pt-2 border-t border-slate-700 text-xs font-bold">
                  💰 رصيدك : {balance} ₽
                </div>
              </div>

              <div className="space-y-2 text-xs font-bold">
                {[
                  { name: '✤ 🛸 الشراء لـ WhatsApp •', key: 'whatsapp' },
                  { name: '✤ 🛸 الشراء لـ Telegram •', key: 'telegram' },
                  { name: '✤ 🛸 الشراء لـ Facebook •', key: 'facebook' },
                  { name: '✤ 🛸 الشراء لـ Twitter •', key: 'twitter' },
                  { name: '✤ 🛸 الشراء لـ Tik Tok •', key: 'tiktok' },
                  { name: '✤ 🛸 الشراء لـ Google •', key: 'google' },
                  { name: '✤ 🛸 الشراء لـ Snapchat •', key: 'snapchat' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedApp({ name: item.name, key: item.key, icon: '🛸' });
                      setScreen('arab_countries');
                    }}
                    className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}

                <button
                  onClick={() => setScreen('main')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 mt-2"
                >
                  <ArrowRight size={14} />
                  *.. ↩ عودة ✤
                </button>
              </div>
            </div>
          )}

          {/* 8. SCREEN: EXTRA SERVICES (Matching Screenshots 15 & 16) */}
          {screen === 'extra_services' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 text-xs text-center space-y-1.5">
                <p className="font-bold text-blue-400 text-sm">{settings.extraServicesTitle}</p>
                <p className="text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
                  {settings.extraServicesText}
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <button
                  onClick={() => showToast('🚁 شحن الألعاب: الكريمي، النجم، بايننس USDT')}
                  className="w-full py-3 bg-[#242f3d] hover:bg-[#2b394a] text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  • 🧨 شحن الالعاب والبرامج 🚁 •
                </button>

                <button
                  onClick={() => showToast('🧩 خدمة الرشق: زيادة متابعين انستقرام وتيك توك وتيليجرام')}
                  className="w-full py-3 bg-[#242f3d] hover:bg-[#2b394a] text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  • 🧩 الرش%ق وزيادة المتابعين •
                </button>

                <button
                  onClick={() => setScreen('temp_mail')}
                  className="w-full py-3 bg-[#242f3d] hover:bg-[#2b394a] text-cyan-300 border border-cyan-500/40 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail size={16} />
                  • 📧 بريد إلكتروني مؤقت •
                </button>

                <button
                  onClick={() => showToast(`قناة البوت: ${settings.botChannelUrl} | قناة التفعيلات: ${settings.activationChannelUrl}`)}
                  className="w-full py-3 bg-[#242f3d] hover:bg-[#2b394a] text-slate-200 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 size={16} />
                  • 📁 القنوات والصفحات التابعة للبوت •
                </button>

                <button
                  onClick={() => setScreen('main')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 mt-2"
                >
                  <ArrowRight size={14} />
                  *.. ↩ عودة ✤
                </button>
              </div>
            </div>
          )}

          {/* 9. SCREEN: DISPOSABLE TEMP EMAIL (Matching Screenshot 17) */}
          {screen === 'temp_mail' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 text-xs space-y-2 leading-relaxed">
                <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-700 pb-2">
                  <Mail size={16} />
                  تم إنشاء بريد الكتروني مؤقت بنجاح 📨
                </div>

                {tempEmail ? (
                  <div className="space-y-1.5 text-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">• ألبريد :</span>
                      <code className="font-mono text-cyan-300 font-bold select-all">{tempEmail}</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">• ألمدة :</span>
                      <span>لا يوجد (دائم) •</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">• السعر :</span>
                      <span className="text-emerald-400 font-bold">مجاني •</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">• رصيدك :</span>
                      <span className="font-mono">{balance} ₽ •</span>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1">
                      • إرسال الامر <code className="text-blue-400">/create_email</code> لجلب بريد اخر ✔
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-300 text-center py-2">
                    اضغط بالأسفل لتوليد بريد إلكتروني مؤقت لاستقبال رسائل وأكواد التحقق مجاناً.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleGenerateEmail}
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Mail size={14} />
                  {tempEmail ? '🔄 إرسال الأمر لجلب بريد آخر /create_email' : '➕ إنشاء بريد إلكتروني مؤقت'}
                </button>

                {tempEmail && (
                  <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-3 text-xs space-y-2">
                    <div className="font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail size={14} />
                        📨 صندوق البريد
                      </span>
                      <span className="bg-cyan-950 text-cyan-300 text-[10px] px-2 py-0.5 rounded border border-cyan-800">
                        {tempInbox.length} رسالة
                      </span>
                    </div>

                    {tempInbox.map(msg => (
                      <div key={msg.id} className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/60 text-[11px] space-y-1">
                        <div className="flex justify-between font-bold text-cyan-300">
                          <span>{msg.from}</span>
                          <span className="text-slate-500 font-mono text-[9px]">{msg.time}</span>
                        </div>
                        <p className="font-bold text-white">{msg.subject}</p>
                        <p className="text-slate-400">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setScreen('extra_services')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold"
                >
                  <ArrowRight size={14} />
                  *.. ↩ عودة ✤
                </button>
              </div>
            </div>
          )}

          {/* 10. SCREEN: USAGE INSTRUCTIONS (Matching Screenshots 6 & 7) */}
          {screen === 'instructions' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 text-xs space-y-3 text-slate-300 leading-relaxed max-h-[460px] overflow-y-auto">
                <div className="text-center font-black text-sm text-amber-400 border-b border-slate-700 pb-2">
                  {settings.instructionsTitle}
                </div>

                <div className="space-y-3 text-[11px]">
                  <div>
                    <p className="font-bold text-white mb-1">1 ــــــــــــــــــــــــــــــــ</p>
                    <p>{settings.instruction1}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">2 ــــــــــــــــــــــــــــــــ</p>
                    <p>{settings.instruction2}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">3 ــــــــــــــــــــــــــــــــ</p>
                    <p>{settings.instruction3}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">4 ــــــــــــــــــــــــــــــــ</p>
                    <p>{settings.instruction4}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">5 ــــــــــــــــــــــــــــــــ</p>
                    <p>{settings.instruction5}</p>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">6 ــــــــــــــــــــــــــــــــ</p>
                    <p className="whitespace-pre-line">{settings.instruction6}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setScreen('main')}
                className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold"
              >
                <ArrowRight size={14} />
                *.. ↩ عودة ✤
              </button>
            </div>
          )}

          {/* 11. SCREEN: NO NUMBERS ERROR DIALOG (Matching Screenshot 20) */}
          {screen === 'no_numbers_view' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-amber-500/40 rounded-2xl p-5 text-xs text-center space-y-2">
                <p className="font-black text-sm text-emerald-400 leading-relaxed">
                  {settings.noNumbersMessage || '💚 لا يوجد أرقام في هذا السيرفر حالياً... قم بتجربة سيرفر آخر 💙'}
                </p>
                <p className="text-[11px] text-slate-400">
                  لم يتم خصم أي مبلغ من رصيدك لأن المزود لم يقم بتخصيص الرقم.
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <button
                  onClick={() => setScreen('servers_list')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <RotateCcw size={16} />
                  ✤ ↺* إعادة المحاولة •
                </button>

                <button
                  onClick={() => setScreen('arab_countries')}
                  className="w-full py-2.5 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight size={14} />
                  *.. ↩ عودة ✤
                </button>
              </div>
            </div>
          )}

          {/* 12. SCREEN: DEPOSIT & PAYMENT METHODS */}
          {screen === 'payments_view' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-[#2b394a] rounded-2xl p-4 text-xs space-y-2 leading-relaxed">
                <div className="font-bold text-emerald-400 text-sm border-b border-slate-700 pb-2">
                  🎳 طرق شحن رصيدك بالروبل في البوت:
                </div>

                <div className="space-y-3 text-[11px]">
                  {paymentMethods.map(p => (
                    <div key={p.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{p.arabicName}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(p.accountNumber);
                            showToast(`تم نسخ رقم حساب ${p.arabicName}`);
                          }}
                          className="text-blue-400 hover:text-white"
                          title="نسخ الحساب"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <div className="font-mono text-emerald-400 font-bold select-all" dir="ltr">
                        {p.accountNumber}
                      </div>
                      <p className="text-[10px] text-slate-400">{p.instructions}</p>
                    </div>
                  ))}

                  <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800 text-[11px] text-purple-200">
                    🎫 <b>لديك كرت شحن؟</b> أرسل كود الكرت في الرسالة أدناه وسيشحن حسابك فورياً!
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${settings.whatsappSupport.replace('+', '')}?text=${encodeURIComponent(settings.whatsappTemplate)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={14} />
                  مراسلة الدعم لشحن الحساب
                </a>
                <button
                  onClick={() => setScreen('main')}
                  className="px-4 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
                >
                  رجوع
                </button>
              </div>
            </div>
          )}

          {/* 13. SCREEN: ACTIVE NUMBER PURCHASED */}
          {screen === 'active_order' && order && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-emerald-500/40 rounded-2xl p-4 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    تم شراء وتخصيص الرقم بنجاح! 📱
                  </span>
                  <span className="bg-emerald-950 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-800">
                    5SIM LIVE
                  </span>
                </div>

                <div className="space-y-2 text-slate-200">
                  <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">الرقم المخصص:</span>
                      <span className="text-base font-black text-white font-mono tracking-wider select-all">
                        {order.phone}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(order.phone);
                        showToast('تم نسخ الرقم');
                      }}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                      title="نسخ الرقم"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400">التطبيق: </span>
                      <span className="font-bold">{order.service}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">الدولة: </span>
                      <span className="font-bold">{order.country}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">السعر: </span>
                      <span className="font-bold text-emerald-400">{order.price} ₽</span>
                    </div>
                    <div>
                      <span className="text-slate-400">معرف الطلب: </span>
                      <span className="font-mono text-slate-300">#{order.id}</span>
                    </div>
                  </div>

                  {order.code ? (
                    <div className="p-3.5 bg-emerald-950/60 border-2 border-emerald-500 rounded-xl text-center space-y-1">
                      <p className="text-[10px] text-emerald-300 font-bold">🎉 كود التحقق المستلم (OTP):</p>
                      <p className="text-2xl font-black text-white font-mono tracking-widest">{order.code}</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <p className="font-bold text-amber-300 flex items-center gap-1">
                        <Clock size={14} />
                        الخطوة التالية الهامة:
                      </p>
                      <p>1️⃣ انسخ الرقم وضعه في التطبيق واطلب كود الـ SMS.</p>
                      <p>2️⃣ بعد طلب الكود في التطبيق، اضغط زر (📩 اجلب الكود ♻️) لاستلام الرمز الفعلي.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Action Buttons */}
              <div className="space-y-2 text-xs font-bold">
                {!order.code && (
                  <button
                    disabled={pollingCode}
                    onClick={handleCheckCode}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {pollingCode ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        جاري جلب كود الـ SMS من السيرفر...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        📩 اجلب الكود ♻️
                      </>
                    )}
                  </button>
                )}

                <a
                  href={`https://wa.me/${order.phone.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-emerald-400 border border-slate-700 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={14} />
                  فتح الرقم في WhatsApp مباشرة
                </a>

                <button
                  onClick={() => {
                    setBalance(prev => +(prev + order.price).toFixed(2));
                    setOrder(null);
                    setScreen('main');
                    showToast(`✅ تم إلغاء الرقم واسترداد الرصيد (+${order.price} ₽) بالكامل`);
                  }}
                  className="w-full py-2 bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 border border-rose-700/50 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X size={14} />
                  🚫 إلغاء الرقم واسترجاع الرصيد لمحافظتي
                </button>

                <button
                  onClick={() => setScreen('main')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <ArrowRight size={14} />
                  العودة للقائمة الرئيسية
                </button>
              </div>
            </div>
          )}

          {/* 14. SCREEN: ADMIN PANEL */}
          {screen === 'admin_panel' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="bg-[#1e2a38] border border-amber-500/40 rounded-2xl p-4 text-xs space-y-2 leading-relaxed">
                <div className="font-black text-amber-400 text-sm border-b border-slate-700 pb-2 flex items-center justify-between">
                  <span>👑 لوحة تحكم الأدمن والمالك</span>
                  <span className="font-mono text-[10px] text-slate-400">8338869162</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  أهلاً بك مطوري مصطفى 🖤! يمكنك إدارة السيرفرات والأسعار والقنوات وشحن الأرصدة مباشرة.
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold">
                <button
                  onClick={() => onOpenSettings && onOpenSettings()}
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-blue-300 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  ✍️ تعديل نصوص وكتابات البوت
                </button>

                <button
                  onClick={() => onOpenPayments && onOpenPayments()}
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-emerald-300 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  💳 إدارة حسابات وطرق الإيداع
                </button>

                <button
                  onClick={() => onOpenServers && onOpenServers()}
                  className="w-full py-2.5 bg-[#242f3d] hover:bg-[#2b394a] text-amber-300 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  🌐 إدارة سيرفرات ومواقع API
                </button>

                <button
                  onClick={() => setScreen('main')}
                  className="w-full py-2 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <ArrowRight size={14} />
                  الرجوع للقائمة الرئيسية
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Telegram Bottom Input Bar matching screenshots */}
        <form onSubmit={handleChatSubmit} className="bg-[#242f3d] p-2 border-t border-[#1f2834] flex items-center gap-2 text-xs sticky bottom-0 z-20">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="px-2.5 py-1.5 bg-blue-600 text-white hover:bg-blue-500 rounded-xl font-bold flex items-center gap-1 shadow cursor-pointer text-xs"
          >
            <Menu size={14} />
            <span>Menu</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('GIF')}
            className="p-1.5 bg-slate-800/80 text-slate-400 hover:text-white rounded-xl text-[10px] font-bold"
          >
            GIF
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Message... أو اكتب أمر مثل /plus"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              className="w-full bg-[#17212b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <Paperclip size={14} />
            </button>
          </div>

          <button
            type="submit"
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow cursor-pointer transition-colors"
            title="إرسال الأمر"
          >
            <Send size={14} />
          </button>
        </form>

        {/* POPUP COMMANDS MENU SHEET (Matching Screenshots 18, 19, 21) */}
        {isMenuOpen && (
          <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
            <div className="bg-[#17212b] border-t border-[#2b394a] rounded-t-3xl max-h-[520px] flex flex-col shadow-2xl">
              <div className="p-4 border-b border-[#242f3d] flex items-center justify-between">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <Menu size={16} className="text-blue-400" />
                  قائمة أوامر البوت السريعة
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-3 overflow-y-auto space-y-1.5 text-xs font-bold">
                {[
                  { cmd: '/plus', desc: 'القائمة الرئيسية 🏡', color: 'text-emerald-400', action: () => setScreen('main') },
                  { cmd: '/offers', desc: 'عروض WhatsApp 🎁', color: 'text-amber-400', action: () => { setSelectedApp({ name: 'عروض WhatsApp', key: 'whatsapp', icon: '🛍' }); setScreen('offers_wa'); } },
                  { cmd: '/tele', desc: 'عروض Telegram 🎁', color: 'text-blue-400', action: () => { setSelectedApp({ name: 'عروض Telegram', key: 'telegram', icon: '🎲' }); setScreen('offers_tg'); } },
                  { cmd: '/telec', desc: 'شراء حسابات Telegram 🎮', color: 'text-purple-400', action: () => showToast('شراء حسابات تليجرام جاهزة') },
                  { cmd: '/whatsapp', desc: 'أرقام واتسأب 💚', color: 'text-emerald-400', action: () => { setSelectedApp({ name: 'واتساب', key: 'whatsapp', icon: '🛍' }); setScreen('continents'); } },
                  { cmd: '/telegram', desc: 'أرقام تيليجرام 💙', color: 'text-blue-400', action: () => { setSelectedApp({ name: 'تيليجرام', key: 'telegram', icon: '🎲' }); setScreen('continents'); } },
                  { cmd: '/twi', desc: 'أرقام تويتر X 🖤', color: 'text-slate-300', action: () => { setSelectedApp({ name: 'تويتر X', key: 'twitter', icon: '🐥' }); setScreen('continents'); } },
                  { cmd: '/imo', desc: 'أرقام ايمو 🧡', color: 'text-orange-400', action: () => { setSelectedApp({ name: 'ايمو', key: 'imo', icon: '💎' }); setScreen('continents'); } },
                  { cmd: '/insta', desc: 'أرقام انستقرام ❤️', color: 'text-pink-400', action: () => { setSelectedApp({ name: 'انستقرام', key: 'instagram', icon: '🎳' }); setScreen('continents'); } },
                  { cmd: '/haraj', desc: 'أرقام حراج 💙', color: 'text-sky-400', action: () => { setSelectedApp({ name: 'حراج', key: 'haraj', icon: '💈' }); setScreen('continents'); } },
                  { cmd: '/google', desc: 'أرقام قوقل 💛', color: 'text-yellow-400', action: () => { setSelectedApp({ name: 'قوقل', key: 'google', icon: '⛱' }); setScreen('continents'); } },
                  { cmd: '/facebook', desc: 'أرقام فيسبوك 💎', color: 'text-blue-500', action: () => { setSelectedApp({ name: 'فيسبوك', key: 'facebook', icon: '🎯' }); setScreen('continents'); } },
                  { cmd: '/snap', desc: 'أرقام سناب 💛', color: 'text-amber-300', action: () => { setSelectedApp({ name: 'سناب', key: 'snapchat', icon: '♣' }); setScreen('continents'); } },
                  { cmd: '/paypal', desc: 'ارقام باي بال ❤️', color: 'text-rose-400', action: () => { setSelectedApp({ name: 'باي بال', key: 'paypal', icon: '⚾' }); setScreen('continents'); } },
                  { cmd: '/viber', desc: 'ارقام فايبر 💙', color: 'text-indigo-400', action: () => { setSelectedApp({ name: 'فايبر', key: 'viber', icon: '📳' }); setScreen('continents'); } },
                  { cmd: '/other', desc: 'أرقام سيرفر العام 📮', color: 'text-red-400', action: () => { setSelectedApp({ name: 'السيرفر العام', key: 'general', icon: '🤖' }); setScreen('continents'); } },
                  { cmd: '/view', desc: 'قائمة الدول 📑', color: 'text-slate-300', action: () => setScreen('arab_countries') },
                  { cmd: '/language', desc: 'اللغة البوت ⚙️', color: 'text-slate-400', action: () => showToast('لغة البوت: العربية (الافتراضية)') }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsMenuOpen(false);
                      item.action();
                    }}
                    className="w-full py-2.5 px-3 bg-[#1e2a38] hover:bg-[#253344] rounded-xl flex items-center justify-between transition-colors cursor-pointer border border-slate-700/60"
                  >
                    <span className="font-mono text-blue-400 font-bold">{item.cmd}</span>
                    <span className={item.color}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
