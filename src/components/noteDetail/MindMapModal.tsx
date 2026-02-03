import { useEffect, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    ControlButton
} from 'reactflow';
import 'reactflow/dist/style.css';
import { X, Maximize2, Minimize2, Download } from 'lucide-react';
import { Note } from '@/types';
import { generateMindMapData } from '@/utils/mindmapUtils';
import { span } from 'framer-motion/client';

interface MindMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: Note;
}

export function MindMapModal({ isOpen, onClose, note }: MindMapModalProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (isOpen && note) {
            const { nodes: newNodes, edges: newEdges } = generateMindMapData(note);
            setNodes(newNodes);
            setEdges(newEdges);
        }
    }, [isOpen, note, setNodes, setEdges]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
            <div className="bg-white w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                    <span className="text-lg font-semibold text-gray-800">Mapa Mental</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Flow Canvas */}
                <div className="flex-1 w-full h-full bg-gray-50 text-black">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        fitView
                        className="bg-gray-50"
                        attributionPosition="bottom-right"
                    >
                        <Background color="#e2e8f0" gap={16} size={1} />
                        <Controls showInteractive={false} className="bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden" />
                        <MiniMap
                            nodeStrokeColor="#cbd5e1"
                            nodeColor="#f1f5f9"
                            maskColor="rgba(240, 240, 240, 0.6)"
                            style={{
                                backgroundColor: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                margin: '0 0 10px 10px'
                            }}
                        />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}
