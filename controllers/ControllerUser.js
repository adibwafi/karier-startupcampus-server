const express = require("express");
const axios = require("axios");
const User = require("../models/user");
require("dotenv").config();
const {
  encryptPassword,
  comparePassword,
  signToken,
  verifyToken,
} = require("../helpers/helper");

class ControllerUser {
  //REGISTER USER
  static async register(req, res, next) {
    try {
      //THIRD PARTY API: SPOTT RAPIDAPI
      let data = await axios({
        url: `https://spott.p.rapidapi.com/places/ip/me`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.KEY_LOCATION,
          "X-RapidAPI-Host": process.env.HOST_LOCATION,
        },
      });
      let location = data.data.name;
      let user = await User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: location,
      });
      res.status(201).json({
        message: `User ${user.name} registered successfully`,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  //LOGIN USER
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "EMAIL_IS_REQUIRED" };
      }
      if (!password) {
        throw { name: "PASSWORD_IS_REQUIRED" };
      }
      let findUser = await User.findOne({
        where: { email },
      });
      if (!findUser) {
        throw { name: "INVALID_CREDENTIAL" };
      }
      let checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword) {
        throw { name: "INVALID_CREDENTIAL" };
      }
      const payload = {
        id: findUser.id,
        name: findUser.name,
      };
      const access_token = signToken(payload);
      res.status(200).json({
        access_token,
        id: findUser.id,
        name: findUser.name,
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ControllerUser;
