import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import type {PageId} from './content';
import './index.css';

// Each HTML file names its page on <body data-page>.
const page = (document.body.dataset.page ?? 'home') as PageId;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
);
