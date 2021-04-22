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

interface User {
  name: string;
  avatar_url: string;
}

export interface ChallengePageProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user: User;
}

export default function ChallengePage({
  level,
  currentExperience,
  challengesCompleted,
  user,
}: ChallengePageProps) {
  return (
    <ChallengesProvider
      level={level}
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
        </div>
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { level, currentExperience, challengesCompleted } = req.cookies;
  const { username } = params;
  const user = await (
    await fetch(`https://api.github.com/users/${username}`)
  ).json();

  return {
    props: {
      level: level ? Number(level) : 1,
      currentExperience: currentExperience ? Number(currentExperience) : 0,
      challengesCompleted: challengesCompleted
        ? Number(challengesCompleted)
        : 0,
      user,
    },
  };
};
