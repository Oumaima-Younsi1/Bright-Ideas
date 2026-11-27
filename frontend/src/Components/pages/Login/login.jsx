import React, { useState } from 'react';
import styles from './login.module.css';
import Header from '../../Header/header';

function Login() {
  

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Récupérer les valeurs saisies
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Envoyer les informations au Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      );

      if (!response.ok) {
        const messageErreur = await response.text();

        throw new Error(
          messageErreur || 'Email ou mot de passe incorrect.'
        );
      }

      const data = await response.json();

      setSuccess('Connexion réussie !');

      console.log('Utilisateur connecté :', data);

    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Impossible de contacter le serveur Backend.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>

      <Header />

      <div className={styles.loginCard}>

        <h2>Login</h2>

        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            {error}
          </div>
        )}

        {success && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="/forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;