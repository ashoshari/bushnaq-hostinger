import bcrypt from "bcrypt";
import { createHash } from "crypto";
import { validationResult, matchedData } from "express-validator";
import { generateToken, verifyToken } from "./tokenHandler.js";
import DB from "./dbConnection.js";

// Function to customize validation result formatter
const validation_result = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

// Middleware to handle validation errors
export const validate = (req, res, next) => {
  const errors = validation_result(req).mapped();
  if (Object.keys(errors).length) {
    return res.status(422).json({
      status: 422,
      errors,
    });
  }
  next();
};

// Function to fetch user data by email or ID
export const fetchUserByEmailOrID = async (data, isEmail = true) => {
  let sql = "SELECT * FROM `users` WHERE `email`=?";
  if (!isEmail) sql = "SELECT `id` ,`name`, `email` FROM `users` WHERE `id`=?";
  const [row] = await DB.execute(sql, [data]);
  return row;
};

export default {
  // Controller function for user signup
  signup: async (req, res, next) => {
    try {
      const { name, email, password } = matchedData(req);

      // Generate salt and hash the password
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);

      // Store user data in the database
      const [result] = await DB.execute(
        "INSERT INTO `users` (`name`,`email`,`password`) VALUES (?,?,?)",
        [name, email, hashPassword]
      );
      res.status(201).json({
        status: 201,
        message: "You have been successfully registered.",
        user_id: result.insertId,
      });
    } catch (err) {
      next(err);
    }
  },

  // Controller function for user login
  login: async (req, res, next) => {
    try {
      const { user, password } = req.body;
      const isAdmin = await DB.execute(
        "SELECT isAdmin FROM `users` WHERE email = ?",
        [user.email]
      );
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) {
        return res.status(422).json({
          status: 422,
          message: "Incorrect password!",
        });
      }

      // Generating Access and Refresh Token
      const access_token = generateToken({ id: user.id });
      const refresh_token = generateToken({ id: user.id }, false);

      const md5Refresh = createHash("md5").update(refresh_token).digest("hex");

      // Storing refresh token in MD5 format
      const [result] = await DB.execute(
        "INSERT INTO `refresh_tokens` (`user_id`,`token`) VALUES (?,?)",
        [user.id, md5Refresh]
      );

      if (!result.affectedRows) {
        throw new Error("Failed to whitelist the refresh token.");
      }
      res.json({
        status: 200,
        access_token,
        refresh_token,
        isAdmin: isAdmin,
      });
    } catch (err) {
      next(err);
    }
  },

  // Controller function to get user data by providing the access token
  getUser: async (req, res, next) => {
    try {
      // Verify the access token
      const data = verifyToken(req.headers.access_token);
      if (data?.status) return res.status(data.status).json(data);
      // Fetch user by ID
      const user = await fetchUserByEmailOrID(data.id, false);
      if (user.length !== 1) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
      res.json({
        status: 200,
        user: user[0],
      });
    } catch (err) {
      next(err);
    }
  },

  // Controller function to refresh access and refresh tokens
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.headers.refresh_token;
      // Verify the refresh token
      const data = verifyToken(refreshToken, false);
      if (data?.status) return res.status(data.status).json(data);

      // Convert refresh token to md5 format
      const md5Refresh = createHash("md5").update(refreshToken).digest("hex");

      // Find the refresh token in the database
      const [refTokenRow] = await DB.execute(
        "SELECT * from `refresh_tokens` WHERE token=?",
        [md5Refresh]
      );

      if (refTokenRow.length !== 1) {
        return res.json({
          status: 401,
          message: "Unauthorized: Invalid Refresh Token.",
        });
      }

      // Generate new access and refresh tokens
      const access_token = generateToken({ id: data.id });
      const refresh_token = generateToken({ id: data.id }, false);

      const newMd5Refresh = createHash("md5")
        .update(refresh_token)
        .digest("hex");

      // Replace the old refresh token with the new one
      const [result] = await DB.execute(
        "UPDATE `refresh_tokens` SET `token`=? WHERE `token`=?",
        [newMd5Refresh, md5Refresh]
      );

      if (!result.affectedRows) {
        throw new Error("Failed to whitelist the Refresh token.");
      }

      res.json({
        status: 200,
        access_token,
        refresh_token,
      });
    } catch (err) {
      next(err);
    }
  },
};
