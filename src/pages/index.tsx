import Head from "next/head";

import styles from "../styles/pages/Home.module.scss";
import { FiGithub, FiLogIn } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { EXPIRATION_DATE } from "../constants/auth";
import { GetServerSideProps } from "next";
import { SESSION_USER } from "../constants/cookiesName";

export default function Home() {
  const { push } = useRouter();
  const [username, setUsername] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      push(`/${username}`);
      Cookies.set(SESSION_USER, username, {
        expires: EXPIRATION_DATE,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Be Healthy</title>
      </Head>
      <div className={styles.content}>
        <img src="logo.png" alt="Logo" />

        <div className={styles.hint}>
          <FiGithub size={36} />
          <span>Use your GitHub username to sign in</span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">
            <FiLogIn size={24} />
          </button>
        </form>
        <div className={styles.footer}>
          <span>By Christian Aurich</span>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { sessionUser } = req.cookies;
  if (sessionUser) {
    return {
      redirect: {
        destination: `${sessionUser}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
