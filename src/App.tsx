import { useState, useEffect } from 'react';

type Addiction = {
  id: string;
  name: string;
  quitDate: string;
  icon: string;
};

const ADDICTION_OPTIONS = [
  { name: 'Smoking', icon: '🚬' },
  { name: 'Vaping', icon: '💨' },
  { name: 'Alcohol', icon: '🍺' },
  { name: 'Porn', icon: '🔞' },
  { name: 'Sugar', icon: '🍭' },
  { name: 'Junk Food', icon: '🍔' },
  { name: 'Doomscrolling', icon: '📱' },
  { name: 'Social Media', icon: '📲' },
  { name: 'Gaming', icon: '🎮' },
  { name: 'Caffeine', icon: '☕' },
  { name: 'Shopping', icon: '🛒' },
  { name: 'Gambling', icon: '🎰' },
];

function calculateTimeSince(quitDate: string) {
  const quit = new Date(quitDate);
  const now = new Date();
  const diff = now.getTime() - quit.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalDays: days };
}

function getMotivationalMessage(days: number): string {
  if (days === 0) return "DAY ZERO. THE WAR BEGINS.";
  if (days === 1) return "24 HOURS. YOU'RE ALREADY WINNING.";
  if (days < 7) return "EVERY HOUR IS A VICTORY.";
  if (days < 14) return "ONE WEEK DOWN. YOU'RE REWIRING.";
  if (days < 30) return "TWO WEEKS. YOUR BRAIN IS HEALING.";
  if (days < 60) return "ONE MONTH. YOU'RE BECOMING SOMEONE NEW.";
  if (days < 90) return "THE OLD YOU IS DYING. GOOD.";
  if (days < 180) return "90 DAYS. YOU'VE BROKEN THE CYCLE.";
  if (days < 365) return "HALF A YEAR. YOU'RE UNSTOPPABLE.";
  return "ONE YEAR+. YOU ARE FREE.";
}

function TrackerCard({ addiction, onDelete }: { addiction: Addiction; onDelete: () => void }) {
  const [time, setTime] = useState(calculateTimeSince(addiction.quitDate));
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeSince(addiction.quitDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [addiction.quitDate]);

  return (
    <div className="relative group border-2 border-lime-400 bg-black/60 backdrop-blur-sm p-4 md:p-6 transition-all duration-300 hover:bg-lime-400/10">
      <div className="absolute top-0 left-0 w-full h-1 bg-lime-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-2xl md:text-3xl">{addiction.icon}</span>
          <div>
            <h3 className="font-clash text-lg md:text-xl font-bold text-lime-400 uppercase tracking-wider">{addiction.name}</h3>
            <p className="text-[10px] md:text-xs text-zinc-500 font-mono">QUIT: {new Date(addiction.quitDate).toLocaleDateString()}</p>
          </div>
        </div>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-zinc-600 hover:text-red-500 transition-colors text-xs md:text-sm p-2 -m-2"
          >
            [X]
          </button>
        ) : (
          <div className="flex gap-2 text-xs">
            <button onClick={onDelete} className="text-red-500 hover:text-red-400 p-2 -m-2">YES</button>
            <button onClick={() => setShowConfirm(false)} className="text-zinc-500 hover:text-zinc-300 p-2 -m-2">NO</button>
          </div>
        )}
      </div>

      <div className="text-center py-4 md:py-6">
        <div className="font-clash text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none">
          {time.days}
        </div>
        <div className="text-lime-400 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] mt-2">
          {time.days === 1 ? 'DAY' : 'DAYS'} FREE
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-zinc-800 pt-4">
        <div className="text-center">
          <div className="font-mono text-xl md:text-2xl text-white">{String(time.hours).padStart(2, '0')}</div>
          <div className="text-[10px] md:text-xs text-zinc-600 tracking-wider">HRS</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-xl md:text-2xl text-white">{String(time.minutes).padStart(2, '0')}</div>
          <div className="text-[10px] md:text-xs text-zinc-600 tracking-wider">MIN</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-xl md:text-2xl text-lime-400">{String(time.seconds).padStart(2, '0')}</div>
          <div className="text-[10px] md:text-xs text-zinc-600 tracking-wider">SEC</div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 pt-4 border-t border-zinc-800">
        <p className="font-clash text-xs md:text-sm text-zinc-400 tracking-wide text-center">
          {getMotivationalMessage(time.totalDays)}
        </p>
      </div>
    </div>
  );
}

