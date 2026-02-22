import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './ui/Logo';
import { socialLinks } from '../data/portfolioData';
import GithubIcon from './icons/GithubIcon';
import TwitterXIcon from './icons/TwitterXIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = (e?: React.MouseEvent) => {
        const html = document.documentElement;
        const newTheme = html.classList.contains('dark') ? 'light' : 'dark';

        if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (newTheme === 'dark') html.classList.add('dark');
            else html.classList.remove('dark');
            localStorage.setItem('theme', newTheme);
            setTheme(newTheme);
            return;
        }

        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;
        const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

        const transition = (document as any).startViewTransition(() => {
            if (newTheme === 'dark') html.classList.add('dark');
            else html.classList.remove('dark');
            localStorage.setItem('theme', newTheme);
            setTheme(newTheme);
        });

        transition.ready.then(() => {
            const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
            const isSwitchingToDark = newTheme === 'dark';
            document.documentElement.animate(
                { clipPath: isSwitchingToDark ? clipPath : [...clipPath].reverse() },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: isSwitchingToDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
                    fill: 'forwards'
                }
            );
        });
    };

    const navLinks = [{ name: 'Projects', href: '/projects' }];

    const iconLinks = [
        { Icon: TwitterXIcon, href: socialLinks.twitter },
        { Icon: LinkedinIcon, href: socialLinks.linkedin },
        { Icon: GithubIcon, href: socialLinks.github },
    ];

    return (
        <>
            <motion.nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 w-full pointer-events-none">
                {/* Left: Logo */}
                <div className="pointer-events-auto px-4 py-2 rounded-full transition-colors duration-300">
                    <a href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <Logo />
                    </a>
                </div>

                {/* Right: Navigation */}
                <div className="pointer-events-auto px-6 py-3 rounded-full transition-colors duration-300 flex items-center gap-2">
                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300">
                                <p className="mix-blend-difference">{link.name}</p>
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:block h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-2"></div>

                    {/* Desktop Icon Links */}
                    <div className="hidden md:flex items-center gap-5">
                        {iconLinks.map((item, index) => (
                            <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors transform hover:scale-110 active:scale-95 duration-200 flex items-center justify-center p-1">
                                <item.Icon size={20} strokeWidth={1.5} />
                            </a>
                        ))}

                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer relative overflow-hidden" aria-label="Toggle Theme">
                            {theme === 'dark' ? <SunIcon size={20} strokeWidth={2} /> : <MoonIcon size={20} strokeWidth={2} />}
                        </button>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button onClick={toggleTheme} className="flex items-center justify-center p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer relative" aria-label="Toggle Theme">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div key={theme} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                                    {theme === 'dark' ? <Sun size={18} strokeWidth={2} className="text-zinc-500 dark:text-zinc-400" /> : <Moon size={18} strokeWidth={2} className="text-zinc-500 dark:text-zinc-400" />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                        <button onClick={() => setIsMobileMenuOpen(true)} className="flex items-center justify-center p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 cursor-pointer" aria-label="Open Menu">
                            <Menu size={20} strokeWidth={1.5} className="text-zinc-800 dark:text-zinc-200" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" />
                        <motion.div
                            initial={{ y: "-100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0c0c0e] rounded-b-[2rem] shadow-2xl md:hidden overflow-hidden border-b border-black/5 dark:border-white/5"
                        >
                            <div className="flex items-center justify-between px-6 pt-5 pb-3">
                                <div className="flex items-center gap-3">
                                    <Logo />
                                    <span className="font-instrument italic text-lg font-medium">Portfolio</span>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="px-8 pb-8 pt-2 flex flex-col gap-8">
                                <div className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center justify-between">
                                            <span className="text-4xl font-instrument italic text-zinc-800 dark:text-zinc-100 font-medium tracking-tight">{link.name}</span>
                                        </a>
                                    ))}
                                </div>
                                <div className="h-px w-full bg-black/5 dark:bg-white/5" />
                                <div className="w-full flex items-center justify-center gap-6">
                                    {iconLinks.map((link, idx) => (
                                        <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-colors transform hover:scale-110 active:scale-95 duration-200">
                                            <link.Icon size={24} strokeWidth={1.5} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
