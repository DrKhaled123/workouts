
import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Target, ChevronDown, ChevronUp, 
  Languages, Calendar, List, Flame, Leaf, 
  Utensils, AlertTriangle, BookOpen, Sun, 
  Droplet, Brain, Activity, Zap, Info, Coffee, Moon,
  CheckCircle, Timer as TimerIcon, Trophy, X
} from 'lucide-react';
import { WORKOUT_DATA } from './constants';
import { Language, BilingualText, Exercise } from './types';
import Timer from './components/Timer';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeMode, setActiveMode] = useState('bulking');
  const [activeLevel, setActiveLevel] = useState('beginner');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    timer: true,
    goals: true,
    plans: true,
    nutrition: false,
    fasting: false
  });
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const isAr = language === 'ar';
    document.body.dir = isAr ? 'rtl' : 'ltr';
    if (isAr) {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  const t = (textObj: BilingualText) => {
    if (!textObj) return '';
    if (language === 'both') return `${textObj.en} / ${textObj.ar}`;
    return textObj[language] || textObj.en;
  };

  const toggleCard = (card: string) => {
    setExpandedCards(prev => ({ ...prev, [card]: !prev[card] }));
  };

  const activePlanData = WORKOUT_DATA.fullWeekPlans[activeMode] || WORKOUT_DATA.fullWeekPlans.bulking;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-gray-100 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse group cursor-pointer">
            <div className="bg-gradient-to-tr from-indigo-500 to-violet-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 tracking-tight">
              PROMEDIC.WORKOUTS
            </h1>
          </div>

          <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('both')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${language === 'both' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Languages className="h-3 w-3" />
            </button>
            <button 
              onClick={() => setLanguage('ar')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${language === 'ar' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              AR
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
        
        {/* Left Column: Timer & Configuration */}
        <div className="lg:col-span-4 space-y-8">
          {/* Timer Card */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-md">
            <button 
              onClick={() => toggleCard('timer')}
              className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-indigo-500/10 to-transparent hover:from-indigo-500/20 transition-all"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                  <TimerIcon className="h-5 w-5 text-indigo-400" />
                </div>
                <h2 className="font-bold text-lg tracking-tight">{t({ en: 'Smart Timer', ar: 'المؤقت الذكي' })}</h2>
              </div>
              {expandedCards.timer ? <ChevronUp className="h-5 w-5 opacity-30" /> : <ChevronDown className="h-5 w-5 opacity-30" />}
            </button>
            {expandedCards.timer && <Timer language={language} t={t} />}
          </section>

          {/* Level Selection */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 space-y-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h2 className="font-bold">{t({ en: 'Athlete Level', ar: 'مستوى الرياضي' })}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {WORKOUT_DATA.levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    activeLevel === level.id 
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{t(level.title)}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Goals Selection */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden shadow-xl backdrop-blur-md">
            <button 
              onClick={() => toggleCard('goals')}
              className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-emerald-500/10 to-transparent hover:from-emerald-500/20 transition-all"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <h2 className="font-bold text-lg tracking-tight">{t({ en: 'Goal Strategy', ar: 'استراتيجية الهدف' })}</h2>
              </div>
              {expandedCards.goals ? <ChevronUp className="h-5 w-5 opacity-30" /> : <ChevronDown className="h-5 w-5 opacity-30" />}
            </button>
            {expandedCards.goals && (
              <div className="p-4 space-y-3">
                {WORKOUT_DATA.goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setActiveMode(goal.id)}
                    className={`w-full p-5 rounded-3xl border text-left rtl:text-right transition-all group relative overflow-hidden ${
                      activeMode === goal.id 
                        ? 'bg-emerald-500/5 border-emerald-500/40' 
                        : 'bg-white/5 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-center mb-1">
                      <h3 className={`font-bold tracking-tight ${activeMode === goal.id ? 'text-emerald-400' : 'text-gray-200'}`}>
                        {t(goal.title)}
                      </h3>
                      {activeMode === goal.id && (
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
                      )}
                    </div>
                    <p className="relative z-10 text-xs text-gray-400 leading-relaxed mt-1">{t(goal.desc)}</p>
                    {activeMode === goal.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Dynamic Workout Plan */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="p-8 bg-gradient-to-r from-indigo-500/5 via-transparent to-violet-500/5 flex flex-wrap items-center justify-between gap-6 border-b border-white/5">
              <div className="space-y-1">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Calendar className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-2xl font-black tracking-tight">{t({ en: 'Training Protocol', ar: 'بروتوكول التدريب' })}</h2>
                </div>
                <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{activeLevel} • {activeMode}</p>
              </div>
              <div className="bg-indigo-500/10 text-indigo-400 px-5 py-2 rounded-2xl border border-indigo-500/20 text-xs font-bold tracking-widest uppercase">
                Week 1-4 Phase
              </div>
            </div>
            
            <div className="p-8 space-y-12">
              {activePlanData.map((day, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-xl font-black text-gray-200 flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
                    <span>{t(day.day)}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {day.exercises.map((ex, exIdx) => (
                      <div 
                        key={exIdx} 
                        className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] hover:border-indigo-500/50 hover:bg-indigo-500/[0.02] transition-all cursor-pointer group relative overflow-hidden active:scale-95"
                        onClick={() => setActiveExercise(ex)}
                      >
                        <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                          <Activity className="h-16 w-16" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-lg text-gray-100 group-hover:text-indigo-300 transition-colors">{t(ex.name)}</h4>
                          <Info className="h-4 w-4 text-gray-600 group-hover:text-indigo-400" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Sets</span>
                            <span className="text-sm font-black text-indigo-400">{ex.sets}</span>
                          </div>
                          <div className="h-8 w-px bg-white/5 mx-1"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Reps</span>
                            <span className="text-sm font-black text-emerald-400">{ex.reps}</span>
                          </div>
                          <div className="h-8 w-px bg-white/5 mx-1"></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Rest</span>
                            <span className="text-sm font-black text-amber-400">{ex.rest}s</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Scientific Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <section className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden shadow-xl backdrop-blur-md">
                <button 
                  onClick={() => toggleCard('nutrition')}
                  className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-green-500/10 to-transparent hover:from-green-500/20 transition-all"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <Utensils className="h-5 w-5 text-green-400" />
                    </div>
                    <h2 className="font-bold text-lg tracking-tight">{t({ en: 'Nutrient Timing', ar: 'توقيت المغذيات' })}</h2>
                  </div>
                  {expandedCards.nutrition ? <ChevronUp className="h-5 w-5 opacity-30" /> : <ChevronDown className="h-5 w-5 opacity-30" />}
                </button>
                {expandedCards.nutrition && (
                  <div className="p-6 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-green-400 uppercase tracking-[0.2em] flex items-center">
                        <Zap className="h-4 w-4 mr-2" /> {t(WORKOUT_DATA.nutrition.preWorkout[0].title)}
                      </h4>
                      <div className="space-y-3">
                        {WORKOUT_DATA.nutrition.preWorkout[0].items.map((item, i) => (
                          <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-start space-x-3 rtl:space-x-reverse">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500/50"></div>
                            <span className="text-xs leading-relaxed text-gray-300">{t(item)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] flex items-center">
                        <Droplet className="h-4 w-4 mr-2" /> {t(WORKOUT_DATA.nutrition.postWorkout[0].title)}
                      </h4>
                      <div className="space-y-3">
                        {WORKOUT_DATA.nutrition.postWorkout[0].items.map((item, i) => (
                          <div key={i} className="bg-white/5 p-4 rounded-2xl flex items-start space-x-3 rtl:space-x-reverse">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500/50"></div>
                            <span className="text-xs leading-relaxed text-gray-300">{t(item)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
             </section>

             <section className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden shadow-xl backdrop-blur-md">
                <button 
                  onClick={() => toggleCard('fasting')}
                  className="w-full flex items-center justify-between p-6 bg-gradient-to-br from-purple-500/10 to-transparent hover:from-purple-500/20 transition-all"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="p-2 bg-purple-500/20 rounded-xl">
                      <Leaf className="h-5 w-5 text-purple-400" />
                    </div>
                    <h2 className="font-bold text-lg tracking-tight">{t({ en: 'Fasting Science', ar: 'علم الصيام' })}</h2>
                  </div>
                  {expandedCards.fasting ? <ChevronUp className="h-5 w-5 opacity-30" /> : <ChevronDown className="h-5 w-5 opacity-30" />}
                </button>
                {expandedCards.fasting && (
                  <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    {WORKOUT_DATA.fasting.map((f, i) => (
                      <div key={i} className="space-y-4">
                        <p className="text-xs leading-relaxed text-gray-400 bg-purple-500/5 p-4 rounded-2xl border border-purple-500/10">{t(f.content)}</p>
                        <div className="space-y-2">
                          {f.guidelines.map((g, j) => (
                            <div key={j} className="flex items-center space-x-3 rtl:space-x-reverse text-[11px] text-gray-300 font-medium">
                              <CheckCircle className="h-3 w-3 text-purple-400" />
                              <span>{t(g)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-white/5">
                           <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center">
                             <BookOpen className="h-3 w-3 mr-2" /> References
                           </h5>
                           {f.references.map((r, k) => (
                             <p key={k} className="text-[9px] text-gray-600 italic leading-tight mb-1">{t(r)}</p>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </section>
          </div>
        </div>
      </main>

      {/* High Fidelity Exercise Modal */}
      {activeExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-[#0f1218] w-full max-w-3xl rounded-[48px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="p-8 sm:p-12 bg-gradient-to-br from-white/[0.03] to-transparent border-b border-white/5 flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase block">Professional Instruction</span>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{t(activeExercise.name)}</h3>
              </div>
              <button 
                onClick={() => setActiveExercise(null)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all hover:rotate-90"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-12">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 text-center group hover:bg-indigo-500/10 transition-colors">
                  <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-tighter">Sets</div>
                  <div className="text-3xl font-black text-indigo-400 group-hover:scale-110 transition-transform">{activeExercise.sets}</div>
                </div>
                <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 text-center group hover:bg-emerald-500/10 transition-colors">
                  <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-tighter">Reps</div>
                  <div className="text-3xl font-black text-emerald-400 group-hover:scale-110 transition-transform">{activeExercise.reps}</div>
                </div>
                <div className="bg-white/5 p-6 rounded-[32px] border border-white/5 text-center group hover:bg-amber-500/10 transition-colors">
                  <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-tighter">Rest</div>
                  <div className="text-3xl font-black text-amber-400 group-hover:scale-110 transition-transform">{activeExercise.rest}s</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-black text-gray-500 text-[10px] uppercase tracking-[0.2em] flex items-center">
                    <Sun className="h-4 w-4 mr-2 text-indigo-400" /> {t({ en: 'Neural Activation', ar: 'التنشيط العصبي' })}
                  </h4>
                  <div className="bg-indigo-500/[0.03] border border-indigo-500/10 p-6 rounded-[32px] text-sm leading-relaxed text-indigo-100/80">
                    {t(activeExercise.warmup)}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-black text-gray-500 text-[10px] uppercase tracking-[0.2em] flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-emerald-400" /> {t({ en: 'Form Dynamics', ar: 'ديناميكيات الحركة' })}
                  </h4>
                  <div className="bg-emerald-500/[0.03] border border-emerald-500/10 p-6 rounded-[32px] text-sm leading-relaxed text-emerald-100/80 italic">
                    "{t(activeExercise.desc)}"
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-black/40 border-t border-white/5 flex gap-4 rtl:space-x-reverse">
              <button 
                onClick={() => setActiveExercise(null)}
                className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl transition-all shadow-2xl shadow-indigo-500/20 active:scale-95 text-lg"
              >
                {t({ en: 'EXECUTE WORKOUT', ar: 'بدء التمرين' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Button */}
      <AIChat language={language} mode={activeMode} t={t} />

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-[#0a0c10] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="flex justify-center space-x-12 rtl:space-x-reverse opacity-20">
            <Activity className="h-8 w-8" />
            <Brain className="h-8 w-8" />
            <Flame className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black tracking-[0.5em] text-gray-600 uppercase">
              Promedic Global Fitness Technologies
            </p>
            <p className="text-xs text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {t({ 
                en: 'Professional medical-grade training protocols. Always consult with a certified healthcare provider before beginning any intense physical regimen.',
                ar: 'بروتوكولات تدريب طبية احترافية. استشر دائماً مقدم رعاية صحية معتمد قبل البدء في أي نظام بدني مكثف.'
              })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
