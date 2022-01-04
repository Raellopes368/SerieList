/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import Loaging from 'react-loading';
import { UseAuthContext } from '../../hooks/AuthContext';
import { checkFieldIsEmpty } from '../../utils/checkFieldIsEmpty';
import styles from './Login.module.scss';

export default function Login() {
  const { signInWithEmail, signInWithGoogle } = UseAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (checkFieldIsEmpty(email) && checkFieldIsEmpty(password)) {
        await signInWithEmail(email, password);
      } else {
        setError('Informe todos os campos!');
      }
    } catch (err) {
      setError('Usuário ou senha incorretos!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={login}>
        <h1 className={styles.title}>Serie List</h1>
        {!!error && <span className={styles.error}>{error}</span>}
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {!loading ? (
            'Entrar'
          ) : (
            <div className={styles.loadingContainer}>
              <Loaging color="#fff" height="50%" width="50%" type="spin" />
            </div>
          )}
        </button>
        <span>
          Ainda não possui cadastro?{' '}
          <Link href="/register">
            <a>Cadastre-se</a>
          </Link>
        </span>

        <span>Ou</span>

        <button type="button" onClick={signInWithGoogle}>
          <img src="/images/googleIcon.svg" alt="Google Icon" /> Faça login com
          o Google
        </button>
      </form>
    </div>
  );
}
