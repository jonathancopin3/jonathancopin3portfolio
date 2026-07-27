import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LockedModal = ({ onUnlock }: { onUnlock: () => void }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === '5454') {
            onUnlock();
        } else {
            setError(true);
            setCode('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 p-8 rounded-3xl border border-white/10 max-w-md w-full text-center"
            >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-display font-semibold mb-3 text-white">Projet Protégé</h2>
                <p className="text-gray-400 mb-8 font-light text-sm">Veuillez entrer le code d'accès pour visualiser le Projet Nomade.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="password" 
                            value={code} 
                            onChange={(e) => { setCode(e.target.value); setError(false); }} 
                            className={`w-full bg-black/50 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-center tracking-[0.5em] text-white focus:outline-none focus:border-white/30 transition-colors`}
                            placeholder="••••"
                            maxLength={4}
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-xs mt-2">Code incorrect, veuillez réessayer.</p>}
                    </div>
                    <button type="submit" className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                        Déverrouiller
                    </button>
                </form>
            </motion.div>
        </div>
    );
};
