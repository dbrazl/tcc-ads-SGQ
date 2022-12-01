import { Schema, model } from "mongoose";

const schema = new Schema({
  name: String,
  steps: [{
    order: Number,
    status: String,
    key: String | null,
    toOrder: Number | null,
    end: Boolean | null
  }]
});

const Workflow = model("Workflow", schema);

export { Workflow };
