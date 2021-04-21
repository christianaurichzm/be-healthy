import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"

export function useChallenges() {
  return useContext(ChallengesContext)
}