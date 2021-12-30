/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import { setCookie, destroyCookie, parseCookies } from 'nookies';

type UserInfo = {
  id: string;
  name: string | null;
};

type AuthContextData = {
  user: UserInfo | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  registerWithEmail: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const cookieName = 'serielist@token';

function setToken(token: string) {
  setCookie(undefined, cookieName, token, {
    maxAge: 60 * 60 * 1, // 1 hour
  });
}

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const auth = getAuth();

  useEffect(() => {
    const { [cookieName]: token } = parseCookies();
    if (token) {
      onAuthStateChanged(auth, (userConnected) => {
        if (userConnected) {
          setUser({
            name: userConnected.displayName || userConnected.email,
            id: userConnected.uid,
          });
        }
      });
    } else {
      setUser(null);
    }
  }, []);

  async function signInWithEmail(email: string, password: string) {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const token = await data.user.getIdToken();
    setToken(token);
    setUser({
      id: data.user.uid,
      name: data.user.displayName,
    });

    router.push('/');
  }

  async function signInWithGoogle() {
    const data = await signInWithPopup(auth, provider);
    const token = await data.user.getIdToken();
    setToken(token);

    setUser({
      id: data.user.uid,
      name: data.user.displayName || data.user.email,
    });
    router.push('/');
  }

  function signOut() {
    destroyCookie(undefined, cookieName);
  }

  async function registerWithEmail(email: string, password: string) {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    const token = await data.user.getIdToken();
    setToken(token);
    setUser({
      id: data.user.uid,
      name: data.user.displayName,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmail,
        signInWithGoogle,
        signOut,
        registerWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function UseAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, UseAuthContext };
