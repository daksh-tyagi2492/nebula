import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = ({ ideasCount, teamsCount }: { ideasCount: number, teamsCount: number }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

    // Mask animation values
    const maskX = useTransform(scrollYProgress, [0, 0.4], ['-100%', '100%']);
    const maskWidth = useTransform(scrollYProgress, [0, 0.2, 0.4], ['0%', '60%', '0%']);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex gap-8 md:gap-24 opacity-60">
                <div className="text-center">
                    <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent-cyan block mb-2">Total IDEAs</span>
                    <span className="text-3xl font-black font-display text-white">{ideasCount}</span>
                </div>
                <div className="text-center">
                    <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-accent-cyan block mb-2">Teams Registered</span>
                    <span className="text-3xl font-black font-display text-white">{teamsCount}</span>
                </div>
            </div>

            <div className="relative z-10 text-center px-6 w-full max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12"
                >
                    <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">NEBULA_ELITE_v4.0</span>
                </motion.div>

                <div className="relative group">
                    {/* Base Layer (White Text) */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{ y, opacity, scale }}
                        className="font-display text-7xl md:text-[12rem] font-black tracking-[-0.05em] leading-[0.85] uppercase mb-12 text-white"
                    >
                        TRANSFORM<br />THE VOID
                    </motion.h1>

                    {/* Masked Layer (Black Text on White Box) */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
                        style={{
                            clipPath: `inset(0 0 0 0)`, // Initially hidden or handled by width/x
                            x: maskX,
                            width: maskWidth,
                            background: 'white',
                            height: '100%',
                            mixBlendMode: 'normal',
                            left: '20%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: useTransform(scrollYProgress, [0, 0.05, 0.35, 0.4], [0, 1, 1, 0])
                        }}
                    >
                        <motion.h1
                            style={{ y, scale, width: '1400px', marginLeft: '-20%' }}
                            className="font-display text-7xl md:text-[12rem] font-black tracking-[-0.05em] leading-[0.85] uppercase text-black text-center whitespace-nowrap"
                        >
                            TRANSFORM<br />THE VOID
                        </motion.h1>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12"
                >
                    <p className="max-w-md text-left text-white/40 text-sm md:text-base font-medium tracking-wider uppercase leading-relaxed">
                        Exalted engineering meets absolute creative freedom. The premier national hackathon for architecting the next dimension.
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        href="#submit"
                        className="btn-elite"
                    >
                        Begin Submission
                    </motion.a>
                </motion.div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
                <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>
        </section>
    );
};

export default Hero;
