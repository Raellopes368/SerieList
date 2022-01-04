/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import Loaging from 'react-loading';
import { UseAuthContext } from '../../hooks/AuthContext';
import { checkFieldIsEmpty } from '../../utils/checkFieldIsEmpty';
import styles from './Register.module.scss';

export default function Register() {
  const { signInWithGoogle, registerWithEmail } = UseAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function register(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (
      checkFieldIsEmpty(email) &&
      checkFieldIsEmpty(password) &&
      checkFieldIsEmpty(repeatedPass)
    ) {
      if (password === repeatedPass) {
        setLoading(true);
        try {
          await registerWithEmail(email, password);
        } catch (err) {
          setError('Houve algum erro, tente novamente!');
        } finally {
          setLoading(false);
        }
      } else {
        setError('As senhas não coincidem!');
      }
    } else setError('Informe todos os campos!');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={register}>
        <h1 className={styles.title}>Serie List</h1>
        {!!error && <span className={styles.error}>{error}</span>}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repita sua senha"
          value={repeatedPass}
          onChange={(e) => setRepeatedPass(e.target.value)}
        />
        <button
          type="submit"
          className={styles.registerButton}
          disabled={loading}
        >
          {!loading ? (
            'Cadastrar'
          ) : (
            <div className={styles.loadingContainer}>
              <Loaging color="#fff" height="50%" width="50%" type="spin" />
            </div>
          )}
        </button>
        <span>
          Já tenho conta{' '}
          <Link href="/login">
            <a>fazer login</a>
          </Link>
        </span>
        <button type="button" onClick={signInWithGoogle}>
          <img src="/images/googleIcon.svg" alt="Google Icon" /> Registrar com o
          Google
        </button>
      </form>
    </div>
  );
}
