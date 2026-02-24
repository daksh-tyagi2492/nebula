import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IdeaSubmission from './components/IdeaSubmission';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import RevealSection from './components/RevealSection';
import { useStore } from './hooks/useStore';
import logo from './assets/logo.png';

function App() {
  const { ideas, teams, addIdea, clearTeams, clearIdeas, unassignAllIdeas, assignRandomIdeaToTeam } = useStore();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRevealVisible] = useState(() => {
    return teams.some(t => t.assignedIdeaId);
  });

  // Auto-redirect logic removed per user request

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const [allocationStatus, setAllocationStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleAssign = (name: string) => {
    try {
      assignRandomIdeaToTeam(name);
      setAllocationStatus({ type: 'success', message: `Nexus established for ${name}.` });
      setTimeout(() => setAllocationStatus({ type: null, message: '' }), 3000);
    } catch (err: any) {
      setAllocationStatus({ type: 'error', message: err.message });
      setTimeout(() => setAllocationStatus({ type: null, message: '' }), 5000);
    }
  };

  const handleDownloadResults = () => {
    const data = teams.map(team => {
      const idea = ideas.find(i => i.id === team.assignedIdeaId);
      return {
        teamName: team.name,
        ideaTitle: idea?.title || 'N/A',
        description: idea?.description || 'N/A'
      };
    });

    const csvRows = [
      ['Team Name', 'Idea', 'Description of IDEA'],
      ...data.map(row => [
        `"${row.teamName}"`,
        `"${row.ideaTitle.replace(/"/g, '""')}"`,
        `"${row.description.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nebula_allocation_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <main className="relative bg-background text-white min-h-screen selection:bg-white selection:text-black">
      {/* Allocation Status Notification */}
      <AnimatePresence>
        {allocationStatus.type && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-[500] px-8 py-4 border font-mono text-xs uppercase tracking-[0.2em] shadow-2xl backdrop-blur-xl ${allocationStatus.type === 'success' ? 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
          >
            {allocationStatus.message}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="noise" />
      </div>

      <Navbar onAdminClick={() => setIsAdminOpen(true)} />

      <Hero ideasCount={ideas.length} teamsCount={teams.length} />

      <div className="relative z-10">
        <IdeaSubmission onAddIdea={addIdea} />

        {teams.some(t => t.assignedIdeaId) && (
          <RevealSection teams={teams} ideas={ideas} isVisible={isRevealVisible} />
        )}
      </div>

      <footer className="py-24 px-6 border-t border-white/5 bg-black relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-white/20">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-8">
              <img src={logo} alt="Nebula Logo" className="h-16 w-auto opacity-80" />
              <span className="font-display font-black text-4xl tracking-tightest uppercase text-white/40">NEBULA_ELITE</span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.6em]">Absolute Technical Superiority</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-center">
            &copy; 2024 Engineering Council // All Rights Reserved in the Grid
          </div>
          <div className="flex gap-8 font-mono text-[8px] uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">v4.0.1_STABLE</span>
            <span className="hover:text-white cursor-pointer transition-colors">Mainframe_Secure</span>
          </div>
        </div>
      </footer>

      {/* Admin Interface */}
      {isAdminOpen && !isAuthenticated && (
        <AdminLogin onLogin={() => setIsAuthenticated(true)} />
      )}

      {isAdminOpen && isAuthenticated && (
        <AdminPanel
          teams={teams}
          ideas={ideas}
          onClearTeams={clearTeams}
          onClearIdeas={clearIdeas}
          onUnassignAll={unassignAllIdeas}
          onClose={() => {
            setIsAdminOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAssign={handleAssign}
          onDownload={handleDownloadResults}
        />
      )}
    </main>
  );
}

export default App;
