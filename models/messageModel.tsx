class messageModel {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  static fromJson(json: any): messageModel {
    return new messageModel(json.status, json.message);
  }
}

export default messageModel;
