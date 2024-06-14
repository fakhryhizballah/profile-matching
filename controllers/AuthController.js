"use strict";
const { User, Session, Previlage, Level } = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { Op } = require("sequelize");
const helpers = require("../helpers");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, fullname, email, nohp, password, lvid } =
        req.body;
      if (helpers.validEmail(email) == false) {
        return res.status(400).json({
          status: false,
          message: "email is not valid",
          data: null,
        });
      }
      const isExist = await User.findOne({
        where: {
          [Op.or]: [{ email: email }, { username: username }, { nohp: nohp }],
        },
      });
      if (isExist) {
        console.log(isExist);
        // cek data yang sama
        let data = [];
        if (isExist.email == email) {
          data.push("email already exist!");
        }
        if (isExist.username == username) {
          data.push("username already exist!");
        }
        if (isExist.nohp == nohp) {
          data.push("nohp already exist!");
        }
        return res.status(400).json({
          status: false,
          message: "user already exist!",
          data: data,
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const gid = uuid.v4();
      const newUser = await User.create({
        gid: gid,
        username: username,
        nohp: nohp,
        fullname: fullname,
        email: email,
        password: hashPassword,
        pic: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png'
      });

      lvid.forEach((element) => {
        Previlage.create({
          gid: gid,
          lvid: element,
        });
      });

      res.status(201).json({
        status: true,
        message: "user registered",
        data: {
          gid: newUser.gid,
          name: newUser.name,
          email: newUser.email,
          updatedAt: newUser.updatedAt,
          createdAt: newUser.createdAt,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        data: err,
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.authenticate(req.body);
      const refreshToken = user.generateRefreshToken();
      const users = await User.findAll({
        where: { gid: user.gid },
        attributes: ["gid", "username", "fullname", "email", "pic"],
        include: [
          {
            model: Previlage,
            as: "kd_access",
            attributes: ["lvid"],
            include: [
              {
                model: Level,
                as: "Level",
                attributes: ["access"],
              },
            ],
          },
        ],
      });
      const accesstoken = users[0].generateToken();
      if (req.headers["x-real-ip"] == undefined) {
        req.headers["x-real-ip"] = req.connection.remoteAddress;
      }
        console.log(accesstoken.length);
        console.log(refreshToken.length);

      await Session.create({
        name: user.gid,
        status: "login",
        user_agent: req.headers["user-agent"],
        host: req.headers["host"],
        remoteAddress: req.headers["x-real-ip"],
        refresh: refreshToken,
        access: accesstoken,
      });

      res.status(200).json({
        status: true,
        message: "success login",
        data: {
          user: users,
          access_token: accesstoken,
          refresh_token: refreshToken,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
  refresh: async (req, res) => {
    try {
      const session = await Session.valid(req.body);
      const user = await User.findOne({ where: { gid: session.name } });

      const users = await User.findAll({
        where: { gid: user.gid },
        attributes: ["gid", "username", "fullname", "email", "pic"],
        include: [
          {
            model: Previlage,
            as: "kd_access",
            attributes: ["lvid"],
            include: [
              {
                model: Level,
                as: "Level",
                attributes: ["access"],
              },
            ],
          },
        ],
      });
      const accesstoken = users[0].generateToken();

      if (req.headers["x-real-ip"] == undefined) {
        req.headers["x-real-ip"] = req.connection.remoteAddress;
      }
      await Session.update(
        {
          status: "refresh",
          remoteAddress: req.headers["x-real-ip"],
          access: accesstoken,
        },
        {
          where: {
            refresh: req.body.refresh_token,
          },
        }
      );

      res.status(200).json({
        status: true,
        message: "success refresh access token",
        data: {
          access_token: accesstoken,
        },
      });
    } catch (err) {
      res.status(401).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
  level: async (req, res) => {
    try {
      const level = await Level.findAll({
        attributes: ["id", "access"],
      });
      res.status(200).json({
        status: true,
        message: "success get level",
        data: level,
      });
    } catch (err) {
      res.status(401).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
  forgot: async (req, res) => {
    try {
      const token = await Token.findOne({
        where: {
          [Op.and]: [{ telp: req.body.nohp }, { token: req.body.token }],
        },
      });
      if (!token) {
        return res.status(400).json({
          status: false,
          message: "token not found",
          data: null,
        });
      }
      if (token.exp < new Date()) {
        return res.status(400).json({
          status: false,
          message: "token expired",
          data: null,
        });
      }
      const user = await User.findOne({ where: { nohp: req.body.nohp } });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "email not found",
          data: null,
        });
      }
      const password = await bcrypt.hash(req.body.new_password, 10);
      await User.update(
        {
          password: password,
        },
        {
          where: {
            nohp: req.body.nohp,
          },
        }
      );
      res.status(200).json({
        status: true,
        message: "success update password",
        data: null,
      });
    } catch (err) {
      res.status(401).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  }
};
