import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Case studies', href: '#flagship', type: 'section' as const },
        { name: 'Experiments', href: '/experiments', type: 'route' as const },
        { name: 'Product Thinking', href: '#thinking', type: 'section' as const },
        { name: 'About', href: '#about', type: 'section' as const },
    ];

    const goToSection = (hash: string) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/' + hash);
            return;
        }
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    FP<span className="text-teal-600 dark:text-teal-400">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.type === 'route' ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ) : (
                            <button
                                key={link.name}
                                onClick={() => goToSection(link.href)}
                                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 dark:bg-teal-400 group-hover:w-full transition-all duration-300" />
                            </button>
                        )
                    )}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-600 dark:text-slate-300"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) =>
                                link.type === 'route' ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-left text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => goToSection(link.href)}
                                        className="text-left text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                )
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
