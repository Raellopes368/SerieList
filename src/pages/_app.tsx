import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../hooks/AuthContext';
import { SerieListProvider } from '../hooks/SerieListContext';
import '../../styles/globals.scss';
import '../services/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SerieListProvider>
        <Component {...pageProps} />
      </SerieListProvider>
    </AuthProvider>
  );
}

export default MyApp;
