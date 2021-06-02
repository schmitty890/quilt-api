import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PatternSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

PatternSchema.set("timestamps", true);
