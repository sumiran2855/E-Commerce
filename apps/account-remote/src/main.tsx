import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProfileWidget } from './components/ProfileWidget';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="mx-auto max-w-md p-6">
      <ProfileWidget />
    </div>
  </StrictMode>,
);
