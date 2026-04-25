import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  ExternalLink, 
  MessageSquare,
  Instagram,
  Facebook,
  Send as TelegramIcon,
  ShieldCheck,
  Code2,
  Lock,
  User
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithAgent, Message } from './geminiService';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I am Raj Aryan's Personal AI Agent. I've indexed your data across 7 platforms. How can I help you learn more about Raj today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAgent(newMessages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error connecting to my neural network. Please check your connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-hidden p-4 lg:p-8 flex flex-col gap-6 relative">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[30%] -right-[5%] w-[45%] h-[45%] bg-purple-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[5%] left-[20%] w-[35%] h-[35%] bg-emerald-500/20 rounded-full blur-[100px]"></div>
      </div>

      <header className="relative z-10 flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">RA</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Raj Aryan</h1>
            <p className="text-xs text-blue-300 font-mono">PERSONAL_IDENTITY_AGENT_V2.0</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Systems Online</span>
          </div>
          <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
            <span className="text-[10px] font-medium text-slate-400 uppercase">Data Sync:</span>
            <span className="text-[10px] font-bold">100% Real-time</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Core Profile</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-300 uppercase font-mono">Primary Contact</span>
                <span className="text-sm font-medium">ra5338446@gmail.com</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-300 uppercase font-mono">Main Hub</span>
                <span className="text-sm font-medium truncate">rajaryan.neocities.org</span>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs leading-relaxed text-slate-300">
                  Cybersecurity Specialist and Developer specializing in creating secure interactive experiences and visual systems.
                </p>
              </div>
            </div>
          </section>

          <section className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Information Sources</h2>
            <div className="space-y-2 overflow-y-auto pr-2 scrollbar-hide">
              <SourceItem label="Portfolio Hub (Neocities)" status="LIVE" href="https://rajaryan.neocities.org/" />
              <SourceItem label="GitHub (RAJARYAN77-art)" status="WATCHING" href="https://github.com/RAJARYAN77-art" />
              <SourceItem label="Professional LinkedIn" status="INDEXED" href="https://www.linkedin.com/in/raj-aryan-296308373/" />
              <SourceItem label="YouTube (Cybersecurity)" status="CONNECTED" href="https://www.youtube.com/@RajAryan" />
              <SourceItem label="Instagram Creative" status="CONNECTED" href="https://instagram.com/rajaryan77828" />
              <SourceItem label="Telegram Secure" status="SECURE" href="https://t.me/Rajaryan77828" />
              <SourceItem label="Facebook Identity" status="VERIFIED" href="https://www.facebook.com/profile.php?id=61577171355837" />
            </div>
          </section>
        </aside>

        {/* Chat Section */}
        <div className="lg:col-span-8 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative">
          <div 
            ref={scrollRef}
            className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-blue-500/30"
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-[10px] border ${
                    message.role === 'user' 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                  }`}>
                    {message.role === 'user' ? 'Me' : 'AI'}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-[85%] border ${
                    message.role === 'user'
                      ? 'bg-blue-600/40 border-blue-500/30 rounded-tr-none'
                      : 'bg-white/10 border-white/5 rounded-tl-none'
                  }`}>
                    <div className="prose prose-invert prose-blue prose-sm max-w-none">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-[10px] animate-pulse">AI</div>
                <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Raj's digital footprint..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-24 focus:outline-none focus:border-blue-500/50 text-sm transition-all placeholder:text-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 px-6 rounded-xl text-[10px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white uppercase tracking-widest"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center pb-2">
        <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-mono">
          Encrypted Identity Proxy &bull; All data sourced from authorized Raj Aryan APIs
        </p>
      </footer>
    </div>
  );
}

function SourceItem({ label, status, href }: { label: string; status: string; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all"
    >
      <span className="text-xs text-slate-300 group-hover:text-blue-300 transition-colors">{label}</span>
      <span className="text-[9px] bg-slate-700/50 px-2 py-1 rounded text-slate-400 font-mono">{status}</span>
    </a>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all group"
      title={label}
    >
      {icon}
      <span className="text-[9px] mt-1.5 font-mono uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </a>
  );
}
