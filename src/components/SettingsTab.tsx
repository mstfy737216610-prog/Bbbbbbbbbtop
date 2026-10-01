import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  MessageSquare, 
  Radio, 
  ShieldCheck, 
  Share2, 
  Smartphone,
  CheckCircle2,
  DollarSign,
  FileText,
  HelpCircle,
  Zap,
  Info,
  Layers,
  Sparkles,
  Edit3
} from 'lucide-react';

interface SettingsData {
  botName: string;
  accountTitle: string;
  usersCount: string;
  welcomeMessage: string;
  botFooterText: string;
  autoBuyBoyTitle: string;
  autoBuyBoyText: string;
  extraServicesTitle: string;
  extraServicesText: string;
  instructionsTitle: string;
  instruction1: string;
  instruction2: string;
  instruction3: string;
  instruction4: string;
  instruction5: string;
  instruction6: string;
  noNumbersMessage: string;
  botToken: string;
  adminId: string;
  adminUsername: string;
  channelsDescription: string;
  botChannelName: string;
  botChannelUrl: string;
  activationChannelName: string;
  activationChannelUrl: string;
  whatsappSupport: string;
  whatsappTemplate: string;
  exchangeRateUsdToRub: number;
  referralRewardRub: number;
  minimumTransferRub: number;
  simEmail: string;
  simUserId: number;
  simToken: string;
  simBaseUrl: string;
}

