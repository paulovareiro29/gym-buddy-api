const user = {
  id: true,
  email: true,
  name: true
};

export default {
  id: true,
  name: true,
  creator: { select: user },
  created_at: true,
  updated_at: true,
  deleted_on: true
};
