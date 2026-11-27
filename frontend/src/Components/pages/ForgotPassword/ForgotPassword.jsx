
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './forgotpassword.module.css';

function ForgotPassword() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // STEP 1 : Envoyer le code de vérification
    const handleSendCode = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');

        if (!email.trim()) {
            setError('Veuillez saisir votre adresse e-mail.');
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                'http://localhost:8080/api/auth/forgot-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.trim()
                    })
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Impossible d'envoyer le code de vérification.");
            }

            setSuccess('Le code de vérification a été envoyé avec succès !');
            setStep(2);

        } catch (err) {

            setError(
                err.message === 'Failed to fetch'
                    ? "Le serveur backend n'est pas démarré."
                    : err.message
            );

        } finally {
            setLoading(false);
        }
    };

    // STEP 2 : Vérifier le code
    const handleVerifyCode = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');

        if (code.length !== 6) {
            setError('Veuillez saisir le code de vérification à 6 chiffres.');
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                'http://localhost:8080/api/auth/verify-code',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        code: code
                    })
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || 'Code de vérification incorrect ou expiré.');
            }

            setSuccess('Votre adresse e-mail a été vérifiée avec succès !');
            setStep(3);

        } catch (err) {

            setError(
                err.message === 'Failed to fetch'
                    ? "Le serveur backend n'est pas démarré."
                    : err.message
            );

        } finally {
            setLoading(false);
        }
    };

    // STEP 3 : Réinitialiser le mot de passe
    const handleResetPassword = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');

        if (newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas !');
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                'http://localhost:8080/api/auth/reset-password',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        code: code,
                        newPassword: newPassword
                    })
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || 'Impossible de réinitialiser le mot de passe.');
            }

            setSuccess('Votre mot de passe a été modifié avec succès !');

            // Retourner vers Login après 2 secondes
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {

            setError(
                err.message === 'Failed to fetch'
                    ? "Le serveur backend n'est pas démarré."
                    : err.message
            );

        } finally {
            setLoading(false);
        }
    };

    // Retour à l'étape précédente
    const handleChangeEmail = () => {
        setStep(1);
        setCode('');
        setError('');
        setSuccess('');
    };

    return (

        <div className={styles.page}>

            {/* HEADER */}
            <div className={styles.header}>
                <h1>Bright Ideas</h1>
                <p>Innover. Connecter. Créer.</p>
            </div>

            {/* MAIN CARD */}
            <div className={styles.card}>

                <div className={styles.icon}>
                    🔐
                </div>

                {/* PROGRESS STEPS */}
                <div className={styles.progress}>

                    <div className={`${styles.circle} ${step >= 1 ? styles.active : ''}`}>
                        1
                    </div>

                    <div className={`${styles.line} ${step >= 2 ? styles.activeLine : ''}`}></div>

                    <div className={`${styles.circle} ${step >= 2 ? styles.active : ''}`}>
                        2
                    </div>

                    <div className={`${styles.line} ${step >= 3 ? styles.activeLine : ''}`}></div>

                    <div className={`${styles.circle} ${step >= 3 ? styles.active : ''}`}>
                        3
                    </div>

                </div>

                {/* STEP 1 : EMAIL */}
                {step === 1 && (

                    <div className={styles.content}>

                        <h2>Mot de passe oublié ?</h2>

                        <p>
                            Saisissez votre adresse e-mail et nous vous
                            enverrons un code de vérification.
                        </p>

                        <form onSubmit={handleSendCode}>

                            <label htmlFor="email">Adresse e-mail</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Saisissez votre adresse e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? 'Envoi en cours...' : 'Envoyer le code de vérification'}
                            </button>

                        </form>

                    </div>
                )}

                {/* STEP 2 : VERIFY CODE */}
                {step === 2 && (

                    <div className={styles.content}>

                        <h2>Vérification de votre compte</h2>

                        <p>
                            Nous avons envoyé un code de vérification à :
                        </p>

                        <strong className={styles.email}>
                            {email}
                        </strong>

                        <form onSubmit={handleVerifyCode}>

                            <label htmlFor="code">Code de vérification</label>

                            <input
                                id="code"
                                type="text"
                                placeholder="Saisissez le code à 6 chiffres"
                                value={code}
                                onChange={(e) => {
                                    setCode(
                                        e.target.value
                                            .replace(/\D/g, '')
                                            .slice(0, 6)
                                    );
                                }}
                                maxLength={6}
                                inputMode="numeric"
                                pattern="[0-9]{6}"
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading || code.length !== 6}
                            >
                                {loading ? 'Vérification en cours...' : 'Vérifier le code'}
                            </button>

                        </form>

                        <button
                            type="button"
                            className={styles.secondary}
                            onClick={handleChangeEmail}
                        >
                            Modifier l'adresse e-mail
                        </button>

                    </div>
                )}

                {/* STEP 3 : NEW PASSWORD */}
                {step === 3 && (

                    <div className={styles.content}>

                        <h2>Créer un nouveau mot de passe</h2>

                        <p>
                            Votre compte a été vérifié !
                            Saisissez votre nouveau mot de passe ci-dessous.
                        </p>

                        <form onSubmit={handleResetPassword}>

                            <label htmlFor="newPassword">Nouveau mot de passe</label>

                            <input
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Saisissez votre nouveau mot de passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength={8}
                                required
                            />

                            <label htmlFor="confirmPassword">
                                Confirmer le nouveau mot de passe
                            </label>

                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirmez votre nouveau mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <label className={styles.showPassword}>
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                />
                                Afficher le mot de passe
                            </label>

                            <button type="submit" disabled={loading}>
                                {loading ? 'Modification en cours...' : 'Réinitialiser le mot de passe'}
                            </button>

                        </form>

                    </div>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {/* SUCCESS MESSAGE */}
                {success && (
                    <div className={styles.success}>
                        {success}
                    </div>
                )}

                {/* BACK TO LOGIN */}
                <div className={styles.back}>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                    >
                        ← Retour à la connexion
                    </button>
                </div>

            </div>

            {/* FOOTER */}
            <footer className={styles.footer}>
                © 2026 Bright Ideas. Tous droits réservés.
            </footer>

        </div>
    );
}

export default ForgotPassword;
