"use client";

import React from 'react';
import { Play, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface StartScreenProps {
    onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="mb-8 relative group">
                <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/30 transition-all duration-500"></div>
                <ShieldCheck size={120} className="text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>

            <h1 className="text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
                QUAD <span className="text-cyan-400">TOPOLOGY</span>
            </h1>
            <p className="text-neutral-400 text-lg mb-12 max-w-md">
                Master the art of 3D modeling topology. Connect the nodes to creates perfect quad-based meshes.
            </p>

            <button
                onClick={onStart}
                className="group relative px-8 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="flex items-center gap-3">
                    <Play size={24} className="fill-black" />
                    START GAME
                </span>
            </button>

            <div className="mt-16 text-xs text-neutral-600">
                v1.0.0 • Mobile Friendly
            </div>
        </div>
    );
}
