import { useEffect, useReducer } from "react";
import { AppContext } from "./appContext";
import reducer from "src/state/reducer";
import { appInitialState, getInitState } from "src/state/appState";

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, appInitialState, getInitState);

  useEffect(() => {
    localStorage.setItem('chatStore', JSON.stringify(state));
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider;