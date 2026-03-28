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
/*                           LEVEL 9: 3 to 5                                  */
/* -------------------------------------------------------------------------- */
const l_3to5_tiles: GameTile[] = [
    createTile('l9_out1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], 'output'),
    createTile('l9_out2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 2 }], 'output'),
    createTile('l9_out3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 2 }], 'output'),
    createTile('l9_out4', [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 3, y: 2 }], 'output'),
    createTile('l9_out5', [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 2 }, { x: 4, y: 2 }], 'output'),
    createTile('l9_area', [{ x: 0, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 4 }, { x: 0, y: 4 }], 'default'),
    // Input 3 channels: 2G | 2G | 1G (dividers at x=2G and x=4G)
    createTile('l9_in1', [{ x: 0, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 6 }, { x: 0, y: 6 }], 'input'),
    createTile('l9_in2', [{ x: 2, y: 4 }, { x: 4, y: 4 }, { x: 4, y: 6 }, { x: 2, y: 6 }], 'input'),
    createTile('l9_in3', [{ x: 4, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 6 }, { x: 4, y: 6 }], 'input'),
];

/* -------------------------------------------------------------------------- */
/*                           LEVEL 8: 3 to 4                                  */
/* -------------------------------------------------------------------------- */
const l_3to4_tiles: GameTile[] = [
    createTile('l8_out1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], 'output'),
    createTile('l8_out2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 2 }], 'output'),
    createTile('l8_out3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 2 }], 'output'),
    createTile('l8_out4', [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 3, y: 2 }], 'output'),
    createTile('l8_area', [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 0, y: 4 }], 'default'),
    // Input 3 channels: 1G | 2G | 1G (dividers at x=1G and x=3G, all grid-aligned)
    createTile('l8_in1', [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 1, y: 6 }, { x: 0, y: 6 }], 'input'),
    createTile('l8_in2', [{ x: 1, y: 4 }, { x: 3, y: 4 }, { x: 3, y: 6 }, { x: 1, y: 6 }], 'input'),
    createTile('l8_in3', [{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 4, y: 6 }, { x: 3, y: 6 }], 'input'),
];

/* -------------------------------------------------------------------------- */
/*                           LEVEL 7: 2 to 5                                  */
/* -------------------------------------------------------------------------- */
const l_2to5_tiles: GameTile[] = [
    createTile('l7_out1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], 'output'),
    createTile('l7_out2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 2 }], 'output'),
    createTile('l7_out3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 2 }], 'output'),
    createTile('l7_out4', [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 3, y: 2 }], 'output'),
    createTile('l7_out5', [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 2 }, { x: 4, y: 2 }], 'output'),
    createTile('l7_area', [{ x: 0, y: 2 }, { x: 5, y: 2 }, { x: 5, y: 4 }, { x: 0, y: 4 }], 'default'),
    createTile('l7_in1', [{ x: 0, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 6 }, { x: 0, y: 6 }], 'input'),
    createTile('l7_in2', [{ x: 2, y: 4 }, { x: 5, y: 4 }, { x: 5, y: 6 }, { x: 2, y: 6 }], 'input'),
];

/* -------------------------------------------------------------------------- */
/*                           LEVEL 6: 2 to 4                                  */
/* -------------------------------------------------------------------------- */
const l_2to4_tiles: GameTile[] = [
    // TOP = output (green, 4 channels)
    createTile('l6_out1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 2 }], 'output'),
    createTile('l6_out2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 2 }], 'output'),
    createTile('l6_out3', [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 2, y: 2 }], 'output'),
    createTile('l6_out4', [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 2 }, { x: 3, y: 2 }], 'output'),
    createTile('l6_area', [{ x: 0, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 0, y: 4 }], 'default'),
    // BOTTOM = input (red, 2 channels)
    createTile('l6_in1', [{ x: 0, y: 4 }, { x: 2, y: 4 }, { x: 2, y: 6 }, { x: 0, y: 6 }], 'input'),
    createTile('l6_in2', [{ x: 2, y: 4 }, { x: 4, y: 4 }, { x: 4, y: 6 }, { x: 2, y: 6 }], 'input'),
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
    // {
    //     id: '3-to-2',
    //     name: 'LEVEL 5: 3 to 2',
    //     description: '3-to-2 transition.',
    //     nodes: [
    //         // Input section — 3-channel (x = 0, G, 2G, 3G)
    //         { id: 'p1', position: { x: OFFSET_X + 0, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'p2', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'p3', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'p4', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'p5', position: { x: OFFSET_X + 0, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'p6', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'p7', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'p8', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // Row 2 — bottom of input / top of transition
    //         { id: 'p9',  position: { x: OFFSET_X + 0, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'p10', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'p11', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'p12', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // Guide nodes in transition zone (hints for solution)
    //         { id: 'p22', position: { x: OFFSET_X + 0, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'p23', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'p24', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // Output section — 2-channel (x = 0, 1.5G, 3G)
    //         // Row 4 — top of output
    //         { id: 'p13', position: { x: OFFSET_X + 0, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'p14', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'p15', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'p16', position: { x: OFFSET_X + 0, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'p17', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'p18', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'p19', position: { x: OFFSET_X + 0, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 'p20', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 'p21', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //     ],
    //     edges: [
    //         // Input top row
    //         { id: 'pe1', source: 'p1', target: 'p2', color: '#ef4444' },
    //         { id: 'pe2', source: 'p2', target: 'p3', color: '#ef4444' },
    //         { id: 'pe3', source: 'p3', target: 'p4', color: '#ef4444' },
    //         // Row 0→1 verticals
    //         { id: 'pe4', source: 'p1', target: 'p5', color: '#ef4444' },
    //         { id: 'pe5', source: 'p2', target: 'p6', color: '#ef4444' },
    //         { id: 'pe6', source: 'p3', target: 'p7', color: '#ef4444' },
    //         { id: 'pe7', source: 'p4', target: 'p8', color: '#ef4444' },
    //         // Row 1 horizontals
    //         { id: 'pe8', source: 'p5', target: 'p6', color: '#ef4444' },
    //         { id: 'pe9', source: 'p6', target: 'p7', color: '#ef4444' },
    //         { id: 'pe10', source: 'p7', target: 'p8', color: '#ef4444' },
    //         // Row 1→2 verticals
    //         { id: 'pe11', source: 'p5', target: 'p9',  color: '#ef4444' },
    //         { id: 'pe12', source: 'p6', target: 'p10', color: '#ef4444' },
    //         { id: 'pe13', source: 'p7', target: 'p11', color: '#ef4444' },
    //         { id: 'pe14', source: 'p8', target: 'p12', color: '#ef4444' },
    //         // Row 2 horizontals (bottom of input)
    //         { id: 'pe15', source: 'p9',  target: 'p10', color: '#ef4444' },
    //         { id: 'pe16', source: 'p10', target: 'p11', color: '#ef4444' },
    //         { id: 'pe17', source: 'p11', target: 'p12', color: '#ef4444' },
    //         // Transition sides only
    //         { id: 'pe18', source: 'p9',  target: 'p13', color: '#6b7280' },
    //         { id: 'pe19', source: 'p12', target: 'p15', color: '#6b7280' },
    //         // Output top row
    //         { id: 'pe20', source: 'p13', target: 'p14', color: '#22c55e' },
    //         { id: 'pe21', source: 'p14', target: 'p15', color: '#22c55e' },
    //         // Row 4→5 verticals
    //         { id: 'pe22', source: 'p13', target: 'p16', color: '#22c55e' },
    //         { id: 'pe23', source: 'p14', target: 'p17', color: '#22c55e' },
    //         { id: 'pe24', source: 'p15', target: 'p18', color: '#22c55e' },
    //         // Row 5 horizontals
    //         { id: 'pe25', source: 'p16', target: 'p17', color: '#22c55e' },
    //         { id: 'pe26', source: 'p17', target: 'p18', color: '#22c55e' },
    //         // Row 5→6 verticals
    //         { id: 'pe27', source: 'p16', target: 'p19', color: '#22c55e' },
    //         { id: 'pe28', source: 'p17', target: 'p20', color: '#22c55e' },
    //         { id: 'pe29', source: 'p18', target: 'p21', color: '#22c55e' },
    //         // Row 6 bottom
    //         { id: 'pe30', source: 'p19', target: 'p20', color: '#22c55e' },
    //         { id: 'pe31', source: 'p20', target: 'p21', color: '#22c55e' },
    //     ],
    //     tiles: l_2to3_tiles,
    //     gridSize: { width: 500, height: 600 },
    //     targetFaces: 13,
    //     validTopologies: [
    //         {
    //             // Solution A: V-merge — p10 and p11 both converge to center output p14
    //             edges: [],
    //             connections: ['p10-p14', 'p11-p14'],
    //         },
    //         {
    //             // Solution B: p10→p14 vertical, p11→p15 diagonal (may pass through p23)
    //             edges: [],
    //             connections: ['p10-p14', 'p11-p15'],
    //         }
    //     ]
    // },
    // /* ---- LEVEL 6 ---- */
    // {
    //     id: '2-to-4',
    //     name: 'LEVEL 6: 2 to 4',
    //     description: '2-to-4 transition.',
    //     nodes: [
    //         // TOP = output section — 4-channel (x = 0,G,2G,3G,4G)
    //         { id: 'q1',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'q2',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'q3',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'q4',  position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'q5',  position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'q6',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'q7',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'q8',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'q9',  position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'q10', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // Row 2 — bottom of output / top of transition
    //         { id: 'q11', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'q12', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'q13', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'q14', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'q15', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // Guide nodes — full row at y=3G (x = 0,G,2G,3G,4G)
    //         { id: 'q16', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'q17', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'q18', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'q19', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'q20', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // Row 4 — top of input / bottom of transition
    //         { id: 'q21', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'q22', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'q23', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         // BOTTOM = input section — 2-channel (x = 0, 2G, 4G)
    //         { id: 'q24', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'q25', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'q26', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'q27', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 'q28', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 'q29', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //     ],
    //     edges: [
    //         // Output top (green)
    //         { id: 'qe1', source: 'q1', target: 'q2',  color: '#22c55e' },
    //         { id: 'qe2', source: 'q2', target: 'q3',  color: '#22c55e' },
    //         { id: 'qe3', source: 'q3', target: 'q4',  color: '#22c55e' },
    //         { id: 'qe4', source: 'q4', target: 'q5',  color: '#22c55e' },
    //         // Row 0→1 verticals
    //         { id: 'qe5',  source: 'q1',  target: 'q6',  color: '#22c55e' },
    //         { id: 'qe6',  source: 'q2',  target: 'q7',  color: '#22c55e' },
    //         { id: 'qe7',  source: 'q3',  target: 'q8',  color: '#22c55e' },
    //         { id: 'qe8',  source: 'q4',  target: 'q9',  color: '#22c55e' },
    //         { id: 'qe9',  source: 'q5',  target: 'q10', color: '#22c55e' },
    //         // Row 1 horizontals
    //         { id: 'qe10', source: 'q6',  target: 'q7',  color: '#22c55e' },
    //         { id: 'qe11', source: 'q7',  target: 'q8',  color: '#22c55e' },
    //         { id: 'qe12', source: 'q8',  target: 'q9',  color: '#22c55e' },
    //         { id: 'qe13', source: 'q9',  target: 'q10', color: '#22c55e' },
    //         // Row 1→2 verticals
    //         { id: 'qe14', source: 'q6',  target: 'q11', color: '#22c55e' },
    //         { id: 'qe15', source: 'q7',  target: 'q12', color: '#22c55e' },
    //         { id: 'qe16', source: 'q8',  target: 'q13', color: '#22c55e' },
    //         { id: 'qe17', source: 'q9',  target: 'q14', color: '#22c55e' },
    //         { id: 'qe18', source: 'q10', target: 'q15', color: '#22c55e' },
    //         // Row 2 horizontals (bottom of output)
    //         { id: 'qe19', source: 'q11', target: 'q12', color: '#22c55e' },
    //         { id: 'qe20', source: 'q12', target: 'q13', color: '#22c55e' },
    //         { id: 'qe21', source: 'q13', target: 'q14', color: '#22c55e' },
    //         { id: 'qe22', source: 'q14', target: 'q15', color: '#22c55e' },
    //         // Transition sides
    //         { id: 'qe23', source: 'q11', target: 'q21', color: '#6b7280' },
    //         { id: 'qe24', source: 'q15', target: 'q23', color: '#6b7280' },
    //         // Row 4 horizontals (top of input)
    //         { id: 'qe25', source: 'q21', target: 'q22', color: '#ef4444' },
    //         { id: 'qe26', source: 'q22', target: 'q23', color: '#ef4444' },
    //         // Row 4→5 verticals
    //         { id: 'qe27', source: 'q21', target: 'q24', color: '#ef4444' },
    //         { id: 'qe28', source: 'q22', target: 'q25', color: '#ef4444' },
    //         { id: 'qe29', source: 'q23', target: 'q26', color: '#ef4444' },
    //         // Row 5 horizontals
    //         { id: 'qe30', source: 'q24', target: 'q25', color: '#ef4444' },
    //         { id: 'qe31', source: 'q25', target: 'q26', color: '#ef4444' },
    //         // Row 5→6 verticals
    //         { id: 'qe32', source: 'q24', target: 'q27', color: '#ef4444' },
    //         { id: 'qe33', source: 'q25', target: 'q28', color: '#ef4444' },
    //         { id: 'qe34', source: 'q26', target: 'q29', color: '#ef4444' },
    //         // Row 6 bottom
    //         { id: 'qe35', source: 'q27', target: 'q28', color: '#ef4444' },
    //         { id: 'qe36', source: 'q28', target: 'q29', color: '#ef4444' },
    //     ],
    //     tiles: l_2to4_tiles,
    //     gridSize: { width: 700, height: 700 },
    //     targetFaces: 0,
    //     validTopologies: [
    //         {
    //             // Solution 1: q21→q17→q12, q23→q19→q14, q22-q13 direct
    //             edges: [],
    //             connections: ['q21-q17', 'q22-q13', 'q23-q14'],
    //         },
    //         {
    //             // Solution 2: q16-q20 horizontal, q13-q22 direct, q12→q17
    //             edges: [],
    //             connections: ['q16-q20', 'q13-q22', 'q12-q17'],
    //         },
    //     ]
    // },
    /* ---- LEVEL 7 ---- */
    // {
    //     id: '2-to-5',
    //     name: 'LEVEL 7: 2 to 5',
    //     description: '2-to-5 transition.',
    //     nodes: [
    //         // TOP = output section — 5-channel (x = 0,G,2G,3G,4G,5G)
    //         { id: 'r1',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'r2',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'r3',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'r4',  position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'r5',  position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'r6',  position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 'r7',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'r8',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'r9',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'r10', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'r11', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 'r12', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // Row 2 — bottom of output / top of transition
    //         { id: 'r13', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'r14', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'r15', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'r16', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'r17', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 'r18', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // Guide nodes — full row at y=3G
    //         { id: 'r19', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'r20', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'r21', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'r22', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'r23', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 'r24', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // Row 4 — top of input / bottom of transition (x = 0, 2G, 5G)
    //         { id: 'r25', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'r26', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 'r27', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         // BOTTOM = input section — 2-channel
    //         { id: 'r28', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'r29', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'r30', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 'r31', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 'r32', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 'r33', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //     ],
    //     edges: [
    //         // Output top (green)
    //         { id: 're1',  source: 'r1',  target: 'r2',  color: '#22c55e' },
    //         { id: 're2',  source: 'r2',  target: 'r3',  color: '#22c55e' },
    //         { id: 're3',  source: 'r3',  target: 'r4',  color: '#22c55e' },
    //         { id: 're4',  source: 'r4',  target: 'r5',  color: '#22c55e' },
    //         { id: 're5',  source: 'r5',  target: 'r6',  color: '#22c55e' },
    //         // Row 0→1 verticals
    //         { id: 're6',  source: 'r1',  target: 'r7',  color: '#22c55e' },
    //         { id: 're7',  source: 'r2',  target: 'r8',  color: '#22c55e' },
    //         { id: 're8',  source: 'r3',  target: 'r9',  color: '#22c55e' },
    //         { id: 're9',  source: 'r4',  target: 'r10', color: '#22c55e' },
    //         { id: 're10', source: 'r5',  target: 'r11', color: '#22c55e' },
    //         { id: 're11', source: 'r6',  target: 'r12', color: '#22c55e' },
    //         // Row 1 horizontals
    //         { id: 're12', source: 'r7',  target: 'r8',  color: '#22c55e' },
    //         { id: 're13', source: 'r8',  target: 'r9',  color: '#22c55e' },
    //         { id: 're14', source: 'r9',  target: 'r10', color: '#22c55e' },
    //         { id: 're15', source: 'r10', target: 'r11', color: '#22c55e' },
    //         { id: 're16', source: 'r11', target: 'r12', color: '#22c55e' },
    //         // Row 1→2 verticals
    //         { id: 're17', source: 'r7',  target: 'r13', color: '#22c55e' },
    //         { id: 're18', source: 'r8',  target: 'r14', color: '#22c55e' },
    //         { id: 're19', source: 'r9',  target: 'r15', color: '#22c55e' },
    //         { id: 're20', source: 'r10', target: 'r16', color: '#22c55e' },
    //         { id: 're21', source: 'r11', target: 'r17', color: '#22c55e' },
    //         { id: 're22', source: 'r12', target: 'r18', color: '#22c55e' },
    //         // Row 2 horizontals (bottom of output)
    //         { id: 're23', source: 'r13', target: 'r14', color: '#22c55e' },
    //         { id: 're24', source: 'r14', target: 'r15', color: '#22c55e' },
    //         { id: 're25', source: 'r15', target: 'r16', color: '#22c55e' },
    //         { id: 're26', source: 'r16', target: 'r17', color: '#22c55e' },
    //         { id: 're27', source: 'r17', target: 'r18', color: '#22c55e' },
    //         // Transition sides
    //         { id: 're28', source: 'r13', target: 'r25', color: '#6b7280' },
    //         { id: 're29', source: 'r18', target: 'r27', color: '#6b7280' },
    //         // Input top row
    //         { id: 're30', source: 'r25', target: 'r26', color: '#ef4444' },
    //         { id: 're31', source: 'r26', target: 'r27', color: '#ef4444' },
    //         // Row 4→5 verticals
    //         { id: 're32', source: 'r25', target: 'r28', color: '#ef4444' },
    //         { id: 're33', source: 'r26', target: 'r29', color: '#ef4444' },
    //         { id: 're34', source: 'r27', target: 'r30', color: '#ef4444' },
    //         // Row 5 horizontals
    //         { id: 're35', source: 'r28', target: 'r29', color: '#ef4444' },
    //         { id: 're36', source: 'r29', target: 'r30', color: '#ef4444' },
    //         // Row 5→6 verticals
    //         { id: 're37', source: 'r28', target: 'r31', color: '#ef4444' },
    //         { id: 're38', source: 'r29', target: 'r32', color: '#ef4444' },
    //         { id: 're39', source: 'r30', target: 'r33', color: '#ef4444' },
    //         // Row 6 bottom
    //         { id: 're40', source: 'r31', target: 'r32', color: '#ef4444' },
    //         { id: 're41', source: 'r32', target: 'r33', color: '#ef4444' },
    //     ],
    //     tiles: l_2to5_tiles,
    //     gridSize: { width: 750, height: 750 },
    //     targetFaces: 0,
    //     validTopologies: [
    //         // To be updated after user sends edge lists
    //         { edges: [], connections: ['r26-r15', 'r26-r16'] },
    //         { edges: [], connections: ['r26-r14', 'r26-r16'] },
    //     ]
    // },
    /* ---- LEVEL 8 ---- */
    // {
    //     id: '3-to-4',
    //     name: 'LEVEL 8: 3 to 4',
    //     description: '3-to-4 transition.',
    //     nodes: [
    //         // TOP = output section — 4-channel (x = 0,G,2G,3G,4G)
    //         { id: 's1',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 's2',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 's3',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 's4',  position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 's5',  position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
    //         { id: 's6',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 's7',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 's8',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 's9',  position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         { id: 's10', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
    //         // Row 2 — bottom of output / top of transition
    //         { id: 's11', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 's12', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 's13', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 's14', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         { id: 's15', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
    //         // Guide nodes — full row at y=3G
    //         { id: 's16', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 's17', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 's18', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 's19', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         { id: 's20', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
    //         // Row 4 — top of input / bottom of transition (3ch: 1G|2G|1G — dividers at x=G and x=3G)
    //         { id: 's21', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 's22', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 's23', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         { id: 's24', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
    //         // BOTTOM = input section — 3-channel
    //         { id: 's25', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 's26', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 's27', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 's28', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
    //         { id: 's29', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 's30', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 's31', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //         { id: 's32', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
    //     ],
    //     edges: [
    //         // Output top (green)
    //         { id: 'se1',  source: 's1',  target: 's2',  color: '#22c55e' },
    //         { id: 'se2',  source: 's2',  target: 's3',  color: '#22c55e' },
    //         { id: 'se3',  source: 's3',  target: 's4',  color: '#22c55e' },
    //         { id: 'se4',  source: 's4',  target: 's5',  color: '#22c55e' },
    //         // Row 0→1 verticals
    //         { id: 'se5',  source: 's1',  target: 's6',  color: '#22c55e' },
    //         { id: 'se6',  source: 's2',  target: 's7',  color: '#22c55e' },
    //         { id: 'se7',  source: 's3',  target: 's8',  color: '#22c55e' },
    //         { id: 'se8',  source: 's4',  target: 's9',  color: '#22c55e' },
    //         { id: 'se9',  source: 's5',  target: 's10', color: '#22c55e' },
    //         // Row 1 horizontals
    //         { id: 'se10', source: 's6',  target: 's7',  color: '#22c55e' },
    //         { id: 'se11', source: 's7',  target: 's8',  color: '#22c55e' },
    //         { id: 'se12', source: 's8',  target: 's9',  color: '#22c55e' },
    //         { id: 'se13', source: 's9',  target: 's10', color: '#22c55e' },
    //         // Row 1→2 verticals
    //         { id: 'se14', source: 's6',  target: 's11', color: '#22c55e' },
    //         { id: 'se15', source: 's7',  target: 's12', color: '#22c55e' },
    //         { id: 'se16', source: 's8',  target: 's13', color: '#22c55e' },
    //         { id: 'se17', source: 's9',  target: 's14', color: '#22c55e' },
    //         { id: 'se18', source: 's10', target: 's15', color: '#22c55e' },
    //         // Row 2 horizontals (bottom of output)
    //         { id: 'se19', source: 's11', target: 's12', color: '#22c55e' },
    //         { id: 'se20', source: 's12', target: 's13', color: '#22c55e' },
    //         { id: 'se21', source: 's13', target: 's14', color: '#22c55e' },
    //         { id: 'se22', source: 's14', target: 's15', color: '#22c55e' },
    //         // Transition sides
    //         { id: 'se23', source: 's11', target: 's21', color: '#6b7280' },
    //         { id: 'se24', source: 's15', target: 's24', color: '#6b7280' },
    //         // Input top row (red) — 3ch dividers at x=G and x=3G
    //         { id: 'se25', source: 's21', target: 's22', color: '#ef4444' },
    //         { id: 'se26', source: 's22', target: 's23', color: '#ef4444' },
    //         { id: 'se27', source: 's23', target: 's24', color: '#ef4444' },
    //         // Row 4→5 verticals
    //         { id: 'se28', source: 's21', target: 's25', color: '#ef4444' },
    //         { id: 'se29', source: 's22', target: 's26', color: '#ef4444' },
    //         { id: 'se30', source: 's23', target: 's27', color: '#ef4444' },
    //         { id: 'se31', source: 's24', target: 's28', color: '#ef4444' },
    //         // Row 5 horizontals
    //         { id: 'se32', source: 's25', target: 's26', color: '#ef4444' },
    //         { id: 'se33', source: 's26', target: 's27', color: '#ef4444' },
    //         { id: 'se34', source: 's27', target: 's28', color: '#ef4444' },
    //         // Row 5→6 verticals
    //         { id: 'se35', source: 's25', target: 's29', color: '#ef4444' },
    //         { id: 'se36', source: 's26', target: 's30', color: '#ef4444' },
    //         { id: 'se37', source: 's27', target: 's31', color: '#ef4444' },
    //         { id: 'se38', source: 's28', target: 's32', color: '#ef4444' },
    //         // Row 6 bottom
    //         { id: 'se39', source: 's29', target: 's30', color: '#ef4444' },
    //         { id: 'se40', source: 's30', target: 's31', color: '#ef4444' },
    //         { id: 'se41', source: 's31', target: 's32', color: '#ef4444' },
    //     ],
    //     tiles: l_3to4_tiles,
    //     gridSize: { width: 700, height: 750 },
    //     targetFaces: 0,
    //     validTopologies: [
    //         // To be updated after user sends edge lists (4 solutions)
    //         { edges: [], connections: ['s22-s12', 's22-s13', 's23-s14'] },
    //         { edges: [], connections: ['s22-s12', 's23-s13', 's23-s14'] },
    //         { edges: [], connections: ['s22-s13', 's22-s14', 's23-s12'] },
    //         { edges: [], connections: ['s22-s12', 's22-s14', 's23-s13'] },
    //     ]
    // },
    /* ---- LEVEL 9 ---- */
    {
        id: '3-to-5',
        name: 'LEVEL 9: 3 to 5',
        description: '3-to-5 transition.',
        nodes: [
            // TOP = output section — 5-channel (x = 0,G,2G,3G,4G,5G)
            { id: 't1',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 0 }, type: 'default' },
            { id: 't2',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 't3',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 't4',  position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 't5',  position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 't6',  position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 0 }, type: 'default' },
            { id: 't7',  position: { x: OFFSET_X + 0,            y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 't8',  position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 't9',  position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 't10', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 't11', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            { id: 't12', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 1 * GRID_SCALE }, type: 'default' },
            // Row 2 — bottom of output / top of transition
            { id: 't13', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 't14', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 't15', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 't16', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 't17', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            { id: 't18', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 2 * GRID_SCALE }, type: 'default' },
            // Guide nodes — full row at y=3G
            { id: 't19', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 't20', position: { x: OFFSET_X + 1 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 't21', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 't22', position: { x: OFFSET_X + 3 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 't23', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            { id: 't24', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 3 * GRID_SCALE }, type: 'default' },
            // Row 4 — top of input / bottom of transition (3ch: 2G|2G|1G — dividers at x=2G and x=4G)
            { id: 't25', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 't26', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 't27', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            { id: 't28', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 4 * GRID_SCALE }, type: 'default' },
            // BOTTOM = input section — 3-channel
            { id: 't29', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 't30', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 't31', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 't32', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 5 * GRID_SCALE }, type: 'default' },
            { id: 't33', position: { x: OFFSET_X + 0,            y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
            { id: 't34', position: { x: OFFSET_X + 2 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
            { id: 't35', position: { x: OFFSET_X + 4 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
            { id: 't36', position: { x: OFFSET_X + 5 * GRID_SCALE, y: OFFSET_Y + 6 * GRID_SCALE }, type: 'default' },
        ],
        edges: [
            // Output top (green)
            { id: 'te1',  source: 't1',  target: 't2',  color: '#22c55e' },
            { id: 'te2',  source: 't2',  target: 't3',  color: '#22c55e' },
            { id: 'te3',  source: 't3',  target: 't4',  color: '#22c55e' },
            { id: 'te4',  source: 't4',  target: 't5',  color: '#22c55e' },
            { id: 'te5',  source: 't5',  target: 't6',  color: '#22c55e' },
            // Row 0→1 verticals
            { id: 'te6',  source: 't1',  target: 't7',  color: '#22c55e' },
            { id: 'te7',  source: 't2',  target: 't8',  color: '#22c55e' },
            { id: 'te8',  source: 't3',  target: 't9',  color: '#22c55e' },
            { id: 'te9',  source: 't4',  target: 't10', color: '#22c55e' },
            { id: 'te10', source: 't5',  target: 't11', color: '#22c55e' },
            { id: 'te11', source: 't6',  target: 't12', color: '#22c55e' },
            // Row 1 horizontals
            { id: 'te12', source: 't7',  target: 't8',  color: '#22c55e' },
            { id: 'te13', source: 't8',  target: 't9',  color: '#22c55e' },
            { id: 'te14', source: 't9',  target: 't10', color: '#22c55e' },
            { id: 'te15', source: 't10', target: 't11', color: '#22c55e' },
            { id: 'te16', source: 't11', target: 't12', color: '#22c55e' },
            // Row 1→2 verticals
            { id: 'te17', source: 't7',  target: 't13', color: '#22c55e' },
            { id: 'te18', source: 't8',  target: 't14', color: '#22c55e' },
            { id: 'te19', source: 't9',  target: 't15', color: '#22c55e' },
            { id: 'te20', source: 't10', target: 't16', color: '#22c55e' },
            { id: 'te21', source: 't11', target: 't17', color: '#22c55e' },
            { id: 'te22', source: 't12', target: 't18', color: '#22c55e' },
            // Row 2 horizontals (bottom of output)
            { id: 'te23', source: 't13', target: 't14', color: '#22c55e' },
            { id: 'te24', source: 't14', target: 't15', color: '#22c55e' },
            { id: 'te25', source: 't15', target: 't16', color: '#22c55e' },
            { id: 'te26', source: 't16', target: 't17', color: '#22c55e' },
            { id: 'te27', source: 't17', target: 't18', color: '#22c55e' },
            // Transition sides
            { id: 'te28', source: 't13', target: 't25', color: '#6b7280' },
            { id: 'te29', source: 't18', target: 't28', color: '#6b7280' },
            // Input top row (red) — 3ch dividers at x=2G and x=4G
            { id: 'te30', source: 't25', target: 't26', color: '#ef4444' },
            { id: 'te31', source: 't26', target: 't27', color: '#ef4444' },
            { id: 'te32', source: 't27', target: 't28', color: '#ef4444' },
            // Row 4→5 verticals
            { id: 'te33', source: 't25', target: 't29', color: '#ef4444' },
            { id: 'te34', source: 't26', target: 't30', color: '#ef4444' },
            { id: 'te35', source: 't27', target: 't31', color: '#ef4444' },
            { id: 'te36', source: 't28', target: 't32', color: '#ef4444' },
            // Row 5 horizontals
            { id: 'te37', source: 't29', target: 't30', color: '#ef4444' },
            { id: 'te38', source: 't30', target: 't31', color: '#ef4444' },
            { id: 'te39', source: 't31', target: 't32', color: '#ef4444' },
            // Row 5→6 verticals
            { id: 'te40', source: 't29', target: 't33', color: '#ef4444' },
            { id: 'te41', source: 't30', target: 't34', color: '#ef4444' },
            { id: 'te42', source: 't31', target: 't35', color: '#ef4444' },
            { id: 'te43', source: 't32', target: 't36', color: '#ef4444' },
            // Row 6 bottom
            { id: 'te44', source: 't33', target: 't34', color: '#ef4444' },
            { id: 'te45', source: 't34', target: 't35', color: '#ef4444' },
            { id: 'te46', source: 't35', target: 't36', color: '#ef4444' },
        ],
        tiles: l_3to5_tiles,
        gridSize: { width: 800, height: 750 },
        targetFaces: 0,
        validTopologies: [
            // To be updated after user sends edge lists (5 solutions)
            { edges: [], connections: ['t26-t14', 't26-t15', 't27-t16'] },
            { edges: [], connections: ['t26-t14', 't27-t15', 't27-t16'] },
            { edges: [], connections: ['t26-t15', 't26-t16', 't27-t17'] },
            { edges: [], connections: ['t26-t14', 't26-t16', 't27-t15'] },
            { edges: [], connections: ['t26-t15', 't27-t16', 't27-t17'] },
        ]
    }
];
