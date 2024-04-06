import jwt from 'jsonwebtoken';

interface TokenInformation {
  id: string;
}

export const decodeAccessToken = async (token: string): Promise<TokenInformation | Error> =>
  new Promise((resolve) =>
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded: TokenInformation) => {
      if (err) resolve(new Error(err.message));
      resolve(decoded);
    })
  );
