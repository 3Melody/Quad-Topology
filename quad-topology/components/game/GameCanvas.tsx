"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GameNode, GameEdge, GameTile, Vector2 } from '../../lib/types';
import { cn } from '../../lib/utils';
import { GRID_SCALE, OFFSET_X, OFFSET_Y } from '../../data/levels';
import { ZoomIn, ZoomOut, Maximize2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

// ViewBox dimensions for consistent coordinate system
export const VIEWBOX_WIDTH = 700;
export const VIEWBOX_HEIGHT = 500;

// Zoom settings
const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.5;

interface GameCanvasProps {
    nodes: GameNode[];
    boundaryEdges: GameEdge[]; // Boundary edges
    userEdges: GameEdge[];
    tiles?: GameTile[];
    invalidFaces?: { x: number, y: number }[][];
    onEdgesChange: (edges: GameEdge[]) => void;
    onEdgeDelete?: (edgeId: string) => void; // NEW: Delete edge callback
    // New unified handler for advanced creation
    onStrokeCreate?: (start: { pos: Vector2, nodeId?: string }, end: { pos: Vector2, nodeId?: string }) => void;
    // Zoom control options
    enableZoom?: boolean;
    onZoomChange?: (zoom: number, panOffset: Vector2) => void;
}

export default function GameCanvas({ nodes, boundaryEdges, userEdges, tiles, invalidFaces, onEdgesChange, onEdgeDelete, onStrokeCreate, enableZoom = true, onZoomChange }: GameCanvasProps) {
    const [dragStart, setDragStart] = useState<{ pos: Vector2, nodeId?: string } | null>(null);
    const [mousePos, setMousePos] = useState<Vector2 | null>(null);

    // Zoom and pan state
    const [zoom, setZoom] = useState(1);
    const [panOffset, setPanOffset] = useState<Vector2>({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState<Vector2 | null>(null);
    const [showControls, setShowControls] = useState(true);

    const svgRef = useRef<SVGSVGElement>(null);

    // Notify parent of zoom changes
    useEffect(() => {
        onZoomChange?.(zoom, panOffset);
    }, [zoom, panOffset, onZoomChange]);

    // Import constants locally or strictly match what is in data/levels if imports fail in this environment (but I will use imports)
    // To ensure this works without import errors if the previous step failed or relative paths are tricky, I'll hardcode or use props. 
    // Ideally I should import. I will assume the import works.

    // Helper to snap to grid
    const snapToGrid = (raw: Vector2): Vector2 => {
        const gx = Math.round((raw.x - OFFSET_X) / GRID_SCALE);
        const gy = Math.round((raw.y - OFFSET_Y) / GRID_SCALE);
        return {
            x: gx * GRID_SCALE + OFFSET_X,
            y: gy * GRID_SCALE + OFFSET_Y
        };
    };

    // Calculate current viewBox based on zoom and pan
    const getViewBox = useCallback(() => {
        const width = VIEWBOX_WIDTH / zoom;
        const height = VIEWBOX_HEIGHT / zoom;
        const x = panOffset.x;
        const y = panOffset.y;
        return { x, y, width, height };
    }, [zoom, panOffset]);

    // Helper to get relative coordinates - converts screen coords to SVG viewBox coords
    const getRelativePos = useCallback((e: React.MouseEvent | React.TouchEvent): Vector2 | null => {
        if (!svgRef.current) return null;
        const rect = svgRef.current.getBoundingClientRect();

        let clientX: number, clientY: number;
        if ('touches' in e && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if ('changedTouches' in e && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else if ('clientX' in e) {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        } else {
            return null;
        }

        // Convert screen coordinates to SVG viewBox coordinates (accounting for zoom/pan)
        const vb = getViewBox();
        const scaleX = vb.width / rect.width;
        const scaleY = vb.height / rect.height;

        return {
            x: (clientX - rect.left) * scaleX + vb.x,
            y: (clientY - rect.top) * scaleY + vb.y,
        };
    }, [getViewBox]);

    // Touch support helper to find node under finger
    const getNodeFromPoint = (clientX: number, clientY: number): string | null => {
        const el = document.elementFromPoint(clientX, clientY);
        if (!el) return null;

        // Traverse up to find group with data-node-id
        let current: Element | null = el;
        while (current && current !== document.body) {
            const nodeId = current.getAttribute('data-node-id');
            if (nodeId) return nodeId;
            current = current.parentElement;
        }
        return null;
    };

    // Helper to find edge near a point (for deletion)
    const findEdgeNearPoint = (pos: Vector2): string | null => {
        const THRESHOLD = 10; // Distance threshold for edge detection

        // Check both user edges and boundary edges, but we'll only allow deleting user edges
        for (const edge of userEdges) {
            const start = getNodePos(edge.source);
            const end = getNodePos(edge.target);

            // Calculate distance from point to line segment
            const lineLen = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
            if (lineLen === 0) continue;

            const t = Math.max(0, Math.min(1, ((pos.x - start.x) * (end.x - start.x) + (pos.y - start.y) * (end.y - start.y)) / (lineLen * lineLen)));
            const projX = start.x + t * (end.x - start.x);
            const projY = start.y + t * (end.y - start.y);
            const dist = Math.sqrt(Math.pow(pos.x - projX, 2) + Math.pow(pos.y - projY, 2));

            if (dist < THRESHOLD) {
                return edge.id;
            }
        }
        return null;
    };

    // Helper to get client coordinates from mouse or touch event
    const getClientCoords = (e: React.MouseEvent | React.TouchEvent): { clientX: number, clientY: number } | null => {
        if ('touches' in e && e.touches.length > 0) {
            return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
        } else if ('changedTouches' in e && e.changedTouches.length > 0) {
            return { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY };
        } else if ('clientX' in e) {
            return { clientX: (e as React.MouseEvent).clientX, clientY: (e as React.MouseEvent).clientY };
        }
        return null;
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Prevent scrolling on touch
        const rawPos = getRelativePos(e);
        if (!rawPos) return;

        // Check for Shift key (edge deletion mode)
        const isShiftHeld = 'shiftKey' in e && e.shiftKey;

        if (isShiftHeld && onEdgeDelete) {
            const snappedPos = snapToGrid(rawPos);
            const edgeId = findEdgeNearPoint(snappedPos);
            if (edgeId) {
                onEdgeDelete(edgeId);
                return; // Don't start dragging
            }
        }

        let nodeId: string | undefined = undefined;
        // Check if we started on a node
        const coords = getClientCoords(e);
        if (coords) {
            const found = getNodeFromPoint(coords.clientX, coords.clientY);
            if (found) {
                nodeId = found;
            }
        }

        let pos = snapToGrid(rawPos);

        if (nodeId) {
            // If on a node, use node pos exactly
            const n = nodes.find(x => x.id === nodeId);
            if (n) pos = n.position;
        }

        setDragStart({ pos, nodeId });
        setMousePos(pos);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Prevent scrolling
        const rawPos = getRelativePos(e);
        if (rawPos) {
            let pos = snapToGrid(rawPos);

            // Optional: Check if snapping slightly to existing nodes? 
            // For now, grid snapping is enough as nodes ARE on grid.
            setMousePos(pos);
        }
    };

    const handleMouseUp = (e?: React.MouseEvent | React.TouchEvent) => {
        if (e) e.preventDefault();
        if (!dragStart) return;

        let targetId: string | undefined = undefined;
        let finalPos: Vector2 | null = mousePos; // Default to last known mouse pos

        if (e) {
            const coords = getClientCoords(e);
            if (coords) {
                const found = getNodeFromPoint(coords.clientX, coords.clientY);
                if (found) targetId = found;
            }

            // Re-calculate final pos from event just in case
            const raw = getRelativePos(e);
            if (raw) finalPos = snapToGrid(raw);
        }

        if (targetId) {
            const n = nodes.find(x => x.id === targetId);
            if (n) finalPos = n.position;
        }

        if (onStrokeCreate && finalPos) {
            // Filter out tiny drags which might be accidental clicks
            // Since we snap, any different grid point is a move. 
            // Distance check should be based on grid units roughly or equality.
            const isSamePoint = finalPos.x === dragStart.pos.x && finalPos.y === dragStart.pos.y;

            if (!isSamePoint) {
                onStrokeCreate(
                    { pos: dragStart.pos, nodeId: dragStart.nodeId },
                    { pos: finalPos, nodeId: targetId }
                );
            } else if (!dragStart.nodeId && !targetId) {
                // Clicked empty space (no drag) -> Create Point
                // Even for a click, we want to create it at the SNAPPED position
                onStrokeCreate(
                    { pos: dragStart.pos, nodeId: undefined },
                    { pos: finalPos, nodeId: undefined }
                );
            }
        }

        setDragStart(null);
        setMousePos(null);
    };

    // Global listeners to handle drag release outside nodes or on mobile
    useEffect(() => {
        // Keyboard listener for Shift indicator
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Shift') {
                const indicator = document.getElementById('shift-indicator');
                if (indicator) indicator.classList.remove('hidden');
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Shift') {
                const indicator = document.getElementById('shift-indicator');
                if (indicator) indicator.classList.add('hidden');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const getNodePos = (id: string) => nodes.find(n => n.id === id)?.position || { x: 0, y: 0 };

    // Zoom controls
    const handleZoomIn = () => {
        setZoom(prev => {
            const newZoom = Math.min(ZOOM_MAX, prev + ZOOM_STEP);
            // Center the zoom on the middle of the content
            if (newZoom > prev) {
                const centerX = VIEWBOX_WIDTH / 2;
                const centerY = VIEWBOX_HEIGHT / 2;
                const newWidth = VIEWBOX_WIDTH / newZoom;
                const newHeight = VIEWBOX_HEIGHT / newZoom;
                setPanOffset({
                    x: centerX - newWidth / 2,
                    y: centerY - newHeight / 2
                });
            }
            return newZoom;
        });
    };

    const handleZoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(ZOOM_MIN, prev - ZOOM_STEP);
            if (newZoom < prev) {
                const centerX = VIEWBOX_WIDTH / 2;
                const centerY = VIEWBOX_HEIGHT / 2;
                const newWidth = VIEWBOX_WIDTH / newZoom;
                const newHeight = VIEWBOX_HEIGHT / newZoom;
                setPanOffset({
                    x: Math.max(0, Math.min(VIEWBOX_WIDTH - newWidth, centerX - newWidth / 2)),
                    y: Math.max(0, Math.min(VIEWBOX_HEIGHT - newHeight, centerY - newHeight / 2))
                });
            }
            return newZoom;
        });
    };

    const handleZoomReset = () => {
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
    };

    // Directional pan with buttons
    const PAN_AMOUNT = 50;
    const handlePanDirection = (direction: 'up' | 'down' | 'left' | 'right') => {
        if (zoom <= 1) return;

        const vb = getViewBox();
        const maxX = VIEWBOX_WIDTH - vb.width;
        const maxY = VIEWBOX_HEIGHT - vb.height;

        setPanOffset(prev => {
            switch (direction) {
                case 'up':
                    return { ...prev, y: Math.max(0, prev.y - PAN_AMOUNT) };
                case 'down':
                    return { ...prev, y: Math.min(maxY, prev.y + PAN_AMOUNT) };
                case 'left':
                    return { ...prev, x: Math.max(0, prev.x - PAN_AMOUNT) };
                case 'right':
                    return { ...prev, x: Math.min(maxX, prev.x + PAN_AMOUNT) };
                default:
                    return prev;
            }
        });
    };

    // Pan handling for zoomed view
    const handlePanStart = (e: React.MouseEvent | React.TouchEvent) => {
        if (zoom <= 1) return;

        // Use two-finger touch for panning
        if ('touches' in e && e.touches.length === 2) {
            e.preventDefault();
            setIsPanning(true);
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            setPanStart({ x: midX, y: midY });
        }
    };

    const handlePanMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isPanning || !panStart || zoom <= 1) return;

        if ('touches' in e && e.touches.length === 2) {
            e.preventDefault();
            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            const rect = svgRef.current?.getBoundingClientRect();
            if (!rect) return;

            const vb = getViewBox();
            const scaleX = vb.width / rect.width;
            const scaleY = vb.height / rect.height;

            const dx = (panStart.x - midX) * scaleX;
            const dy = (panStart.y - midY) * scaleY;

            const maxX = VIEWBOX_WIDTH - vb.width;
            const maxY = VIEWBOX_HEIGHT - vb.height;

            setPanOffset(prev => ({
                x: Math.max(0, Math.min(maxX, prev.x + dx)),
                y: Math.max(0, Math.min(maxY, prev.y + dy))
            }));

            setPanStart({ x: midX, y: midY });
        }
    };

    const handlePanEnd = () => {
        setIsPanning(false);
        setPanStart(null);
    };

    // Generate grid points for visualization
    const gridPoints: Vector2[] = [];
    // We can infer grid bounds from tiles or just generate a large enough field
    // Assuming 10x10 grid based on standard size
    for (let x = 0; x <= 10; x++) {
        for (let y = 0; y <= 10; y++) {
            gridPoints.push({
                x: OFFSET_X + x * GRID_SCALE,
                y: OFFSET_Y + y * GRID_SCALE
            });
        }
    }

    const vb = getViewBox();

    return (
        <div className="relative w-full aspect-7/5 max-h-[80vh] border border-neutral-800 rounded-lg bg-neutral-900 overflow-hidden shadow-2xl select-none">
            {/* Zoom Controls Toggle Button */}
            {enableZoom && (
                <button
                    onClick={() => setShowControls(prev => !prev)}
                    className="absolute top-2 left-2 p-2 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded-lg transition-colors backdrop-blur-sm border border-neutral-700 z-20"
                    title={showControls ? "Hide Controls" : "Show Controls"}
                >
                    {showControls ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            )}

            {/* Zoom Controls */}
            {enableZoom && showControls && (
                <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-20">
                    <button
                        onClick={handleZoomIn}
                        disabled={zoom >= ZOOM_MAX}
                        className="p-2 bg-neutral-800/90 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800/90 text-white rounded-lg transition-colors backdrop-blur-sm border border-neutral-700"
                        title="Zoom In"
                    >
                        <ZoomIn size={18} />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        disabled={zoom <= ZOOM_MIN}
                        className="p-2 bg-neutral-800/90 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800/90 text-white rounded-lg transition-colors backdrop-blur-sm border border-neutral-700"
                        title="Zoom Out"
                    >
                        <ZoomOut size={18} />
                    </button>
                    {zoom > 1 && (
                        <button
                            onClick={handleZoomReset}
                            className="p-2 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded-lg transition-colors backdrop-blur-sm border border-neutral-700"
                            title="Reset Zoom"
                        >
                            <Maximize2 size={18} />
                        </button>
                    )}
                </div>
            )}

            {/* Directional Pad - shown when zoomed */}
            {enableZoom && showControls && zoom > 1 && (
                <div className="absolute bottom-2 left-2 z-20">
                    <div className="grid grid-cols-3 gap-0.5">
                        <div />
                        <button
                            onClick={() => handlePanDirection('up')}
                            className="p-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded transition-colors backdrop-blur-sm border border-neutral-700"
                        >
                            <ChevronUp size={16} />
                        </button>
                        <div />
                        <button
                            onClick={() => handlePanDirection('left')}
                            className="p-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded transition-colors backdrop-blur-sm border border-neutral-700"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="p-1.5 bg-neutral-800/50 rounded border border-neutral-700 flex items-center justify-center">
                            <span className="text-[10px] text-neutral-400">{Math.round(zoom * 100)}%</span>
                        </div>
                        <button
                            onClick={() => handlePanDirection('right')}
                            className="p-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded transition-colors backdrop-blur-sm border border-neutral-700"
                        >
                            <ChevronRight size={16} />
                        </button>
                        <div />
                        <button
                            onClick={() => handlePanDirection('down')}
                            className="p-1.5 bg-neutral-800/90 hover:bg-neutral-700 text-white rounded transition-colors backdrop-blur-sm border border-neutral-700"
                        >
                            <ChevronDown size={16} />
                        </button>
                        <div />
                    </div>
                </div>
            )}

            {/* Shift Mode Indicator - hidden by default, shown via JS when shift pressed */}
            <div className="absolute top-2 right-2 px-3 py-1 bg-red-500/80 text-white text-xs font-bold rounded pointer-events-none transition-opacity z-10 hidden" id="shift-indicator">
                DELETE MODE
            </div>

            <svg
                ref={svgRef}
                viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={(e) => {
                    if (e.touches.length === 2) {
                        handlePanStart(e);
                    } else {
                        handleMouseDown(e);
                    }
                }}
                onMouseMove={handleMouseMove}
                onTouchMove={(e) => {
                    if (e.touches.length === 2) {
                        handlePanMove(e);
                    } else if (!isPanning) {
                        handleMouseMove(e);
                    }
                }}
                onMouseUp={handleMouseUp}
                onTouchEnd={(e) => {
                    if (isPanning) {
                        handlePanEnd();
                    } else {
                        handleMouseUp(e);
                    }
                }}
                onMouseLeave={(e) => handleMouseUp(e)}
            >
                {/* Background Tiles (Yellow/Red/Green areas) */}
                {tiles?.map((tile) => (
                    <polygon
                        key={tile.id}
                        points={tile.points.map(p => `${p.x},${p.y}`).join(' ')}
                        className={cn(
                            "stroke-none",
                            tile.type === 'input' && "fill-red-500/20",   // Reduced opacity for better visibility of grid
                            tile.type === 'output' && "fill-green-500/20",
                            tile.type === 'default' && "fill-amber-400/10"
                        )}
                        style={{ pointerEvents: 'none' }}
                    />
                ))}

                {/* Invalid Faces Error Overlay */}
                {invalidFaces?.map((face, idx) => (
                    <polygon
                        key={`err-face-${idx}`}
                        points={face.map(p => `${p.x},${p.y}`).join(' ')}
                        className="fill-red-500/40 stroke-red-500 stroke-2 animate-pulse"
                        style={{ pointerEvents: 'none' }}
                    />
                ))}

                {/* Grid Dots */}
                {gridPoints.map((p, i) => (
                    <circle
                        key={`grid-${i}`}
                        cx={p.x}
                        cy={p.y}
                        r={2}
                        className="fill-neutral-700 pointer-events-none"
                    />
                ))}

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
                            className={cn(
                                "stroke-2",
                                !edge.color && "stroke-white/30"
                            )}
                            style={{
                                pointerEvents: 'none',
                                stroke: edge.color || undefined
                            }}
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
                {dragStart && mousePos && (
                    <line
                        x1={dragStart.nodeId ? getNodePos(dragStart.nodeId).x : dragStart.pos.x}
                        y1={dragStart.nodeId ? getNodePos(dragStart.nodeId).y : dragStart.pos.y}
                        x2={mousePos.x}
                        y2={mousePos.y}
                        className="stroke-blue-400 stroke-[2px] stroke-dasharray-4" // Made blue for visibility
                        style={{ pointerEvents: 'none' }}
                    />
                )}

                {/* Ghost Node Cursor - Shows where next point will land */}
                {mousePos && !dragStart && (
                    <circle
                        cx={mousePos.x}
                        cy={mousePos.y}
                        r={6}
                        className="fill-blue-500/50 pointer-events-none animate-pulse"
                    />
                )}
                {/* Drag Target Ghost */}
                {dragStart && mousePos && (
                    <circle
                        cx={mousePos.x}
                        cy={mousePos.y}
                        r={6}
                        className="fill-blue-500/50 pointer-events-none"
                    />
                )}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g
                        key={node.id}
                        data-node-id={node.id} // Crucial for elementFromPoint
                        transform={`translate(${node.position.x}, ${node.position.y})`}
                        className="cursor-pointer"
                    >
                        <circle
                            r={20} // Larger hit area
                            fill="transparent"
                        />
                        <circle
                            r={5}
                            className={cn(
                                "stroke-[1px] fill-white stroke-white pointer-events-none",
                                "transition-all duration-200",
                                (dragStart?.nodeId === node.id) ? "fill-blue-400 scale-125" : ""
                            )}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
