import recipeModel from "./recipeModel";

interface RecipeResponseJson {
  status: number;
  message: string;
  recipe: {
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
  }[];
}

class RecommendedModel {
  status: number;
  message: string;
  recipes: recipeModel[];

  constructor(status: number, message: string, recipes: recipeModel[]) {
    this.status = status;
    this.message = message;
    this.recipes = recipes;
  }

  static fromJson(json: RecipeResponseJson): RecommendedModel {
    const recipes = json.recipe.map((item) => recipeModel.fromJson(item));
    return new RecommendedModel(json.status, json.message, recipes);
  }
}

export default RecommendedModel;
