import recipeModel from "./recipeModel";

interface SavedRecipeResponseJson {
  status: number;
  userId: string;
  message: string;
  savedRecipes: {
    _id: string;
    recipe_id: number;
    name: string;
    ingredients: string[];
    description: string;
    image: string;
    recipe_time: string;
    serving: string;
    steps: string[];
    tips: string[];
    category: string;
    is_nonveg: boolean;
    cal: string;
    level: string;
  }[];
}

class SavedRecipeModel {
  status: number;
  userId: string;
  message: string;
  savedRecipes: recipeModel[];

  constructor(
    status: number,
    userId: string,
    message: string,
    savedRecipes: recipeModel[]
  ) {
    this.status = status;
    this.userId = userId;
    this.message = message;
    this.savedRecipes = savedRecipes;
  }

  static fromJson(json: SavedRecipeResponseJson): SavedRecipeModel {
    const recipes = json.savedRecipes.map((item) => recipeModel.fromJson(item));
    return new SavedRecipeModel(
      json.status,
      json.userId,
      json.message,
      recipes
    );
  }
}

export default SavedRecipeModel;
