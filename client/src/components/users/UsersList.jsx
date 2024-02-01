import { useCallback, useEffect } from 'react';
import { useSocketContext } from 'src/context/socketContext/socketContext';
import { useAppContext } from 'src/context/appContext/appContext';
import actionTypes from 'src/state/actionTypes';

function UserList({ children }) {
  const socket = useSocketContext();
  const { state, dispatch } = useAppContext();

  const userConnectedListener = useCallback((data) => {
    if (state.auth.nickname) {
      dispatch({
        type: actionTypes.ADD_USER,
        payload: data,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.auth]);

  const messageNotiListener = useCallback((message) => {
    dispatch({
      type: actionTypes.ADD_NOTIFICATION_MESSAGE,
      payload: { message }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("user-connected", userConnectedListener);
    socket.on("noti-new-message", messageNotiListener);

    return () => {
      socket.off("user-connected", userConnectedListener);
      socket.off("noti-new-message", messageNotiListener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.auth]);

  return (
    <ul className="list-none flex flex-col w-full pt-3">
      {children}
    </ul>
  )
}

export default UserList