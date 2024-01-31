import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext/appContext";
import actionTypes from "../state/actionTypes";
import { useSocketContext } from "../context/socketContext/socketContext";

function NicknameForm() {
  const socket = useSocketContext();
  const { state, dispatch } = useAppContext();

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(() => {
    return !state.auth.nickname
  });

  const setUserList = (users) => {
    dispatch({
      type: actionTypes.SET_USERS_LIST,
      payload: { users }
    });
  }

  const registerUser = (auth) => {
    socket.emit('register-user', { ...auth }, (response) => {
      if (response.status === "error") {
        setError(response.error);
      } else if (response.data?.users) {
        console.log('response user registered: ', response);
        setUserList(response.data?.users ?? []);
        setShow(false);
      }
    });
  };

  const onContinue = () => {
    if (!nickname) return

    dispatch({
      type: actionTypes.REGISTER_NICKNAME,
      payload: { nickname }
    });

    registerUser({ nickname });
  }

  useEffect(() => {
    if (state.auth.nickname && !show) {
      socket.emit('reconnect-user', state.auth, (response) => {
        console.log('response user reconnect: ', response);
        setUserList(response.data?.users ?? []);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${show ? 'fixed' : 'hidden'} inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center`}>
      <div className="bg-white p-8 rounded shadow-lg w-1/2">
        <div className="flex flex-col gap-y-5">
          <h2 className="text-2xl font-bold mb-4">Nombre de usuario</h2>
          <p>Agrega tu nickname para poder indentificarte</p>
          <div className="w-full">
            <input
              className={`w-full rounded border px-3 py-2 focus:outline-slate-400 ${error ? 'border-rose-500' : 'border-slate-200 '}`}
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={({ target }) => setNickname(target.value)}
            />
            {error ? (
              <p className="text-rose-600 text-sm mt-1">{error.message}</p>
            ) : null}
          </div>
          <button
            className="rounded bg-blue-600 text-white m-auto px-4 py-2 justify-self-end"
            onClick={onContinue}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NicknameForm;
