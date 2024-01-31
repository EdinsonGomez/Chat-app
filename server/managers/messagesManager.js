class messagesManager {
  constructor() {
    this.messages = {};
  }

  getAllMessages() {
    const messages = {...this.messages};
    return messages;
  }

  getMessagesByRoom(room) {
    if (!this.messages[room]) {
      return undefined
    }

    const messages = [...this.messages[room]];
    return messages;
  }

  saveMessagesByRoom(room, messages = []) {
    if(!this.messages[room]) {
      this.messages[room] = [];
    }
  
    this.messages[room] = [
      ...this.messages[room],
      ...messages
    ]
  }
}

export default new messagesManager();