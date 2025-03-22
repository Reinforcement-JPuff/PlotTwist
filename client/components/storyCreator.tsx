import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1', content: 'This is a long-form string for Node 1.' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const StoryCreator = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editedLabel, setEditedLabel] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const createNode = useCallback((event: any) => {
    const newNode = {
      id: `${Date.now()}`,
      position: { x: event.clientX, y: event.clientY },
      data: { label: 'New Node', content: '' },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node.id);
    setEditedLabel(node.data.label);
    setEditedContent(node.data.content || '');
  }, []);

  const handleSave = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode
          ? { ...node, data: { ...node.data, label: editedLabel, content: editedContent } }
          : node
      )
    );
    setSelectedNode(null);
  }, [selectedNode, editedLabel, editedContent, setNodes]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDoubleClick={createNode}
        onNodeClick={onNodeClick}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      {selectedNode && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <div>
            <label>Label:</label>
            <input
              value={editedLabel}
              onChange={(e) => setEditedLabel(e.target.value)}
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelectedNode(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default StoryCreator;