import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  ingredients: [
    {
      type: String,
      require: true,
    },
  ], //by putting square brackets mongodb will know that this is an array
  instructions: {
    tpye: String,
    require: true,
  },
  imageURL: {
    tpye: String,
    require: true,
  },
  cookingTime: {
    type: Number,
    require: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
