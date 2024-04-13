import { Prisma } from '@prisma/client';

export function userFieldsWithoutPassword(): Prisma.UserSelect {
  const userFieldsWithoutPassword: Prisma.UserSelect = {
    id: true,
    email: true,
    name: true,
    address: true,
    register_code: true,
    activated: true,
    created_at: true,
    updated_at: true
  };
  return userFieldsWithoutPassword;
}

export function userMetricSchema(): Prisma.UserMetricSelect {
  return {
    id: true,
    user: { select: userFieldsWithoutPassword() },
    creator: { select: userFieldsWithoutPassword() },
    type: true,
    value: true,
    date: true,
    created_at: true,
    updated_at: true
  };
}
