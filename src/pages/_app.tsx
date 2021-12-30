import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/AuthContext';
import '../../styles/globals.scss'
import '../services/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp
