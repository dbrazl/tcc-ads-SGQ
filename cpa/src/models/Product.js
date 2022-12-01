import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  quantity: Number,
  workflow: String,
  order: Number
});

const Product = model("Product", schema);

export { Product };
