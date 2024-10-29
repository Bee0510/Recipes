interface UserJson {
  _id: String;
  id: String;
  username: String;
  name: String;
  email: String;
  phone: String;
  password: String;
  __v: number;
}

class User {
  _id: String;
  id: String;
  username: String;
  name: String;
  email: String;
  phone: String;
  password: String;
  __v: number;

  constructor({
    _id,
    id,
    username,
    name,
    email,
    phone,
    password,
    __v,
  }: UserJson) {
    this._id = _id;
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.__v = __v;
  }

  static fromJson(json: UserJson): User {
    return new User(json);
  }
}

interface LoginResponseJson {
  message: String;
  user: UserJson;
}

class loginModel {
  message: String;
  user: User;

  constructor(message: String, user: User) {
    this.message = message;
    this.user = user;
  }

  static fromJson(json: LoginResponseJson): loginModel {
    const user = User.fromJson(json.user);
    return new loginModel(json.message, user);
  }
}

export default loginModel;
