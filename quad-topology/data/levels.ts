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

const l_1to3_tiles: GameTile[] = [
    createTile('in_1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('in_2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('in_3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 2, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 0, y: 3 }], 'default'),
    createTile('out', [{ x: 0, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 0, y: 4 }], 'output')
];

const l_1to4_tiles: GameTile[] = [
    createTile('in_1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('in_2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('in_3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 2, y: 1 }], 'input'),
    createTile('in_4', [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 3, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 3 }, { x: 0, y: 3 }], 'default'),
    createTile('out', [{ x: 0, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 0, y: 4 }], 'output')
];

const l_1to5_tiles: GameTile[] = [
    createTile('in_1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('in_2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('in_3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 2, y: 1 }], 'input'),
    createTile('in_4', [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 3, y: 1 }], 'input'),
    createTile('in_5', [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 4, y: 1 }], 'input'),
    createTile('area', [{ x: 0, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 0, y: 3 }], 'default'),
    createTile('out', [{ x: 0, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 0, y: 4 }], 'output')
];

const l_tutorial_tiles: GameTile[] = [
    createTile('in', [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('area', [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }], 'default'),
    createTile('out', [{ x: 1, y: 3 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 1, y: 4 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                           LEVEL 5: 3 to 2                                  */
/* -------------------------------------------------------------------------- */
const l_2to3_tiles: GameTile[] = [
    createTile('l5_in1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], 'input'),
    createTile('l5_in2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 2 }], 'input'),
    createTile('l5_in3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 2 }], 'input'),
    createTile('l5_area', [{ x: 0, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 4 }, { x: 0, y: 4 }], 'default'),
    createTile('l5_out1', [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 1, y: 6 }, { x: 0, y: 6 }], 'output'),
    createTile('l5_out2', [{ x: 1, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 6 }, { x: 1, y: 6 }], 'output'),
];

export const levels: LevelData[] = [
    // {
    //     id: 'tutorial-level',
    //     name: 'LEVEL 1: TUTORIAL',
    //     description: 'Practice what you learned.',
    //     nodes: [
    //         { id: 'n1', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n2', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n3', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n4', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n5', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n6', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n7', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n8', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n9', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n13', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'n14', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'n15', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'n10', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'n11', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'n12', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' }
    //     ],
    //     edges: [
    //         { id: 'ge1', source: 'n1', target: 'n2', color: '#22c55e' },
    //         { id: 'ge2', source: 'n2', target: 'n3', color: '#22c55e' },
    //         { id: 'ge3', source: 'n4', target: 'n5', color: '#22c55e' },
    //         { id: 'ge4', source: 'n5', target: 'n6', color: '#22c55e' },
    //         { id: 'ge5', source: 'n1', target: 'n4', color: '#22c55e' },
    //         { id: 'ge6', source: 'n2', target: 'n5', color: '#22c55e' },
    //         { id: 'ge7', source: 'n3', target: 'n6', color: '#22c55e' },
    //         { id: 'e3', source: 'n13', target: 'n10', color: '#22c55e' },
    //         { id: 'e6', source: 'n15', target: 'n12', color: '#22c55e' },
    //         { id: 'e9', source: 'n10', target: 'n11', color: '#22c55e' },
    //         { id: 'e10', source: 'n11', target: 'n12', color: '#22c55e' },
    //         { id: 'e11', source: 'n13', target: 'n15', color: '#22c55e' }
    //     ],
    //     tiles: l_tutorial_tiles,
    //     gridSize: { width: 500, height: 600 },
    //     targetFaces: 5,
    //     validTopologies: [
    //         {
    //             // Solution A: Diagonal n8-n15
    //             edges: [
    //                 'n4-n5', 'n5-n6', 'n4-n7', 'n7-n13', 'n6-n9', 'n9-n15',
    //                 'n13-n15', 'n5-n8', 'n7-n8', 'n8-n15'
    //             ]
    //         },
    //         {
    //             // Solution B: Diagonal n8-n13
    //             edges: [
    //                 'n4-n5', 'n5-n6', 'n4-n7', 'n7-n13', 'n6-n9', 'n9-n15',
    //                 'n13-n15', 'n5-n8', 'n8-n9', 'n8-n13'
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: '1-to-3',
    //     name: 'LEVEL 2: 1 to 3',
    //     description: 'Transition from 1 to 3 quads.',
    //     nodes: [
    //         // Top Row (y=0)
    //         { id: 'n1', position: { x: OFFSET_X + 0, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n2', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n3', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n4', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         // Middle-Top Boundary (y=1)
    //         { id: 'n5', position: { x: OFFSET_X + 0, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n6', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n7', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n8', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // Middle-Transition (y=2)
    //         { id: 'n9', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n10', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // Middle-Bottom Boundary (y=3)
    //         { id: 'n11', position: { x: OFFSET_X + 0, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'n12', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // Bottom Row (y=4)
    //         { id: 'n13', position: { x: OFFSET_X + 0, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'n14', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' }
    //     ],
    //     edges: [
    //         // Top Inputs boundaries
    //         { id: 'e1', source: 'n1', target: 'n2', color: '#22c55e' },
    //         { id: 'e2', source: 'n2', target: 'n3', color: '#22c55e' },
    //         { id: 'e3', source: 'n3', target: 'n4', color: '#22c55e' },
    //         { id: 'e4', source: 'n1', target: 'n5', color: '#22c55e' },
    //         { id: 'e5', source: 'n2', target: 'n6', color: '#22c55e' },
    //         { id: 'e6', source: 'n3', target: 'n7', color: '#22c55e' },
    //         { id: 'e7', source: 'n4', target: 'n8', color: '#22c55e' },
    //         { id: 'e8', source: 'n5', target: 'n6', color: '#22c55e' },
    //         { id: 'e9', source: 'n6', target: 'n7', color: '#22c55e' },
    //         { id: 'e10', source: 'n7', target: 'n8', color: '#22c55e' },
    //         // Bottom Output boundaries
    //         { id: 'e11', source: 'n11', target: 'n12', color: '#22c55e' },
    //         { id: 'e12', source: 'n11', target: 'n13', color: '#22c55e' },
    //         { id: 'e13', source: 'n12', target: 'n14', color: '#22c55e' },
    //         { id: 'e14', source: 'n13', target: 'n14', color: '#22c55e' },
    //         // Area boundary sides
    //         { id: 'e15', source: 'n5', target: 'n11', color: '#22c55e' },
    //         { id: 'e16', source: 'n8', target: 'n12', color: '#22c55e' }
    //     ],
    //     tiles: l_1to3_tiles,
    //     gridSize: { width: 500, height: 600 },
    //     targetFaces: 8,
    //     validTopologies: [
    //         {
    //             // The 4-quad solution for the area
    //             edges: [
    //                 'n6-n9', 'n9-n11', 
    //                 'n7-n10', 'n10-n12', 
    //                 'n9-n10'
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: '1-to-4',
    //     name: 'LEVEL 3: 1 to 4',
    //     description: 'Single pattern with multi-path solutions.',
    //     nodes: [
    //         // Top Row (y=0)
    //         { id: 'n1', position: { x: OFFSET_X + 0, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n2', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n3', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n4', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'n5', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         // y=1 Boundary
    //         { id: 'n6', position: { x: OFFSET_X + 0, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n7', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n8', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n9', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'n10', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // y=1.5 Mid-Upper Internal
    //         { id: 'n24', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'n20', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'n21', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         // y=2 Internal Full Row
    //         { id: 'n11', position: { x: OFFSET_X + 0, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n12', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n13', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n14', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'n15', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // y=2.5 Mid-Lower Internal
    //         { id: 'n25', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'n22', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'n23', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         // y=3 Boundary
    //         { id: 'n16', position: { x: OFFSET_X + 0, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'n17', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // y=4 Bottom
    //         { id: 'n18', position: { x: OFFSET_X + 0, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'n19', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' }
    //     ],
    //     edges: [
    //         // Boundaries
    //         { id: 'e1', source: 'n1', target: 'n2', color: '#22c55e' },
    //         { id: 'e2', source: 'n2', target: 'n3', color: '#22c55e' },
    //         { id: 'e3', source: 'n3', target: 'n4', color: '#22c55e' },
    //         { id: 'e4', source: 'n4', target: 'n5', color: '#22c55e' },
    //         { id: 'e5', source: 'n1', target: 'n6', color: '#22c55e' },
    //         { id: 'e6', source: 'n5', target: 'n10', color: '#22c55e' },
    //         // Area Left Border
    //         { id: 'e7a', source: 'n6', target: 'n11', color: '#22c55e' },
    //         { id: 'e7b', source: 'n11', target: 'n16', color: '#22c55e' },
    //         // Area Right Border
    //         { id: 'e8a', source: 'n10', target: 'n15', color: '#22c55e' },
    //         { id: 'e8b', source: 'n15', target: 'n17', color: '#22c55e' },
    //         { id: 'e9', source: 'n16', target: 'n18', color: '#22c55e' },
    //         { id: 'e10', source: 'n17', target: 'n19', color: '#22c55e' },
    //         { id: 'e11', source: 'n18', target: 'n19', color: '#22c55e' },
    //         { id: 'e12', source: 'n6', target: 'n7', color: '#22c55e' },
    //         { id: 'e13', source: 'n7', target: 'n8', color: '#22c55e' },
    //         { id: 'e14', source: 'n8', target: 'n9', color: '#22c55e' },
    //         { id: 'e15', source: 'n9', target: 'n10', color: '#22c55e' },
    //         { id: 'e16', source: 'n16', target: 'n17', color: '#22c55e' }
    //     ],
    //     tiles: l_1to4_tiles,
    //     gridSize: { width: 600, height: 600 },
    //     targetFaces: 11,
    //     validTopologies: [
    //         {
    //             // Solution B: Right horizontal at y=2, fan via n12→n25 (already works)
    //             edges: [
    //                 'n7-n24', 'n8-n20', 'n9-n21',
    //                 'n24-n12', 'n20-n13', 'n21-n14',
    //                 'n13-n14', 'n14-n15',
    //                 'n12-n25',
    //                 'n25-n22', 'n22-n23',
    //                 'n25-n16', 'n23-n17'
    //             ]
    //         },
    //         {
    //             // Solution A1: Left horizontal, diagonal n13→n22
    //             edges: [
    //                 'n7-n24', 'n8-n20', 'n9-n21',
    //                 'n24-n12', 'n20-n13', 'n21-n14',
    //                 'n11-n12', 'n12-n13',
    //                 'n13-n22',
    //                 'n22-n25', 'n22-n23',
    //                 'n25-n16', 'n23-n17'
    //             ]
    //         },
    //         {
    //             // Solution A2: Left horizontal, diagonal n12→n22 (no n12-n13)
    //             edges: [
    //                 'n7-n24', 'n8-n20', 'n9-n21',
    //                 'n24-n12', 'n20-n13', 'n21-n14',
    //                 'n11-n12',
    //                 'n12-n22',
    //                 'n22-n25', 'n22-n23',
    //                 'n25-n16', 'n23-n17'
    //             ]
    //         },
    //         {
    //             // Solution A3: Left horizontal, fan via n12→n25 
    //             edges: [
    //                 'n7-n24', 'n8-n20', 'n9-n21',
    //                 'n24-n12', 'n20-n13', 'n21-n14',
    //                 'n11-n12', 'n12-n13',
    //                 'n12-n25',
    //                 'n25-n22', 'n22-n23',
    //                 'n25-n16', 'n23-n17'
    //             ]
    //         },
    //         {
    //             // Solution A4: Left horizontal only, n12→n25 no n12-n13
    //             edges: [
    //                 'n7-n24', 'n8-n20', 'n9-n21',
    //                 'n24-n12', 'n20-n13', 'n21-n14',
    //                 'n11-n12',
    //                 'n12-n25',
    //                 'n25-n22', 'n22-n23',
    //                 'n25-n16', 'n23-n17'
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: '1-to-5',
    //     name: 'LEVEL 4: 1 to 5',
    //     description: '5-to-1 convergence transition.',
    //     nodes: [
    //         // y=0 Top Row (5 inputs)
    //         { id: 'm1', position: { x: OFFSET_X + 0, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'm2', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'm3', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'm4', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'm5', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'm6', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         // y=1 Input/Area Boundary
    //         { id: 'm7', position: { x: OFFSET_X + 0, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'm8', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'm9', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'm10', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'm11', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'm12', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // y=1.5 Mid-Upper Internal (with boundary nodes)
    //         { id: 'm38', position: { x: OFFSET_X + 0, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm30', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm31', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm32', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm33', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm39', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 1.5 * GRID_SCALE }, type: 'default' },
    //         // y=2 Mid Internal Full Row
    //         { id: 'm13', position: { x: OFFSET_X + 0, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'm14', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'm15', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'm16', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'm17', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'm18', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // y=2.5 Mid-Lower Internal (with boundary nodes)
    //         { id: 'm40', position: { x: OFFSET_X + 0, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm34', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm37', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         { id: 'm41', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 2.5 * GRID_SCALE }, type: 'default' },
    //         // y=3 Area/Output Boundary
    //         { id: 'm19', position: { x: OFFSET_X + 0, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'm20', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // y=4 Bottom
    //         { id: 'm21', position: { x: OFFSET_X + 0, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'm22', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' }
    //     ],
    //     edges: [
    //         // Top Row
    //         { id: 'me1', source: 'm1', target: 'm2', color: '#22c55e' },
    //         { id: 'me2', source: 'm2', target: 'm3', color: '#22c55e' },
    //         { id: 'me3', source: 'm3', target: 'm4', color: '#22c55e' },
    //         { id: 'me4', source: 'm4', target: 'm5', color: '#22c55e' },
    //         { id: 'me5', source: 'm5', target: 'm6', color: '#22c55e' },
    //         // Input Verticals
    //         { id: 'me6', source: 'm1', target: 'm7', color: '#22c55e' },
    //         { id: 'me7', source: 'm2', target: 'm8', color: '#22c55e' },
    //         { id: 'me8', source: 'm3', target: 'm9', color: '#22c55e' },
    //         { id: 'me9', source: 'm4', target: 'm10', color: '#22c55e' },
    //         { id: 'me10', source: 'm5', target: 'm11', color: '#22c55e' },
    //         { id: 'me11', source: 'm6', target: 'm12', color: '#22c55e' },
    //         // Input/Area separator
    //         { id: 'me12', source: 'm7', target: 'm8', color: '#22c55e' },
    //         { id: 'me13', source: 'm8', target: 'm9', color: '#22c55e' },
    //         { id: 'me14', source: 'm9', target: 'm10', color: '#22c55e' },
    //         { id: 'me15', source: 'm10', target: 'm11', color: '#22c55e' },
    //         { id: 'me16', source: 'm11', target: 'm12', color: '#22c55e' },
    //         // Area Side Borders (Left: m7→m38→m13→m40→m19, Right: m12→m39→m18→m41→m20)
    //         { id: 'me17a', source: 'm7', target: 'm38', color: '#22c55e' },
    //         { id: 'me17b', source: 'm38', target: 'm13', color: '#22c55e' },
    //         { id: 'me18a', source: 'm13', target: 'm40', color: '#22c55e' },
    //         { id: 'me18b', source: 'm40', target: 'm19', color: '#22c55e' },
    //         { id: 'me19a', source: 'm12', target: 'm39', color: '#22c55e' },
    //         { id: 'me19b', source: 'm39', target: 'm18', color: '#22c55e' },
    //         { id: 'me20a', source: 'm18', target: 'm41', color: '#22c55e' },
    //         { id: 'me20b', source: 'm41', target: 'm20', color: '#22c55e' },
    //         // Area/Output separator
    //         { id: 'me21', source: 'm19', target: 'm20', color: '#22c55e' },
    //         // Output verticals
    //         { id: 'me22', source: 'm19', target: 'm21', color: '#22c55e' },
    //         { id: 'me23', source: 'm20', target: 'm22', color: '#22c55e' },
    //         // Output bottom
    //         { id: 'me24', source: 'm21', target: 'm22', color: '#22c55e' }
    //     ],
    //     tiles: l_1to5_tiles,
    //     gridSize: { width: 700, height: 600 },
    //     targetFaces: 17,
    //     validTopologies: [
    //         {
    //             // Solution A: Symmetric convergence (Pyramid as shown in Step 407)
    //             edges: [
    //                 // Stage 1: verticals y=1 → 1.5 → 2
    //                 'm8-m30', 'm30-m14',
    //                 'm9-m31', 'm31-m15',
    //                 'm10-m32', 'm32-m16',
    //                 'm11-m33', 'm33-m17',
    //                 // Horizontals at mid-row y=2
    //                 'm13-m14', 'm14-m15', 'm15-m16', 'm16-m17', 'm17-m18',
    //                 // Stage 2: pyramid convergence y=2 → 2.5 → 3
    //                 'm14-m34', 'm15-m34',
    //                 'm16-m37', 'm17-m37',
    //                 // Central cross horizontal
    //                 'm34-m37',
    //                 // Diagonal wings to bottom corners
    //                 'm34-m19', 'm37-m20'
    //             ]
    //         },
    //         {
    //             // Solution B: X-pattern variant (as shown earlier)
    //             edges: [
    //                 'm8-m30', 'm30-m14',
    //                 'm9-m31', 'm31-m15',
    //                 'm10-m32', 'm32-m16',
    //                 'm11-m33', 'm33-m17',
    //                 'm13-m14', 'm14-m15', 'm15-m16', 'm16-m17', 'm17-m18',
    //                 'm14-m34', 'm17-m37',
    //                 'm34-m37',
    //                 'm34-m20', 'm37-m19'
    //             ]
    //         },
    //         {
    //             // Solution C: User's convergence pattern (bottom path through m34-m15)
    //             edges: [
    //                 'm8-m30', 'm30-m14', 'm14-m34',
    //                 'm9-m31', 'm31-m15',
    //                 'm10-m32', 'm32-m16',
    //                 'm11-m33', 'm33-m17', 'm17-m37',
    //                 'm34-m37',
    //                 'm19-m34', 'm34-m15',
    //                 'm15-m16',
    //                 'm16-m20'
    //             ]
    //         }
    //     ]
    // },
    /* ---- LEVEL 5 ---- */
    {
        id: '3-to-2',
        name: 'LEVEL 5: 3 to 2',
        description: '3-to-2 transition.',
        nodes: [
            // Input section — 3-channel (x = 0, G, 2G, 3G)
            { id: 'p1', position: { x: OFFSET_X + 0, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'p2', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'p3', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'p4', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 'p5', position: { x: OFFSET_X + 0, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 'p6', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 'p7', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 'p8', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            // Row 2 — bottom of input / top of transition
            { id: 'p9',  position: { x: OFFSET_X + 0, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 'p10', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 'p11', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 'p12', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            // Output section — 2-channel (x = 0, 1.5G, 3G)
            // Row 4 — top of output
            { id: 'p13', position: { x: OFFSET_X + 0, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 'p14', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 'p15', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 'p16', position: { x: OFFSET_X + 0, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 'p17', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 'p18', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 'p19', position: { x: OFFSET_X + 0, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
            { id: 'p20', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
            { id: 'p21', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
        ],
        edges: [
            // Input top row
            { id: 'pe1', source: 'p1', target: 'p2', color: '#ef4444' },
            { id: 'pe2', source: 'p2', target: 'p3', color: '#ef4444' },
            { id: 'pe3', source: 'p3', target: 'p4', color: '#ef4444' },
            // Row 0→1 verticals
            { id: 'pe4', source: 'p1', target: 'p5', color: '#ef4444' },
            { id: 'pe5', source: 'p2', target: 'p6', color: '#ef4444' },
            { id: 'pe6', source: 'p3', target: 'p7', color: '#ef4444' },
            { id: 'pe7', source: 'p4', target: 'p8', color: '#ef4444' },
            // Row 1 horizontals
            { id: 'pe8', source: 'p5', target: 'p6', color: '#ef4444' },
            { id: 'pe9', source: 'p6', target: 'p7', color: '#ef4444' },
            { id: 'pe10', source: 'p7', target: 'p8', color: '#ef4444' },
            // Row 1→2 verticals
            { id: 'pe11', source: 'p5', target: 'p9',  color: '#ef4444' },
            { id: 'pe12', source: 'p6', target: 'p10', color: '#ef4444' },
            { id: 'pe13', source: 'p7', target: 'p11', color: '#ef4444' },
            { id: 'pe14', source: 'p8', target: 'p12', color: '#ef4444' },
            // Row 2 horizontals (bottom of input)
            { id: 'pe15', source: 'p9',  target: 'p10', color: '#ef4444' },
            { id: 'pe16', source: 'p10', target: 'p11', color: '#ef4444' },
            { id: 'pe17', source: 'p11', target: 'p12', color: '#ef4444' },
            // Transition sides only
            { id: 'pe18', source: 'p9',  target: 'p13', color: '#6b7280' },
            { id: 'pe19', source: 'p12', target: 'p15', color: '#6b7280' },
            // Output top row
            { id: 'pe20', source: 'p13', target: 'p14', color: '#22c55e' },
            { id: 'pe21', source: 'p14', target: 'p15', color: '#22c55e' },
            // Row 4→5 verticals
            { id: 'pe22', source: 'p13', target: 'p16', color: '#22c55e' },
            { id: 'pe23', source: 'p14', target: 'p17', color: '#22c55e' },
            { id: 'pe24', source: 'p15', target: 'p18', color: '#22c55e' },
            // Row 5 horizontals
            { id: 'pe25', source: 'p16', target: 'p17', color: '#22c55e' },
            { id: 'pe26', source: 'p17', target: 'p18', color: '#22c55e' },
            // Row 5→6 verticals
            { id: 'pe27', source: 'p16', target: 'p19', color: '#22c55e' },
            { id: 'pe28', source: 'p17', target: 'p20', color: '#22c55e' },
            { id: 'pe29', source: 'p18', target: 'p21', color: '#22c55e' },
            // Row 6 bottom
            { id: 'pe30', source: 'p19', target: 'p20', color: '#22c55e' },
            { id: 'pe31', source: 'p20', target: 'p21', color: '#22c55e' },
        ],
        tiles: l_2to3_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 13,
        validTopologies: [
            {
                // Solution A: V-merge — p10 and p11 both connect directly to center output p14
                edges: ['p10-p14', 'p11-p14'],
            },
            {
                // Solution B: p10→p14 (direct), p11→p15 (diagonal, may be multi-segment)
                edges: ['p10-p14'],
                connections: ['p11-p15'],
            }
        ]
    }
];
