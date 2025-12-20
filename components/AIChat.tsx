
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { askFitnessCoach } from '../services/gemini';
import { Language, BilingualText } from '../types';

interface AIChatProps {
  language: Language;
  mode: string;
  t: (text: BilingualText) => string;
}

const AIChat: React.FC<AIChatProps> = ({ language, mode, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await askFitnessCoach(userMessage, { language, mode });
    
    setMessages(prev => [...prev, { role: 'ai', text: response || '...' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 sm:w-96 h-[500px] bg-gray-800 border border-indigo-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-indigo-300" />
              <h3 className="font-bold text-white">{t({ en: 'Coach Gemini', ar: 'مدربك الذكي' })}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <Bot className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm px-4">
                  {t({ en: 'Ask me about your workout, nutrition, or recovery!', ar: 'اسألني عن تمرينك، تغذيتك، أو فترة استشفائك!' })}
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-none'
                }`}>
                  <div className="flex items-center mb-1 opacity-50 text-[10px] uppercase font-bold tracking-tighter">
                    {m.role === 'user' ? <User className="h-3 w-3 mr-1" /> : <Bot className="h-3 w-3 mr-1" />}
                    {m.role === 'user' ? t({ en: 'You', ar: 'أنت' }) : t({ en: 'Coach', ar: 'المدرب' })}
                  </div>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-2xl animate-pulse flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-2 bg-gray-900 rounded-2xl px-3 py-1 border border-gray-700 focus-within:border-indigo-500 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t({ en: 'Type a message...', ar: 'اكتب رسالة...' })}
                className="flex-1 bg-transparent py-2 text-sm outline-none text-white"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-1.5 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group p-5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full shadow-2xl hover:scale-110 transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full"></div>
          <MessageSquare className="h-7 w-7 text-white" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 border-2 border-gray-900 rounded-full animate-ping"></div>
        </button>
      )}
    </div>
  );
};

export default AIChat;
