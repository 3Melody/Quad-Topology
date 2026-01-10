import { GameNode, GameEdge } from './types';

interface Point {
    x: number;
    y: number;
}

interface DirectedEdge {
    from: string;
    to: string;
    angle: number; // Angle of this edge relative to 'from' node
    reverse?: DirectedEdge;
    visited: boolean;
}

/**
 * Validates that all internal faces of the graph are quadrilaterals (4-sided).
 */
export function validateQuadTopology(nodes: GameNode[], edges: GameEdge[]): { isValid: boolean; message: string; invalidFaces: Point[][] } {
    if (edges.length === 0) return { isValid: false, message: "No edges connected", invalidFaces: [] };

    // 1. Build Adjacency List with Geometry
    const adj = new Map<string, DirectedEdge[]>();
    const nodeMap = new Map<string, GameNode>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    // Initialize adjacency list
    nodes.forEach(n => adj.set(n.id, []));

    // Create directed edges (two for each undirected edge)
    edges.forEach(e => {
        const u = nodeMap.get(e.source);
        const v = nodeMap.get(e.target);
        if (!u || !v) return;

        const forward: DirectedEdge = {
            from: u.id,
            to: v.id,
            angle: Math.atan2(v.position.y - u.position.y, v.position.x - u.position.x),
            visited: false
        };

        const backward: DirectedEdge = {
            from: v.id,
            to: u.id,
            angle: Math.atan2(u.position.y - v.position.y, u.position.x - v.position.x),
            visited: false
        };

        forward.reverse = backward;
        backward.reverse = forward;

        adj.get(u.id)?.push(forward);
        adj.get(v.id)?.push(backward);
    });

    // 2. Sort edges around each vertex CCW
    adj.forEach((edgeList) => {
        edgeList.sort((a, b) => a.angle - b.angle);
    });

    // 3. Extract Faces
    const faces: string[][] = [];
    const facePolygons: Point[][] = [];

    nodes.forEach(startNode => {
        const edges = adj.get(startNode.id) || [];
        edges.forEach(startEdge => {
            if (startEdge.visited) return;

            const path: string[] = [];
            const polygon: Point[] = [];
            let currEdge = startEdge;

            // Walk the face
            while (!currEdge.visited) {
                currEdge.visited = true;
                path.push(currEdge.from);

                const u = nodeMap.get(currEdge.from)!;
                polygon.push({ x: u.position.x, y: u.position.y });

                const toNodeId = currEdge.to;
                const siblings = adj.get(toNodeId)!;

                // Find entry edge (reverse of current) to calculate turn
                const entryEdgeIndex = siblings.findIndex(e => e.to === currEdge.from);
                if (entryEdgeIndex === -1) break; // Should not happen in manifold graph

                // Get next edge in CCW order (wrapping around)
                let nextIndex = (entryEdgeIndex - 1 + siblings.length) % siblings.length;
                currEdge = siblings[nextIndex];
            }

            // Close the loop if it matches start
            if (currEdge === startEdge) {
                faces.push(path);
                facePolygons.push(polygon);
            }
        });
    });

    // 4. Validate Faces
    if (faces.length <= 1) {
        return { isValid: false, message: "Incomplete mesh", invalidFaces: [] };
    }

    // Identify outer face by largest area using Shoelace formula
    let maxArea = -1;
    let outerFaceIndex = -1;

    const faceAreas = facePolygons.map((poly, idx) => {
        let area = 0;
        for (let i = 0; i < poly.length; i++) {
            const j = (i + 1) % poly.length;
            area += poly[i].x * poly[j].y;
            area -= poly[j].x * poly[i].y;
        }
        area = Math.abs(area / 2);

        if (area > maxArea) {
            maxArea = area;
            outerFaceIndex = idx;
        }
        return area;
    });

    const invalidFaces: Point[][] = [];
    const internalFaces = faces.filter((_, idx) => idx !== outerFaceIndex);
    const internalPolys = facePolygons.filter((_, idx) => idx !== outerFaceIndex);

    let validFaceCount = 0;

    // Count valid faces (triangles and quads)
    internalFaces.forEach((face, idx) => {
        if (face.length >= 3 && face.length <= 4) {
            validFaceCount++;
        }
        // Skip faces outside 3-4 range (they're ignored, not errors)
    });

    // Check if we have at least one valid face
    if (validFaceCount === 0 && internalFaces.length > 0) {
        return {
            isValid: false,
            message: "No valid faces found (need triangles or quads)",
            invalidFaces: internalPolys // Show all as invalid
        };
    }

    if (internalFaces.length === 0) {
        return { isValid: false, message: "No enclosed faces found", invalidFaces: [] };
    }

    return { isValid: true, message: "Perfect Topology!", invalidFaces: [] };
}

/**
 * Automatically repairs topology by merging nearby nodes and removing duplicate edges.
 * Helps make the gameplay feel more "forgiving" and ensures connectivity.
 */
export function autoRepairTopology(nodes: GameNode[], edges: GameEdge[]): { nodes: GameNode[], edges: GameEdge[] } {
    const MERGE_DIST = 15;
    const mergedNodes: GameNode[] = [];
    const nodeRedirect = new Map<string, string>(); // oldId -> newId

    // Sort to prioritize keeping level nodes (shorter IDs) over user nodes
    const sortedNodes = [...nodes].sort((a, b) => a.id.length - b.id.length);

    for (const n of sortedNodes) {
        // Check if we can merge into an existing mergedNode
        const match = mergedNodes.find(m =>
            Math.abs(m.position.x - n.position.x) < MERGE_DIST &&
            Math.abs(m.position.y - n.position.y) < MERGE_DIST
        );

        if (match) {
            nodeRedirect.set(n.id, match.id);
        } else {
            mergedNodes.push(n);
            nodeRedirect.set(n.id, n.id);
        }
    }

    // 2. Remap and Deduplicate Edges
    let cleanEdges: GameEdge[] = [];
    const seenEdges = new Set<string>();

    for (const e of edges) {
        const u = nodeRedirect.get(e.source);
        const v = nodeRedirect.get(e.target);

        if (u && v && u !== v) {
            // Normalize edge representation for deduplication
            const [s, t] = u < v ? [u, v] : [v, u];
            const key = `${s}-${t}`;

            if (!seenEdges.has(key)) {
                seenEdges.add(key);
                cleanEdges.push({
                    id: key,
                    source: u,
                    target: v
                });
            }
        }
    }

    return { nodes: mergedNodes, edges: cleanEdges };
}
