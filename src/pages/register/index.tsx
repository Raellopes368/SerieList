/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { UseAuthContext } from '../../hooks/AuthContext';
import { checkFieldIsEmpty } from '../../utils/checkFieldIsEmpty';
import styles from './Register.module.scss';

export default function Register() {
  const { signInWithGoogle, registerWithEmail } = UseAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');

  async function register(e: FormEvent) {
    e.preventDefault();
    if (
      checkFieldIsEmpty(email) &&
      checkFieldIsEmpty(password) &&
      checkFieldIsEmpty(repeatedPass)
    ) {
      if (password === repeatedPass) {
        try {
          await registerWithEmail(email, password);
        }catch(err) {
          console.log(err);
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={register}>
        <h1 className={styles.title}>Serie List</h1>
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
        <input type="submit" value="Cadastrar" />
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
