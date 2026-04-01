"use client";

import React from 'react';
import { ArrowRight, RefreshCw, Star } from 'lucide-react';

interface LevelCompleteProps {
    levelName: string;
    faces: number;
    onNext: () => void;
    onReplay: () => void;
    hasNextLevel: boolean;
}

export default function LevelComplete({ levelName, faces, onNext, onReplay, hasNextLevel }: LevelCompleteProps) {
    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            <div className="bg-neutral-900 border border-neutral-700 p-5 sm:p-8 rounded-2xl max-w-md w-full text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
                <div className="flex justify-center gap-2 mb-4 sm:mb-6">
                    <Star className="text-yellow-400 fill-yellow-400 animate-bounce delay-0 w-8 h-8 sm:w-10 sm:h-10" />
                    <Star className="text-yellow-400 fill-yellow-400 animate-bounce delay-100 w-10 h-10 sm:w-12 sm:h-12" />
                    <Star className="text-yellow-400 fill-yellow-400 animate-bounce delay-200 w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Level Complete!</h2>
                <p className="text-neutral-400 mb-6 sm:mb-8 text-sm sm:text-base">
                    You solved <span className="text-cyan-400 font-bold">{levelName}</span>!
                </p>

                <div className="flex flex-col gap-3">
                    {hasNextLevel ? (
                        <button
                            onClick={onNext}
                            className="w-full py-3 sm:py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                        >
                            Next Level <ArrowRight size={20} />
                        </button>
                    ) : (
                        <div className="p-3 sm:p-4 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/30 text-sm sm:text-base">
                            All Levels Completed! You are a Topology Master!
                        </div>
                    )}

                    <button
                        onClick={onReplay}
                        className="w-full py-2 sm:py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
                    >
                        <RefreshCw size={18} /> Replay
                    </button>
                </div>
            </div>
        </div>
    );
}
