import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';
import TwitterXIcon from './icons/TwitterXIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import GmailIcon from './icons/GmailIcon';
import SectionHeading from './ui/SectionHeading';
import { ShimmeringText } from './ui/ShimmeringText';

const contactLinks = [
    { id: 'github', label: 'GitHub', icon: GithubIcon, href: 'https://github.com/Saransh29', type: 'link', color: 'group-hover:text-black group-hover:dark:text-white group-hover:border-black/20 group-hover:dark:border-white/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10' },
    { id: 'twitter', label: 'Twitter', icon: TwitterXIcon, href: 'https://x.com/0xsaransh', type: 'link', color: 'group-hover:text-blue-400 group-hover:border-blue-400/20 bg-blue-500/5 hover:bg-blue-500/10' },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/saransh-bibiyan/', type: 'link', color: 'group-hover:text-blue-500 group-hover:border-blue-500/20 bg-blue-600/5 hover:bg-blue-600/10' },
    { id: 'mail', label: 'Email', icon: GmailIcon, href: 'mailto:saranshbibiyan234@gmail.com', type: 'copy', content: 'saranshbibiyan234@gmail.com', color: 'group-hover:text-emerald-400 group-hover:border-emerald-400/20 bg-emerald-500/5 hover:bg-emerald-500/10' },
];

const SocialPill = ({ link }: { link: typeof contactLinks[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);
    const iconRef = useRef<any>(null);

    const handleAction = (e: React.MouseEvent) => {
        if (link.type === 'copy' && 'content' in link) {
            e.preventDefault();
            navigator.clipboard.writeText((link as any).content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="relative inline-block" onMouseEnter={() => { setIsHovered(true); iconRef.current?.startAnimation(); }} onMouseLeave={() => { setIsHovered(false); iconRef.current?.stopAnimation(); }}>
            <AnimatePresence>
                {isHovered && link.type === 'copy' && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2, ease: "easeOut" }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-none">
                        <div className="flex items-center gap-3 py-2 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl whitespace-nowrap">
                            <div className={`p-1 rounded-md ${copied ? 'text-emerald-500' : 'text-zinc-400'}`}>
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${copied ? 'text-emerald-500' : 'text-zinc-500'}`}>{copied ? 'Copied!' : 'Copy Email'}</span>
                                <span className="text-xs font-mono text-zinc-300">{(link as any).content}</span>
                            </div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-800" />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.a href={link.href} target={link.type === 'copy' ? undefined : "_blank"} rel="noopener noreferrer" onClick={handleAction} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className={`group relative flex items-center gap-2.5 px-5 py-3 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${link.color}`}>
                <div className="relative z-10">
                    <link.icon ref={iconRef} size={18} strokeWidth={2} disableHover={true} className="text-zinc-500 dark:text-zinc-400 transition-colors duration-300 group-hover:text-current" />
                </div>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors z-10">{link.label}</span>
            </motion.a>
        </div>
    );
};

const Contact = () => {
    return (
        <motion.section variants={{ hidden: { opacity: 0, y: 40, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } } }}>
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeading>Contact</SectionHeading>
                <div className="flex flex-col items-start gap-8 mt-8">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight leading-tight transition-colors">
                            Let's build something <br />
                            <span className="text-gray-400 dark:text-zinc-500 font-inter not-italic font-light">extraordinary <ShimmeringText text="together." className="font-instrument italic font-normal text-gray-900 dark:text-white inline-block" /></span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {contactLinks.map((link) => <SocialPill key={link.id} link={link} />)}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;
