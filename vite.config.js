import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxies to the Node/Express backend (ew-scheduler-backend), NOT the ML
// team's FastAPI service directly. The Node backend owns the session
// abstraction, WebSocket relay, and history persistence - the frontend
// should never talk to the ML API's port (8000) itself.
const BACKEND_TARGET = process.env.VITE_BACKEND_URL || 'http://localhost:4000';
const BACKEND_WS_TARGET = BACKEND_TARGET.replace(/^http/, 'ws');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': BACKEND_TARGET,
      '/sessions': BACKEND_TARGET,
      '/health': BACKEND_TARGET,
      '/ws': {
        target: BACKEND_WS_TARGET,
        ws: true,
      },
    },
  },
});
