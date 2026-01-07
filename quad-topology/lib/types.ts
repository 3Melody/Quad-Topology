export type Vector2 = {
    x: number;
    y: number;
};

export type NodeType = 'start' | 'end' | 'default';

export type GameNode = {
    id: string;
    position: Vector2;
    type: NodeType;
    label?: string; // e.g. "1 to 1"
};

export type GameEdge = {
    id: string;
    source: string;
    target: string;
};

export type GameTile = {
    id: string;
    type: 'input' | 'output' | 'default'; // red, green, yellow
    points: Vector2[]; // Polygon corners
};

export type LevelData = {
    id: string;
    name: string;
    description: string;
    nodes: GameNode[];
    edges: GameEdge[]; // Pre-defined edges (like the boundary)
    tiles: GameTile[]; // Visual background tiles
    gridSize: { width: number; height: number };
    targetFaces: number; // How many quads expected?
};
