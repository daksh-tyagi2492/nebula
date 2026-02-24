import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const IdeaSubmission = ({ onAddIdea }: { onAddIdea: (idea: { title: string, category: string, description: string, submittedBy: string }) => void }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onAddIdea({ ...formData, category: 'General', submittedBy: 'Anonymous' });
            setFormData({ title: '', description: '' });
            setStatus({ type: 'success', message: 'Vision synchronized with the mainframe.' });
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        }
        setTimeout(() => setStatus({ type: null, message: '' }), 5000);
    };

    return (
        <section id="submit" className="py-40 px-6 relative">
            <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-between"
                >
                    <div>
                        <span className="font-mono text-accent-cyan text-[10px] font-bold uppercase tracking-[0.5em] mb-6 block">Phase 01 // Inception</span>
                        <h2 className="text-6xl md:text-8xl font-black font-display uppercase tracking-tighter leading-[0.9] text-white">SUBMIT YOUR<br />GENESIS</h2>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass p-8 border-l-4 border-l-accent-cyan mt-12 lg:mt-0"
                    >
                        <span className="font-mono text-[8px] uppercase tracking-widest text-accent-cyan block font-bold">Protocol Alert</span>
                        <p className="text-xs text-accent-cyan/70 font-mono">Similarity detection active.</p>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass p-12 relative"
                >
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <motion.input
                            whileFocus={{ borderBottomColor: '#00ffff' }}
                            required type="text" placeholder="IDEA" className="w-full bg-transparent border-b border-white/10 py-4 font-display text-2xl outline-none transition-colors" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                        <motion.textarea
                            whileFocus={{ borderBottomColor: '#00ffff' }}
                            required rows={4} placeholder="Description of idea" className="w-full bg-transparent border-b border-white/10 py-4 font-display text-xl outline-none transition-colors" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-elite w-full flex justify-center gap-6"
                        >
                            Synchronize Vision <ArrowUpRight className="w-6 h-6" />
                        </motion.button>
                    </form>
                    <AnimatePresence>
                        {status.type && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`absolute bottom-full left-0 right-0 p-4 mb-4 ${status.type === 'success' ? 'bg-accent-cyan text-black' : 'bg-red-500 text-white'}`}
                            >
                                <span className="font-mono text-xs font-black uppercase tracking-widest">{status.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default IdeaSubmission;
