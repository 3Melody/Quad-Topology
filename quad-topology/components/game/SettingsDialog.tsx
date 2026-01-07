import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Music, Speaker } from 'lucide-react';
import { audioManager } from '../../lib/audio';

interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
    const [bgmVolume, setBgmVolume] = useState(0.5);
    const [sfxVolume, setSfxVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setBgmVolume(audioManager.getBGMVolume());
            setSfxVolume(audioManager.getSFXVolume());
            // AudioManager doesn't expose getMuted directly but toggleMute returns state. 
            // We can assume sync or just track locally, but better to add a getter if needed.
            // For now, toggleMute checks internal state.
        }
    }, [isOpen]);

    const handleBgmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setBgmVolume(newVolume);
        audioManager.setBGMVolume(newVolume);
    };

    const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setSfxVolume(newVolume);
        audioManager.setSFXVolume(newVolume);
    };

    const handleToggleMute = () => {
        const newMuteState = audioManager.toggleMute();
        setIsMuted(newMuteState);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <SettingsIcon className="text-cyan-400" />
                    Settings
                </h2>

                <div className="space-y-8">
                    {/* BGM Volume Control */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-neutral-300">
                            <span className="font-medium flex items-center gap-2">
                                <Music size={16} className="text-cyan-400" /> Music
                            </span>
                            <span className="text-sm font-mono text-cyan-400">{Math.round(bgmVolume * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={bgmVolume}
                            onChange={handleBgmChange}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,211,238,0.5)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                    </div>

                    {/* SFX Volume Control */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-neutral-300">
                            <span className="font-medium flex items-center gap-2">
                                <Speaker size={16} className="text-cyan-400" /> SFX
                            </span>
                            <span className="text-sm font-mono text-cyan-400">{Math.round(sfxVolume * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={sfxVolume}
                            onChange={handleSfxChange}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(74,222,128,0.5)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                    </div>

                    {/* Mute Toggle */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                        <span className="text-neutral-300 font-medium">Mute All</span>
                        <button
                            onClick={handleToggleMute}
                            className={`p-3 rounded-xl transition-all duration-300 ${isMuted
                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                                }`}
                        >
                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all active:scale-95"
                    >
                        DONE
                    </button>
                </div>
            </div>
        </div>
    );
}

function SettingsIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    )
}
