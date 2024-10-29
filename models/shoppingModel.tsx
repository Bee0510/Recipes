interface ShoppingListResponseJson {
  status: Number;
  data: {
    _id: String;
    cartId: Number;
    userId: String;
    recipeId: Number;
    recipeName: String;
    ingredients: String[];
  }[];
}

class ShoppingListModel {
  _id: String;
  cartId: Number;
  userId: String;
  recipeId: Number;
  recipeName: String;
  ingredients: String[];

  constructor(
    _id: String,
    cartId: Number,
    userId: String,
    recipeId: Number,
    recipeName: String,
    ingredients: String[]
  ) {
    this._id = _id;
    this.cartId = cartId;
    this.userId = userId;
    this.recipeId = recipeId;
    this.recipeName = recipeName;
    this.ingredients = ingredients;
  }

  static fromJson(json: any): ShoppingListModel {
    return new ShoppingListModel(
      json._id,
      json.cartId,
      json.userId,
      json.recipeId,
      json.recipeName,
      json.ingredients
    );
  }
}

class ShoppingListResponse {
  status: Number;
  data: ShoppingListModel[];

  constructor(status: Number, data: ShoppingListModel[]) {
    this.status = status;
    this.data = data;
  }

  static fromJson(json: ShoppingListResponseJson): ShoppingListResponse {
    const data = json.data.map((item) => ShoppingListModel.fromJson(item));
    return new ShoppingListResponse(json.status, data);
  }
}

export default ShoppingListResponse;
