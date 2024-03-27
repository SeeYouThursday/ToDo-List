'use client';

// app/providers.tsx
import React from 'react'; // Add the missing import statement for React library
import { NextUIProvider } from '@nextui-org/react';
import { AuthContext } from './GlobalContext';
import { auth } from '../../config/firebaseConfig';
interface ProviderProps<T> {
  value: T;
  children: any; // Change the type of the children prop to 'any'
}

export default function Providers({ children }: ProviderProps<null>) {
  return (
    <AuthContext.Provider value={auth}>
      <NextUIProvider>{children}</NextUIProvider>
    </AuthContext.Provider>
  );
}
