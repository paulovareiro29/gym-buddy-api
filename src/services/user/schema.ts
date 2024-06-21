export default {
  id: true,
  email: true,
  role: {
    select: {
      id: true,
      name: true
    }
  },
  name: true,
  avatar: true,
  address: true,
  register_code: true,
  activated: true,
  created_at: true,
  updated_at: true,
  deleted_on: true
};
