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

    // Identify outer face by largest area
    let maxArea = -1;
    let outerFaceIndex = -1;

    // Use Shoelace formula
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

    let allQuads = true;
    let badFaceCount = 0;

    internalFaces.forEach((face, idx) => {
        if (face.length !== 4) {
            allQuads = false;
            badFaceCount++;
            invalidFaces.push(internalPolys[idx]);
        }
    });

    if (badFaceCount > 0) {
        return {
            isValid: false,
            message: `Found ${badFaceCount} non-quad face${badFaceCount > 1 ? 's' : ''}`,
            invalidFaces
        };
    }

    // Ensure we have at least one internal face to call it a success?
    if (internalFaces.length === 0) {
        return { isValid: false, message: "No enclosed faces found", invalidFaces: [] };
    }

    return { isValid: true, message: "Perfect Topology!", invalidFaces: [] };
}
