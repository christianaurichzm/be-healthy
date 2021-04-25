import Head from "next/head";

import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { Profile } from "../components/Profile";
import { ExperienceBar } from "../components/ExperienceBar";

import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/ChallengePage.module.scss";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/client";
import { ROOT_PAGE } from "../constants/routers";

export interface ChallengePageProps {
  userLevel: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function ChallengePage({
  userLevel,
  currentExperience,
  challengesCompleted,
}: ChallengePageProps) {
  const [session] = useSession();

  return (
    <ChallengesProvider
      userLevel={userLevel}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <CountdownProvider>
        <div className={styles.challangePageContainer}>
          <Head>
            <title>{session?.user?.name} | Be Healthy</title>
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

          <button onClick={() => signOut()} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    userLevel,
    currentExperience,
    challengesCompleted,
  } = context.req.cookies;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: ROOT_PAGE,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userLevel: userLevel ? Number(userLevel) : 1,
      currentExperience: currentExperience ? Number(currentExperience) : 0,
      challengesCompleted: challengesCompleted
        ? Number(challengesCompleted)
        : 0,
    },
  };
};
