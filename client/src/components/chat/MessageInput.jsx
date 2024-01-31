// import moment from 'moment';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useSocketContext } from "src/context/socketContext/socketContext";
import { useAppContext } from "src/context/appContext/appContext";

function MessageInput({ onMessageSent }) {
  const socket = useSocketContext();
  const { state } = useAppContext();

  const [message, setMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const messageData = {
      message,
      from: state.auth.nickname,
      to: state.activeChat,
      date: new Date()
    }

    socket.emit('send-message', messageData, (response) => {
      if (onMessageSent) {
        onMessageSent(response.message);
      }
    });

    setMessage("");
  };
  
  return (
    <form className="flex gap-y-2" onSubmit={onSubmit}>
      <input
        className="flex-grow pl-6 py-3 border-2 border-slate-300 mr-2 rounded-full focus:outline-slate-400"
        type="text"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        placeholder="Mensaje"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded-full">
        <FontAwesomeIcon icon={faPaperPlane} size="lg" />
      </button>
    </form>
  );
}

export default MessageInput;
