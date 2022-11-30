import { Schema, model } from "mongoose";

const schema = new Schema({
  steps: [{
    order: Number,
    status: String,
    key: String | null,
    toOrder: Number | null,
    end: Boolean | null
  }]
});

const Workflow = model("Medicine", schema);

export { Workflow };
