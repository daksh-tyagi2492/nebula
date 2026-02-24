import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Target, MessageSquare } from 'lucide-react';
import type { Idea, Team } from '../hooks/useStore';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    team: Team;
    idea: Idea | undefined;
}

const DetailModal = ({ isOpen, onClose, team, idea }: DetailModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="glass max-w-2xl w-full p-12 relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-accent-gold/5 rounded-full blur-[100px]" />

                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                        >
                            <X className="w-4 h-4 text-white/50 group-hover:text-white" />
                        </button>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-10">
                                <Activity className="w-4 h-4 text-accent-gold" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent-gold font-bold">Allocation Details</span>
                            </div>

                            <div className="mb-12">
                                <span className="font-mono text-[10px] text-white/30 uppercase block mb-4">Designated Unit</span>
                                <h2 className="text-6xl font-black font-display uppercase tracking-tighter text-white leading-none">
                                    {team.name}
                                </h2>
                            </div>

                            <div className="mb-12">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="w-3 h-3 text-accent-gold" />
                                    <span className="font-mono text-[10px] text-white/30 uppercase">Idea</span>
                                </div>
                                <h3 className="text-2xl font-bold font-display text-white uppercase leading-tight">
                                    {idea?.title || 'SYNCHRONIZING...'}
                                </h3>
                            </div>

                            <div className="pt-10 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-6">
                                    <MessageSquare className="w-3 h-3 text-white/20" />
                                    <span className="font-mono text-[10px] text-white/30 uppercase">Description of IDEA</span>
                                </div>
                                <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium">
                                    {idea?.description || 'Data missing or corrupted.'}
                                </p>
                            </div>

                            <div className="mt-16 flex items-center justify-between opacity-30">
                                <span className="font-mono text-[8px] uppercase tracking-[0.4em]">v4.0.1_STABLE // GRID_ID_{team.id.toUpperCase()}</span>
                                <div className="flex gap-4">
                                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DetailModal;
