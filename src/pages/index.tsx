import { Profile } from "../components/Profile";

import styles from "../styles/pages/Home.module.scss";

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <Profile />
    </main>
  );
}
