import React, { useState, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

interface LockedModalProps {
    onUnlock: () => void;
}

export const LockedModal: React.FC<LockedModalProps> = ({ onUnlock }) => {
    const [digits, setDigits] = useState(['', '', '', '']);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const checkCode = (code: string, currentDigits: string[]) => {
        if (code === '5454') {
            setError(false);
            onUnlock();
        } else {
            setError(true);
            setShake(true);
            setDigits(['', '', '', '']);
            setTimeout(() => {
                setShake(false);
                inputRefs.current[0]?.focus();
            }, 500);
        }
    };

    const handleDigitChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        
        setError(false);
        const newDigits = [...digits];
        newDigits[index] = value.slice(-1);
        setDigits(newDigits);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        if (index === 3 && value) {
            const fullCode = [...newDigits.slice(0, 3), value].join('');
            checkCode(fullCode, newDigits);
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const code = digits.join('');
        if (code.length === 4) checkCode(code, digits);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative w-full max-w-sm mx-4 rounded-3xl overflow-hidden ${shake ? 'animate-shake' : ''}`}
                style={{
                    background: 'rgba(30, 30, 30, 0.85)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                }}
            >
                <div className="p-10 flex flex-col items-center text-center">
                    {/* Lock Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mb-6"
                        style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>

                    {/* Text */}
                    <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">Protected</p>
                    <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">Nomad Apple Watch Strap</h2>
                    <p className="text-sm text-white/40 font-light mb-8">Enter access code to continue</p>

                    {/* 4 PIN boxes + submit button */}
                    <div className="flex items-center gap-3">
                        {digits.map((digit, i) => (
                            <input
                                key={i}
                                ref={el => { inputRefs.current[i] = el; }}
                                type="password"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleDigitChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                                autoFocus={i === 0}
                                className={`w-14 h-14 rounded-2xl text-center text-xl font-semibold text-white outline-none transition-all duration-200 ${
                                    error
                                        ? 'border-red-500/60 bg-red-500/10'
                                        : digit
                                        ? 'border-white/30 bg-white/10'
                                        : 'border-white/10 bg-white/5'
                                }`}
                                style={{
                                    border: error ? '1px solid rgba(239,68,68,0.6)' : digit ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                                    background: error ? 'rgba(239,68,68,0.08)' : digit ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                }}
                            />
                        ))}

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                        >
                            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400/80 text-xs mt-4 font-light"
                        >
                            Incorrect code. Please try again.
                        </motion.p>
                    )}
                </div>
            </motion.div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-6px); }
                    80% { transform: translateX(6px); }
                }
                .animate-shake { animation: shake 0.45s ease-in-out; }
            `}</style>
        </div>
    );
};
