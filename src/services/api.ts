import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';
export const socket = io(SOCKET_URL, { path: '/socket.io' });

const API_URL = import.meta.env.VITE_API_URL || '';

export async function fetchCommandCentre() {
  const res = await fetch(`${API_URL}/api/command-centre/overview`);
  if (!res.ok) throw new Error('Failed to fetch command centre data');
  return res.json();
}

export async function simulateOutage(cameraId: string) {
  const res = await fetch('/api/demo/simulate-outage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cameraId })
  });
  return res.json();
}

export async function restoreCamera(cameraId: string) {
  const res = await fetch('/api/demo/restore-camera', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cameraId })
  });
  return res.json();
}
