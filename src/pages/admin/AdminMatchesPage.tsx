import React, { useState, useEffect } from 'react';
import { AdminNav } from '@/components/layout/AdminNav';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelBadge } from '@/components/ui/PixelBadge';
import { PixelIcon } from '@/components/ui/PixelIcon';
import { retroSound } from '@/lib/sound';

interface LiveGoal {
  id: string;
  team: 'home' | 'away';
  scorerName: string;
  isGuest: boolean;
  assistName?: string;
  minute: number;
  isOwnGoal: boolean;
}

export const AdminMatchesPage: React.FC = () => {
  // Live Match State
  const [matchStatus, setMatchStatus] = useState<'scheduled' | 'live' | 'final'>('live');
  const [currentMinute, setCurrentMinute] = useState<number>(34);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const [selectedMatchId, setSelectedMatchId] = useState('m104');
  const [homeTeam, setHomeTeam] = useState('نسور كينج مريوط');
  const [awayTeam, setAwayTeam] = useState('فهود برج العرب');

  const availableMatches = [
    { id: 'm104', home: 'نسور كينج مريوط', away: 'فهود برج العرب', label: 'دوري الصيف — الجولة 4 (مباشر)' },
    { id: 'm105', home: 'أبطال الحارة', away: 'دراويش بهيج', label: 'كأس كينج مريوط — ربع النهائي' },
    { id: 'm106', home: 'شباب الساحل', away: 'كتيبة الرعب', label: 'تحدي الليلة السهرانين' },
  ];

  const handleMatchChange = (matchId: string) => {
    const match = availableMatches.find((m) => m.id === matchId);
    if (!match) return;
    setSelectedMatchId(matchId);
    setHomeTeam(match.home);
    setAwayTeam(match.away);
    setCurrentMinute(0);
    setGoals([]);
    setMatchStatus('live');
  };

  // Squad Players
  const homeSquad = ['أحمد زيزو (مهاجم)', 'كريم شيكا (وسط)', 'محمود الجزار (دفاع)', 'إسلام بونو (حارس)'];
  const awaySquad = ['عمر القناص (مهاجم)', 'طارق حامد (وسط)', 'حسام عبدالمجيد (دفاع)', 'محمد عواد (حارس)'];

  // Goals List
  const [goals, setGoals] = useState<LiveGoal[]>([
    { id: 'g1', team: 'home', scorerName: 'أحمد زيزو', isGuest: false, minute: 12, isOwnGoal: false },
    { id: 'g2', team: 'away', scorerName: 'عمر القناص', isGuest: false, minute: 19, isOwnGoal: false },
    { id: 'g3', team: 'home', scorerName: 'كابتن محمود (ضيف)', isGuest: true, minute: 28, isOwnGoal: false },
  ]);

  // Goal Form State
  const [goalTeam, setGoalTeam] = useState<'home' | 'away'>('home');
  const [scorerType, setScorerType] = useState<'squad' | 'guest'>('squad');
  const [selectedPlayer, setSelectedPlayer] = useState(homeSquad[0]);
  const [guestName, setGuestName] = useState('');
  const [goalMinute, setGoalMinute] = useState(currentMinute);
  const [isOwnGoal, setIsOwnGoal] = useState(false);

  // Live timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && matchStatus === 'live') {
      interval = setInterval(() => {
        setCurrentMinute((prev) => (prev < 60 ? prev + 1 : prev));
      }, 30000); // Advances minute every 30s in demo
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, matchStatus]);

  // Calculate live scores
  const homeScore = goals.filter((g) => (g.isOwnGoal ? g.team === 'away' : g.team === 'home')).length;
  const awayScore = goals.filter((g) => (g.isOwnGoal ? g.team === 'home' : g.team === 'away')).length;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();

    let scorer = '';
    let isGuest = false;

    if (scorerType === 'guest') {
      scorer = guestName.trim() ? `${guestName.trim()} (ضيف)` : 'لاعب ضيف (زائر)';
      isGuest = true;
    } else {
      scorer = selectedPlayer.split(' (')[0];
    }

    const newGoal: LiveGoal = {
      id: `goal_${Date.now()}`,
      team: goalTeam,
      scorerName: scorer,
      isGuest,
      minute: Number(goalMinute) || currentMinute,
      isOwnGoal,
    };

    setGoals((prev) => [...prev, newGoal]);
    retroSound.playGoal();
    setGuestName('');
    setIsOwnGoal(false);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="border-b-[3px] border-line pb-4">
        <h1 className="font-display text-3xl text-[#FFE500] flex items-center gap-2">
          <PixelIcon name="whistle" size={28} color="#25F143" />
          <span>غرفة إدارة المباراة الحية (الحكم والإدارة)</span>
        </h1>
        <p className="font-body text-xs text-paper-cream/80 mt-1">
          تحكم في وقت المباراة، تسجيل الأهداف الحية للاعبين المسجلين أو الضيوف (Guest)، واعتماد النتيجة النهائية فورياً.
        </p>
      </div>

      <AdminNav />

      {/* Match Selector Bar */}
      <div className="bg-[#12141D] border-2 border-line p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-[#FFE500]">المباراة النشطة:</span>
          <select
            value={selectedMatchId}
            onChange={(e) => handleMatchChange(e.target.value)}
            className="bg-black border border-white/20 text-[#25F143] font-display text-sm px-3 py-1.5 outline-none focus:border-[#25F143]"
          >
            {availableMatches.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} ({m.home} VS {m.away})
              </option>
            ))}
          </select>
        </div>
        <span className="text-[11px] text-white/50 font-body">
          💡 إدارة التوقيت والأهداف الحية تعمل فورياً
        </span>
      </div>

      {/* Live Match Board Panel */}
      <div className="bg-[#0B0C12] border-[4px] border-line p-5 shadow-[var(--shadow-x)_6px_0_#0E4218] relative">
        <div className="italia-ribbon-stripe absolute top-0 inset-x-0" />

        {/* Header: Status and Clock Control */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4 mt-2">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xl text-[#25F143] bg-black px-3 py-1 border border-[#25F143] drop-shadow-[0_0_8px_rgba(37,241,67,0.6)]">
              {currentMinute}' دقيقة
            </span>

            <PixelBadge variant={matchStatus === 'live' ? 'live' : 'final'} isBlinking={matchStatus === 'live'}>
              {matchStatus === 'live' ? 'مباراة جارية الآن' : 'انتهت رسمياً'}
            </PixelBadge>
          </div>

          {/* Time Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <PixelButton
              variant={isTimerRunning ? 'pink' : 'green'}
              size="sm"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
            >
              {isTimerRunning ? '⏸ إيقاف الوقت' : '▶ استئناف الوقت'}
            </PixelButton>

            <button
              onClick={() => setCurrentMinute((m) => Math.min(60, m + 5))}
              className="px-2 py-1 bg-black border border-white/20 text-xs font-pixel text-[#FFE500] hover:border-[#FFE500]"
            >
              +5 دقائق
            </button>

            <button
              onClick={() => setCurrentMinute(30)}
              className="px-2 py-1 bg-black border border-white/20 text-xs font-pixel text-[#00E5FF] hover:border-[#00E5FF]"
            >
              استراحة الشوطين (30')
            </button>

            <PixelButton
              variant="orange"
              size="sm"
              onClick={() => {
                setMatchStatus('final');
                setIsTimerRunning(false);
                alert('تم إنهاء المباراة واعتماد النتيجة النهائية واحتساب الأهداف في الإحصائيات!');
              }}
            >
              صافرة النهاية (اعتماد) 🏁
            </PixelButton>
          </div>
        </div>

        {/* Live Score Display */}
        <div className="grid grid-cols-5 items-center text-center my-4">
          <div className="col-span-2">
            <h2 className="font-display text-2xl text-[#25F143]">{homeTeam}</h2>
            <span className="text-xs text-white/60">أصحاب الأرض</span>
          </div>

          <div className="col-span-1 bg-black border-[3px] border-[#25F143] py-3 px-2 flex items-center justify-center gap-3">
            <span className="font-pixel text-4xl text-[#25F143] drop-shadow-[0_0_12px_rgba(37,241,67,0.8)]">
              {homeScore}
            </span>
            <span className="font-pixel text-xl text-[#FF007F]">:</span>
            <span className="font-pixel text-4xl text-[#25F143] drop-shadow-[0_0_12px_rgba(37,241,67,0.8)]">
              {awayScore}
            </span>
          </div>

          <div className="col-span-2">
            <h2 className="font-display text-2xl text-[#FF6600]">{awayTeam}</h2>
            <span className="text-xs text-white/60">الضيوف</span>
          </div>
        </div>
      </div>

      {/* Goal Entry Form & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Recorder Form */}
        <PixelCard variant="paper" headerFoil="تسجيل هدف فوري في المباراة ⚽" className="p-4">
          <form onSubmit={handleAddGoal} className="space-y-4">
            {/* Team Selection */}
            <div>
              <label className="block font-display text-sm text-ink mb-1">الفريق صاحب الهدف</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGoalTeam('home');
                    setSelectedPlayer(homeSquad[0]);
                  }}
                  className={`p-2 border-[2px] font-display text-sm ${
                    goalTeam === 'home'
                      ? 'bg-[#25F143] text-black border-ink font-bold shadow-[2px_2px_0_#000]'
                      : 'bg-white text-ink border-line'
                  }`}
                >
                  {homeTeam} (أصحاب الأرض)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGoalTeam('away');
                    setSelectedPlayer(awaySquad[0]);
                  }}
                  className={`p-2 border-[2px] font-display text-sm ${
                    goalTeam === 'away'
                      ? 'bg-[#FF6600] text-white border-ink font-bold shadow-[2px_2px_0_#000]'
                      : 'bg-white text-ink border-line'
                  }`}
                >
                  {awayTeam} (الضيوف)
                </button>
              </div>
            </div>

            {/* Scorer Type: Squad Member vs Guest */}
            <div>
              <label className="block font-display text-sm text-ink mb-1">نوع المسجل</label>
              <div className="flex gap-4 p-2 bg-white border border-ink/40">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-display text-ink">
                  <input
                    type="radio"
                    name="scorerType"
                    checked={scorerType === 'squad'}
                    onChange={() => setScorerType('squad')}
                    className="accent-[#25F143]"
                  />
                  <span>لاعب مسجل في الفريق</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-display text-[#FF007F]">
                  <input
                    type="radio"
                    name="scorerType"
                    checked={scorerType === 'guest'}
                    onChange={() => setScorerType('guest')}
                    className="accent-[#FF007F]"
                  />
                  <span>لاعب ضيف / Guest (غير مسجل) 👤</span>
                </label>
              </div>
            </div>

            {/* Scorer Picker */}
            {scorerType === 'squad' ? (
              <div>
                <label className="block font-display text-sm text-ink mb-1">اختر اللاعب المسجل</label>
                <select
                  value={selectedPlayer}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                  className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none font-body font-bold"
                >
                  {(goalTeam === 'home' ? homeSquad : awaySquad).map((p, idx) => (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block font-display text-sm text-ink mb-1">اسم اللاعب الضيف (Guest)</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="مثال: كابتن مروان (ضيف) أو لاعب زائر"
                  className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm outline-none"
                />
                <span className="text-[11px] text-[#FF007F] mt-1 block font-bold">
                  ✓ سيتم احتساب الهدف في النتيجة الإجمالية وتسميعه مع علامة (ضيف).
                </span>
              </div>
            )}

            {/* Minute & Own Goal */}
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block font-display text-xs text-ink mb-1">دقيقة الهدف</label>
                <input
                  type="number"
                  value={goalMinute}
                  onChange={(e) => setGoalMinute(Number(e.target.value))}
                  min={1}
                  max={90}
                  className="w-full bg-white border-[2px] border-ink p-2 text-ink text-sm font-pixel outline-none"
                />
              </div>

              <div className="pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-card-red">
                  <input
                    type="checkbox"
                    checked={isOwnGoal}
                    onChange={(e) => setIsOwnGoal(e.target.checked)}
                    className="w-4 h-4 accent-card-red"
                  />
                  <span>هدف عكسي في مرماه (ع.م)</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <PixelButton variant="green" size="md" fullWidth type="submit" className="text-lg">
              ⚽ تسجيل الهدف وتحديث اللوحة فوراً
            </PixelButton>
          </form>
        </PixelCard>

        {/* Goals Timeline & History */}
        <PixelCard variant="arcade" className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl text-[#FFE500] mb-3 flex items-center justify-between border-b border-line pb-2">
              <span>سجل أهداف المباراة ({goals.length} أهداف)</span>
              <span className="text-xs text-[#25F143] font-pixel">{homeScore} - {awayScore}</span>
            </h3>

            {goals.length === 0 ? (
              <div className="text-center py-10 text-white/40 text-sm">
                لم يتم تسجيل أي أهداف في المباراة حتى الآن.
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pl-1">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    className="p-2.5 bg-black/60 border border-line flex items-center justify-between text-xs hover:border-[#25F143]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-[11px] text-[#FFE500]">
                        '{g.minute}
                      </span>
                      <span>⚽</span>
                      <div>
                        <span className="font-bold text-white text-sm">
                          {g.scorerName}
                        </span>
                        {g.isGuest && (
                          <span className="mr-1.5 px-1 py-0.2 bg-[#FF007F] text-white font-pixel text-[8px] rounded-none">
                            GUEST / ضيف
                          </span>
                        )}
                        {g.isOwnGoal && (
                          <span className="mr-1 text-card-red text-[10px] font-bold">
                            (هدف عكسي)
                          </span>
                        )}
                        <span className="block text-[10px] text-white/50">
                          {g.team === 'home' ? homeTeam : awayTeam}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteGoal(g.id)}
                      className="text-card-red font-pixel text-[10px] hover:underline px-2 py-1"
                      title="حذف الهدف"
                    >
                      إلغاء ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-line text-xs text-white/60 flex justify-between items-center">
            <span>كل هدف يسجل هنا يظهر مباشرة على شاشة الزوار وشاشات الماتش.</span>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
