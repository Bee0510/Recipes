class recipeModel {
  _id: String;
  recipe_id: Number;
  name: String;
  description: String;
  image: String;
  ingredients: String[];
  steps: String[];
  tips: String[];
  cal: String;
  category: String;
  level: String;
  recipe_time: String;
  serving: String;
  is_nonveg: Boolean;

  constructor(
    _id: String,
    recipe_id: Number,
    name: String,
    description: String,
    image: String,
    ingredients: String[],
    steps: String[],
    tips: String[],
    cal: String,
    category: String,
    level: String,
    recipe_time: String,
    serving: String,
    is_nonveg: Boolean
  ) {
    this._id = _id;
    this.recipe_id = recipe_id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.ingredients = ingredients;
    this.steps = steps;
    this.tips = tips;
    this.cal = cal;
    this.category = category;
    this.level = level;
    this.recipe_time = recipe_time;
    this.serving = serving;
    this.is_nonveg = is_nonveg;
  }

  static fromJson(json: {
    _id: String;
    recipe_id: Number;
    name: String;
    description: String;
    image: String;
    ingredients: String[];
    steps: String[];
    tips: String[];
    cal: String;
    category: String;
    level: String;
    recipe_time: String;
    serving: String;
    is_nonveg: Boolean;
  }) {
    return new recipeModel(
      json._id,
      json.recipe_id,
      json.name,
      json.description,
      json.image,
      json.ingredients,
      json.steps,
      json.tips,
      json.cal,
      json.category,
      json.level,
      json.recipe_time,
      json.serving,
      json.is_nonveg
    );
  }
}

export default recipeModel;
