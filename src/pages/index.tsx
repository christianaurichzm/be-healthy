import Head from "next/head";

import styles from "../styles/pages/Home.module.scss";
import { FiGithub } from "react-icons/fi";
import React from "react";
import { signIn, getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import { CHALLENGES_PAGE } from "../constants/routers";

export default function Home() {
  const handleSignin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    signIn("github", {
      callbackUrl: `${window.location.origin}${CHALLENGES_PAGE}`,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Be Healthy</title>
      </Head>
      <div className={styles.content}>
        <img src="logo.png" alt="Logo" />

        <button onClick={handleSignin}>
          <FiGithub className={styles.icon} size={36} />
          <span>Use your GitHub account to sign in</span>
        </button>

        <div className={styles.footer}>
          <span>By Christian Aurich</span>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: CHALLENGES_PAGE,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
