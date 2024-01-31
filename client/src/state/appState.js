export const appInitialState = {
  usersConnected: [],
  auth: {
    nickname: ''
  },
  activeChat: '',
  notificationsMessages: {}
}

export const getInitState = () => {
  return JSON.parse(localStorage.getItem('chatStore')) || appInitialState;
}
