import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";
import { ChallengePageProps } from "../pages/[username]";
import {
  CHALLENGES_COMPLETED,
  CURRENT_EXPERIENCE,
  USER_LEVEL,
} from "../constants/cookiesName";

interface Challenge {
  type: "body" | "food";
  description: string;
  amount: number;
}

interface ChallengesContextData extends ChallengePageProps {
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  completeChallenge: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps extends ChallengePageProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  user,
  ...rest
}: ChallengesProviderProps) {
  const [userLevel, setUserLevel] = useState(rest.userLevel);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted
  );

  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((userLevel + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set(USER_LEVEL, String(userLevel));
    Cookies.set(CURRENT_EXPERIENCE, String(currentExperience));
    Cookies.set(CHALLENGES_COMPLETED, String(challengesCompleted));
  }, [userLevel, currentExperience, challengesCompleted]);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge as Challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("New challenge 🎉", {
        body: `Worth ${challenge.amount} xp!`,
        silent: false,
      });
    }
  }

  function levelUp() {
    setUserLevel(userLevel + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setChallengesCompleted(challengesCompleted + 1);
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        userLevel,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        activeChallenge,
        user,
        completeChallenge,
        startNewChallenge,
        resetChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
