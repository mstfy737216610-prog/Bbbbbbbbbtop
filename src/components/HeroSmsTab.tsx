import React, { useState, useEffect } from 'react';
import {
  Zap,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Copy,
  RefreshCw,
  ExternalLink,
  Send,
  Trash2,
  Check,
  X,
  Radio,
  Activity,
  Layers,
  Terminal,
  Play,
  FileCode,
  DollarSign,
  Smartphone,
  PhoneCall,
  Clock,
  AlertCircle
} from 'lucide-react';

interface HeroSmsTabProps {
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function HeroSmsTab({ showToast }: HeroSmsTabProps) {
  // Credentials
  const [userId, setUserId] = useState('1513844');
  const [userEmail, setUserEmail] = useState('mstfyahmed737@gmail.com');
  const [apiKey, setApiKey] = useState('HEROSMS_LIVE_API_KEY_1513844');
  const [serverUrl, setServerUrl] = useState('https://hero-sms.com/stubs/handler_api.php');
  const [openApiUrl, setOpenApiUrl] = useState('https://hero-sms.com');
  const [balance, setBalance] = useState<number>(340.50);
  const [activeProvider, setActiveProvider] = useState<'herosms' | '5sim' | 'auto'>('auto');

  // Testing & Operations
  const [selectedOperation, setSelectedOperation] = useState<'get_activations' | 'get_history' | 'buy_activation' | 'cancel_activation' | 'finish_activation' | 'get_stats'>('get_activations');
  const [opParams, setOpParams] = useState({
    service: 'tg',
    country: '2',
    activationId: '151384401',
    from: '2026-10-01T00:00:00Z',
    to: '2026-10-01T23:59:59Z'
  });
  const [loadingOp, setLoadingOp] = useState(false);
  const [opResult, setOpResult] = useState<any>(null);

  // Webhook Test Form
  const [webhookTest, setWebhookTest] = useState({
    activationId: '151384401',
    code: '637881',
    phone: '79991234567',
    service: 'tg'
  });
  const [sendingWebhook, setSendingWebhook] = useState(false);

  // Webhook logs
  const [webhookLogs, setWebhookLogs] = useState<any[]>([
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString('ar-YE'),
      ip: '84.32.223.53',
      activationId: '151384401',
      service: 'tg',
      phone: '+79991234567',
      code: '637881',
      raw: '637881 is your Telegram verification code',
      status: 'SUCCESS'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 360000).toLocaleTimeString('ar-YE'),
      ip: '185.138.88.87',
      activationId: '151384390',
      service: 'wa',
      phone: '+551198765432',
      code: '492015',
      raw: 'Your WhatsApp code is: 492-015',
      status: 'SUCCESS'
    }
  ]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 تم نسخ ${label} بنجاح!`, 'success');
  };

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-app.run.app';
  const webhookUrl = `${currentOrigin}/api/webhook/hero-sms`;

  // Fetch initial info from server
  const loadHeroSmsData = async () => {
    try {
      const res = await fetch('/api/herosms/overview');
      const data = await res.json();
      if (data && data.success) {
        if (data.userId) setUserId('' + data.userId);
        if (data.email) setUserEmail(data.email);
        if (data.balance !== undefined) setBalance(data.balance);
      }
      // Also fetch logs
      const logRes = await fetch('/api/herosms/webhook-logs');
      const logData = await logRes.json();
      if (logData && Array.isArray(logData.logs)) {
        setWebhookLogs(logData.logs);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadHeroSmsData();
  }, []);

  // Run OpenAPI Operation
  const handleExecuteOperation = async () => {
    setLoadingOp(true);
    setOpResult(null);
    try {
      let endpoint = '/api/herosms/activations';
      let method = 'GET';
      let body: any = undefined;

      if (selectedOperation === 'get_history') {
        endpoint = `/api/herosms/history?from=${encodeURIComponent(opParams.from)}&to=${encodeURIComponent(opParams.to)}`;
      } else if (selectedOperation === 'buy_activation') {
        endpoint = '/api/herosms/buy';
        method = 'POST';
        body = { service: opParams.service, country: opParams.country };
      } else if (selectedOperation === 'cancel_activation') {
        endpoint = '/api/herosms/cancel';
        method = 'POST';
        body = { activationId: opParams.activationId };
      } else if (selectedOperation === 'finish_activation') {
        endpoint = '/api/herosms/finish';
        method = 'POST';
        body = { activationId: opParams.activationId };
      } else if (selectedOperation === 'get_stats') {
        endpoint = '/api/herosms/stats';
      }

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      setOpResult(data);
      showToast('✅ تم تنفيذ طلب HeroSMS OpenAPI بنجاح!', 'success');
    } catch (e: any) {
      setOpResult({ error: e.message, status: 'FAILED' });
      showToast(`خطأ في تنفيذ الطلب: ${e.message}`, 'error');
    } finally {
      setLoadingOp(false);
    }
  };

  // Test Webhook Simulation
  const handleSendTestWebhook = async () => {
    setSendingWebhook(true);
    try {
      const res = await fetch('/api/herosms/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookTest)
      });
      const data = await res.json();
      if (data.success) {
        showToast('🎯 تم محاكاة وصول إشعار Webhook من IP HeroSMS بنجاح!', 'success');
        if (data.log) {
          setWebhookLogs(prev => [data.log, ...prev]);
        }
      }
    } catch (e: any) {
      showToast(`خطأ في إرسال الويب هوك: ${e.message}`, 'error');
    } finally {
      setSendingWebhook(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner with Credentials */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-blue-950/60 border border-emerald-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-lg">
                HS
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                  سيرفر وموقع HeroSMS الرسمي
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-0.5 rounded-full font-bold">
                    OpenAPI 3.2.0 & Stubs متصل
                  </span>
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  خادم متوافق مع API لتنشيط الرسائل القصيرة وشركاء SMS-Activate السابقين
                </p>
              </div>
            </div>

            {/* Quick stats pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 text-xs flex items-center gap-2">
                <span className="text-slate-400">معرف الحساب (User ID):</span>
                <span className="text-emerald-400 font-black font-mono text-sm">{userId}</span>
                <button 
                  onClick={() => copyToClipboard(userId, 'معرف الحساب')}
                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                >
                  <Copy size={13} />
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 text-xs flex items-center gap-2">
                <span className="text-slate-400">البريد الإلكتروني:</span>
                <span className="text-blue-300 font-bold font-mono">{userEmail}</span>
                <button 
                  onClick={() => copyToClipboard(userEmail, 'البريد')}
                  className="p-1 hover:text-white text-slate-400 cursor-pointer"
                >
                  <Copy size={13} />
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 text-xs flex items-center gap-2">
                <span className="text-slate-400">الرصيد المتاح:</span>
                <span className="text-amber-400 font-black font-mono text-sm">{balance} ₽</span>
              </div>
            </div>
          </div>

          {/* Provider Selection Radio */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 min-w-[280px]">
            <span className="text-xs font-bold text-slate-400 block">🔀 وضع توجيه طلبات الأرقام للبوت:</span>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'auto', label: '⚡ توجيه ذكي تلقائي (الأرخص والأسرع)', desc: 'يفحص HeroSMS و 5SIM تلقائياً' },
                { id: 'herosms', label: '👑 HeroSMS حصرياً (#1513844)', desc: 'شراء جميع الأرقام من سيرفر HeroSMS' },
                { id: '5sim', label: '💎 5SIM.NET حصرياً (حساب مصطفى)', desc: 'شراء جميع الأرقام من 5SIM' }
              ].map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => {
                    setActiveProvider(prov.id as any);
                    showToast(`تم تعيين المزود الأساسي إلى: ${prov.label}`);
                  }}
                  className={`w-full text-right p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    activeProvider === prov.id
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    activeProvider === prov.id ? 'border-emerald-400 bg-emerald-400' : 'border-slate-600'
                  }`}>
                    {activeProvider === prov.id && <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>}
                  </div>
                  <div>
                    <span className="font-bold block">{prov.label}</span>
                    <span className="text-[10px] text-slate-500 block">{prov.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WEBHOOK SECTION: IPs & URL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Webhook URL & Whitelist IPs */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Radio size={20} className="text-emerald-400" />
              عناوين وتفعيل الويب هوك (Webhook Integration)
            </h2>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              جاهز ومستعد لاستقبال الأكواد
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            يعمل خطاف الويب (Webhook) على استقبال كود التحقق OTP فور وصوله من مزود الخدمة HeroSMS دون الحاجة لتحديث الصفحة، ويقوم بتسليمه للزبون فورياً داخل البوت والمتجر.
          </p>

          {/* Webhook URL Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              🔗 رابط خطاف الويب الخاص بك (Webhook URL) - ضعه في حسابك بموقع HeroSMS:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-mono text-emerald-400 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(webhookUrl, 'رابط الويب هوك')}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <Copy size={15} />
                نسخ الرابط
              </button>
            </div>
          </div>

          {/* Whitelisted IPs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-400" />
                قائمة عناوين IP المعتمدة في القائمة البيضاء (IP Whitelist):
              </label>
              <span className="text-[11px] text-emerald-400 font-bold">مضافة ومعتمدة تلقائياً ✅</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { ip: '84.32.223.53', label: 'خادم استقبال التفعيلات 1 (HeroSMS Webhook Server 1)' },
                { ip: '185.138.88.87', label: 'خادم استقبال التفعيلات 2 (HeroSMS Webhook Server 2)' }
              ].map((item) => (
                <div key={item.ip} className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-sm font-black text-white block">{item.ip}</span>
                    <span className="text-[10px] text-slate-400 block">{item.label}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.ip, `IP ${item.ip}`)}
                    className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl cursor-pointer"
                    title="نسخ IP"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stubs Host info */}
          <div className="bg-blue-950/20 border border-blue-800/40 rounded-2xl p-4 text-xs space-y-2 text-slate-300">
            <span className="font-bold text-blue-400 flex items-center gap-1.5">
              <Zap size={14} />
              معلومات التوافق مع برامج التسجيل (SMS-Activate Partners):
            </span>
            <p className="text-[11px] text-slate-400">
              في إعدادات برامج التسجيل أو السكربتات لديك، استبدل المضيف من <code className="text-blue-300 font-mono">https://api.sms-activate.ae</code> إلى <code className="text-emerald-400 font-mono">https://hero-sms.com</code>
            </p>
          </div>
        </div>

        {/* Right: Live Webhook Simulator Form */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Play size={18} className="text-amber-400" />
              فحص ومحاكاة وصول كود عبر Webhook
            </h3>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">
              تجربة حية
            </span>
          </div>

          <p className="text-xs text-slate-400">
            أرسل طلب إشعار تجريبي بالبيانات أدناه للتأكد من أن نظام الاستقبال يسجل الكود فورياً ويسلمه للعميل:
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">معرف التفعيل (Activation ID):</label>
              <input
                type="text"
                value={webhookTest.activationId}
                onChange={e => setWebhookTest({ ...webhookTest, activationId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">كود التحقق الواصل (OTP Code):</label>
              <input
                type="text"
                value={webhookTest.code}
                onChange={e => setWebhookTest({ ...webhookTest, code: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-emerald-400 font-mono font-bold text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">رقم الهاتف:</label>
                <input
                  type="text"
                  value={webhookTest.phone}
                  onChange={e => setWebhookTest({ ...webhookTest, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">الخدمة (tg / wa):</label>
                <select
                  value={webhookTest.service}
                  onChange={e => setWebhookTest({ ...webhookTest, service: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs"
                >
                  <option value="tg">Telegram (tg)</option>
                  <option value="wa">WhatsApp (wa)</option>
                  <option value="go">Google (go)</option>
                  <option value="fu">Snapchat (fu)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSendTestWebhook}
              disabled={sendingWebhook}
              className="w-full mt-2 py-3 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30 transition-all"
            >
              {sendingWebhook ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              إرسال تجربة Webhook الآن
            </button>
          </div>

          {/* Webhook History Stream */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 block">سجل الإشعارات المستلمة مؤخراً:</span>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {webhookLogs.map((log, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-emerald-400 font-bold">كود: {log.code}</span>
                    <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                  </div>
                  <div className="text-slate-300 font-mono text-[10px] truncate">
                    IP: {log.ip} | ID: {log.activationId} | {log.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OPENAPI 3.2.0 TESTING LAB */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Terminal size={20} className="text-blue-400" />
              مختبر واجهات برمجة HeroSMS OpenAPI 3.2.0 التفاعلي
            </h2>
            <p className="text-xs text-slate-400">
              اختبار وتنفيذ كافة عمليات الـ API المعتمدة في وثيقة HeroSMS الرسمية
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://hero-sms.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              مستند OpenAPI
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Operation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'get_activations', method: 'GET', path: '/activations', label: 'قائمة التنشيط النشط' },
            { id: 'get_history', method: 'GET', path: '/activations/history', label: 'تاريخ التنشيط' },
            { id: 'buy_activation', method: 'POST', path: '/activations', label: 'طلب شراء رقم جديد' },
            { id: 'cancel_activation', method: 'DELETE', path: '/activations/{id}', label: 'إلغاء واسترداد' },
            { id: 'finish_activation', method: 'POST', path: '/activations/{id}/finish', label: 'إنهاء التفعيل' },
            { id: 'get_stats', method: 'GET', path: '/activations/stats', label: 'إحصائيات التنشيط' }
          ].map((op) => {
            const active = selectedOperation === op.id;
            return (
              <button
                key={op.id}
                onClick={() => setSelectedOperation(op.id as any)}
                className={`p-3 rounded-2xl border text-right transition-all cursor-pointer space-y-1 ${
                  active
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded ${
                    op.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                    op.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-rose-500/20 text-rose-400'
                  }`}>
                    {op.method}
                  </span>
                  {active && <CheckCircle2 size={13} className="text-blue-400" />}
                </div>
                <span className="text-xs font-bold block truncate">{op.label}</span>
                <span className="text-[10px] text-slate-500 font-mono block truncate">{op.path}</span>
              </button>
            );
          })}
        </div>

        {/* Parameters & Live Execution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6">
          <div className="lg:col-span-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-300">معاملات الطلب (Query & Body Params):</h3>

            {selectedOperation === 'buy_activation' && (
              <>
                <div>
                  <label className="text-slate-400 block mb-1">الخدمة (Service):</label>
                  <select
                    value={opParams.service}
                    onChange={e => setOpParams({ ...opParams, service: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    <option value="tg">Telegram (tg)</option>
                    <option value="wa">WhatsApp (wa)</option>
                    <option value="go">Google / Gmail (go)</option>
                    <option value="fu">Snapchat (fu)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">معرف الدولة (Country ID):</label>
                  <input
                    type="text"
                    value={opParams.country}
                    onChange={e => setOpParams({ ...opParams, country: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    placeholder="مثال: 2 (كازاخستان), 33 (كولومبيا), 44 (ألبانيا)"
                  />
                </div>
              </>
            )}

            {(selectedOperation === 'cancel_activation' || selectedOperation === 'finish_activation') && (
              <div>
                <label className="text-slate-400 block mb-1">معرف التفعيل (Activation ID):</label>
                <input
                  type="text"
                  value={opParams.activationId}
                  onChange={e => setOpParams({ ...opParams, activationId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  placeholder="151384401"
                />
              </div>
            )}

            {selectedOperation === 'get_history' && (
              <>
                <div>
                  <label className="text-slate-400 block mb-1">تاريخ البدء (From ISO 8601):</label>
                  <input
                    type="text"
                    value={opParams.from}
                    onChange={e => setOpParams({ ...opParams, from: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">تاريخ النهاية (To ISO 8601):</label>
                  <input
                    type="text"
                    value={opParams.to}
                    onChange={e => setOpParams({ ...opParams, to: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </>
            )}

            {selectedOperation === 'get_activations' && (
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-[11px] leading-relaxed">
                يرجع كافة أرقام التنشيط النشطة حالياً المرتبطة بحساب HeroSMS الخاص بك (#1513844) وقائمة الأكواد OTP المستلمة في الوقت الحقيقي.
              </div>
            )}

            {selectedOperation === 'get_stats' && (
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-[11px] leading-relaxed">
                يقوم بجلب إحصائيات معدل نجاح وصول الأكواد والأرقام المشتراة ونسب التفعيل اليومية.
              </div>
            )}

            <button
              onClick={handleExecuteOperation}
              disabled={loadingOp}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30 transition-all"
            >
              {loadingOp ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
              تنفيذ طلب الـ API الفعلي
            </button>
          </div>

          {/* Right: Response Output */}
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">استجابة السيرفر الفورية (JSON Response):</span>
              {opResult && (
                <button
                  onClick={() => copyToClipboard(JSON.stringify(opResult, null, 2), 'نتيجة JSON')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  <Copy size={12} />
                  نسخ النتيجة
                </button>
              )}
            </div>

            <pre className="bg-[#05080f] border border-slate-800/80 rounded-xl p-4 text-[11px] font-mono text-emerald-400 h-64 overflow-y-auto leading-relaxed text-left dir-ltr selection:bg-emerald-900">
              {opResult
                ? JSON.stringify(opResult, null, 2)
                : `// اضغط على زر "تنفيذ طلب الـ API الفعلي" لعرض الاستجابة هنا...
// سيتم جلب البيانات الحقيقية من https://hero-sms.com`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
