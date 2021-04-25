import { useSession } from "next-auth/client";
import { useChallenges } from "../hooks/useChallenges";

import styles from "../styles/components/Profile.module.scss";

export function Profile() {
  const [session] = useSession();
  const { userLevel } = useChallenges();

  return (
    <div className={styles.profileContainer}>
      <img src={session?.user.image} alt={session?.user.name} />
      <div>
        <strong>{session?.user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {userLevel}
        </p>
      </div>
    </div>
  );
}
