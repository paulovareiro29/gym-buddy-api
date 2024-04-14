import { PrismaClient } from '@prisma/client';
import { compareEncryptedString } from '../../lib/encryption/compare-encrypted-string';

const prisma = new PrismaClient();

export default class AuthenticationService {
  static async validateCredentials(email: string, password: string): Promise<boolean> {
    const user = await prisma.user.findFirst({ where: { email } });
    return user && user.activated && compareEncryptedString(password, user.password);
  }
}
