import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import type { Idea, Team } from '../hooks/useStore';

const AdminPanel = ({ teams, ideas, onClearTeams, onClearIdeas, onUnassignAll, onClose, onLogout, onSeed, onShuffle, onReassign, onAssign, onDownload }: {
    teams: Team[],
    ideas: Idea[],
    onClearTeams: () => void,
    onClearIdeas: () => void,
    onUnassignAll: () => void,
    onClose: () => void,
    onLogout: () => void,
    onSeed: () => void,
    onShuffle: () => void,
    onReassign: (id: string) => void,
    onAssign: (name: string) => void,
    onDownload: () => void
}) => {
    const [teamBuffer, setTeamBuffer] = useState('');

    const unassignedIdeasCount = (ideas.length * 3) - teams.length;

    const handleSingleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (teamBuffer.trim() && unassignedIdeasCount > 0) {
            onAssign(teamBuffer.trim());
            setTeamBuffer('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[210] bg-black/95 backdrop-blur-3xl p-12 overflow-y-auto"
            data-lenis-prevent
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-12">
                    <div>
                        <h2 className="text-9xl font-black font-display uppercase tracking-tightest leading-none text-white">THE BRIDGE</h2>
                    </div>
                    <div className="flex gap-6">
                        <button onClick={onDownload} className="px-8 py-3 border border-accent-cyan/20 bg-accent-cyan/10 hover:bg-accent-cyan hover:text-black transition-all font-mono text-[10px] font-bold uppercase tracking-widest text-accent-cyan">Export Data</button>
                        <button onClick={onLogout} className="px-8 py-3 border border-red-500/20 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all font-mono text-[10px] font-bold uppercase tracking-widest text-red-500">Log Out</button>
                        <button onClick={onClose} className="px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-all font-mono text-[10px] font-bold uppercase tracking-widest text-white">Terminate</button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                    <div className="space-y-12">
                        <div className="glass p-10">
                            <form onSubmit={handleSingleAdd} className="space-y-8">
                                <div className="flex flex-col gap-4">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent-cyan font-bold">New Unit Entry</span>
                                    <input
                                        type="text"
                                        placeholder="Enter Team Name..."
                                        className="w-full bg-black/50 border border-white/5 p-8 font-display text-4xl outline-none text-white focus:border-accent-cyan/50 transition-colors"
                                        value={teamBuffer}
                                        onChange={e => setTeamBuffer(e.target.value)}
                                        autoFocus
                                        disabled={unassignedIdeasCount === 0}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!teamBuffer.trim() || unassignedIdeasCount === 0}
                                    className="btn-elite w-full py-6 disabled:opacity-20 disabled:grayscale"
                                >
                                    Assign Random Genesis
                                </button>
                            </form>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {teams.map(team => {
                                const idea = ideas.find(i => i.id === team.assignedIdeaId);
                                return (
                                    <div key={team.id} className="bg-white/5 border border-white/10 p-6 font-mono text-[10px] text-white/40 flex flex-col gap-4 group hover:bg-white/10 hover:text-white transition-all">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-bold">{team.name}</span>
                                            <Activity className="w-3 h-3 text-accent-cyan" />
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] text-accent-cyan opacity-80 uppercase font-black truncate max-w-[120px]">{idea?.title || 'Unknown Genesis'}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1, color: '#fff' }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onReassign(team.id)}
                                                className="font-mono text-[8px] uppercase tracking-widest text-white/30 border-b border-white/10 hover:border-white transition-all"
                                            >
                                                Reassign
                                            </motion.button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="glass p-8">
                            <h3 className="text-xl font-bold font-display uppercase text-white mb-8">System Status</h3>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4 mb-4">
                                <span className="font-mono text-[10px] uppercase text-white/30">Total IDEAs</span>
                                <span className="text-4xl font-black text-white">{ideas.length}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4 mb-12">
                                <span className="font-mono text-[10px] uppercase text-white/30">Teams Registered</span>
                                <span className="text-4xl font-black text-white">{teams.length}</span>
                            </div>

                            <div className="space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)', backgroundColor: '#00ffff', color: '#000' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onSeed}
                                    className="w-full py-3 border border-accent-cyan/30 text-accent-cyan font-mono text-[10px] uppercase font-black transition-all"
                                >
                                    Restore Default IDEAs
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)', backgroundColor: '#00ffff', color: '#000' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onShuffle}
                                    className="w-full py-3 border border-accent-cyan/30 text-accent-cyan font-mono text-[10px] uppercase font-black transition-all"
                                >
                                    Shuffle All Assignments
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)', backgroundColor: '#ef4444', color: '#fff' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClearTeams}
                                    className="w-full py-3 border border-red-500/30 text-red-500 font-mono text-[10px] uppercase font-black transition-all"
                                >
                                    Clear Registered Teams
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)', backgroundColor: '#f97316', color: '#fff' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onUnassignAll}
                                    className="w-full py-3 border border-orange-500/30 text-orange-500 font-mono text-[10px] uppercase font-black transition-all"
                                >
                                    Reset All Assignments
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClearIdeas}
                                    className="w-full py-3 border border-red-500/30 text-red-500 font-mono text-[10px] uppercase font-black transition-all"
                                >
                                    Delete All IDEAs
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminPanel;
