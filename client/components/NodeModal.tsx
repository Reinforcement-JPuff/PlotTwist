import React from "react";

import { useState } from 'react';

const NodeModal = ({ node, onSave, onClose }) => {
  const [title, setTitle] = useState(node.data.title);
  const [content, setContent] = useState(node.data.content);

  const handleSave = () => {
    onSave({ ...node, data: { title, content } });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <h3>Edit Node</h3>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NodeModal