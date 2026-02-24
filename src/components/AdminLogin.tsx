import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Cpu } from 'lucide-react';

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
    const [creds, setCreds] = useState({ user: '', pass: '' });
    const [error, setError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (creds.user === 'daksh' && creds.pass === 'Daksh@123') { onLogin(); }
        else { setError(true); setTimeout(() => setError(false), 2000); }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-12">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full glass p-12 relative overflow-hidden group">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="w-20 h-20 bg-white flex items-center justify-center mb-8 rotate-3 transition-transform group-hover:rotate-0"><Lock className="w-8 h-8 text-black" /></div>
                    <h2 className="text-4xl font-extrabold font-display uppercase tracking-tight text-white mb-4">Access Protocol</h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Level 09 Clearance</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-8">
                    <input required type="text" placeholder="Username" className="w-full bg-white/5 border border-white/10 p-5 font-mono text-sm focus:border-white outline-none text-white" value={creds.user} onChange={e => setCreds({ ...creds, user: e.target.value })} />
                    <input required type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 p-5 font-mono text-sm focus:border-white outline-none text-white" value={creds.pass} onChange={e => setCreds({ ...creds, pass: e.target.value })} />
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        className={`w-full py-5 font-black uppercase text-sm transition-all flex items-center justify-center gap-4 ${error ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-accent-cyan'}`}
                    >
                        <span>{error ? 'Rejected' : 'Initialize'}</span>
                        <Cpu className="w-4 h-4" />
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
