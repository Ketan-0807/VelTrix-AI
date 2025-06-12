
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log("adsf",PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("");
}

createRoot(document.getElementById("root")!).render(
  <>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
    <style>
      {`
        .cl-footer{
          display: none !important;
        }
        `}
    </style>
  </> 
);
