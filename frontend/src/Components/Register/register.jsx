


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './register.module.css';

function Register() {

    const [name, setName] = useState("");
    const [alias, setAlias] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [erreur, setErreur] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Effacer l'erreur d'un champ
    function effacerErreur(champ) {
        setErreur((prev) => {
            const nouvelleErreur = { ...prev };
            delete nouvelleErreur[champ];
            return nouvelleErreur;
        });
    }

    // Validation du formulaire
    function validerFormulaire() {

        let erreursTemp = {};

        if (name.trim() === "") {
            erreursTemp.name = "Le nom est requis";
        }

        if (alias.trim() === "") {
            erreursTemp.alias = "L'alias est requis";
        }

        if (email.trim() === "") {
            erreursTemp.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            erreursTemp.email = "L'email est invalide";
        }

        if (password.trim() === "") {
            erreursTemp.password = "Le mot de passe est requis";
        } else if (password.length < 8) {
            erreursTemp.password =
                "Le mot de passe doit contenir au moins 8 caractères";
        }

        if (confirmPassword === "") {
            erreursTemp.confirmPassword =
                "Veuillez confirmer votre mot de passe";
        } else if (password !== confirmPassword) {
            erreursTemp.confirmPassword =
                "Les mots de passe ne correspondent pas";
        }

        setErreur(erreursTemp);

        return Object.keys(erreursTemp).length === 0;
    }

    // Envoyer les données au Backend
    async function handleSubmit(e) {

        e.preventDefault();
        setSuccess("");

        if (!validerFormulaire()) {
            return;
        }

        setLoading(true);

        try {

            const userData = {
                name: name.trim(),
                alias: alias.trim(),
                email: email.trim(),
                password: password
            };

            const response = await fetch(
                'http://localhost:8080/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                }
            );

            const data = await response.text();

            if (!response.ok) {
                throw new Error(
                    data || "Erreur lors de la création du compte"
                );
            }

            setName("");
            setAlias("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setErreur({});
            setSuccess(data || "Votre compte a été créé avec succès !");

        } catch (err) {

            setErreur({
                serveur: err.message === "Failed to fetch"
                    ? "Impossible de contacter le serveur Backend."
                    : err.message
            });

        } finally {
            setLoading(false);
        }
    }

    // Effacer tous les champs
    function handleReset() {

        setName("");
        setAlias("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setErreur({});
        setSuccess("");
    }

    return (

        <section className={styles.registerContainer}>

            <h2>Créer un compte</h2>

            {/* Message de succès */}
            {success && (
                <p className={styles.successMessage}>
                    {success}
                </p>
            )}

            {/* Erreur du serveur */}
            {erreur.serveur && (
                <p className={styles.errorMessage}>
                    {erreur.serveur}
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate>

                {/* Nom complet */}
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nom complet :</label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        className={erreur.name ? styles.inputError : ""}
                        onChange={(e) => {
                            setName(e.target.value);
                            effacerErreur("name");
                        }}
                        placeholder="Entrez votre nom complet"
                    />

                    {erreur.name && (
                        <span className={styles.errorMessage}>
                            {erreur.name}
                        </span>
                    )}
                </div>

                {/* Alias */}
                <div className={styles.formGroup}>
                    <label htmlFor="alias">Alias :</label>

                    <input
                        id="alias"
                        type="text"
                        value={alias}
                        className={erreur.alias ? styles.inputError : ""}
                        onChange={(e) => {
                            setAlias(e.target.value);
                            effacerErreur("alias");
                        }}
                        placeholder="Choisissez un pseudonyme"
                    />

                    {erreur.alias && (
                        <span className={styles.errorMessage}>
                            {erreur.alias}
                        </span>
                    )}
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email :</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        className={erreur.email ? styles.inputError : ""}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            effacerErreur("email");
                        }}
                        placeholder="exemple@email.com"
                    />

                    {erreur.email && (
                        <span className={styles.errorMessage}>
                            {erreur.email}
                        </span>
                    )}
                </div>

                {/* Mot de passe */}
                <div className={styles.formGroup}>
                    <label htmlFor="password">Mot de passe :</label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        className={erreur.password ? styles.inputError : ""}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            effacerErreur("password");
                        }}
                        placeholder="8 caractères minimum"
                    />

                    {erreur.password && (
                        <span className={styles.errorMessage}>
                            {erreur.password}
                        </span>
                    )}
                </div>

                {/* Confirmation du mot de passe */}
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">
                        Confirmer le mot de passe :
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        className={
                            erreur.confirmPassword
                                ? styles.inputError : ""
                        }
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            effacerErreur("confirmPassword");
                        }}
                        placeholder="Confirmez votre mot de passe"
                    />

                    {erreur.confirmPassword && (
                        <span className={styles.errorMessage}>
                            {erreur.confirmPassword}
                        </span>
                    )}
                </div>

                {/* Boutons */}
                <div className={styles.buttonGroup}>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading
                            ? "Création en cours..."
                            : "Créer mon compte"}
                    </button>

                    <button
                        type="button"
                        className={styles.resetBtn}
                        onClick={handleReset}
                        disabled={loading}
                    >
                        Effacer
                    </button>

                </div>

            </form>

            {/* Lien vers Login */}
            <p className={styles.loginLink}>
                Vous avez déjà un compte ?
                <Link to="/">
                    Se connecter
                </Link>
            </p>

        </section>
    );
}

export default Register;
