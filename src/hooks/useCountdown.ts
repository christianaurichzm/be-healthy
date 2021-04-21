import { useContext } from "react"
import { CountdownContext } from "../contexts/CountdownContext"

export function useCountdown() {
  return useContext(CountdownContext)
}
