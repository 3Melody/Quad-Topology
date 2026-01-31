import { LevelData, GameNode, GameEdge, GameTile } from '../lib/types';

export const GRID_SCALE = 60;
export const OFFSET_X = 100;
export const OFFSET_Y = 100;

// Helper to create node - UNUSED but kept for reference if needed
const createNode = (id: string, x: number, y: number, type: 'start' | 'end' | 'default' = 'default'): GameNode => ({
    id,
    position: { x: OFFSET_X + x * GRID_SCALE, y: OFFSET_Y + y * GRID_SCALE },
    type
});

// Helper for perimeter edges - UNUSED
const createEdge = (s: string, t: string): GameEdge => ({ id: `${s}-${t}`, source: s, target: t });

// Helper to create tiles
function createTile(id: string, points: { x: number, y: number }[], type: 'input' | 'output' | 'default'): GameTile {
    return {
        id,
        type,
        points: points.map(p => ({ x: OFFSET_X + p.x * GRID_SCALE, y: OFFSET_Y + p.y * GRID_SCALE }))
    };
}

// NOTE: All Levels now contain NO implicit nodes or edges. 
// The user starts with a blank canvas + background guides (tiles).

/* -------------------------------------------------------------------------- */
/*                                LEVEL 1: 1 to 1                             */
/* -------------------------------------------------------------------------- */
const l1_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 3 }], 'default'),
    createTile('out', [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 0, y: 4 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 2: 2 to 1                             */
/* -------------------------------------------------------------------------- */
const l2_tiles: GameTile[] = [
    // Top Inputs (2 blocks)
    createTile('in_t1', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('in_t2', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 2, y: 1 }], 'input'),

    // Right Inputs (2 blocks)
    createTile('in_r1', [{ x: 3, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 3, y: 2 }], 'input'),
    createTile('in_r2', [{ x: 3, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 3, y: 3 }], 'input'),

    // Left Output (1 big block spanning 2 height)
    createTile('out_l', [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 3 }, { x: 0, y: 3 }], 'output'),

    // Bottom Output (1 big block spanning 2 width)
    createTile('out_b', [{ x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 1, y: 4 }], 'output'),

    // Center Play Area (2x2)
    createTile('area', [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }], 'default')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 3: 3 to 1                             */
/* -------------------------------------------------------------------------- */
const l3_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 3 }, { x: 1, y: 3 }], 'default'),
    createTile('out', [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 1, y: 4 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 4: 3 to 2                             */
/* -------------------------------------------------------------------------- */
const l4_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 4 }, { x: 0, y: 4 }], 'default'),
    createTile('out', [{ x: 0, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 0, y: 5 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 5: 4 to 2                             */
/* -------------------------------------------------------------------------- */
const l5_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 3 }, { x: 0, y: 3 }], 'default'),
    createTile('out', [{ x: 0, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 0, y: 4 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 6: 5 to 3                             */
/* -------------------------------------------------------------------------- */
const l6_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 0, y: 3 }], 'default'),
    createTile('out', [{ x: 0, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 0, y: 4 }], 'output')
];

const l_tutorial_tiles: GameTile[] = [
    createTile('in', [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('area', [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }], 'default'),
    createTile('out', [{ x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 1, y: 4 }], 'output')
];

// Re-export levels with EMPTY nodes/edges
export const levels: LevelData[] = [
    {
        id: 'tutorial-level',
        name: 'LEVEL 1: TUTORIAL',
        description: 'Practice what you learned.',
        nodes: [
            { id: 'n1', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'n2', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'n3', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'n4', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 'n5', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 'n6', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 'n7', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 'n8', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 'n9', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 'n13', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 'n14', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 'n15', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 'n10', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 'n11', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 'n12', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' }
        ],
        edges: [
            { id: 'ge1', source: 'n1', target: 'n2', color: '#22c55e' },
            { id: 'ge2', source: 'n2', target: 'n3', color: '#22c55e' },
            { id: 'ge3', source: 'n4', target: 'n5', color: '#22c55e' },
            { id: 'ge4', source: 'n5', target: 'n6', color: '#22c55e' },
            { id: 'ge5', source: 'n1', target: 'n4', color: '#22c55e' },
            { id: 'ge6', source: 'n2', target: 'n5', color: '#22c55e' },
            { id: 'ge7', source: 'n3', target: 'n6', color: '#22c55e' },
            { id: 'e3', source: 'n13', target: 'n10', color: '#22c55e' },
            { id: 'e6', source: 'n15', target: 'n12', color: '#22c55e' },
            { id: 'e9', source: 'n10', target: 'n11', color: '#22c55e' },
            { id: 'e10', source: 'n11', target: 'n12', color: '#22c55e' },
            { id: 'e11', source: 'n13', target: 'n15', color: '#22c55e' }
        ],
        tiles: l_tutorial_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 5,
        validTopologies: [
            {
                // Solution A: Diagonal n8-n15
                edges: [
                    'n4-n5', 'n5-n6', 'n4-n7', 'n7-n13', 'n6-n9', 'n9-n15',
                    'n13-n15', 'n5-n8', 'n7-n8', 'n8-n15'
                ]
            },
            {
                // Solution B: Diagonal n8-n13
                edges: [
                    'n4-n5', 'n5-n6', 'n4-n7', 'n7-n13', 'n6-n9', 'n9-n15',
                    'n13-n15', 'n5-n8', 'n8-n9', 'n8-n13'
                ]
            }
        ]
    },
    {
        id: '1-to-1',
        name: 'LEVEL 2: 1 to 1',
        description: 'Basic Strip',
        nodes: [],
        edges: [],
        tiles: l1_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 5
    },
    {
        id: '2-to-1',
        name: 'LEVEL 3: 2 to 1',
        description: 'Merge two flows into one.',
        nodes: [],
        edges: [],
        tiles: l2_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 0
    },
    {
        id: '3-to-1',
        name: 'LEVEL 4: 3 to 1',
        description: 'Merge three flows into one.',
        nodes: [],
        edges: [],
        tiles: l3_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 0
    },
    {
        id: '3-to-2',
        name: 'LEVEL 5: 3 to 2',
        description: 'Reduce 3 columns to 2 columns.',
        nodes: [],
        edges: [],
        tiles: l4_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 0
    },
    {
        id: '4-to-2',
        name: 'LEVEL 6: 4 to 2',
        description: 'Reduce 4 columns to 2 columns.',
        nodes: [],
        edges: [],
        tiles: l5_tiles,
        gridSize: { width: 600, height: 600 },
        targetFaces: 0
    },
    {
        id: '5-to-3',
        name: 'LEVEL 7: 5 to 3',
        description: 'Reduce 5 columns to 3 columns.',
        nodes: [],
        edges: [],
        tiles: l6_tiles,
        gridSize: { width: 650, height: 600 },
        targetFaces: 0
    }
];
