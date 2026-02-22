import { motion } from 'motion/react';
import { Globe, Github } from 'lucide-react';
import { techStack } from '../data/portfolioData';

interface Project {
    id: string;
    title: string;
    role: string;
    description: string;
    stack: string[];
    gradient: string;
    bgColor?: string;
    img?: string;
    live?: string | null;
    github?: string | null;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const stackItems = project.stack.map(techName => {
        return techStack.find(t => t.name === techName) || { name: techName, icon: null };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
            className="group relative flex flex-col gap-5"
        >
            {/* Image/Gradient Area */}
            <div className="block relative w-full aspect-video rounded-xl overflow-hidden group-hover:scale-[1.01] transition-transform duration-700 ease-[0.22,1,0.36,1]">
                <div className="absolute inset-0 bg-[#F5F4F0] dark:bg-[#121214] transition-colors" />
                <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-60 group-hover:opacity-90 transition-all duration-700 ease-in-out`} />

                {/* Browser Container */}
                <div className="absolute inset-x-6 inset-t-8 -bottom-2 rounded-t-lg bg-white dark:bg-[#18181b] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden border border-black/5 dark:border-white/5 transition-all duration-500 ease-out group-hover:translate-y-[-6px]">
                    <div className="h-6 w-full bg-white dark:bg-[#18181b] border-b border-black/5 dark:border-white/5 flex items-center px-3 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                    <div className="relative w-full h-full bg-gray-50 dark:bg-zinc-900">
                        {project.img ? (
                            <img src={project.img} alt={project.title} className="w-full h-full object-cover object-top" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-zinc-200 dark:text-zinc-800 font-bold text-5xl opacity-30 select-none font-instrument italic">
                                    {project.title.charAt(0)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2.5 px-1">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-serif italic text-zinc-900 dark:text-zinc-100 flex items-center gap-2">{project.title}</h3>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{project.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="group/btn relative p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all">
                                <Globe size={14} />
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/btn relative p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all">
                                <Github size={14} />
                            </a>
                        )}
                    </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">{project.description}</p>

                {/* Tech circles */}
                <div className="flex items-center mt-3 pl-2">
                    <div className="flex -space-x-2 hover:space-x-1 transition-all duration-300">
                        {stackItems.map((tech: any, i: number) => (
                            <div key={i} className="group/tech relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:z-20 transition-all duration-300 hover:scale-110 cursor-help shadow-xs">
                                {tech.icon ? (
                                    <img src={tech.icon} alt={tech.name} className={`w-5 h-5 object-contain ${tech.invertDark ? 'dark:invert' : ''} opacity-80 group-hover/tech:opacity-100`} />
                                ) : (
                                    <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                                )}
                                <div className="absolute bottom-full mb-2 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] font-bold rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 left-1/2 -translate-x-1/2">
                                    {tech.name}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
