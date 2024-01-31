import UserList from "./UsersList";
import UserItem from "./UserItem";
import { useMemo } from "react";
import { useAppContext } from "src/context/appContext/appContext";
import actionTypes from "src/state/actionTypes";
import { useSocketContext } from "src/context/socketContext/socketContext";

function Users() {
  const socket = useSocketContext();
  const { state, dispatch } = useAppContext();

  const messagesNotifications = useMemo(() => {
    const notifications = Object.keys(state?.notificationsMessages) ?? [];
    return notifications.length;
  }, [state.notificationsMessages])

  const onSelectChat = (nicknameSelected) => {
    if (state.activeChat) {
      socket.emit('leave-chat', {
        participants: {
          from: state.auth.nickname,
          to: state.activeChat
        }
      })
    }

    dispatch({
      type: actionTypes.ACTIVE_CHAT,
      payload: nicknameSelected,
    });

    dispatch({
      type: actionTypes.REMOVE_NOTIFICATION_MESSAGE,
      payload: { fromNickname:  nicknameSelected }
    });
  };

  return (
    <div className="flex flex-col divide-y-2 divide-slate-200">
      <div>
        <h3 className="text-2xl tracking-wide font-bold p-4 pb-10 flex">
          Mensajes
          {messagesNotifications > 0 ? (
            <div className="relative ml-1">
              <span className="absolute -top-1 text-xs bg-rose-500 text-white rounded-full py-1 px-2">
                {messagesNotifications}
              </span>
            </div>
          ) : null}
        </h3>
      </div>
      <UserList>
        {state.usersConnected.length > 0 ? (
          state.usersConnected.map((user) => (
            <UserItem
              key={`user-${user.nickname}`}
              data={user}
              onSelectChat={() => onSelectChat(user.nickname)}
            />
          ))
        ): null}
      </UserList>
    </div>
  );
}

export default Users;
