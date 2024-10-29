class UserModel {
  message: String;
  username: String;
  constructor(message: String, username: String) {
    this.message = message;
    this.username = username;
  }

  static fromJson(json: { message: String; username: String }) {
    return new UserModel(json.message, json.username);
  }
}

export default UserModel;
