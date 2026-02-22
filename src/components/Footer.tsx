import { motion } from 'motion/react';

const Footer = () => {
    return (
        <div className="flex flex-col w-full">
            <motion.footer
                initial="hidden" animate="visible"
                variants={{ hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } } }}
                className="flex mt-8 flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500 font-inter tracking-wide transition-colors pb-8 px-4 md:px-6"
            >
                <p className="uppercase tracking-widest opacity-80">© 2026 All rights reserved.</p>
                <span className="font-instrument italic text-[16px] text-zinc-900 dark:text-zinc-100 font-medium">Saransh Bibiyan</span>
            </motion.footer>
        </div>
    );
};

export default Footer;
