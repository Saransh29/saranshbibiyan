import { motion } from 'motion/react';

const QuoteSection = () => {
    return (
        <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden">
            <div className="relative z-10 max-w-4xl px-6 pt-6 text-center">
                <motion.p
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-instrument italic text-[22px] md:text-4xl text-black dark:text-white leading-tight tracking-tight"
                >
                    "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction."
                </motion.p>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
            >
                <span className="font-instrument italic text-lg text-black dark:text-zinc-200 tracking-wide">— Bhagavad Gita, Chapter 2, Verse 47</span>
            </motion.div>
        </div>
    );
};

export default QuoteSection;
