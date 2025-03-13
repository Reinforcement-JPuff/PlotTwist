import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Get the root element
const container = document.getElementById('root');

if (!container) {
  throw new Error("Root element not found");
}

// Create a root
const root = createRoot(container);

root.render(<App />);