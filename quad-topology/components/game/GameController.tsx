"use client";

import React, { useState } from 'react';
import GameCanvas from './GameCanvas';
import { levels } from '../../data/levels';
import { GameEdge, GameNode } from '../../lib/types';
import { audioManager } from '../../lib/audio';
import { RefreshCw, CheckCircle, Volume2, ChevronLeft, Settings } from 'lucide-react';
import StartScreen from './StartScreen';
import LevelComplete from './LevelComplete';
import SettingsDialog from './SettingsDialog';
import Tutorial from './Tutorial';
import { validateQuadTopology, autoRepairTopology } from '../../lib/topology';

export default function GameController() {
    const [currentLevelId, setCurrentLevelId] = useState(levels[0].id);
    const [userEdges, setUserEdges] = useState<GameEdge[]>([]);
    const [userNodes, setUserNodes] = useState<GameNode[]>([]); // New State

    const [gameState, setGameState] = useState<'MENU' | 'TUTORIAL' | 'PLAYING' | 'LEVEL_COMPLETE'>('MENU');
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
    const [invalidFaces, setInvalidFaces] = useState<{ x: number, y: number }[][]>([]);
    const [showSettings, setShowSettings] = useState(false);

    const currentLevelIndex = levels.findIndex(l => l.id === currentLevelId);
    const currentLevel = levels[currentLevelIndex] || levels[0];

    // Reset when level changes
    React.useEffect(() => {
        setUserEdges([]);
        setUserNodes([]);
        setInvalidFaces([]);
        setFeedback({ message: '', type: null });
    }, [currentLevelId]);

    const handleStartGame = () => {
        audioManager.playBGM();
        audioManager.playSFX('click');
        setGameState('TUTORIAL');
    };

    const handleTutorialComplete = () => {
        setGameState('PLAYING');
    };

    const handleReset = () => {
        audioManager.playSFX('click');
        setUserEdges([]);
        setUserNodes([]);
        setInvalidFaces([]);
        setFeedback({ message: '', type: null });
    };

    const handleStrokeCreate = (start: { pos: { x: number, y: number }, nodeId?: string }, end: { pos: { x: number, y: number }, nodeId?: string }) => {
        let sourceId = start.nodeId;
        let targetId = end.nodeId;

        // Reset feedback on interaction
        if (feedback.type === 'error') {
            setFeedback({ message: '', type: null });
            setInvalidFaces([]);
        }

        const findNodeAt = (pos: { x: number, y: number }) => {
            const allNodes = [...currentLevel.nodes, ...userNodes];
            return allNodes.find(n => Math.abs(n.position.x - pos.x) < 2 && Math.abs(n.position.y - pos.y) < 2);
        };

        // 1. Create Source Node if missing
        if (!sourceId) {
            const existing = findNodeAt(start.pos);
            if (existing) {
                sourceId = existing.id;
            } else {
                sourceId = `u_${Date.now()}_1`;
                const newNode: GameNode = { id: sourceId, position: start.pos, type: 'default' };
                setUserNodes(prev => [...prev, newNode]);
            }
        }

        // 2. Create Target Node if missing
        if (!targetId) {
            // Check if we moved enough to warrant a new node/edge, OR if we just clicked (dot)
            // If dragging to same spot, we might want to just ensure the node exists
            const isDrag = Math.abs(start.pos.x - end.pos.x) > 5 || Math.abs(start.pos.y - end.pos.y) > 5;

            if (isDrag || (!start.nodeId && !end.nodeId)) {
                const existing = findNodeAt(end.pos);
                if (existing) {
                    targetId = existing.id;
                } else {
                    targetId = `u_${Date.now()}_2`;
                    const newNode: GameNode = { id: targetId, position: end.pos, type: 'default' };
                    setUserNodes(prev => [...prev, newNode]);
                }
            }
        }

        // Single click case (source created above, target might be undefined if not drag)
        if (!targetId && !start.nodeId && !end.nodeId) {
            // Just creating a dot (sourceId was created/found above)
            audioManager.playSFX('click');
            return;
        }

        // 3. Connect them
        if (sourceId && targetId && sourceId !== targetId) {
            const edgeId = `${sourceId}-${targetId}`;
            const exist = [...currentLevel.edges, ...userEdges].some(e =>
                (e.source === sourceId && e.target === targetId) || (e.source === targetId && e.target === sourceId)
            );

            if (!exist) {
                const newEdge: GameEdge = { id: edgeId, source: sourceId, target: targetId };
                setUserEdges(prev => [...prev, newEdge]);
                audioManager.playSFX('connect');
            }
        }
    };

    const handleCheck = () => {
        const allNodes = [...currentLevel.nodes, ...userNodes];
        const allEdges = [...currentLevel.edges, ...userEdges];

        // Auto-Repair (Snap & Dedup) before validating
        const repaired = autoRepairTopology(allNodes, allEdges);

        // Separate back into User vs Level components (assuming Level IDs don't start with u_)
        // Ideally we just check if it's in the original level set, but positions might have shifted slightly (snapped).
        // Since we want to update the UI to show the "Snapped" version:
        const newUserNodes = repaired.nodes.filter(n => n.id.startsWith('u_'));

        // For edges, any edge that isn't strictly one of the original level edges is a user edge
        const levelEdgeIds = new Set(currentLevel.edges.map(e => e.id));
        const newUserEdges = repaired.edges.filter(e => !levelEdgeIds.has(e.id));

        // Update state to reflect the "Fixed" topology
        setUserNodes(newUserNodes);
        setUserEdges(newUserEdges);

        const result = validateQuadTopology(repaired.nodes, repaired.edges);

        if (result.isValid) {
            audioManager.playSFX('win');
            setGameState('LEVEL_COMPLETE');
            setInvalidFaces([]);
        } else {
            audioManager.playSFX('error');
            setFeedback({
                type: 'error',
                message: `❌ ${result.message}`
            });
            setInvalidFaces(result.invalidFaces || []);
        }
    };

    const handleEdgeDelete = (edgeId: string) => {
        setUserEdges(prev => prev.filter(e => e.id !== edgeId));
        audioManager.playSFX('click');

        // Clear error feedback when user modifies
        if (feedback.type === 'error') {
            setFeedback({ message: '', type: null });
            setInvalidFaces([]);
        }
    };

    const handleNextLevel = () => {
        audioManager.playSFX('click');
        const nextIndex = currentLevelIndex + 1;
        if (nextIndex < levels.length) {
            setCurrentLevelId(levels[nextIndex].id);
            setGameState('PLAYING');
        } else {
            // All levels done?
            setGameState('MENU'); // or stay on screen
        }
    };

    const handleReplay = () => {
        audioManager.playSFX('click');
        setUserEdges([]);
        setUserNodes([]);
        setInvalidFaces([]);
        setGameState('PLAYING');
    };

    const handlePrevLevel = () => {
        audioManager.playSFX('click');
        const prevIndex = currentLevelIndex - 1;
        if (prevIndex >= 0) {
            setCurrentLevelId(levels[prevIndex].id);
            setGameState('PLAYING');
        }
    };

    if (gameState === 'MENU') {
        return <StartScreen onStart={handleStartGame} />;
    }

    if (gameState === 'TUTORIAL') {
        return <Tutorial onComplete={handleTutorialComplete} />;
    }

    return (
        <div className="flex flex-col w-full h-screen max-w-7xl relative">
            <SettingsDialog
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
            />

            {/* Level Complete Overlay */}
            {gameState === 'LEVEL_COMPLETE' && (
                <LevelComplete
                    levelName={currentLevel.name}
                    faces={currentLevel.targetFaces}
                    onNext={handleNextLevel}
                    onReplay={handleReplay}
                    hasNextLevel={currentLevelIndex < levels.length - 1}
                />
            )}

            {/* Header HUD */}
            <header className="flex items-center w-full justify-between p-4 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md z-10 rounded-t-xl mt-4 mx-4 border">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase">{currentLevel.name}</h2>
                    <p className="text-xs text-neutral-400">Target: All faces must be Triangles or Quads (3-4 sided)</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowSettings(true)} className="text-neutral-500 hover:text-white transition-colors">
                        <Settings size={20} />
                    </button>
                    {/* <button onClick={() => audioManager.toggleMute()} className="text-neutral-500 hover:text-white transition-colors">
                        <Volume2 size={20} />
                    </button> */}

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevLevel}
                            disabled={currentLevelIndex === 0}
                            className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="px-3 py-1 bg-neutral-800 rounded text-xs text-neutral-400 border border-neutral-700 whitespace-nowrap">
                            {currentLevelIndex + 1} / {levels.length}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Game Area */}
            <div className="flex-1 relative w-full overflow-hidden bg-neutral-900 mx-4 border-x border-neutral-800">
                <GameCanvas
                    nodes={[...currentLevel.nodes, ...userNodes]}
                    boundaryEdges={currentLevel.edges}
                    userEdges={userEdges}
                    tiles={currentLevel.tiles}
                    invalidFaces={invalidFaces}
                    onEdgesChange={(edges) => {
                        // Play sound on edge added?
                        if (edges.length > userEdges.length) {
                            audioManager.playSFX('connect');
                        }
                        setUserEdges(edges);
                    }}
                    onEdgeDelete={handleEdgeDelete}
                    onStrokeCreate={handleStrokeCreate}
                />
            </div>

            {/* Controls HUD */}
            <div className="p-4 bg-neutral-900/90 border-t w-full border-neutral-800 backdrop-blur-md z-10 mb-4 mx-4 rounded-b-xl border flex flex-col gap-2">
                <div className="flex gap-4">
                    <button
                        onClick={handleReset}
                        className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-3 px-4 rounded-xl transition-all font-bold active:scale-95"
                    >
                        <RefreshCw size={20} />
                        RESET
                    </button>
                    <button
                        onClick={handleCheck}
                        className="flex-[2] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black py-3 px-4 rounded-xl transition-all font-black uppercase tracking-wider active:scale-95 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    >
                        <CheckCircle size={24} />
                        CHECK
                    </button>
                </div>

                {/* Feedback Message */}
                {feedback.type && gameState === 'PLAYING' && (
                    <div className="text-center text-sm font-medium text-red-400 animate-in fade-in slide-in-from-bottom-2">
                        {feedback.message}
                    </div>
                )}
            </div>

            {/* Legend - small */}
            <div className="absolute top-20 left-6 text-[10px] text-neutral-500 pointer-events-none opacity-50 flex flex-col gap-1">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full" /> Input</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full" /> Output</div>
            </div>
        </div>
    );
}
