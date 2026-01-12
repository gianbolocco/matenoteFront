import { Note, MindMapData } from "@/types";
import { Node, Edge, Position } from "reactflow";
import dagre from 'dagre';

// --- Configuration & Styles ---

const DAGRE_CONFIG = {
    rankdir: 'LR',
    nodesep: 50,
    ranksep: 300
};

const NODE_DIMENSIONS: Record<string, { width: number; height: number }> = {
    root: { width: 170, height: 60 },
    concept: { width: 150, height: 50 },
    formula: { width: 180, height: 50 },
    detail: { width: 140, height: 40 },
    example: { width: 150, height: 50 },
    default: { width: 150, height: 50 }
};

const NODE_STYLES: Record<string, React.CSSProperties> = {
    base: {
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '13px',
        color: '#334155',
        boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
    },
    root: {
        background: '#ffffff',
        border: '2px solid #7c3aed',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#1e293b',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
    concept: {
        background: '#eff6ff',
        borderColor: '#bfdbfe',
        color: '#1e40af',
        fontWeight: 600
    },
    formula: {
        fontFamily: 'monospace',
        background: '#f0fdf4',
        borderColor: '#86efac',
        color: '#15803d'
    },
    detail: {
        background: '#f8fafc',
        fontSize: '12px',
        color: '#64748b'
    },
    example: {
        background: '#fff7ed',
        borderColor: '#fed7aa',
        color: '#c2410c'
    }
};

// --- Helpers ---

const getNodeSize = (type: string) => {
    return NODE_DIMENSIONS[type] || NODE_DIMENSIONS['default'];
};

const getNodeStyle = (type: string, width: number): React.CSSProperties => {
    const baseStyle = { ...NODE_STYLES.base, width };
    const specificStyle = NODE_STYLES[type] || {};
    return { ...baseStyle, ...specificStyle };
};

// --- Main Generators ---

export const generateMindMapData = (note: Note) => {
    if (note.mindmap) {
        return generateFromJSON(note.mindmap);
    }
    // Fallback logic could be refined or removed if unused, keeping it simple for now
    return generateFallbackLayout(note);
};


const generateFromJSON = (data: MindMapData) => {
    const { nodes: rawNodes } = data;

    // 1. Initialize Dagre Graph
    const g = new dagre.graphlib.Graph();
    g.setGraph(DAGRE_CONFIG);
    g.setDefaultEdgeLabel(() => ({}));

    // 2. Add Nodes to Graph
    rawNodes.forEach(node => {
        const { width, height } = getNodeSize(node.type);
        g.setNode(node.id, { label: node.label, width, height });

        if (node.parentId) {
            g.setEdge(node.parentId, node.id);
        }
    });

    // 3. Compute Layout
    dagre.layout(g);

    // 4. Map to React Flow Nodes/Edges
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    rawNodes.forEach((nodeItem) => {
        const dagreNode = g.node(nodeItem.id);

        // Dagre uses center coordinates; React Flow needs top-left (or handled via styles)
        // With basic nodes, it's often safer to stick to center if using handles properly, 
        // but explicit positions work best.
        const x = dagreNode.x - (dagreNode.width / 2);
        const y = dagreNode.y - (dagreNode.height / 2);

        nodes.push({
            id: nodeItem.id,
            type: nodeItem.type === 'root' ? 'input' : 'default',
            data: { label: nodeItem.label },
            position: { x, y },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            style: getNodeStyle(nodeItem.type, dagreNode.width)
        });

        if (nodeItem.parentId) {
            edges.push({
                id: `e-${nodeItem.parentId}-${nodeItem.id}`,
                source: nodeItem.parentId,
                target: nodeItem.id,
                style: { stroke: '#cbd5e1', strokeWidth: 1.5 },
                type: 'bezier'
            });
        }
    });

    return { nodes, edges };
};

// Simplified Fallback
const generateFallbackLayout = (note: Note) => {
    const rootId = 'root';
    const flatNodes: any[] = [];

    flatNodes.push({ id: rootId, label: note.title, type: 'root' });

    if (note.units) {
        note.units.forEach((unit, i) => {
            const uId = `unit-${i}`;
            flatNodes.push({ id: uId, label: unit.title, type: 'concept', parentId: rootId });
        });
    }

    return generateFromJSON({ rootId, nodes: flatNodes });
};
