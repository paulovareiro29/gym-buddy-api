import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string) =>
  jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
