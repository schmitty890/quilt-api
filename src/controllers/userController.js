import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModel";

const User = mongoose.model("User", UserSchema);

export const loginRequired = (req, res, next) => {
  console.log(req);
  if (req.user) {
    console.log("we in here login required");
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

export const register = (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser);
  User.findOne({ email: req.body.email }).then(function (result) {
    console.log("if check for result");
    if (result) {
      console.log("email already exists");
      return res.status(409).json({ message: "email already exists." });
    } else {
      newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
      console.log(newUser);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).send({ message: err });
        } else {
          user.hashPassword = undefined;
          // return res.json(user);
          return res.json({
            token: jwt.sign(
              { email: user.email, firstName: user.firstName, _id: user.id },
              "RESTFULAPIs"
            ),
            _id: user.id,
          });
        }
      });
    }
  });
};

export const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        res
          .status(401)
          .json({ message: "authentication failed, no user found" });
      } else if (user) {
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
          res
            .status(401)
            .json({ message: "authentication failed, wrong password" });
        } else {
          return res.json({
            token: jwt.sign(
              { email: user.email, firstName: user.firstName, _id: user.id },
              "RESTFULAPIs"
            ),
            _id: user.id,
          });
        }
      }
    }
  );
};

export const getUserWithID = (req, res) => {
  console.log(req.params.userID);
  User.findById(req.params.userID, (err, user) => {
    console.log("we are in finding by id");
    console.log(user);
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const updateUserWithID = (req, res) => {
  const myobj = JSON.parse(Object.keys(req.body)[0]);
  User.findOneAndUpdate(
    { _id: req.params.userID },
    myobj,
    { new: false, useFindAndModify: true },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

export const resetPassword = (req, res) => {
  console.log("resetPassword");
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    console.log(token);
    console.log(req.body);
    console.log(req.body.email);
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        console.log(result);
        // transporter.sendMail({
        //     to:user.email,
        //     from:"no-replay@insta.com",
        //     subject:"password reset",
        //     html:`
        //     <p>You requested for password reset</p>
        //     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
        //     `
        // })
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAILEMAIL,
            pass: process.env.GMAILPASS,
          },
        });
        // console.log("---------------TRANSPORTER-------------------");
        // console.log(transporter);
        // console.log("----------------------------------");
        const PORT =
          process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;
        let hostURL =
          PORT === 8081
            ? "http://localhost:8000"
            : "https://quiltersara.netlify.app"; // if local development, set to localhost 8000 (front end react app) otherwise set to

        const mailOptions = {
          to: user.email,
          from: process.env.GMAILEMAIL,
          subject: "Reset your password on Quilter Sara",
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${hostURL}/resetPassword/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        transporter.sendMail(mailOptions);

        res.json({ message: "check your email" });
      });
    });
  });
};

export const newPassword = (req, res) => {
  console.log("newPassword");

  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.hashPassword = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
