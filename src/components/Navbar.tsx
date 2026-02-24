import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-[100] px-6 py-8"
        >
            <div className="max-w-[1400px] mx-auto flex justify-between items-center glass p-6">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-6 cursor-pointer"
                >
                    <img src={logo} alt="Nebula Logo" className="h-16 w-auto" />
                    <div className="hidden sm:flex flex-col">
                        <span className="font-display font-black text-xl tracking-tighter uppercase leading-none text-white">Nebula</span>
                        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40">Elite Engineering</span>
                    </div>
                </motion.div>
                <div className="hidden lg:flex items-center gap-12 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
                    <motion.a href="#mission" whileHover={{ scale: 1.1, color: '#fff' }} className="transition-colors">Mission</motion.a>
                    <motion.a href="#submit" whileHover={{ scale: 1.1, color: '#fff' }} className="transition-colors">Ideas</motion.a>
                    <motion.a href="#teams" whileHover={{ scale: 1.1, color: '#fff' }} className="transition-colors">Allocation</motion.a>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAdminClick}
                    className="flex items-center gap-3 border border-white/20 px-6 py-2 transition-all font-mono text-[10px] font-bold uppercase tracking-widest text-white"
                >
                    <ShieldCheck className="w-4 h-4" />
                    Access Protocol
                </motion.button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
