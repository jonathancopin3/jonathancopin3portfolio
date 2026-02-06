import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2, Phone, Mail } from 'lucide-react';
import { content } from '../constants';

export const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus('loading');

        emailjs.sendForm(
            content.contact.emailJsServiceId,
            content.contact.emailJsTemplateId,
            formRef.current,
            content.contact.emailJsPublicKey
        )
            .then(() => {
                setStatus('success');
                formRef.current?.reset();
                setTimeout(() => setStatus('idle'), 3000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            });
    };

    return (
        <section id="contact" className="py-32 md:py-48 relative">
            <div className="absolute right-0 bottom-0 w-[30%] h-[30%] bg-gradient-to-t from-primary/10 to-transparent blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-20 lg:gap-32 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                            Let's <span className="text-gradient">Create</span>.
                        </h2>
                        <p className="text-lg text-gray-400 mb-20 leading-relaxed font-light">
                            Ready to bring your vision to life? Whether it's a new project, a collaboration, or just a friendly hello, I'm all ears.
                        </p>

                        <div className="space-y-12">
                            <div className="group space-y-8">
                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-8">Get in touch</h4>

                                <a href={`mailto:${content.contact.email}`} className="text-xl md:text-2xl font-display font-medium text-white hover:text-primary transition-colors flex items-center gap-3">
                                    <div className="p-4 bg-white/5 rounded-full border border-white/10 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                                        <Mail size={20} />
                                    </div>
                                    {content.contact.email}
                                </a>

                                <a href={`tel:${content.contact.phone}`} className="text-xl md:text-2xl font-display font-medium text-white hover:text-primary transition-colors flex items-center gap-3">
                                    <div className="p-4 bg-white/5 rounded-full border border-white/10 transition-all duration-300 hover:bg-primary hover:text-black hover:border-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                                        <Phone size={20} />
                                    </div>
                                    {content.contact.phone}
                                </a>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Social Presence</h4>
                                <div className="flex gap-4">
                                    {content.socials.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-primary hover:text-black hover:border-primary transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 group"
                                            aria-label={social.name}
                                        >
                                            <social.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label htmlFor="user_name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    className="w-full px-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-black/40 transition-all font-medium text-white placeholder-gray-600"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="user_email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full px-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-black/40 transition-all font-medium text-white placeholder-gray-600"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pl-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-black/40 transition-all font-medium text-white placeholder-gray-600 resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-gradient-to-r from-primary to-primary-hover text-black rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle size={20} />
                                        Message Sent!
                                    </>
                                ) : status === 'error' ? (
                                    <>
                                        <AlertCircle size={20} />
                                        Try Again
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
