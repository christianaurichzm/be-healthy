import Head from "next/head";

import { Profile } from "../components/Profile";
import { ExperienceBar } from "../components/ExperienceBar";

import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <Head>
        <title>Be Healthy | Home</title>
      </Head>
      <ExperienceBar />
      <Profile />
    </main>
  );
}
