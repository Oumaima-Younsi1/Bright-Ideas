

import React, { useState } from 'react';
import './Login.css';

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

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

      // La redirection sera ajoutée selon
      // l'organisation des routes de Bright Ideas.

    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Serveur backend non démarré (port 8080).'
          : err.message
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="brand-header">
        <h1>Bright Ideas</h1>
        <p>Innovate. Connect. Create</p>
      </div>

      <div className="login-card">

        <h2>Login</h2>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="forgot-password">
            <a href="/forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
export default  Login;