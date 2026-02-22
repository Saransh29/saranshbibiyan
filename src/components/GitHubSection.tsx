import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

const PortalTooltip = ({ activity, position }: { activity: any; position: any }) => {
    if (!activity || !position || typeof document === 'undefined') return null;
    return createPortal(
        <div className="fixed z-[99999] pointer-events-none" style={{ left: position.x, top: position.y, transform: 'translate(-50%, -100%) translateY(-10px)' }}>
            <div className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap flex flex-col items-center border border-slate-700/50">
                <span className="font-bold mb-0.5">{activity.count} contributions</span>
                <span className="text-slate-400 text-[9px] font-medium uppercase tracking-wider">{activity.date}</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
            </div>
        </div>,
        document.body
    );
};

interface ContribDay { date: string; count: number; level: number; }

const GitHubSection = () => {
    const username = siteConfig.githubUsername;
    const [data, setData] = useState<ContribDay[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hoveredBlock, setHoveredBlock] = useState<{ activity: ContribDay; x: number; y: number } | null>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        fetch(`https://github-contributions-api.deno.dev/${username}.json`)
            .then(r => r.json())
            .then(d => {
                const flat = d.contributions.flat().map((day: any) => ({
                    date: day.date, count: day.contributionCount,
                    level: day.contributionCount === 0 ? 0 : day.contributionCount < 3 ? 1 : day.contributionCount < 6 ? 2 : day.contributionCount < 10 ? 3 : 4,
                }));
                setData(flat);
                setTotal(d.totalContributions);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [username]);

    const lightColors = ['#f1f5f9', '#86efac', '#22c55e', '#15803d', '#022c22'];
    const darkColors = ['#161b22', '#0d361e', '#1b5e32', '#2ea043', '#4ade80'];
    const colors = isDark ? darkColors : lightColors;

    // Build weeks grid from last ~52 weeks
    const weeks: (ContribDay | null)[][] = [];
    const lastDay = data.length > 0 ? data[data.length - 1] : null;
    if (data.length > 0) {
        const recent = data.slice(-371);
        let week: (ContribDay | null)[] = [];
        const firstDayOfWeek = new Date(recent[0].date).getDay();
        for (let i = 0; i < firstDayOfWeek; i++) week.push(null);
        for (const day of recent) {
            week.push(day);
            if (week.length === 7) { weeks.push(week); week = []; }
        }
        if (week.length > 0) weeks.push(week);
    }

    const cellSize = 12; const gap = 3;
    const svgW = weeks.length * (cellSize + gap);
    const svgH = 7 * (cellSize + gap) + 20;

    return (
        <>
            <PortalTooltip activity={hoveredBlock?.activity} position={hoveredBlock ? { x: hoveredBlock.x, y: hoveredBlock.y } : null} />
            <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[900px] mx-auto font-sans relative py-8"
            >
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex justify-between items-end mb-12 border-b border-black/5 dark:border-white/5 pb-8">
                    <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-400 block">Open Source</span>
                        <div className="flex items-baseline gap-3">
                            <h2 className="text-4xl md:text-5xl font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight">
                                GitHub <span className="font-inter not-italic font-light text-gray-500 dark:text-gray-400 text-3xl md:text-4xl">Activity</span>
                            </h2>
                            <span className="text-lg font-mono text-gray-500 dark:text-gray-600 hidden sm:block">@{username}</span>
                        </div>
                    </div>
                    <motion.a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-semibold transition-all duration-300 group/link pb-1 text-gray-900 dark:text-gray-100">
                        <span className="relative after:absolute after:bg-current after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">View Profile</span>
                        <ArrowUpRight size={16} className="text-slate-400 dark:text-slate-500 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-current" />
                    </motion.a>
                </motion.div>

                {loading ? (
                    <div className="h-[150px] flex flex-col items-center justify-center w-full gap-3">
                        <Loader2 className="animate-spin text-green-600 dark:text-green-400" size={28} />
                        <span className="text-sm font-medium animate-pulse text-green-600 dark:text-green-400">Loading history...</span>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center relative">
                        <div className="max-w-full overflow-x-auto overflow-y-hidden custom-scrollbar pb-2 cursor-pointer">
                            <svg className="block overflow-visible" width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} onMouseLeave={() => setHoveredBlock(null)}>
                                {weeks.map((week, wi) => week.map((day, di) => {
                                    if (!day) return null;
                                    return (
                                        <rect key={`${wi}-${di}`} x={wi * (cellSize + gap)} y={20 + di * (cellSize + gap)} width={cellSize} height={cellSize} rx={2} fill={colors[day.level]}
                                            className="cursor-pointer transition-all duration-300 hover:opacity-80"
                                            onMouseEnter={(e) => { const rect = (e.target as SVGRectElement).getBoundingClientRect(); setHoveredBlock({ activity: day, x: rect.left + rect.width / 2, y: rect.top }); }}
                                            onMouseLeave={() => setHoveredBlock(null)}
                                        />
                                    );
                                }))}
                            </svg>
                        </div>
                        <div className="flex items-center justify-between mt-6 pt-2 w-full">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                <span className="text-base font-semibold mr-1 text-slate-900 dark:text-slate-50">{total.toLocaleString()}</span>
                                contributions in the last year
                            </span>
                            <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                <span>Less</span>
                                <div className="flex gap-[3px] p-1 rounded-full">
                                    {colors.map((c, i) => <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />)}
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </>
    );
};

export default GitHubSection;