function AddictionSelector({ onSelect, onClose }: { onSelect: (name: string, icon: string) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border-2 border-lime-400 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-950">
          <h2 className="font-clash text-xl md:text-2xl font-bold text-lime-400 uppercase">What are you quitting?</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-2xl p-2 -m-2">&times;</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 p-4 md:p-6">
          {ADDICTION_OPTIONS.map((opt) => (
            <button
              key={opt.name}
              onClick={() => onSelect(opt.name, opt.icon)}
              className="flex flex-col items-center gap-2 p-4 md:p-6 border border-zinc-800 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-200"
            >
              <span className="text-3xl md:text-4xl">{opt.icon}</span>
              <span className="font-mono text-xs text-zinc-400 uppercase">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [addictions, setAddictions] = useState<Addiction[]>(() => {
    const saved = localStorage.getItem('quit-tracker-data');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSelector, setShowSelector] = useState(false);
  const [selectedForAdd, setSelectedForAdd] = useState<{ name: string; icon: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('quit-tracker-data', JSON.stringify(addictions));
  }, [addictions]);

  const handleAddAddiction = (name: string, icon: string) => {
    setSelectedForAdd({ name, icon });
    setShowSelector(false);
  };

  const confirmAddiction = (date: string) => {
    if (!selectedForAdd) return;
    const newAddiction: Addiction = {
      id: Date.now().toString(),
      name: selectedForAdd.name,
      quitDate: date,
      icon: selectedForAdd.icon,
    };
    setAddictions([...addictions, newAddiction]);
    setSelectedForAdd(null);
  };

  const deleteAddiction = (id: string) => {
    setAddictions(addictions.filter(a => a.id !== id));
  };

  const totalDaysFree = addictions.reduce((acc, a) => {
    const { totalDays } = calculateTimeSince(a.quitDate);
    return acc + totalDays;
  }, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-x-hidden">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Grid lines background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(to right, #a3e635 1px, transparent 1px), linear-gradient(to bottom, #a3e635 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b-2 border-lime-400 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="font-clash text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter">
                  <span className="text-lime-400">QUIT</span>
                  <span className="text-white">.</span>
                </h1>
                <p className="font-mono text-xs md:text-sm text-zinc-500 mt-2 tracking-wider">
                  TRACK YOUR FREEDOM. OWN YOUR RECOVERY.
                </p>
              </div>

              {addictions.length > 0 && (
                <div className="text-right">
                  <div className="font-mono text-xs text-zinc-600 tracking-wider">TOTAL DAYS RECLAIMED</div>
                  <div className="font-clash text-3xl md:text-5xl font-black text-lime-400">{totalDaysFree}</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {addictions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center px-4">
                <div className="font-clash text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-700 mb-4 md:mb-6 uppercase leading-tight">
                  Today is Day One.
                </div>
                <p className="text-zinc-500 font-mono text-xs md:text-sm max-w-md mb-8 md:mb-12 leading-relaxed">
                  Every second you don't give in is a victory.<br />
                  Start tracking your fight.
                </p>
                <button
                  onClick={() => setShowSelector(true)}
                  className="font-clash text-base md:text-lg font-bold uppercase tracking-wider bg-lime-400 text-black px-6 md:px-10 py-4 md:py-5 hover:bg-lime-300 transition-colors relative group"
                >
                  <span className="relative z-10">START YOUR RECOVERY</span>
                  <div className="absolute inset-0 border-2 border-lime-400 translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  {addictions.map((addiction) => (
                    <TrackerCard
                      key={addiction.id}
                      addiction={addiction}
                      onDelete={() => deleteAddiction(addiction.id)}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setShowSelector(true)}
                  className="w-full border-2 border-dashed border-zinc-800 hover:border-lime-400 p-6 md:p-8 text-center transition-colors group"
                >
                  <span className="font-mono text-xs md:text-sm text-zinc-600 group-hover:text-lime-400 tracking-wider">
                    + ADD ANOTHER BATTLE
                  </span>
                </button>
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 py-4 px-4 text-center">
          <p className="font-mono text-[10px] md:text-xs text-zinc-700">
            Requested by <a href="https://twitter.com/speedrun26mil" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-500 transition-colors">@speedrun26mil</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-500 transition-colors">@clonkbot</a>
          </p>
        </footer>
      </div>

      {/* Selector Modal */}
      {showSelector && (
        <AddictionSelector
          onSelect={handleAddAddiction}
          onClose={() => setShowSelector(false)}
        />
      )}

      {/* Date Picker Modal */}
      {selectedForAdd && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border-2 border-lime-400 p-6 md:p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl md:text-4xl">{selectedForAdd.icon}</span>
              <h2 className="font-clash text-xl md:text-2xl font-bold text-lime-400 uppercase">
                Quitting {selectedForAdd.name}
              </h2>
            </div>
            <p className="text-zinc-500 font-mono text-xs md:text-sm mb-6">When did you quit (or when are you starting)?</p>
            <input
              type="date"
              max={new Date().toISOString().split('T')[0]}
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full bg-zinc-900 border-2 border-zinc-700 focus:border-lime-400 p-3 md:p-4 font-mono text-sm md:text-base text-white outline-none transition-colors"
              id="quit-date"
            />
            <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={() => setSelectedForAdd(null)}
                className="flex-1 border-2 border-zinc-700 hover:border-zinc-500 px-4 py-3 md:px-6 md:py-4 font-mono text-xs md:text-sm text-zinc-400 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('quit-date') as HTMLInputElement;
                  confirmAddiction(input.value);
                }}
                className="flex-1 bg-lime-400 hover:bg-lime-300 px-4 py-3 md:px-6 md:py-4 font-clash font-bold text-sm md:text-base text-black uppercase tracking-wider transition-colors"
              >
                COMMIT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
