import bcrypt from 'bcrypt';

export const compareEncryptedString = async (data: string, encrypted: string) =>
  bcrypt.compare(data, encrypted);
