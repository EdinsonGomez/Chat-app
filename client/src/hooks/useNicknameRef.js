import { useEffect, useRef } from "react";
import { useAppContext } from "../context/appContext"

export const useNicknameRef = () => {
  const { state } = useAppContext();
  const nicknameRef = useRef(null);

 useEffect(() => {
  nicknameRef.current = state.auth.nickname;
 }, [state.auth.nickname]);

 return { nicknameRef }
}