import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const authPromise = new Promise((resolve, reject) => {
  const auth = getAuth(app);
  resolve(auth);
});

export const auth = getAuth(app);

export { app };
export const googleProvider = new GoogleAuthProvider(); //24:38 of video

export const db = getFirestore(app);
