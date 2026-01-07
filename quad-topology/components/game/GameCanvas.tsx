"use client";

import React, { useState, useRef, useEffect } from 'react';
import { GameNode, GameEdge, GameTile, Vector2 } from '../../lib/types';
import { cn } from '../../lib/utils'; // We need to create this

interface GameCanvasProps {
    nodes: GameNode[];
    boundaryEdges: GameEdge[]; // Boundary edges
    userEdges: GameEdge[];
    tiles?: GameTile[];
    onEdgesChange: (edges: GameEdge[]) => void;
}

export default function GameCanvas({ nodes, boundaryEdges, userEdges, tiles, onEdgesChange }: GameCanvasProps) {
    const [drawingStartNode, setDrawingStartNode] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState<Vector2 | null>(null);

    const svgRef = useRef<SVGSVGElement>(null);

    // Helper to get relative coordinates
    const getRelativePos = (e: React.MouseEvent | React.TouchEvent): Vector2 | null => {
        if (!svgRef.current) return null;
        const rect = svgRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    // Touch support helper to find node under finger
    const getNodeFromPoint = (clientX: number, clientY: number): string | null => {
        // Hide the draft line temporarily so it doesn't block elementFromPoint? 
        // Or ensure lines have pointer-events: none.
        // We added 'touch-none' to SVG.
        const el = document.elementFromPoint(clientX, clientY);
        if (!el) return null;

        // Traverse up to find group with data-node-id (we will add this attr)
        let current: Element | null = el;
        while (current && current !== document.body) {
            const nodeId = current.getAttribute('data-node-id');
            if (nodeId) return nodeId;
            current = current.parentElement;
        }
        return null;
    };

    const handleMouseDown = (nodeId: string) => {
        setDrawingStartNode(nodeId);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (drawingStartNode) {
            const pos = getRelativePos(e);
            if (pos) setMousePos(pos);
        }
    };

    const handleMouseUp = (e?: React.MouseEvent | React.TouchEvent) => {
        if (!drawingStartNode) return;

        let targetId: string | null = null;

        if (e) {
            const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
            const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as React.MouseEvent).clientY;
            targetId = getNodeFromPoint(clientX, clientY);
        }

        if (targetId && drawingStartNode !== targetId) {
            // Create edge
            const newEdge: GameEdge = {
                id: `${drawingStartNode}-${targetId}-${Date.now()}`,
                source: drawingStartNode,
                target: targetId,
            };

            const exists = userEdges.some(edge =>
                (edge.source === drawingStartNode && edge.target === targetId) ||
                (edge.source === targetId && edge.target === drawingStartNode)
            ) || boundaryEdges.some(edge =>
                (edge.source === drawingStartNode && edge.target === targetId) ||
                (edge.source === targetId && edge.target === drawingStartNode)
            );

            if (!exists) {
                const newEdges = [...userEdges, newEdge];
                onEdgesChange(newEdges);
            }
        }

        setDrawingStartNode(null);
        setMousePos(null);
    };

    // Global listeners to handle drag release outside nodes or on mobile
    useEffect(() => {
        const handleWindowUp = (e: MouseEvent | TouchEvent) => {
            // We can just call our unified handler if we're dragging
            // But we need to bridge the event types
            // React SyntheticEvent vs Native Event
            // Ideally we attach the listener to the SVG, effectively done by props
        };
        // Actually we rely on the SVG's onMouseUp / onTouchEnd which bubbles.
        // But if user drags OUT of SVG, we might miss it.
        // Let's rely on standard events bounded to SVG for now as game is contained.
        // But for mobile "drag", we need the Touchend on the SVG to fire logic.
    }, []);

    const getNodePos = (id: string) => nodes.find(n => n.id === id)?.position || { x: 0, y: 0 };

    return (
        <div className="relative w-full h-[600px] border border-neutral-800 rounded-lg bg-neutral-900 overflow-hidden shadow-2xl">
            <svg
                ref={svgRef}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchEnd={handleMouseUp}
            >
                {/* Background Tiles (Yellow/Red/Green areas) */}
                {tiles?.map((tile) => (
                    <polygon
                        key={tile.id}
                        points={tile.points.map(p => `${p.x},${p.y}`).join(' ')}
                        className={cn(
                            "stroke-none",
                            tile.type === 'input' && "fill-red-500/80",
                            tile.type === 'output' && "fill-green-500/80",
                            tile.type === 'default' && "fill-amber-400"
                        )}
                        style={{ pointerEvents: 'none' }} // Ensure clicks create through tiles
                    />
                ))}

                {/* Grid lines (optional background) */}

                {/* Boundary Edges */}
                {boundaryEdges.map((edge) => {
                    const start = getNodePos(edge.source);
                    const end = getNodePos(edge.target);
                    return (
                        <line
                            key={edge.id}
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            className="stroke-white/30 stroke-2"
                            style={{ pointerEvents: 'none' }}
                        />
                    );
                })}

                {/* User Edges */}
                {userEdges.map((edge) => {
                    const start = getNodePos(edge.source);
                    const end = getNodePos(edge.target);
                    return (
                        <line
                            key={edge.id}
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            className="stroke-white stroke-[3px]"
                            style={{ pointerEvents: 'none' }}
                        />
                    );
                })}

                {/* Draft Line */}
                {drawingStartNode && mousePos && (
                    <line
                        x1={getNodePos(drawingStartNode).x}
                        y1={getNodePos(drawingStartNode).y}
                        x2={mousePos.x}
                        y2={mousePos.y}
                        className="stroke-white/70 stroke-[2px] stroke-dasharray-4"
                        style={{ pointerEvents: 'none' }}
                    />
                )}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g
                        key={node.id}
                        data-node-id={node.id} // Crucial for elementFromPoint
                        transform={`translate(${node.position.x}, ${node.position.y})`}
                        onMouseDown={(e) => {
                            e.preventDefault(); // Stop text selection
                            e.stopPropagation();
                            handleMouseDown(node.id);
                        }}
                        onTouchStart={(e) => {
                            e.stopPropagation();
                            handleMouseDown(node.id);
                        }}
                        // We remove onMouseUp/onTouchEnd on the node itself, relying on global SVG handler with hit detection
                        className="cursor-pointer"
                    >
                        <circle
                            r={15} // Visible click target is larger now (was 4 + hidden 20)
                            fill="transparent"
                        />
                        <circle
                            r={4}
                            className={cn(
                                "stroke-[1px] fill-white stroke-white pointer-events-none", // pointer events on parent group
                            )}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
