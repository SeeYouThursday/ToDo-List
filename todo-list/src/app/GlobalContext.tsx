'use client';

import { createContext } from 'react';
import { auth } from '../../config/firebaseConfig';

export const AuthContext = createContext(auth);
