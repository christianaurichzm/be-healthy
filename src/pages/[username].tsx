import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { Profile } from "../components/Profile";
import { ExperienceBar } from "../components/ExperienceBar";
import Cookies from "js-cookie";

import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/ChallengePage.module.scss";
import { GetServerSideProps } from "next";
import { SESSION_USER } from "../constants/cookiesName";

interface User {
  name: string;
  avatar_url: string;
}

export interface ChallengePageProps {
  userLevel: number;
  currentExperience: number;
  challengesCompleted: number;
  user: User;
}

export default function ChallengePage({
  userLevel,
  currentExperience,
  challengesCompleted,
  user,
}: ChallengePageProps) {
  const { reload } = useRouter();

  const logout = () => {
    Cookies.remove(SESSION_USER);
    reload();
  };

  return (
    <ChallengesProvider
      userLevel={userLevel}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
      user={user}
    >
      <CountdownProvider>
        <div className={styles.challangePageContainer}>
          <Head>
            <title>{user.name} | Be Healthy</title>
          </Head>

          <ExperienceBar />

          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <ChallengeBox />
          </section>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const {
    userLevel,
    currentExperience,
    challengesCompleted,
    sessionUser,
  } = req.cookies;
  const { username } = params;

  if (!sessionUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await (
    await fetch(`https://api.github.com/users/${username}`)
  ).json();

  return {
    props: {
      userLevel: userLevel ? Number(userLevel) : 1,
      currentExperience: currentExperience ? Number(currentExperience) : 0,
      challengesCompleted: challengesCompleted
        ? Number(challengesCompleted)
        : 0,
      user,
    },
  };
};
