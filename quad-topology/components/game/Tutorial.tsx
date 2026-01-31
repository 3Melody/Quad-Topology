"use client";

import React, { useEffect, useState, useRef } from 'react';
import GameCanvas from './GameCanvas';
import { GameEdge, GameNode, GameTile, Vector2 } from '../../lib/types';
import { MousePointer2, ArrowRight, CheckCircle2, Info } from 'lucide-react';

import { GRID_SCALE, OFFSET_X, OFFSET_Y } from '../../data/levels';

// Define the "1 to 2" scenario tiles
// Define the "1 to 2" scenario tiles
const TUTORIAL_TILES: GameTile[] = [
    // Top Inputs (Pink)
    {
        id: 't_in',
        type: 'input',
        points: [
            { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 * GRID_SCALE },
            { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 * GRID_SCALE },
            { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE },
            { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }
        ]
    },
    // Bottom Outputs (Pink)
    {
        id: 't_out',
        type: 'output',
        points: [
            { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE },
            { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE },
            { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE },
            { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }
        ]
    },
    // Middle Area (Grey)
    {
        id: 't_area',
        type: 'default',
        points: [
            { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE },
            { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE },
            { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE },
            { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }
        ]
    }
];

// Initial boundary nodes (Corners + Intermediates)
const INITIAL_NODES: GameNode[] = [
    // Top Row
    { id: 'n1', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    { id: 'n2', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    { id: 'n3', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    // Row 1
    { id: 'n4', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    { id: 'n5', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    { id: 'n6', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    // Row 2 (Added Intermediates for explicit steps)
    { id: 'n13', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    // n14 REMOVED to allow simple diagonal on the right
    // { id: 'n14', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },

    // Row 3 (Bottom of middle)
    { id: 'n7', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    { id: 'n8', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    { id: 'n9', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    // Row 4 (Bottom)
    { id: 'n10', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    { id: 'n11', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    { id: 'n12', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
];

const BOUNDARY_EDGES: GameEdge[] = [
    // Vertical Left (Split)
    { id: 'e1', source: 'n1', target: 'n4' },
    /* e2a REMOVED */ { id: 'e2b', source: 'n13', target: 'n7' },
    { id: 'e3', source: 'n7', target: 'n10' },
    // Vertical Right (Merged n6 to n9 directly)
    { id: 'e4', source: 'n3', target: 'n6' },
    { id: 'e5', source: 'n6', target: 'n9' }, // Modified: Single edge
    { id: 'e6', source: 'n9', target: 'n12' },
    // Horizontal Top
    { id: 'e7', source: 'n1', target: 'n2' }, { id: 'e8', source: 'n2', target: 'n3' },
    // Horizontal Bottom
    { id: 'e9', source: 'n10', target: 'n11' }, { id: 'e10', source: 'n11', target: 'n12' },
    // Row 1 Horizontal
    /* e11 REMOVED */ { id: 'e12', source: 'n5', target: 'n6' },
    // Row 3 Horizontal
    { id: 'e13', source: 'n7', target: 'n8' }, { id: 'e14', source: 'n8', target: 'n9' },
    // Vertical Middle (Top/Bottom inputs/outputs)
    { id: 'e15', source: 'n2', target: 'n5' },
    { id: 'e16', source: 'n8', target: 'n11' },
];

interface TutorialStep {
    start: { x: number, y: number }; // User action start
    end: { x: number, y: number };   // User action end
    targetFace?: Vector2[];           // Points of the face to highlight
    text: string;
    detail?: string;                  // Educational dialog
}

// Helper to get screen coords for grid
const getPos = (gx: number, gy: number) => ({
    x: OFFSET_X + gx * GRID_SCALE,
    y: OFFSET_Y + gy * GRID_SCALE
});

// Interactive Steps - Red (1) -> Blue (2) -> Green (3)
const INTERACTIVE_STEPS: TutorialStep[] = [
    // --- Step 1: Red Square (4 Sides) ---
    {
        start: { x: 2, y: 1 },
        end: { x: 2, y: 2 },
        text: "Step 1: Right Edge",
        detail: "Now drag down to create the vertical side.",
        targetFace: [getPos(1, 1), getPos(2, 1), getPos(2, 2), getPos(1, 2)]
    },
    {
        start: { x: 2, y: 2 },
        end: { x: 1, y: 2 },
        text: "Step 1: Bottom Edge",
        detail: "Draw the bottom edge to the left.",
        targetFace: [getPos(1, 1), getPos(2, 1), getPos(2, 2), getPos(1, 2)]
    },
    {
        start: { x: 1, y: 2 },
        end: { x: 1, y: 1 },
        text: "Step 1: Close Loop",
        detail: "Finally, close the loop to complete the Red Square.",
        targetFace: [getPos(1, 1), getPos(2, 1), getPos(2, 2), getPos(1, 2)]
    },
    {
        start: { x: 1, y: 1 },
        end: { x: 2, y: 1 },
        text: "Step 1: Top Edge",
        detail: "Let's build the first square from scratch. Draw the top edge.",
        targetFace: [getPos(1, 1), getPos(2, 1), getPos(2, 2), getPos(1, 2)]
    },

    // --- Step 2: Blue Diagonal (Right Side) ---
    {
        start: { x: 2, y: 2 },
        end: { x: 3, y: 3 },
        text: "Step 2: Diagonal Edge",
        detail: "Drag from the center to the bottom-right corner to form a diagonal.",
        targetFace: [getPos(2, 1), getPos(3, 1), getPos(3, 3), getPos(2, 2)]
    },
    {
        start: { x: 3, y: 3 },
        end: { x: 3, y: 1 },
        text: "Step 2: Right Edge",
        detail: "Connect the right side vertically.",
        targetFace: [getPos(2, 1), getPos(3, 1), getPos(3, 3), getPos(2, 2)]
    },
    {
        start: { x: 3, y: 1 },
        end: { x: 2, y: 1 },
        text: "Step 2: Top Edge",
        detail: "Complete the right-side face by connecting back to the center-top.",
        targetFace: [getPos(2, 1), getPos(3, 1), getPos(3, 3), getPos(2, 2)]
    },

    // --- Step 3: Green Extension (Bottom Left) ---
    {
        start: { x: 3, y: 3 },
        end: { x: 1, y: 3 },
        text: "Step 3: Bottom Edge",
        detail: "Now for the bottom section. Draw the bottom edge to the left.",
        targetFace: [getPos(1, 2), getPos(2, 2), getPos(3, 3), getPos(1, 3)]
    },
    {
        start: { x: 1, y: 3 },
        end: { x: 1, y: 2 },
        text: "Step 3: Left Edge",
        detail: "Close the final quad to complete the topology.",
        targetFace: [getPos(1, 2), getPos(2, 2), getPos(3, 3), getPos(1, 3)]
    }
];

export default function Tutorial({ onComplete }: { onComplete: () => void }) {
    const [userNodes, setUserNodes] = useState<GameNode[]>([]);
    const [userEdges, setUserEdges] = useState<GameEdge[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showGhost, setShowGhost] = useState(true);
    const [isDone, setIsDone] = useState(false);

    // Helper to find existing node at position
    const findNodeAt = (gx: number, gy: number) => {
        const pos = getPos(gx, gy);
        const allNodes = [...INITIAL_NODES, ...userNodes];
        return allNodes.find(n => Math.abs(n.position.x - pos.x) < 2 && Math.abs(n.position.y - pos.y) < 2);
    };

    // Animation Loop for the specific step
    useEffect(() => {
        let mounted = true;

        const currentStep = INTERACTIVE_STEPS[stepIndex];
        if (!currentStep) return;

        const loopAnimation = async () => {
            if (!mounted) return;
            setShowGhost(true);
            const startPos = getPos(currentStep.start.x, currentStep.start.y);
            const endPos = getPos(currentStep.end.x, currentStep.end.y);

            // 1. Move to start
            setCursorPos(startPos);
            await new Promise(r => setTimeout(r, 600));
            if (!mounted) return;

            // 2. Drag to end
            const frames = 40;
            for (let f = 1; f <= frames; f++) {
                if (!mounted) return;
                setCursorPos({
                    x: startPos.x + (endPos.x - startPos.x) * (f / frames),
                    y: startPos.y + (endPos.y - startPos.y) * (f / frames)
                });
                await new Promise(r => setTimeout(r, 16));
            }

            // 3. Pause at end
            await new Promise(r => setTimeout(r, 600));
            if (!mounted) return;

            // Loop
            if (mounted) loopAnimation();
        };

        loopAnimation();
        return () => { mounted = false; };
    }, [stepIndex]);

    const handleStrokeCreate = (start: { pos: { x: number, y: number }, nodeId?: string }, end: { pos: { x: number, y: number }, nodeId?: string }) => {
        const currentStep = INTERACTIVE_STEPS[stepIndex];
        if (!currentStep) return;

        // Determine grid coordinates of user action
        const sgx = Math.round((start.pos.x - OFFSET_X) / GRID_SCALE);
        const sgy = Math.round((start.pos.y - OFFSET_Y) / GRID_SCALE);
        const egx = Math.round((end.pos.x - OFFSET_X) / GRID_SCALE);
        const egy = Math.round((end.pos.y - OFFSET_Y) / GRID_SCALE);

        // Check against current step (allow reverse direction too)
        const matchesForward = (sgx === currentStep.start.x && sgy === currentStep.start.y && egx === currentStep.end.x && egy === currentStep.end.y);
        const matchesBackward = (sgx === currentStep.end.x && sgy === currentStep.end.y && egx === currentStep.start.x && egy === currentStep.start.y);

        if (matchesForward || matchesBackward) {
            // Success! Create the edge/nodes

            // Logic similar to GameController but simplified for tutorial
            let sourceId = start.nodeId;
            let targetId = end.nodeId;

            // Find or Create Source
            if (!sourceId) {
                const existing = findNodeAt(sgx, sgy);
                sourceId = existing ? existing.id : `u_${Date.now()}_1`;
                if (!existing) setUserNodes(prev => [...prev, { id: sourceId!, position: getPos(sgx, sgy), type: 'default' }]);
            }

            // Find or Create Target
            if (!targetId) {
                const existing = findNodeAt(egx, egy);
                targetId = existing ? existing.id : `u_${Date.now()}_2`;
                if (!existing) setUserNodes(prev => [...prev, { id: targetId!, position: getPos(egx, egy), type: 'default' }]);
            }

            if (sourceId && targetId) { // Should always be true here
                const newEdge: GameEdge = { id: `${sourceId}-${targetId}`, source: sourceId, target: targetId };
                setUserEdges(prev => [...prev, newEdge]);

                // Advance step
                if (stepIndex < INTERACTIVE_STEPS.length - 1) {
                    setStepIndex(prev => prev + 1);
                } else {
                    // Done! - Wait for user confirmation
                    setIsDone(true);
                }
            }
        }
    };

    const currentStep = INTERACTIVE_STEPS[stepIndex];

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-white cursor-default">

            <div className="relative border border-neutral-700 rounded-xl overflow-hidden shadow-2xl bg-neutral-950 flex">

                {/* Visual Area */}
                <div style={{ width: 500, height: 500 }} className="relative">
                    <GameCanvas
                        nodes={[...INITIAL_NODES, ...userNodes]}
                        boundaryEdges={BOUNDARY_EDGES}
                        userEdges={userEdges}
                        tiles={TUTORIAL_TILES}
                        invalidFaces={[]}
                        onEdgesChange={() => { }}
                        onStrokeCreate={handleStrokeCreate}
                    />

                    {/* Highlight Face Overlay */}
                    {!isDone && currentStep?.targetFace && (
                        <svg className="absolute inset-0 pointer-events-none w-full h-full">
                            <polygon
                                points={currentStep.targetFace.map(p => `${p.x},${p.y}`).join(' ')}
                                className="fill-red-500/20 stroke-red-500 stroke-2 animate-pulse"
                            />
                        </svg>
                    )}

                    {/* Ghost Cursor */}
                    {!isDone && (
                        <div
                            className="absolute pointer-events-none transition-transform duration-75 z-50 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{
                                left: 0,
                                top: 0,
                                transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                                opacity: 0.8
                            }}
                        >
                            <MousePointer2 size={32} className="fill-cyan-500 text-black rotate-[-15deg]" />
                        </div>
                    )}
                </div>

                {/* Side Panel for Dialog */}
                <div className="w-64 bg-neutral-900 border-l border-neutral-800 p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-6 text-cyan-400">TUTORIAL</h2>

                    {!isDone ? (
                        <div className="flex-1">
                            <div className="mb-4">
                                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">STEP {stepIndex + 1}</span>
                                <h3 className="text-xl font-bold text-white mt-1">{currentStep?.text}</h3>
                            </div>

                            <div className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 text-sm text-neutral-300 leading-relaxed">
                                <Info size={16} className="inline mr-2 text-cyan-400 mb-1" />
                                {currentStep?.detail}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-cyan-500/10 border border-cyan-500/50 p-5 rounded-xl text-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                                <CheckCircle2 size={48} className="text-cyan-400 mb-3 mx-auto" />
                                <h3 className="text-lg font-black mb-2 text-white">ALL STEPS DONE!</h3>
                                <p className="text-neutral-400 text-xs mb-5 leading-relaxed">
                                    Review your structure on the left. Ready to start the real levels?
                                </p>
                                <button
                                    onClick={onComplete}
                                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-lg transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.3)] uppercase tracking-widest text-xs"
                                >
                                    Start Game
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-neutral-800">
                        {!isDone && (
                            <button
                                onClick={onComplete}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors text-sm"
                            >
                                Skip Tutorial
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
