import { LevelData, GameNode, GameEdge, GameTile } from '../lib/types';

const GRID_SCALE = 60;
const OFFSET_X = 100;
const OFFSET_Y = 100;

// Helper to create nodes
const createNode = (id: string, x: number, y: number, type: 'start' | 'end' | 'default' = 'default'): GameNode => ({
    id,
    position: { x: OFFSET_X + x * GRID_SCALE, y: OFFSET_Y + y * GRID_SCALE },
    type
});

// Helper for perimeter edges
const createEdge = (s: string, t: string): GameEdge => ({ id: `${s}-${t}`, source: s, target: t });

// Helper to create tiles
function createTile(id: string, points: { x: number, y: number }[], type: 'input' | 'output' | 'default'): GameTile {
    return {
        id,
        type,
        points: points.map(p => ({ x: OFFSET_X + p.x * GRID_SCALE, y: OFFSET_Y + p.y * GRID_SCALE }))
    };
}

/* -------------------------------------------------------------------------- */
/*                                LEVEL 1: 1 to 1                             */
/* -------------------------------------------------------------------------- */
const l1_nodes: GameNode[] = [
    createNode('t0', 0, 0, 'start'), createNode('t1', 1, 0, 'start'),
    createNode('m0_1', 0, 1), createNode('m1_1', 1, 1),
    createNode('m0_2', 0, 2), createNode('m1_2', 1, 2),
    createNode('m0_3', 0, 3), createNode('m1_3', 1, 3),
    createNode('b0', 0, 4, 'end'), createNode('b1', 1, 4, 'end'),
];
const l1_edges: GameEdge[] = [
    createEdge('t0', 't1'),
    createEdge('t1', 'm1_1'), createEdge('m1_1', 'm1_2'), createEdge('m1_2', 'm1_3'), createEdge('m1_3', 'b1'),
    createEdge('b1', 'b0'),
    createEdge('b0', 'm0_3'), createEdge('m0_3', 'm0_2'), createEdge('m0_2', 'm0_1'), createEdge('m0_1', 't0')
];
const l1_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('out', [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 0, y: 4 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 2: 2 to 1                             */
/* -------------------------------------------------------------------------- */
const l2_nodes: GameNode[] = [
    createNode('t0', 0, 0, 'start'), createNode('t1', 1, 0, 'start'), createNode('t2', 2, 0, 'start'),
    createNode('m0', 0, 1), createNode('m1', 1, 1), createNode('m2', 2, 1),
    createNode('m0_2', 0, 2), createNode('m1_2', 1, 2), createNode('m2_2', 2, 2),
    createNode('b0', 0.5, 3, 'end'), createNode('b1', 1.5, 3, 'end'),
    createNode('center_merge', 1, 2.5)
];
const l2_edges: GameEdge[] = [
    createEdge('t0', 't1'), createEdge('t1', 't2'),
    createEdge('t2', 'm2'), createEdge('m2', 'm2_2'), createEdge('m2_2', 'b1'),
    createEdge('b1', 'b0'),
    createEdge('b0', 'm0_2'), createEdge('m0_2', 'm0'), createEdge('m0', 't0')
];
const l2_tiles: GameTile[] = [
    createTile('in1', [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }], 'input'),
    createTile('in2', [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }], 'input'),
    createTile('out', [{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1.5, y: 3 }, { x: 0.5, y: 3 }], 'output')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 3: 3 to 1                             */
/* -------------------------------------------------------------------------- */
const l3_nodes: GameNode[] = [
    createNode('t0', 0, 0, 'start'), createNode('t1', 1, 0, 'start'), createNode('t2', 2, 0, 'start'), createNode('t3', 3, 0, 'start'),
    createNode('m0', 0, 1.5), createNode('m3', 3, 1.5),
    createNode('b0', 1, 3, 'end'), createNode('b1', 2, 3, 'end'),
    createNode('merge_1', 1, 1.5), createNode('merge_2', 2, 1.5),
    createNode('merge_final', 1.5, 2.25)
];
const l3_edges: GameEdge[] = [
    createEdge('t0', 't1'), createEdge('t1', 't2'), createEdge('t2', 't3'),
    createEdge('t3', 'm3'), createEdge('m3', 'b1'),
    createEdge('b1', 'b0'),
    createEdge('b0', 'm0'), createEdge('m0', 't0')
];
const l3_tiles: GameTile[] = [
    createTile('in', [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 0, y: 1 }], 'input')
];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 4: 3 to 2                             */
/* -------------------------------------------------------------------------- */
const l4_nodes: GameNode[] = [
    createNode('t0', 0, 0, 'start'), createNode('t1', 1, 0, 'start'), createNode('t2', 2, 0, 'start'), createNode('t3', 3, 0, 'start'),
    createNode('r1_0', 0, 1), createNode('r1_1', 1, 1), createNode('r1_2', 2, 1), createNode('r1_3', 3, 1),
    createNode('r2_0', 0, 2), createNode('r2_3', 3, 2),
    createNode('b0', 0, 3, 'end'), createNode('b1', 1.5, 3, 'end'), createNode('b2', 3, 3, 'end'),
    createNode('merge_point', 1.5, 2.5)
];
const l4_edges: GameEdge[] = [
    createEdge('t0', 't1'), createEdge('t1', 't2'), createEdge('t2', 't3'),
    createEdge('t3', 'r1_3'), createEdge('r1_3', 'r2_3'), createEdge('r2_3', 'b2'),
    createEdge('b2', 'b1'), createEdge('b1', 'b0'),
    createEdge('b0', 'r2_0'), createEdge('r2_0', 'r1_0'), createEdge('r1_0', 't0')
];
const l4_tiles: GameTile[] = [];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 5: 4 to 2                             */
/* -------------------------------------------------------------------------- */
const l5_nodes: GameNode[] = [
    createNode('t0', 0, 0, 'start'), createNode('t1', 1, 0, 'start'), createNode('t2', 2, 0, 'start'), createNode('t3', 3, 0, 'start'), createNode('t4', 4, 0, 'start'),
    createNode('r1_0', 0, 1), createNode('r1_1', 1, 1), createNode('r1_2', 2, 1), createNode('r1_3', 3, 1), createNode('r1_4', 4, 1),
    createNode('r2_0', 0, 2), createNode('r2_4', 4, 2),
    createNode('b0', 0, 3, 'end'), createNode('b1', 2, 3, 'end'), createNode('b2', 4, 3, 'end'),
    createNode('m1', 1, 2.5), createNode('m2', 3, 2.5)
];
const l5_edges: GameEdge[] = [
    createEdge('t0', 't1'), createEdge('t1', 't2'), createEdge('t2', 't3'), createEdge('t3', 't4'),
    createEdge('t4', 'r1_4'), createEdge('r1_4', 'r2_4'), createEdge('r2_4', 'b2'),
    createEdge('b2', 'b1'), createEdge('b1', 'b0'),
    createEdge('b0', 'r2_0'), createEdge('r2_0', 'r1_0'), createEdge('r1_0', 't0')
];
const l5_tiles: GameTile[] = [];

