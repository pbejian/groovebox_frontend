"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // mot de passe de test: Azerty5!
  const inputPasswordType = "text";

  async function createUser(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // 1. récupérer les valeurs du formulaire
    // déjà fait avec les useState

    // 2. la validation
    // TODO: à faire, reprendre le code de l'API

    try {
      // 3. appeler l'API
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          userName: name,
          email,
          password,
          confirmPassword
        }),
      });
      const resJSON = await res.json();
      console.log(resJSON);

      if (res.status === 201) {
        toast.success("Votre compte est créé.");
      } else {
        toast.warning(resJSON.message);
      }

      // 4. afficher le succès ou l'erreur
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message ?? "Une erreur s'est produite.");
      setLoading(false);
    }
  }

  // useEffect(function () {
  //   console.log(name);
  // }, [name]);

  // useEffect(function () {
  //   console.log(email);
  // }, [email]);

  // useEffect(() => {
  //   console.log(password);
  // }, [password]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form onSubmit={createUser} noValidate={true}>
          {/* TODO: mettre en place les bon minLength & maxLength par rapport à l'API */}
          <div>
            <label htmlFor="name">Name :</label>
            <input
              id="name"
              name="name"
              type="text"
              minLength="10"
              maxLength="40"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              name="email"
              type="email"
              minLength="10"
              maxLength="40"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password :</label>
            <input
              id="password"
              name="password"
              type={inputPasswordType}
              minLength="10"
              maxLength="40"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm password :</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={inputPasswordType}
              minLength="10"
              maxLength="40"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">{loading ? "En création..." : "Créer un compte"}</button>
        </form>
      </main>
    </div>
  );
}
