import React, { useCallback, useState } from 'react';
import { useSaveStoryMutation } from '../features/apiSlice';

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
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Beginning', content: 'This is a long-form string for Node 1.' } },
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

  const handleSaveEdit = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode
          ? { ...node, data: { ...node.data, label: editedLabel, content: editedContent } }
          : node
      )
    );
    setSelectedNode(null); // Close the edit form
  }, [selectedNode, editedLabel, editedContent, setNodes]);
    
  const [saveStory] = useSaveStoryMutation();
  
  const handleSaveStory = async () => {
    const storyData = {
      nodes: nodes.map(node => ({
        node_id: node.id,
        position_x: node.position.x,
        position_y: node.position.y,
        data: node.data,
      })),
      edges: edges.map(edge => ({
        source_id: edge.source,
        target_id: edge.target,
      })),
    };

    try {
      const response = await fetch('/storyCreator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) {
        throw new Error('Failed to save story');
      }

      const result = await response.json();
      console.log('Story saved successfully:', result);
      alert('Story saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    }
  };

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

      {/* Edit Form */}
      {selectedNode && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', zIndex: 1000 }}>
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
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setSelectedNode(null)}>Cancel</button>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSaveStory}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Save Story
      </button>
    </div>
  );
};

export default StoryCreator;