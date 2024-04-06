import bcrypt from 'bcrypt';

export const encryptString = async (data: string): Promise<string> =>
  new Promise((resolve) => {
    bcrypt.hash(data, 10).then((result) => resolve(result));
  });
