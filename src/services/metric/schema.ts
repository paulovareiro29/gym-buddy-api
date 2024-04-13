const user = {
  id: true,
  email: true,
  name: true
};

export default {
  id: true,
  user: { select: user },
  creator: { select: user },
  type: true,
  value: true,
  date: true,
  created_at: true,
  updated_at: true
};
