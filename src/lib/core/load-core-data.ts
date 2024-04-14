import { PrismaClient, Role } from '@prisma/client';
import availableRoles, { RoleName } from '../../constants/available-roles';
import { encryptString } from '../encryption/encrypt-string';

const prisma = new PrismaClient();

const initializeRoles = async () =>
  (
    await Promise.all(
      Object.keys(availableRoles).map(async (name) =>
        prisma.role.upsert({
          where: { name },
          create: { name },
          update: {}
        })
      )
    )
  ).reduce(
    (acc, role) => ({
      ...acc,
      [role.name]: role
    }),
    {}
  ) as Record<RoleName, Role>;

export default async () => {
  const roles = await initializeRoles();

  const root = {
    email: process.env.ROOT_EMAIL,
    name: process.env.ROOT_NAME,
    password: await encryptString(process.env.ROOT_PASSWORD),
    role_id: roles.admin.id,
    activated: true,
    register_code: ''
  };

  await prisma.user.upsert({
    where: { email: root.email },
    create: root,
    update: root
  });
};
