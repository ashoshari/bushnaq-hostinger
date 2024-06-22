// Importing required modules
import jwt from "jsonwebtoken";
import { config } from "dotenv";

// Loading environment variables from .env file
config();

// Function to generate JWT token
export const generateToken = (data, access = true) => {
  // Selecting secret and expiry based on the type of token (access or refresh)
  const secret = access
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;
  const expiry = access
    ? process.env.ACCESS_TOKEN_EXPIRY
    : process.env.REFRESH_TOKEN_EXPIRY;

  // Generating token with provided data, secret, and expiry
  return jwt.sign(data, secret, { expiresIn: parseInt(expiry) });
};

// Function to verify JWT token
export const verifyToken = (token, access = true) => {
  // Selecting secret based on the type of token (access or refresh)
  const secret = access
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;

  try {
    // Verifying token using the selected secret
    return jwt.verify(token, secret);
  } catch (err) {
    // Handling token verification errors
    return {
      status: 401,
      message: `Unauthorized: ${err.message}`,
    };
  }
};
