import { useMemo } from 'react';
import { useAppContext } from "src/context/appContext/appContext";

function UserItem({ children, data, onSelectChat }) {
  const { state } = useAppContext();

  const messagesNotifications = useMemo(() => {
    const notifications = Object.keys(state?.notificationsMessages?.[data.nickname] ?? {});
    return notifications.length;
  }, [data.nickname, state?.notificationsMessages]);

  return (
    <li
      key={`user-${data.nickname}`}
      className={`py-3 pl-4 hover:cursor-pointer border-b border-b-slate-100 ${
        state.activeChat === data.nickname ? "bg-slate-200" : "hover:bg-slate-100"
      }`}
      onClick={onSelectChat}
    >
      <div className="flex gap-x-4 min-w-36 relative">
        <img
          src={`https://avatar.iran.liara.run/username?username=${data.nickname}`}
          alt="user-logo"
          width={52}
        />
        <p className=" flex-grow text-lg font-semibold">{data.nickname}</p>
        {messagesNotifications > 0 ? (
          <span className='text-xs absolute right-3 top-4 px-2 py-1 rounded-full text-white bg-blue-700'>
            {messagesNotifications}
          </span>
        ) : null}
        
        {children}
      </div>
    </li>
  );
}

export default UserItem;
