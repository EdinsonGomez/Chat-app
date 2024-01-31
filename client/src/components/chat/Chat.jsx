import { useEffect, useRef, useState } from "react";
import { useAppContext } from "src/context/appContext/appContext";
import { useSocketContext } from "src/context/socketContext/socketContext";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";

function Chat() {
  const socket = useSocketContext();
  const { state } = useAppContext();

  const [list, setList] = useState([]);

  const listRef = useRef(null);

  const onNewMessageSent = (message) => {
    setList([...list, message]);
  }

  const newMessageListener = (data) => {
    setList((curr) => ([...curr, data]));
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [list]);

  useEffect(() => {
    socket.on('new-message', newMessageListener);

    return () => {
      socket.off('new-message', newMessageListener);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.activeChat) {
      socket.emit(
        'open-chat',
        { participants: {
          from: state.activeChat,
          to: state.auth.nickname
        }},
        (response) => {
          setList(response.messages)
        }
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeChat]);

  if (!state.activeChat) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">
          Selecciona un usuario conectado para iniciar una conversación 
        </p>
      </div>
    )
  }

  return (
    <div className="h-full px-2 pb-4 flex flex-col">
      <div
        className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-slate-500/70 scrollbar-track-slate-200 scrollbar-h-10"
        ref={listRef}
      >
        <ul className="list-none flex-grow flex flex-col justify-end mt-3 py-5 px-3 gap-y-5">
          {list.map((data) => (
            <MessageItem key={data.messageId} data={data} />
          ))}
        </ul>
      </div>
      <div className="mt-auto px-3">
        <MessageInput onMessageSent={onNewMessageSent} />
      </div>
    </div>
  );
}

export default Chat;
