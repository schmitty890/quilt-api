import mongoose from "mongoose";
import { PatternSchema } from "../models/patternModel";

const Pattern = mongoose.model("Pattern", PatternSchema);

export const addNewPattern = (req, res) => {
  console.log(req.body);
  let newPattern = new Pattern(req.body);

  newPattern.save((err, pattern) => {
    if (err) {
      res.json(err);
    }
    res.json(pattern);
  });
};

export const getPatterns = (req, res) => {
  Pattern.find({}, (err, pattern) => {
    if (err) {
      res.json(err);
    }
    res.json(pattern);
  });
};

export const getPatternWithID = (req, res) => {
  Pattern.findById(req.params.patternID, (err, pattern) => {
    if (err) {
      res.json(err);
    }
    res.json(pattern);
  });
};

export const getPatternsByCategory = (req, res) => {
  // console.log("getPatternsByCategory");
  // console.log(req.params.category);

  Pattern.find({ category: req.params.category }, (err, pattern) => {
    if (err) {
      res.json(err);
    }
    res.json(pattern);
  });
};

export const updatePattern = (req, res) => {
  Pattern.findOneAndUpdate(
    { _id: req.params.patternID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, pattern) => {
      if (err) {
        res.json(err);
      }
      res.json(pattern);
    }
  );
};

export const deletePattern = (req, res) => {
  Pattern.remove({ _id: req.params.patternID }, (err, pattern) => {
    if (err) {
      res.json(err);
    }
    res.json({ message: "successfully deleted pattern" });
  });
};
