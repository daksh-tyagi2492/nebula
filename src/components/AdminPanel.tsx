import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import type { Idea, Team } from '../hooks/useStore';

const AdminPanel = ({ teams, ideas, onClearTeams, onClearIdeas, onUnassignAll, onClose, onAssign, onDownload }: {
    teams: Team[],
    ideas: Idea[],
    onClearTeams: () => void,
    onClearIdeas: () => void,
    onUnassignAll: () => void,
    onClose: () => void,
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
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-12">
                    <div>
                        <h2 className="text-9xl font-black font-display uppercase tracking-tightest leading-none text-white">THE BRIDGE</h2>
                    </div>
                    <div className="flex gap-6">
                        <button onClick={onDownload} className="px-8 py-3 border border-accent-cyan/20 bg-accent-cyan/10 hover:bg-accent-cyan hover:text-black transition-all font-mono text-[10px] font-bold uppercase tracking-widest text-accent-cyan">Export Data</button>
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
                                        <span className="text-[10px] text-accent-cyan opacity-80 uppercase font-black truncate">{idea?.title || 'Unknown Genesis'}</span>
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
                                <button onClick={onClearTeams} className="w-full py-3 border border-red-500/30 text-red-500 font-mono text-[10px] uppercase font-black hover:bg-red-500 hover:text-white transition-all">Reset Teams</button>
                                <button onClick={onUnassignAll} className="w-full py-3 border border-orange-500/30 text-orange-500 font-mono text-[10px] uppercase font-black hover:bg-orange-500 hover:text-white transition-all">Unassign All</button>
                                <button onClick={onClearIdeas} className="w-full py-3 border border-red-500/30 text-red-500 font-mono text-[10px] uppercase font-black hover:bg-red-500/10 hover:border-red-500 transition-all">Reset Ideas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminPanel;
