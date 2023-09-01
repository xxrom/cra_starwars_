import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ErrorBoundary } from './components';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong:</p>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
