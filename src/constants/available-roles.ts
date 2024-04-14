export type RoleName = 'default' | 'admin' | 'trainer';

export default {
  default: 'default',
  admin: 'admin',
  trainer: 'trainer'
} as Record<RoleName, string>;