/* -------------------------------------------------------------------------- */
/*                                LEVEL 6: 5 to 3                             */
/* -------------------------------------------------------------------------- */
const l6_nodes: GameNode[] = [
    createNode('t0', 0, 0, 'start'), createNode('t1', 1, 0, 'start'), createNode('t2', 2, 0, 'start'), createNode('t3', 3, 0, 'start'), createNode('t4', 4, 0, 'start'), createNode('t5', 5, 0, 'start'),
    createNode('r1_0', 0, 1),
    createNode('r1_1', 1, 1), createNode('r1_2', 2, 1), createNode('r1_3', 3, 1), createNode('r1_4', 4, 1),
    createNode('r1_5', 5, 1),
    createNode('b0', 0, 3, 'end'), createNode('b1', 1.66, 3, 'end'), createNode('b2', 3.33, 3, 'end'), createNode('b3', 5, 3, 'end'),
    createNode('m_left', 1.33, 2.2), createNode('m_right', 3.66, 2.2)
];
const l6_edges: GameEdge[] = [
    createEdge('t0', 't1'), createEdge('t1', 't2'), createEdge('t2', 't3'), createEdge('t3', 't4'), createEdge('t4', 't5'),
    createEdge('t5', 'r1_5'), createEdge('r1_5', 'b3'),
    createEdge('b3', 'b2'), createEdge('b2', 'b1'), createEdge('b1', 'b0'),
    createEdge('b0', 'r1_0'), createEdge('r1_0', 't0')
];
const l6_tiles: GameTile[] = [];

// Re-export levels
export const levels: LevelData[] = [
    {
        id: '1-to-1',
        name: '1 to 1',
        description: 'Basic Strip',
        nodes: l1_nodes,
        edges: l1_edges,
        tiles: l1_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 5
    },
    {
        id: '2-to-1',
        name: '2 to 1',
        description: 'Merge two flows into one.',
        nodes: l2_nodes,
        edges: l2_edges,
        tiles: l2_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 0
    },
    {
        id: '3-to-1',
        name: '3 to 1',
        description: 'Merge three flows into one.',
        nodes: l3_nodes,
        edges: l3_edges,
        tiles: l3_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 0
    },
    {
        id: '3-to-2',
        name: '3 to 2',
        description: 'Reduce 3 columns to 2 columns.',
        nodes: l4_nodes,
        edges: l4_edges,
        tiles: l4_tiles,
        gridSize: { width: 500, height: 600 },
        targetFaces: 0
    },
    {
        id: '4-to-2',
        name: '4 to 2',
        description: 'Reduce 4 columns to 2 columns.',
        nodes: l5_nodes,
        edges: l5_edges,
        tiles: l5_tiles,
        gridSize: { width: 600, height: 600 },
        targetFaces: 0
    },
    {
        id: '5-to-3',
        name: '5 to 3',
        description: 'Reduce 5 columns to 3 columns.',
        nodes: l6_nodes,
        edges: l6_edges,
        tiles: l6_tiles,
        gridSize: { width: 650, height: 600 },
        targetFaces: 0
    }
];
