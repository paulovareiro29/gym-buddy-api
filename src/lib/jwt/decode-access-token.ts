import jwt from 'jsonwebtoken';

export const decodeAccessToken = async (token: string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  );
