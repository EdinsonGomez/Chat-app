import actionTypes from "./actionTypes"

export default (state, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_NICKNAME: {
      const auth = {
        nickname: action.payload?.nickname ?? ''
      }

      return {
        ...state,
        auth,
      }
    }

    case actionTypes.SET_USERS_LIST: {
      return {
        ...state,
        usersConnected: action?.payload?.users ?? state.usersConnected
      }
    }

    case actionTypes.ADD_USER: {
      const usersConnected = [...state.usersConnected, action.payload];

      return {
        ...state,
        usersConnected
      }
    }

    case actionTypes.ACTIVE_CHAT: {
      return {
        ...state,
        activeChat: action?.payload ?? ''
      }
    }

    case actionTypes.ADD_NOTIFICATION_MESSAGE: {
      const { message } = action.payload;
      const notificationsMessages = { ...state.notificationsMessages };
      
      if (message && message.from) {
        const fromNickname = message.from;

        if (!notificationsMessages[fromNickname]) {
          notificationsMessages[fromNickname] = [];
        }

        const existMessage = notificationsMessages[fromNickname].find(({ messageId }) => messageId === message.messageId);
        
        if (!existMessage) {
          notificationsMessages[fromNickname].push(message);
        }

      }

      return {
        ...state,
        notificationsMessages
      }
    }

    case actionTypes.REMOVE_NOTIFICATION_MESSAGE: {
      const notificationsMessages = { ...state.notificationsMessages };
      const { fromNickname } = action.payload;
      delete notificationsMessages[fromNickname];

      return {
        ...state,
        notificationsMessages
      }
    }

    default: 
      return state;
  }
}