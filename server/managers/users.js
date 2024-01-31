class UsersManager {
  constructor() {
    this.users = [];
  }

  getUsers = () => {
    return this.users;
  }

  registerUser(userData) {

    const isExistUser = this.existUser(userData);
    
    if (isExistUser) {
      throw new Error('Ya existe un usuario con ese nombre de usuario');
    } else {
      this.users.push(userData);
    }
  }

  existUser(userData) {
    const existUser = this.users.findIndex(({ nickname }) => nickname === userData.nickname);

    return existUser !== -1
  }
}

export default new UsersManager();