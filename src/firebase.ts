import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAkr4gIyZoEbhDZcpOcPmfCDFhnjabKpAs',
  authDomain: 'vyapar-management-app.firebaseapp.com',
  projectId: 'vyapar-management-app',
  storageBucket: 'vyapar-management-app.firebasestorage.app',
  messagingSenderId: '89080219494',
  appId: '1:89080219494:web:f4d2db2a4961fd3b6e6aa7',
  measurementId: 'G-24EP4K31N3',
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
