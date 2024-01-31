import { useAppContext } from "src/context/appContext/appContext";
import moment from "moment";

function MessageItem({ data }) {
  const { state } = useAppContext();

  const from = data?.from ?? "";
  const date = data?.date ? moment(data.date).format('d MMM hh:mm a') : '';
  const message = data?.message ?? "";

  const isMeSender = from === state.auth?.nickname;

  return (
    <li className={`flex flex-col gap-y-1 max-w-[75%] min-w-36 ${isMeSender ? 'self-end' : 'self-start'}`}>
      <p
        className={`w-full break-all text-base px-2 py-4 rounded-lg ${
          isMeSender
          ? "bg-slate-200 rounded-br-none"
          : "bg-blue-600 text-white rounded-bl-none"
        }`}
      >
        {message}
      </p>
      <p className={`flex items-center gap-x-3 ${isMeSender ? 'self-end' : 'self-start'}`}>
        <span className={`text-sm font-semibold ${isMeSender ? 'order-last' : ''}`}>
          {isMeSender ? 'You' : from}
        </span>
        <span className="text-xs opacity-70">
          {date}
        </span>
      </p>
    </li>
  );
}

export default MessageItem;
