import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight, Activity } from 'lucide-react';
import type { Idea, Team } from '../hooks/useStore';
import DetailModal from './DetailModal';

const RevealSection = ({ teams, ideas, isVisible }: { teams: Team[], ideas: Idea[], isVisible: boolean }) => {
    const [revealedIndex, setRevealedIndex] = useState(-1);
    const [selectedTeam, setSelectedTeam] = useState<{ team: Team, idea: Idea | undefined } | null>(null);

    useEffect(() => {
        if (isVisible && revealedIndex < teams.length - 1) {
            const timer = setTimeout(() => {
                setRevealedIndex(prev => prev + 1);
                if (revealedIndex === teams.length - 2) {
                    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, revealedIndex, teams.length]);

    if (!isVisible && revealedIndex === -1) return null;

    return (
        <section id="teams" className="py-60 px-6 relative bg-black min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-32 border-b border-white/5 pb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <Activity className="text-accent-gold w-4 h-4" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent-gold font-bold">Protocol // Unveiling</span>
                        </div>
                        <h2 className="text-8xl font-black font-display uppercase tracking-tightest leading-none text-white">THE <span className="text-accent-gold">ZENITH</span><br />ALLOCATION</h2>
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-mono font-black text-white/10">{revealedIndex + 1} / {teams.length}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {teams.map((team, idx) => {
                            const idea = ideas.find(i => i.id === team.assignedIdeaId);
                            if (idx > revealedIndex) return null;
                            return (
                                <motion.div
                                    key={team.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    onClick={() => setSelectedTeam({ team, idea })}
                                    whileHover={{
                                        y: -10,
                                        borderColor: 'rgba(212, 175, 55, 0.5)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                                    }}
                                    className="glass p-10 flex flex-col justify-between min-h-[400px] relative group transition-all duration-500 cursor-pointer active:scale-95 overflow-hidden"
                                >
                                    {/* Animated Background Pulse */}
                                    <motion.div
                                        className="absolute inset-0 bg-accent-gold/5"
                                        animate={{ opacity: [0.05, 0.1, 0.05] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    <div className="relative z-10">
                                        <span className="font-mono text-[10px] text-white/30 uppercase block mb-8">Unit_{idx + 1}</span>
                                        <h3 className="text-4xl font-extrabold font-display uppercase tracking-tighter mb-4 leading-none text-white">{team.name}</h3>
                                        <p className="text-2xl font-bold font-display text-white group-hover:text-accent-gold transition-colors">{idea?.title || 'SYNCING...'}</p>
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                                        <p className="text-xs text-white/40 leading-relaxed line-clamp-3 font-medium mb-4">{idea?.description}</p>
                                        <div className="flex items-center gap-2 group-hover:translate-x-3 transition-transform duration-500">
                                            <span className="font-mono text-[8px] uppercase tracking-widest text-accent-gold">View Description</span>
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <ArrowRight className="w-3 h-3 text-accent-gold" />
                                            </motion.div>
                                        </div>
                                    </div>
                                    <Trophy className="absolute top-0 right-0 p-4 w-12 h-12 text-accent-gold opacity-5 group-hover:opacity-100 transition-all duration-700" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <DetailModal
                isOpen={!!selectedTeam}
                onClose={() => setSelectedTeam(null)}
                team={selectedTeam?.team || { id: '', name: '' }}
                idea={selectedTeam?.idea}
            />
        </section>
    );
};

export default RevealSection;