export default function SettingsTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error') => void }) {
  const [activeSection, setActiveSection] = useState<'general' | 'texts' | 'instructions' | 'autobuy' | 'support' | 'channels'>('general');
  const [settings, setSettings] = useState<SettingsData>({
    botName: 'PLUS SMS Hub Bot',
    accountTitle: 'مكتب الإبداع',
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
    botToken: '8784070781:AAEwYjXS43ZG_vdm-PTnM9eUxSnJafnhkfo',
    adminId: '8338869162',
    adminUsername: 'Engku8',
    channelsDescription: 'يرجى الاشتراك في قنوات التحديثات والتفعيلات الرسمية لاستخدام البوت.',
    botChannelName: 'قناة البوت الرسمية',
    botChannelUrl: 'https://t.me/sms_com_bot',
    activationChannelName: 'قناة التفعيلات المباشرة',
    activationChannelUrl: 'https://t.me/pilotoooo',
    whatsappSupport: '+967770000000',
    whatsappTemplate: 'مرحباً، أود شحن رصيدي بالروبل في بوت PLUS SMS Hub',
    exchangeRateUsdToRub: 92.5,
    referralRewardRub: 0.25,
    minimumTransferRub: 5,
    simEmail: 'mstfy737216610@gmail.com',
    simUserId: 4437001,
    simToken: '',
    simBaseUrl: 'https://5sim.net/v1'
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/store/settings');
      const data = await res.json();
      if (data && typeof data === 'object') {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/store/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        showToast('✅ تم حفظ وتطبيق كافة النصوص والبيانات فورياً على البوت والمحاكي!', 'success');
      } else {
        showToast('❌ تعذر حفظ التعديلات', 'error');
      }
    } catch (err: any) {
      showToast(`خطأ: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400">
        <RefreshCw className="animate-spin mr-3 text-blue-500" size={24} />
        جاري جلب إعدادات ونصوص البوت...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
            <Edit3 size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">محرر النصوص والكتابات الشامل (CMS Studio)</h2>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                تحكم فوري 100%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تغيير أي اسم أو كتابة أو نص يظهر للعملاء في البوت والمحاكي، من رسالة الترحيب حتى بنود التعليمات وقنوات الدعم
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSettings}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
            title="تحديث البيانات"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-bold">
        {[
          { id: 'general', label: 'البيانات وهوية المكتب', icon: ShieldCheck },
          { id: 'texts', label: 'رسائل الترحيب والشاشات', icon: FileText },
          { id: 'instructions', label: 'بنود تعليمات الاستخدام (1 - 6)', icon: HelpCircle },
          { id: 'autobuy', label: 'خدمة boy الذكية والخدمات', icon: Zap },
          { id: 'support', label: 'الدعم ورسائل الواتساب', icon: MessageSquare },
          { id: 'channels', label: 'قنوات الاشتراك والعمولات', icon: Radio }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: GENERAL IDENTITY */}
        {activeSection === 'general' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 animate-in fade-in">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="text-blue-400" size={18} />
              هوية البوت والمكتب الظاهر للزبائن
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  اسم الحساب والمكتب (الظاهر أعلى كل رسالة مثل: مكتب الإبداع):
                </label>
                <input
                  type="text"
                  value={settings.accountTitle}
                  onChange={e => setSettings({ ...settings, accountTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:border-blue-500 transition-colors"
                  placeholder="مكتب الإبداع"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">يظهر كـ: 💙 مرحباً مكتب الإبداع 💙</span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  اسم البوت الرسمي:
                </label>
                <input
                  type="text"
                  value={settings.botName}
                  onChange={e => setSettings({ ...settings, botName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
                  placeholder="PLUS SMS Hub Bot"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  تذييل البوت وخاتمة الرسائل:
                </label>
                <input
                  type="text"
                  value={settings.botFooterText}
                  onChange={e => setSettings({ ...settings, botFooterText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white font-mono outline-none focus:border-blue-500"
                  placeholder="•|_____(PLUS SMS)_____|•"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  عدد المستخدمين المعروض في ترويسة البوت:
                </label>
                <input
                  type="text"
                  value={settings.usersCount}
                  onChange={e => setSettings({ ...settings, usersCount: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-emerald-400 font-mono font-bold outline-none focus:border-blue-500"
                  placeholder="3,232"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  أيدي المالك الرسمي للبوت (Telegram ID):
                </label>
                <input
                  type="text"
                  value={settings.adminId}
                  onChange={e => setSettings({ ...settings, adminId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-blue-400 font-mono font-bold outline-none focus:border-blue-500"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  معرف حساب المالك على تيليجرام:
                </label>
                <input
                  type="text"
                  value={settings.adminUsername}
                  onChange={e => setSettings({ ...settings, adminUsername: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white font-mono outline-none focus:border-blue-500"
                  dir="ltr"
                  placeholder="Engku8"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: WELCOME & SCREEN TEXTS */}
        {activeSection === 'texts' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 animate-in fade-in">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="text-indigo-400" size={18} />
              رسائل الترحيب والشاشات الرئيسية وتنبيهات السيرفر
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  رسالة الترحيب والشرح في قسم الأكثر توفراً:
                </label>
                <textarea
                  rows={3}
                  value={settings.welcomeMessage}
                  onChange={e => setSettings({ ...settings, welcomeMessage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  رسالة التنبيه عند عدم توفر أرقام في سيرفر معين (تطابق سكرين شوت 20):
                </label>
                <textarea
                  rows={2}
                  value={settings.noNumbersMessage}
                  onChange={e => setSettings({ ...settings, noNumbersMessage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-sm text-amber-300 font-bold outline-none focus:border-blue-500 leading-relaxed"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">تظهر في نافذة الحوار عند نفاذ الأرقام بالسيرفر المختار.</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: INSTRUCTIONS & RULES */}
        {activeSection === 'instructions' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <HelpCircle className="text-amber-400" size={18} />
                بنود تعليمات الاستخدام والشروط (1 إلى 6) - سكرين شوت 6 و 7
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">البند رقم 1 (إضافة الرصيد):</label>
                <textarea
                  rows={2}
                  value={settings.instruction1}
                  onChange={e => setSettings({ ...settings, instruction1: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">البند رقم 2 (طريقة تسجيل الرقم وطلب SMS):</label>
                <textarea
                  rows={3}
                  value={settings.instruction2}
                  onChange={e => setSettings({ ...settings, instruction2: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">البند رقم 3 (وقت الانتظار ودقيقتين لاسترجاع الرصيد):</label>
                <textarea
                  rows={2}
                  value={settings.instruction3}
                  onChange={e => setSettings({ ...settings, instruction3: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">البند رقم 4 (خاصية التحقق بدون طلب رسالة):</label>
                <textarea
                  rows={3}
                  value={settings.instruction4}
                  onChange={e => setSettings({ ...settings, instruction4: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">البند رقم 5 (شراء رقم مسجل مسبقاً):</label>
                <textarea
                  rows={2}
                  value={settings.instruction5}
                  onChange={e => setSettings({ ...settings, instruction5: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">البند رقم 6 (الخاتمة والدعم #Support):</label>
                <textarea
                  rows={2}
                  value={settings.instruction6}
                  onChange={e => setSettings({ ...settings, instruction6: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: AUTOBUY & EXTRA SERVICES */}
        {activeSection === 'autobuy' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 animate-in fade-in">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Zap className="text-amber-400" size={18} />
              نصوص خدمة الشراء التلقائي الذكي boy وقسم الخدمات الأخرى
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان خدمة boy الذكية:</label>
                <input
                  type="text"
                  value={settings.autoBuyBoyTitle}
                  onChange={e => setSettings({ ...settings, autoBuyBoyTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نقاط وتفاصيل عمل خدمة boy (سكرين شوت 14):</label>
                <textarea
                  rows={6}
                  value={settings.autoBuyBoyText}
                  onChange={e => setSettings({ ...settings, autoBuyBoyText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800">
                <label className="block text-slate-300 font-bold mb-1">عنوان قسم خدمات وميزات أخرى (سكرين شوت 15):</label>
                <input
                  type="text"
                  value={settings.extraServicesTitle}
                  onChange={e => setSettings({ ...settings, extraServicesTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">وصف قسم الخدمات الأخرى:</label>
                <textarea
                  rows={3}
                  value={settings.extraServicesText}
                  onChange={e => setSettings({ ...settings, extraServicesText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: SUPPORT & WHATSAPP */}
        {activeSection === 'support' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 animate-in fade-in">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <MessageSquare className="text-emerald-400" size={18} />
              بيانات الدعم الفني وشحن الأرصدة عبر واتساب وتيليجرام
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  رقم واتساب الدعم الفني للشحن (مع مفتاح الدولة):
                </label>
                <input
                  type="text"
                  value={settings.whatsappSupport}
                  onChange={e => setSettings({ ...settings, whatsappSupport: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-emerald-400 font-mono outline-none"
                  dir="ltr"
                  placeholder="+967770000000"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  نص الرسالة التلقائية في واتساب عند ضغط العميل على شحن:
                </label>
                <input
                  type="text"
                  value={settings.whatsappTemplate}
                  onChange={e => setSettings({ ...settings, whatsappTemplate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  placeholder="مرحباً، أود شحن رصيدي بالروبل في بوت PLUS SMS Hub"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: CHANNELS & COMMISSIONS */}
        {activeSection === 'channels' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-5 animate-in fade-in">
            <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Radio className="text-purple-400" size={18} />
              القنوات الرسمية وعمولات الإحالة وسعر الصرف
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">قناة البوت الرسمية (الاسم والرابط):</label>
                <input
                  type="text"
                  value={settings.botChannelName}
                  onChange={e => setSettings({ ...settings, botChannelName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white mb-2"
                />
                <input
                  type="text"
                  value={settings.botChannelUrl}
                  onChange={e => setSettings({ ...settings, botChannelUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-blue-400 font-mono"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">قناة التفعيلات المباشرة (الاسم والرابط):</label>
                <input
                  type="text"
                  value={settings.activationChannelName}
                  onChange={e => setSettings({ ...settings, activationChannelName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white mb-2"
                />
                <input
                  type="text"
                  value={settings.activationChannelUrl}
                  onChange={e => setSettings({ ...settings, activationChannelUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-blue-400 font-mono"
                  dir="ltr"
                />
              </div>

              <div className="col-span-full">
                <label className="block text-slate-300 font-bold mb-1">وصف رسالة الاشتراك الإجباري المعروضة للزبائن:</label>
                <textarea
                  rows={2}
                  value={settings.channelsDescription}
                  onChange={e => setSettings({ ...settings, channelsDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-slate-200 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">مكافأة الإحالة لكل صديق (بالروبل ₽):</label>
                <input
                  type="number"
                  step="0.05"
                  value={settings.referralRewardRub}
                  onChange={e => setSettings({ ...settings, referralRewardRub: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">سعر صرف الدولار مقابل الروبل (USD to RUB):</label>
                <input
                  type="number"
                  step="0.5"
                  value={settings.exchangeRateUsdToRub}
                  onChange={e => setSettings({ ...settings, exchangeRateUsdToRub: parseFloat(e.target.value) || 92 })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-bold font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button */}
        <div className="sticky bottom-6 z-30">
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-2xl font-black text-sm shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 transition-all cursor-pointer border border-white/10"
          >
            {saving ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                جاري حفظ وتطبيق التعديلات الحية فورياً...
              </>
            ) : (
              <>
                <Save size={20} />
                حفظ وتطبيق التعديلات على البوت والمحاكي فورياً ✅
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
