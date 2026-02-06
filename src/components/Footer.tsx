
import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer className="py-8 bg-dark border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-500 text-sm font-mono tracking-wider">
                        © {new Date().getFullYear()} CJ. All Rights Reserved.
                    </p>
                    <p className="text-gray-600 text-xs mt-2 opacity-50">
                        Designed with <span className="text-primary">Antigravity</span>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};
