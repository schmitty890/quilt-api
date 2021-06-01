import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PatternSchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
});

PatternSchema.set("timestamps", true);
